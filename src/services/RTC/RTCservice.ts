import useFileTransfersStore from '../../stores/useFileTransfersStore';
import { MessageEnum, TransferStatusEnum } from '../../types/mesageEnum';
import { FileTransferType, RtcSdpOfferMessageType } from '../../types/messageTypes';
import { ACCEPT_MSG_RETRY_INTERVAL } from '../../utils/constants';
import wsSendMessageHandler from '../websocket/wsSendMessageManager';
import { sendTransferAcceptMessage } from './RTCutils';

class RTCTransferConnection {
  file: FileTransferType;

  receiveBuffer: any = [];
  sendOffset = 0;
  receivedSize = 0;

  receiveChannel: any;
  sendChannel: RTCDataChannel;

  fileTransferStore = useFileTransfersStore.getState();

  constructor(file: FileTransferType) {
    // Define file object
    this.file = file;
    // Define sendChannel
    this.sendChannel = this.file.RTCconfig.createDataChannel('sendDataChannel');
    this.sendChannel.binaryType = 'arraybuffer';

    // Bind receiveChannel callback
    if (!this.file.outgoing) {
      this.file.RTCconfig.ondatachannel = this.receiveChannelCallback.bind(this);
    }
  }

  // Getter for sent data progress
  getSendProgress() {
    return Math.round(this.calculateTransferProgress(this.sendOffset));
  }

  getReceiveProgress() {
    return Math.round(this.calculateTransferProgress(this.receivedSize));
  }

  // Creates initial RTC connection between two peers
  async createRTCConnection() {
    console.log('Creating RTC connection');

    // Create initial offer
    const RTCOffer = this.file.RTCconfig.createOffer();
    this.file.RTCconfig.setLocalDescription(await RTCOffer);

    // Initial offer message
    const RTCOfferMessage = {
      type: MessageEnum.RTC_SDP_OFFER,
      transferId: this.file.id,
      destinationId: this.file.sourceId,
      sourceId: this.file.destinationId,
      data: await RTCOffer,
    } as RtcSdpOfferMessageType;

    // Set Initial offer
    wsSendMessageHandler(RTCOfferMessage);

    // // Send Transfer Accept message
    sendTransferAcceptMessage(this.file);
  }

  // Sends data to the other peer
  sendTransferData() {
    console.log(this.sendChannel.readyState);
    if (this.sendChannel.readyState !== 'open') {
      console.log('retrying');
      console.log(this.file.RTCconfig.connectionState);
      setTimeout(this.sendTransferData.bind(this), ACCEPT_MSG_RETRY_INTERVAL);
    } else {
      const chunkSize = 16384;
      const fileReader = new FileReader();
      this.sendOffset = 0;

      fileReader.addEventListener('error', (error) => console.error('Error reading file:', error));
      fileReader.addEventListener('abort', (event) => console.log('File reading aborted:', event));
      fileReader.addEventListener('load', (e) => {
        if (e.target?.result) {
          // console.log('FileRead.onload ', e);
          this.sendChannel.send(e.target.result as ArrayBuffer);
          this.sendOffset += chunkSize;
          if (this.sendOffset === this.file.size) {
            useFileTransfersStore
              .getState()
              .changeTransferStatus(this.file.id, TransferStatusEnum.COMPLETE);
          }
          if (this.sendOffset < this.file.size) {
            readSlice(this.sendOffset);
          }
        }
      });
      const readSlice = (o: any) => {
        if (this.file.file) {
          const slice = this.file.file.slice(this.sendOffset, o + chunkSize);
          fileReader.readAsArrayBuffer(slice);
        }
      };
      readSlice(0);
    }
  }

  // Handles receiveChannel message/status events
  receiveChannelCallback(event: RTCDataChannelEvent) {
    console.log('this insider callback');
    this.receiveChannel = event.channel;
    this.receiveChannel.onmessage = this.handleReceiveMessage.bind(this);
    this.receiveChannel.onopen = this.handleReceiveChannelStatusChange.bind(this);
    this.receiveChannel.onclose = this.handleReceiveChannelStatusChange.bind(this);
  }

  // Handles received message (receiveChannel)
  handleReceiveMessage(event: MessageEvent<any>) {
    console.log('Message received');
    console.log(event);
    this.receiveBuffer.push(event.data);
    this.receivedSize += event.data.byteLength;

    if (this.receivedSize === this.file.size) {
      console.log('Transfer complete');
      const received = new Blob(this.receiveBuffer);
      this.receiveBuffer = [];

      // Automatic file download after successful file transfer
      const url = URL.createObjectURL(received);
      console.log(url);

      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', this.file.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  }

  // Handles receiveChannel status change
  handleReceiveChannelStatusChange(event: any) {
    if (this.receiveChannel) {
      console.log("Receive channel's status has changed to " + this.receiveChannel.readyState);
    }
  }

  // Calculates percentage of trensfer progress
  calculateTransferProgress(bytesProcessed: number) {
    return (100 / this.file.size) * bytesProcessed;
  }
}

export default RTCTransferConnection;
function changeTransferStatus(id: any, IN_PROGRESS: any) {
  throw new Error('Function not implemented.');
}
