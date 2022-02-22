import { ChatMessageType, FileType, RoomUserType } from './messageTypes';

export interface RoomIdStoreModel {
  roomId: string | null;
  setRoomId: (newRoomId: string) => void;
}

export interface UserLetterStoreModel {
  userLetter: string | null;
  setUserLetter: (newUserLetter: string) => void;
}

export interface RoomIdSuggestedStoreModel {
  roomIdSuggested: string | null;
  setRoomIdSuggested: (newRoomIdSuggested: string) => void;
}

export interface UserIdStoreModel {
  userId: string | null;
  setUserId: (newUserId: string) => void;
}

export interface WsConnectedStoreModel {
  wsConnected: boolean;
  setWsConnectedTrue: () => void;
  setWsConnectedFalse: () => void;
}

export interface ChatMessagesStoreModel {
  ChatMessages: ChatMessageType[];
  addNewChatMessage: (newChatMessage: ChatMessageType) => void;
}

export interface CurrRoomUsersStoreModel {
  CurrRoomUsers: RoomUserType[];
  setCurrRoomUsers: (currRoomUsers: RoomUserType[]) => void;
}

export interface FileTransStoreModel {
  FileTransfers: FileType[];
  addFileTransfer: (newFile: FileType) => void;
  removeFileTransfer: (fileId: string) => void;
  dropFileTransfer: (fileSourceId: string) => void;
}
