import { MessageEnum } from '../../types/mesageEnum';
import {
  chatMessageHandler,
  currRoomUsersHandler,
  fileTransCancelMessageHandler,
  fileTransDropMessageHandler,
  fileTransMessageHandler,
  fileTransRejectMessageHandler,
  initialMessageHandler,
  RtcIceCandidateMessageHandler,
  rtcSdpAnswerMessageHandler,
  rtcSdpOfferMessageHandler,
} from './wsMessageHandlers';

export const wsMessageManager = (event: MessageEvent) => {
  const parsedMsg = JSON.parse(event.data);

  switch (parsedMsg.type) {
    case MessageEnum.INITIAL:
      initialMessageHandler(parsedMsg);
      break;
    case MessageEnum.CHAT_MESSAGE:
      chatMessageHandler(parsedMsg);
      break;
    case MessageEnum.CURR_ROOM_USERS:
      currRoomUsersHandler(parsedMsg);
      break;
    case MessageEnum.FILE_TRANS:
      fileTransMessageHandler(parsedMsg);
      break;
    case MessageEnum.FILE_TRANS_CANCEL:
      fileTransCancelMessageHandler(parsedMsg);
      break;
    case MessageEnum.FILE_TRANS_REJECT:
      fileTransRejectMessageHandler(parsedMsg);
      break;
    case MessageEnum.FILE_TRANS_DROP:
      fileTransDropMessageHandler(parsedMsg);
      break;
    case MessageEnum.RTC_SDP_OFFER:
      rtcSdpOfferMessageHandler(parsedMsg);
      break;
    case MessageEnum.RTC_SDP_ANSWER:
      rtcSdpAnswerMessageHandler(parsedMsg);
      break;
    case MessageEnum.RTC_ICE_CANDIDATE:
      RtcIceCandidateMessageHandler(parsedMsg);
      break;

    default:
      // Add default handling
      console.log('ws manager default reached');
  }
};
