export const createConnection = async () => {
  const iceServers = [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ];

  const localConnection = new RTCPeerConnection({ iceServers });
  const remoteConnection = new RTCPeerConnection({ iceServers });
  const sendChannel = localConnection.createDataChannel('sendDataChannel');
  sendChannel.binaryType = 'arraybuffer';

  localConnection.addEventListener('icecandidate', async (event) => {
    console.log('Local ICE candidate: ', event.candidate);
    if (event.candidate) {
      await remoteConnection.addIceCandidate(event.candidate);
    }
  });

  remoteConnection.addEventListener('icecandidate', async (event) => {
    console.log('Remote ICE candidate: ', event.candidate);
    if (event.candidate) {
      await localConnection.addIceCandidate(event.candidate);
    }
  });

  const rtcOffer = localConnection.createOffer();
  localConnection.setLocalDescription(await rtcOffer);

  remoteConnection.setRemoteDescription(await rtcOffer);
  const rtcAnswer = remoteConnection.createAnswer();
  remoteConnection.setLocalDescription(await rtcAnswer);
  localConnection.setRemoteDescription(await rtcAnswer);

  console.log(sendChannel);
  console.log(localConnection);
  console.log(remoteConnection);
};
