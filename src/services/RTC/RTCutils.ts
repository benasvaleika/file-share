import useFileTransfersStore from '../../stores/useFileTransfersStore';
import { TransferStatusEnum } from '../../types/mesageEnum';
import { FileTransferType } from '../../types/messageTypes';
import { ACCEPT_MSG_RETRY_INTERVAL } from '../../utils/constants';
import { generateTransferAcceptMessage } from '../../utils/filesUtils';
import wsSendMessageHandler from '../websocket/wsSendMessageManager';

const fileTransferStore = useFileTransfersStore.getState();

export function sendTransferAcceptMessage(testFile: FileTransferType) {
  if (testFile.RTCconfig.connectionState !== 'connected') {
    console.log('retrying');
    console.log(testFile.RTCconfig.connectionState);
    setTimeout(function () {
      sendTransferAcceptMessage(testFile);
    }, ACCEPT_MSG_RETRY_INTERVAL);
  } else {
    wsSendMessageHandler(generateTransferAcceptMessage(testFile));
    fileTransferStore.changeTransferStatus(testFile.id, TransferStatusEnum.IN_PROGRESS);
    console.log('accept message sent to the server', testFile.id);
  }
}
