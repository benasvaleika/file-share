import useChatMessageStore from '../../stores/useChatMessagesStore';
import useCurrRoomUsersStore from '../../stores/useCurrRoomUsersStore';
import useFileTransfersStore from '../../stores/useFileTransfersStore';
import useRoomIdSuggestedStore from '../../stores/useRoomIdSuggestedStore';
import useUserIdStore from '../../stores/useUserIdStore';
import useUserLetterStore from '../../stores/useUserLetter';
import { MessageEnum } from '../../types/mesageEnum';
import {
  ChatMessageType,
  CurrRoomUsersType,
  FileTransCancelMessageType,
  FileTransDropMessageType,
  FileTransMessageType,
  InitialMessageType,
  RtcIceCandidateMessageType,
  RtcSdpAnswerMessageType,
  RtcSdpOfferMessageType,
} from '../../types/messageTypes';
import { extendFileTransMessage } from '../../utils/filesUtils';
import wsSendMessageHandler from './wsSendMessageManager';

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

export const rtcSdpOfferMessageHandler = async (message: RtcSdpOfferMessageType) => {
  const fileTransfers = useFileTransfersStore.getState();
  const destFileTransfer = fileTransfers.FileTransfers.filter((f) => f.id === message.transferId);
  destFileTransfer[0].RTCconfig.setRemoteDescription(message.data);

  const RTCAnswer = destFileTransfer[0].RTCconfig.createAnswer();
  destFileTransfer[0].RTCconfig.setLocalDescription(await RTCAnswer);

  console.log(fileTransfers.FileTransfers);

  wsSendMessageHandler({
    type: MessageEnum.RTC_SDP_ANSWER,
    transferId: message.transferId,
    destinationId: message.sourceId,
    sourceId: message.destinationId,
    data: await RTCAnswer,
  } as RtcSdpAnswerMessageType);

  destFileTransfer[0].RTCconfig.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
      wsSendMessageHandler({
        type: MessageEnum.RTC_ICE_CANDIDATE,
        transferId: message.transferId,
        destinationId: message.sourceId,
        sourceId: message.destinationId,
        data: event.candidate,
      } as RtcIceCandidateMessageType);
    }
  });
};

export const rtcSdpAnswerMessageHandler = async (message: RtcSdpAnswerMessageType) => {
  const fileTransfers = useFileTransfersStore.getState();
  const destFileTransfer = fileTransfers.FileTransfers.filter((f) => f.id === message.transferId);

  destFileTransfer[0].RTCconfig.setRemoteDescription(message.data);

  destFileTransfer[0].RTCconfig.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
      wsSendMessageHandler({
        type: MessageEnum.RTC_ICE_CANDIDATE,
        transferId: message.transferId,
        destinationId: message.destinationId,
        sourceId: message.sourceId,
        data: event.candidate,
      } as RtcIceCandidateMessageType);
    }
  });

  console.log(fileTransfers);
};

export const RtcIceCandidateMessageHandler = async (message: RtcIceCandidateMessageType) => {
  const fileTransfers = useFileTransfersStore.getState();
  const destFileTransfer = fileTransfers.FileTransfers.filter((f) => f.id === message.transferId);

  await destFileTransfer[0].RTCconfig.addIceCandidate(message.data);
};
