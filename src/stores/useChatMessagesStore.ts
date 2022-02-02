import create from 'zustand';
import { ChatMessagesStoreModel } from '../types/storeModels';

const useChatMessageStore = create<ChatMessagesStoreModel>((set) => ({
  ChatMessages: [],
  addNewChatMessage: (newChatMessage) =>
    set((state) => ({ ChatMessages: state.ChatMessages.concat(newChatMessage) })),
}));

export default useChatMessageStore;
