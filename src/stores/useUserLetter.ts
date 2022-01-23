import create from 'zustand';
import { UserLetterModel } from '../types/storeModels';

const useUserLetterStore = create<UserLetterModel>((set) => ({
  userLetter: null,
  setUserLetter: (newUserLetter: string) => set(() => ({ userLetter: newUserLetter })),
}));

export default useUserLetterStore;
