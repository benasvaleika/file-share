import create from 'zustand';
import { RoomIdSuggestedStoreModel } from '../types/storeModels';

const useRoomIdSuggestedStore = create<RoomIdSuggestedStoreModel>((set) => ({
  roomIdSuggested: null,
  setRoomIdSuggested: (newRoomIdSuggested: string) =>
    set(() => ({ roomIdSuggested: newRoomIdSuggested })),
}));

export default useRoomIdSuggestedStore;
