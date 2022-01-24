import { MessageEnum } from '../../types/mesageEnum';
import { initialMessageHandler } from './wsMessageHandlers';

// replace any with a message type
export const wsMessageManager = (event: MessageEvent) => {
  const parsedMsg = JSON.parse(event.data);
  switch (parsedMsg.type) {
    case MessageEnum.INITIAL:
      initialMessageHandler(parsedMsg);
      break;
  }
};
