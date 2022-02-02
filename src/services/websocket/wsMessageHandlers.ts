import useChatMessageStore from '../../stores/useChatMessagesStore';
import useRoomIdSuggestedStore from '../../stores/useRoomIdSuggestedStore';
import useUserIdStore from '../../stores/useUserIdStore';
import useUserLetterStore from '../../stores/useUserLetter';
import { ChatMessageType, InitialMessageType } from '../../types/messageTypes';

const userId = useUserIdStore.getState();
const userLetter = useUserLetterStore.getState();
const roomIdSuggested = useRoomIdSuggestedStore.getState();
const chatMessage = useChatMessageStore.getState();

export const initialMessageHandler = (message: InitialMessageType): void => {
  userLetter.setUserLetter(message.userLetter);
  roomIdSuggested.setRoomIdSuggested(message.roomIdSuggested);
  userId.setUserId(message.userId);
};

export const chatMessageHandler = (message: ChatMessageType): void => {
  chatMessage.addNewChatMessage(message);
};
