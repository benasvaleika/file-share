import { MessageEnum } from './mesageEnum';

export interface InitialMessageType {
  type: MessageEnum.INITIAL;
  userId: string;
  userLetter: string;
  roomIdSuggested: string;
}

export interface RoomIdMessageType {
  type: MessageEnum.ROOMID;
  roomId: string;
}
