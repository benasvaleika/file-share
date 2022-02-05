import { MessageEnum } from './mesageEnum';

export interface InitialMessageType {
  type: MessageEnum.INITIAL;
  userId: string;
  userLetter: string;
  roomIdSuggested: string;
}

export interface ChatMessageType {
  type: MessageEnum.CHAT_MESSAGE;
  date: string;
  msgContent: string;
}

export interface RoomIdMessageType {
  type: MessageEnum.ROOMID;
  roomId: string;
}

export interface RoomUserType {
  id: string;
  userLetter: string;
}

export interface CurrRoomUsersType {
  type: MessageEnum.CURR_ROOM_USERS;
  roomUsers: RoomUserType[];
}
