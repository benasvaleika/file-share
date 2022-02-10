import create from 'zustand';
import { FileTransStoreModel } from '../types/storeModels';

const useFileTransfersStore = create<FileTransStoreModel>((set) => ({
  FileTransfers: [],
  addFileTransfer: (newFile) =>
    set((state) => ({ FileTransfers: state.FileTransfers.concat(newFile) })),
  removeFileTransfer: (fileId) =>
    set((state) => ({ FileTransfers: state.FileTransfers.filter((f) => f.id !== fileId) })),
}));

export default useFileTransfersStore;
