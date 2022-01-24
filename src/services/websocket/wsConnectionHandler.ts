import useWsConnectedStore from '../../stores/useWsConnectedStore';

const wsConnected = useWsConnectedStore.getState();

export const wsOpenHandler = (ws: WebSocket) => {
  if (ws.readyState === ws.OPEN) {
    wsConnected.setWsConnectedTrue();
  }
  // TODO: Add error handling
};

export const wsCloseHandler = (ws: WebSocket) => {
  if (ws.readyState !== ws.OPEN) {
    wsConnected.setWsConnectedFalse();
  }
  // TODO: Check for exceptions
};
