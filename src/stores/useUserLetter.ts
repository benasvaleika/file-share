import create from 'zustand';
import { UserLetterStoreModel } from '../types/storeModels';

const useUserLetterStore = create<UserLetterStoreModel>((set) => ({
  userLetter: null,
  setUserLetter: (newUserLetter: string) => set(() => ({ userLetter: newUserLetter })),
}));

export default useUserLetterStore;
