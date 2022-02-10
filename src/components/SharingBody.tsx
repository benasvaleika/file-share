import React from 'react';
import { FaPlus } from 'react-icons/fa';
import wsSendMessageHandler from '../services/websocket/wsSendMessageManager';
import useFileTransfersStore from '../stores/useFileTransfersStore';
import { MessageEnum } from '../types/mesageEnum';
import { FileTransCancelMessageType, FileTransRejectMessageType } from '../types/messageTypes';
import { File } from './File';

interface SharingBodyProps {}

export const SharingBody: React.FC<SharingBodyProps> = () => {
  const fileTransfers = useFileTransfersStore((state) => state.FileTransfers);
  const removeFileTransfer = useFileTransfersStore((state) => state.removeFileTransfer);

  const fileCancelHandler = (fileId: string, fileDestinationId: string) => {
    wsSendMessageHandler({
      type: MessageEnum.FILE_TRANS_CANCEL,
      fileId: fileId,
      fileDestinationId: fileDestinationId,
    } as FileTransCancelMessageType);
    removeFileTransfer(fileId);
  };

  const fileRejectHandler = (fileId: string, fileSourceId: string) => {
    wsSendMessageHandler({
      type: MessageEnum.FILE_TRANS_REJECT,
      fileId: fileId,
      fileSourceId: fileSourceId,
    } as FileTransRejectMessageType);
    removeFileTransfer(fileId);
  };

  return (
    <>
      {fileTransfers.length > 0 ? (
        <div>
          {fileTransfers.map((f) => {
            return (
              <File
                key={f.id}
                outgoing={f.outgoing}
                file={f}
                onFileCancel={(fileId, fileDestinationId) =>
                  fileCancelHandler(fileId, fileDestinationId)
                }
                onFileReject={(fileId, fileSourceId) => fileRejectHandler(fileId, fileSourceId)}
              />
            );
          })}
        </div>
      ) : (
        <div className=" w-[calc(100%-1rem)] ml-2 h-[calc(100%-7rem)] ">
          <div className="flex h-full justify-center items-center flex-col">
            <FaPlus
              size={100}
              className="text-secondary-one hover:text-secondary-two ease-in-out duration-200"
            />
            <div className="text-secondary-two font-rhd font-bold text-lg -mb-1">Add new files</div>
            <div className="text-secondary-two font-rhd font-bold">
              (Or press on a user icon directly to share files)
            </div>
          </div>
        </div>
      )}
    </>
  );
};
