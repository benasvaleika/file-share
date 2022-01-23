import create from 'zustand';
import { WsConnectedStore } from '../types/storeModels';

const useWsConnectedStore = create<WsConnectedStore>((set) => ({
  wsConnected: false,
  setWsConnectedTrue: () => set(() => ({ wsConnected: true })),
  setWsConnectedFalse: () => set(() => ({ wsConnected: false })),
}));

export default useWsConnectedStore;
