import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { receiveChannelCallback } from '../services/RTC/RTCutils';
import wsSendMessageHandler from '../services/websocket/wsSendMessageManager';
import { MessageEnum } from '../types/mesageEnum';
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

    // Set Initial offer
    wsSendMessageHandler(RTCOfferMessage);

    // Send Transfer Accept message
    sendTransferAcceptMessage();
  };

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
