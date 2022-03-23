import create from 'zustand';
import { FileTransStoreModel } from '../types/storeModels';

const useFileTransfersStore = create<FileTransStoreModel>((set) => ({
  FileTransfers: [],
  addFileTransfer: (newFile) =>
    set((state) => ({ FileTransfers: state.FileTransfers.concat(newFile) })),
  removeFileTransfer: (fileId) =>
    set((state) => ({ FileTransfers: state.FileTransfers.filter((f) => f.id !== fileId) })),
  dropFileTransfer: (fileSourceId) =>
    set((state) => ({
      FileTransfers: state.FileTransfers.filter((f) => f.sourceId !== fileSourceId),
    })),
  changeTransferStatus: (transferId, newStatus) =>
    set((state) => ({
      FileTransfers: state.FileTransfers.map((trans) => {
        if (trans.id === transferId) {
          return {
            ...trans,
            transferStatus: newStatus,
          };
        } else {
          return trans;
        }
      }),
    })),
  setProgress: (transferId, progress) =>
    set((state) => ({
      FileTransfers: state.FileTransfers.map((trans) => {
        if (trans.id === transferId) {
          return {
            ...trans,
            progress: progress,
          };
        } else {
          return trans;
        }
      }),
    })),
}));

export default useFileTransfersStore;
