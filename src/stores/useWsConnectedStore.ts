import create from 'zustand';
import { WsConnectedStoreModel } from '../types/storeModels';

const useWsConnectedStore = create<WsConnectedStoreModel>((set) => ({
  wsConnected: false,
  setWsConnectedTrue: () => set(() => ({ wsConnected: true })),
  setWsConnectedFalse: () => set(() => ({ wsConnected: false })),
}));

export default useWsConnectedStore;
