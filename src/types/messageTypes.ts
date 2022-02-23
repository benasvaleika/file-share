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

export interface FileType {
  id: string;
  destinationId: string;
  sourceId: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  outgoing: boolean;
}

export interface FileTransMessageType {
  type: MessageEnum.FILE_TRANS;
  files: FileType[];
}

export interface FileTransCancelMessageType {
  type: MessageEnum.FILE_TRANS_CANCEL;
  fileId: string;
  fileDestinationId: string;
}

export interface FileTransRejectMessageType {
  type: MessageEnum.FILE_TRANS_REJECT;
  fileId: string;
  fileSourceId: string;
}

export interface FileTransDropMessageType {
  type: MessageEnum.FILE_TRANS_DROP;
  fileSourceId: string;
}

// TODO confirm SDP message type
export interface RtcSdpOfferMessageType {
  type: MessageEnum.RTC_SDP_OFFER;
  sourceId: 'string';
  destinationId: 'string';
  sdpData: any;
}

export interface RtcSdpAnswerMessageType {
  type: MessageEnum.RTC_SDP_ANSWER;
  sourceId: 'string';
  destinationId: 'string';
  sdpData: any;
}
