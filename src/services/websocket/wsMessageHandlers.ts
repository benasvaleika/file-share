import useChatMessageStore from '../../stores/useChatMessagesStore';
import useCurrRoomUsersStore from '../../stores/useCurrRoomUsersStore';
import useFileTransfersStore from '../../stores/useFileTransfersStore';
import useRoomIdSuggestedStore from '../../stores/useRoomIdSuggestedStore';
import useUserIdStore from '../../stores/useUserIdStore';
import useUserLetterStore from '../../stores/useUserLetter';
import {
  ChatMessageType,
  CurrRoomUsersType,
  FileTransMessageType,
  InitialMessageType,
} from '../../types/messageTypes';

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
    f.outgoing = false;
    fileTransfers.addFileTransfer(f);
  });
};
