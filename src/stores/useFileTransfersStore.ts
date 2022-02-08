import create from 'zustand';
import { FileTransStoreModel } from '../types/storeModels';

const useFileStore = create<FileTransStoreModel>((set) => ({
  Files: [],
  addFile: (newFile) => set((state) => ({ Files: state.Files.concat(newFile) })),
  removeFile: (fileId) => set((state) => ({ Files: state.Files.filter((f) => f.id !== fileId) })),
}));

export default useFileStore;
