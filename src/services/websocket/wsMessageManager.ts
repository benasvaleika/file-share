import { MessageEnum } from '../../types/mesageEnum';
import { chatMessageHandler, initialMessageHandler } from './wsMessageHandlers';

export const wsMessageManager = (event: MessageEvent) => {
  const parsedMsg = JSON.parse(event.data);

  switch (parsedMsg.type) {
    case MessageEnum.INITIAL:
      initialMessageHandler(parsedMsg);
      break;
    case MessageEnum.CHAT_MESSAGE:
      chatMessageHandler(parsedMsg);
      break;
    default:
      // Add default handling
      console.log('ws manager default reached');
  }
};
