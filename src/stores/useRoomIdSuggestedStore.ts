import create from 'zustand';
import { RoomIdSuggestedModel } from '../types/storeModels';

const useRoomIdSuggestedStore = create<RoomIdSuggestedModel>((set) => ({
  roomIdSuggested: null,
  setRoomIdSuggested: (newRoomIdSuggested: string) =>
    set(() => ({ roomIdSuggested: newRoomIdSuggested })),
}));

export default useRoomIdSuggestedStore;
