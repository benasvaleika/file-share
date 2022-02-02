import create from 'zustand';
import { UserIdStoreModel } from '../types/storeModels';

const useUserIdStore = create<UserIdStoreModel>((set) => ({
  userId: null,
  setUserId: (newUserId: string) => set(() => ({ userId: newUserId })),
}));

export default useUserIdStore;
