export interface RoomIdStoreModel {
  roomId: string | null;
  setRoomId: (newRoomId: string) => void;
}

export interface UserLetterModel {
  userLetter: string | null;
  setUserLetter: (newUserLetter: string) => void;
}

export interface RoomIdSuggestedModel {
  roomIdSuggested: string | null;
  setRoomIdSuggested: (newRoomIdSuggested: string) => void;
}

export interface UserIdModel {
  userId: string | null;
  setUserId: (newUserId: string) => void;
}

export interface WsConnectedStore {
  wsConnected: boolean;
  setWsConnectedTrue: () => void;
  setWsConnectedFalse: () => void;
}
