import create from 'zustand';
import { FileStoreModel } from '../types/storeModels';

const useFileStore = create<FileStoreModel>((set) => ({
  Files: [],
  addFile: (newFile) => set((state) => ({ Files: state.Files.concat(newFile) })),
  removeFile: (fileId) => set((state) => ({ Files: state.Files.filter((f) => f.id !== fileId) })),
}));

export default useFileStore;
