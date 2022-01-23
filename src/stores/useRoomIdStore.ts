import create from 'zustand';
import { RoomIdStoreModel } from '../types/storeModels';

const useRoomIdStore = create<RoomIdStoreModel>((set) => ({
  roomId: null,
  setRoomId: (newRoomId: string) => set(() => ({ roomId: newRoomId })),
}));

export default useRoomIdStore;
