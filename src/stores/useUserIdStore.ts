import create from 'zustand';
import { UserIdModel } from '../types/storeModels';

const useUserIdStore = create<UserIdModel>((set) => ({
  userId: null,
  setUserId: (newUserId: string) => set(() => ({ userId: newUserId })),
}));

export default useUserIdStore;
