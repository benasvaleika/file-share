export const generateNewRoomId = (roomIdlen: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let newRoomId = '';
  for (let i = 0; i < roomIdlen; i++) {
    newRoomId = newRoomId + chars[Math.floor(Math.random() * chars.length)];
  }
  return newRoomId;
};
