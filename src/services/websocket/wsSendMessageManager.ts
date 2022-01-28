import webSocket from '../../config/socketConfig';

// Replace any with message type
export const wsSendMessageManager = (messageObj: any) => {
  const messageJSON = JSON.stringify(messageObj);
  const ws = webSocket;

  if (ws.readyState === 1) {
    ws.send(messageJSON);
    console.log('sent');
  } else {
    console.log('ws readystate error');
  }
};
