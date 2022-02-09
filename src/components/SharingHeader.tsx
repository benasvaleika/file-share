import React from 'react';
import wsSendMessageHandler from '../services/websocket/wsSendMessageManager';
import useCurrRoomUsersStore from '../stores/useCurrRoomUsersStore';
import useFileStore from '../stores/useFileTransfersStore';
import useUserIdStore from '../stores/useUserIdStore';
import useUserLetterStore from '../stores/useUserLetter';
import { parseInputFiles } from '../utils/filesUtils';
import { MessageEnum } from '../types/mesageEnum';
import { FileTransMessageType } from '../types/messageTypes';
import { Line } from './Line';
import { UserIcon } from './UserIcon';

interface SharingHeaderProps {}

export const SharingHeader: React.FC<SharingHeaderProps> = () => {
  const userId = useUserIdStore((store) => store.userId);
  const userLetter = useUserLetterStore((store) => store.userLetter);
  const currRoomUsers = useCurrRoomUsersStore((state) => state.CurrRoomUsers).filter(
    (u) => u.id !== userId
  );
  const addFile = useFileStore((state) => state.addFileTransfer);

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    e.preventDefault();
    const parsedFiles = parseInputFiles(e, userId);
    wsSendMessageHandler({
      type: MessageEnum.FILE_TRANS,
      files: parsedFiles,
    } as FileTransMessageType);
    parsedFiles.forEach((f) => addFile(f));
  };

  return (
    <>
      {currRoomUsers.length > 0 ? (
        <>
          <div className="text-secondary-two text-xl font-rhd font-bold ml-2 mt-1">
            Click on a user, to share files with that user directly:
          </div>
          <div className="flex ml-2 my-2">
            {userId && userLetter && (
              <UserIcon isCurrUser key={userId} userId={userId} name={userLetter} />
            )}
            {currRoomUsers.map((usr) => {
              return (
                <UserIcon
                  isCurrUser={false}
                  key={usr.id}
                  userId={usr.id}
                  name={usr.userLetter}
                  fileUploadHandler={(e, userId) => fileUploadHandler(e, userId)}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-secondary-two font-rhd text-xl font-bold ml-2 mt-1">
          This room is empty. Share your room code or URL for others to join.
        </div>
      )}
      <Line />
    </>
  );
};
