let receiveChannel: any;

export function receiveChannelCallback(event: RTCDataChannelEvent) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleReceiveMessage;
  receiveChannel.onopen = handleReceiveChannelStatusChange(event);
  receiveChannel.onclose = handleReceiveChannelStatusChange(event);
}

export function handleReceiveMessage(event: MessageEvent<any>) {
  console.log('Message received');
  console.log(event);
}

export function handleReceiveChannelStatusChange(event: any) {
  if (receiveChannel) {
    // console.log("Receive channel's status has changed to " + receiveChannel.readyState);
  }
}
