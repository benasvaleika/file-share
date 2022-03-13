import { iceServers } from '../../utils/constants';

export const createConnection = async () => {
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
};
