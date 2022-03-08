import { FileMessageType, FileTransferType } from '../types/messageTypes';
import { v4 as uuidv4 } from 'uuid';
import useUserIdStore from '../stores/useUserIdStore';

export const createFileTransObject = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
  const parsedFiles: FileTransferType[] = [];
  if (e.target.files) {
    for (let i = 0; i < e.target.files.length; i++) {
      parsedFiles.push({
        id: uuidv4(),
        destinationId: userId,
        sourceId: useUserIdStore.getState().userId,
        name: e.target.files[i].name,
        size: e.target.files[i].size,
        type: e.target.files[i].type,
        lastModified: e.target.files[i].lastModified,
        outgoing: true,
        RTCconfig: new RTCPeerConnection(),
      } as FileTransferType);
    }
  }
  return parsedFiles;
};

export const createFileTransMessageObj = (
  e: React.ChangeEvent<HTMLInputElement>,
  userId: string,
  fileTransObj: FileTransferType[]
) => {
  const parsedFiles: FileMessageType[] = [];
  if (e.target.files) {
    for (let i = 0; i < e.target.files.length; i++) {
      parsedFiles.push({
        id: fileTransObj[i].id,
        destinationId: fileTransObj[i].destinationId,
        sourceId: fileTransObj[i].sourceId,
        name: fileTransObj[i].name,
        size: fileTransObj[i].size,
        type: fileTransObj[i].type,
        lastModified: fileTransObj[i].lastModified,
        outgoing: fileTransObj[i].outgoing,
      } as FileMessageType);
    }
  }
  return parsedFiles;
};

export const extendFileTransMessage = (msgObj: FileMessageType) => {
  const fileTransfer: FileTransferType = {
    id: msgObj.id,
    destinationId: msgObj.destinationId,
    sourceId: msgObj.sourceId,
    name: msgObj.name,
    size: msgObj.size,
    type: msgObj.type,
    lastModified: msgObj.lastModified,
    outgoing: false,
    RTCconfig: new RTCPeerConnection(),
  };
  return fileTransfer;
};
