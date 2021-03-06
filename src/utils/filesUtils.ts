import {
  FileMessageType,
  FileTransAcceptMessageType,
  FileTransferType,
} from '../types/messageTypes';
import { v4 as uuidv4 } from 'uuid';
import useUserIdStore from '../stores/useUserIdStore';
import { iceServers } from './constants';
import { MessageEnum, TransferStatusEnum } from '../types/mesageEnum';
import useFileTransfersStore from '../stores/useFileTransfersStore';

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
        file: e.target.files[i],
        RTCconfig: new RTCPeerConnection({ iceServers }),
        transferStatus: TransferStatusEnum.PENDING,
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
    // Might be unecessary
    file: null,
    outgoing: false,
    RTCconfig: new RTCPeerConnection({ iceServers }),
    transferStatus: TransferStatusEnum.PENDING,
  };
  return fileTransfer;
};

export const generateTransferAcceptMessage = (file: FileTransferType) => {
  return {
    type: MessageEnum.FILE_TRANS_ACCEPT,
    transferId: file.id,
    sourceId: file.destinationId,
    destinationId: file.sourceId,
  } as FileTransAcceptMessageType;
};

export const getFileTransferStatus = (fileId: string) => {
  const fileTransfers = useFileTransfersStore.getState();
  const destFileTransfer = fileTransfers.FileTransfers.filter((f) => f.id === fileId);

  return destFileTransfer[0].transferStatus;
};

export const createShorterFileName = (fileName: string) => {
  const sliceStart = fileName.slice(0, 10);
  const sliceEnd = fileName.slice(fileName.length - 10);
  return sliceStart + '...' + sliceEnd;
};
