import React, { useEffect } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { createConnection } from '../services/RTC/RTCservice';
import wsSendMessageHandler from '../services/websocket/wsSendMessageManager';
import { MessageEnum } from '../types/mesageEnum';
import { FileTransferType, RtcSdpOfferMessageType } from '../types/messageTypes';
import { Button } from './Button';

interface FileProps {
  file: FileTransferType;
  outgoing: boolean;
  onFileCancel: (fileId: string, fileDestinationId: string) => void;
  onFileReject: (fileId: string, fileSourceId: string) => void;
}

export const File: React.FC<FileProps> = ({ file, outgoing, onFileCancel, onFileReject }) => {
  // let sendChannel: any;
  let receiveChannel: any;

  // Create Data channel
  const sendChannel = file.RTCconfig.createDataChannel('sendDataChannel');
  sendChannel.binaryType = 'arraybuffer';

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

    wsSendMessageHandler(RTCOfferMessage);
  };

  function receiveChannelCallback(event: RTCDataChannelEvent) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
    receiveChannel.onopen = handleReceiveChannelStatusChange;
    receiveChannel.onclose = handleReceiveChannelStatusChange;
  }

  function handleReceiveMessage(event: MessageEvent<any>) {
    console.log('Message received');
    console.log(event);
  }

  function handleReceiveChannelStatusChange(event: any) {
    if (receiveChannel) {
      console.log("Receive channel's status has changed to " + receiveChannel.readyState);
    }
  }

  function sendMessage() {
    const message = 'this is a message';
    sendChannel.send(message);
  }

  // Send data for testing
  if (file.outgoing) {
    setTimeout(function () {
      if (sendChannel.readyState === 'open') {
        sendChannel.send('Data sent from sender');
        console.log('Some data sent');
      } else {
        console.log('Tried to send a message');
        console.log(sendChannel);
      }
    }, 10000);
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
