import React, { useEffect } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import wsSendMessageHandler from '../services/websocket/wsSendMessageManager';
import { MessageEnum, TransferStatusEnum } from '../types/mesageEnum';
import { FileTransferType, RtcSdpOfferMessageType } from '../types/messageTypes';
import { ACCEPT_MSG_RETRY_INTERVAL } from '../utils/constants';
import { generateTransferAcceptMessage } from '../utils/filesUtils';
import { Button } from './Button';

interface FileProps {
  file: FileTransferType;
  outgoing: boolean;
  onFileCancel: (fileId: string, fileDestinationId: string) => void;
  onFileReject: (fileId: string, fileSourceId: string) => void;
}

export const File: React.FC<FileProps> = ({ file, outgoing, onFileCancel, onFileReject }) => {
  // Initialization
  let receiveBuffer: any = [];
  let receivedSize = 0;

  // Create Data channel
  const sendChannel = file.RTCconfig.createDataChannel('sendDataChannel');
  sendChannel.binaryType = 'arraybuffer';

  let receiveChannel: any;

  const transferAcceptHandler = async () => {
    if (!file.outgoing) {
      file.RTCconfig.ondatachannel = receiveChannelCallback;
    }

    // Create initial offer
    const RTCOffer = file.RTCconfig.createOffer();
    file.RTCconfig.setLocalDescription(await RTCOffer);

    // Initial offer message
    const RTCOfferMessage = {
      type: MessageEnum.RTC_SDP_OFFER,
      transferId: file.id,
      destinationId: file.sourceId,
      sourceId: file.destinationId,
      data: await RTCOffer,
    } as RtcSdpOfferMessageType;

    // Set Initial offer
    wsSendMessageHandler(RTCOfferMessage);

    // Send Transfer Accept message
    sendTransferAcceptMessage();
  };

  // Triggered by transfer accept handler
  useEffect(() => {
    if (file.transferStatus === TransferStatusEnum.IN_PROGRESS) {
      console.log('Pending Status triggered');
      console.log(file.name, file.transferStatus);
      sendTransferData();
    }
  }, [file]);

  function sendTransferData() {
    if (sendChannel.readyState !== 'open') {
      console.log('retrying');
      console.log(file.RTCconfig.connectionState);
      setTimeout(sendTransferData, ACCEPT_MSG_RETRY_INTERVAL);
    } else {
      const chunkSize = 16384;
      const fileReader = new FileReader();
      let offset = 0;
      fileReader.addEventListener('error', (error) => console.error('Error reading file:', error));
      fileReader.addEventListener('abort', (event) => console.log('File reading aborted:', event));
      fileReader.addEventListener('load', (e) => {
        if (e.target?.result) {
          console.log('FileRead.onload ', e);
          sendChannel.send(e.target.result as ArrayBuffer);
          // console.log(e.target.result)
          offset += chunkSize;
          // sendProgress.value = offset;
          if (offset < file.size) {
            readSlice(offset);
            // }
          }
        }
      });
      const readSlice = (o: any) => {
        if (file.file) {
          console.log('readSlice ', o);
          const slice = file.file.slice(offset, o + chunkSize);
          fileReader.readAsArrayBuffer(slice);
        }
      };
      readSlice(0);
    }
  }

  function receiveChannelCallback(event: RTCDataChannelEvent) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
    receiveChannel.onopen = handleReceiveChannelStatusChange(event);
    receiveChannel.onclose = handleReceiveChannelStatusChange(event);
  }

  function handleReceiveMessage(event: MessageEvent<any>) {
    console.log('Message received');
    console.log(event);
    receiveBuffer.push(event.data);
    receivedSize += event.data.byteLength;

    if (receivedSize === file.size) {
      console.log('Transfer complete');
      const received = new Blob(receiveBuffer);
      receiveBuffer = [];

      const url = URL.createObjectURL(received);
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);

      document.body.appendChild(link);

      link.click();

      link.parentNode?.removeChild(link);
    }
  }

  function handleReceiveChannelStatusChange(event: any) {
    if (receiveChannel) {
      // console.log("Receive channel's status has changed to " + receiveChannel.readyState);
    }
  }

  function sendTransferAcceptMessage() {
    if (file.RTCconfig.connectionState !== 'connected') {
      console.log('retrying');
      console.log(file.RTCconfig.connectionState);
      setTimeout(sendTransferAcceptMessage, ACCEPT_MSG_RETRY_INTERVAL);
    } else {
      wsSendMessageHandler(generateTransferAcceptMessage(file));
      console.log('accept message sent to the server', file.id);
    }
  }

  return (
    <div className="text-secondary-two ml-2 flex justify-between mt-4">
      <div className="flex items-center">
        <FaRegFileAlt size={34} className="hover:text-base ease-in-out duration-200" />
        <div className="ml-2 font-rhd text-xl font-bold text-white">{file.name}</div>
      </div>
      <div className="flex items-center mr-6">
        {outgoing ? (
          <Button
            className="hover:bg-base"
            name="Cancel"
            onClick={() => onFileCancel(file.id, file.destinationId)}
          />
        ) : (
          <>
            <Button
              className="mr-2 hover:bg-base"
              color="secondaryTwo"
              name="Accept"
              onClick={transferAcceptHandler}
            />
            <Button
              className="hover:bg-base"
              name="Decline"
              onClick={() => onFileReject(file.id, file.sourceId)}
            />
          </>
        )}
      </div>
    </div>
  );
};
