import useChatMessageStore from '../../stores/useChatMessagesStore';
import useCurrRoomUsersStore from '../../stores/useCurrRoomUsersStore';
import useFileTransfersStore from '../../stores/useFileTransfersStore';
import useRoomIdSuggestedStore from '../../stores/useRoomIdSuggestedStore';
import useUserIdStore from '../../stores/useUserIdStore';
import useUserLetterStore from '../../stores/useUserLetter';
import {
  ChatMessageType,
  CurrRoomUsersType,
  FileTransCancelMessageType,
  FileTransDropMessageType,
  FileTransMessageType,
  InitialMessageType,
} from '../../types/messageTypes';
import { extendFileTransMessage } from '../../utils/filesUtils';

const userId = useUserIdStore.getState();
const userLetter = useUserLetterStore.getState();
const roomIdSuggested = useRoomIdSuggestedStore.getState();
const chatMessage = useChatMessageStore.getState();
const currRoomUsers = useCurrRoomUsersStore.getState();
const fileTransfers = useFileTransfersStore.getState();

export const initialMessageHandler = (message: InitialMessageType): void => {
  userLetter.setUserLetter(message.userLetter);
  roomIdSuggested.setRoomIdSuggested(message.roomIdSuggested);
  userId.setUserId(message.userId);
};

export const chatMessageHandler = (message: ChatMessageType): void => {
  chatMessage.addNewChatMessage(message);
};

export const currRoomUsersHandler = (message: CurrRoomUsersType): void => {
  currRoomUsers.setCurrRoomUsers(message.roomUsers);
};

export const fileTransMessageHandler = (message: FileTransMessageType): void => {
  message.files.forEach((f) => {
    const fileTransfer = extendFileTransMessage(f);
    fileTransfers.addFileTransfer(fileTransfer);
  });
};

export const fileTransCancelMessageHandler = (message: FileTransCancelMessageType): void => {
  fileTransfers.removeFileTransfer(message.fileId);
};

export const fileTransRejectMessageHandler = (message: FileTransCancelMessageType): void => {
  fileTransfers.removeFileTransfer(message.fileId);
};

export const fileTransDropMessageHandler = (message: FileTransDropMessageType): void => {
  fileTransfers.dropFileTransfer(message.fileSourceId);
};
