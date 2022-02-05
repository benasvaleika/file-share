import create from 'zustand';
import { CurrRoomUsersStoreModel } from '../types/storeModels';

const useCurrRoomUsersStore = create<CurrRoomUsersStoreModel>((set) => ({
  CurrRoomUsers: [],
  setCurrRoomUsers: (currRoomUsers) => set(() => ({ CurrRoomUsers: currRoomUsers })),
}));

export default useCurrRoomUsersStore;
