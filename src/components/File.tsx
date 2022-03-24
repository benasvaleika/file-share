import React, { useEffect, useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import RTCTransferConnection from '../services/RTC/RTCservice';
import { TransferStatusEnum } from '../types/mesageEnum';
import { FileTransferType } from '../types/messageTypes';
import { Button } from './Button';

interface FileProps {
  file: FileTransferType;
  outgoing: boolean;
  onFileCancel: (fileId: string, fileDestinationId: string) => void;
  onFileReject: (fileId: string, fileSourceId: string) => void;
}

export const File: React.FC<FileProps> = ({ file, outgoing, onFileCancel, onFileReject }) => {
  const [sendProgress, setSendProgress] = useState(0);
  const [receiveProgress, setReceiveProgress] = useState(0);

  const RTCTransfer = new RTCTransferConnection(file);

  const transferAcceptHandler = async () => {
    RTCTransfer.createRTCConnection();
  };

  // Triggered by transfer accept handler
  useEffect(() => {
    if (file.outgoing && file.transferStatus === TransferStatusEnum.IN_PROGRESS) {
      console.log('Trying to send data');
      console.log(file.name, file.transferStatus);
      RTCTransfer.sendTransferData();
      updateSendProgress();
    }
    if (!file.outgoing && file.transferStatus === TransferStatusEnum.IN_PROGRESS) {
      updateReceiveProgress();
    }
  }, [file]);

  const updateSendProgress = () => {
    const newProgress = RTCTransfer.getSendProgress();
    if (newProgress < 100) {
      setSendProgress(newProgress);
      setTimeout(updateSendProgress, 50);
      console.log(file.transferStatus);
    } else {
      setSendProgress(newProgress);
    }
  };

  const updateReceiveProgress = () => {
    const newProgress = RTCTransfer.getReceiveProgress();
    if (newProgress < 100) {
      setReceiveProgress(newProgress);
      setTimeout(updateReceiveProgress, 50);
      console.log(file.transferStatus);
    } else {
      setReceiveProgress(newProgress);
    }
  };

  return (
    <div className="text-secondary-two ml-2 flex justify-between mt-4">
      <div className="flex items-center">
        <FaRegFileAlt size={34} className="hover:text-base ease-in-out duration-200" />
        <div className="ml-2 font-rhd text-xl font-bold text-white">{file.name}</div>
      </div>
      <div className="flex items-center mr-6">
        {outgoing ? (
          <>
            <div>{sendProgress}</div>
            <Button
              className="hover:bg-base"
              name="Cancel"
              onClick={() => onFileCancel(file.id, file.destinationId)}
            />
          </>
        ) : (
          <>
            <div>{receiveProgress}</div>
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
