import webSocket from '../../config/socketConfig';

// Replace any with message type
const wsSendMessageHandler = (messageObj: any) => {
  const messageJSON = JSON.stringify(messageObj);
  const ws = webSocket;

  if (ws.readyState === 1) {
    ws.send(messageJSON);
  } else {
    console.log('ws readystate error');
  }
};

export default wsSendMessageHandler;
