export const getChatCurrTime = () => {
  const date = new Date();
  const hourMinStr = `${date.getHours()}:${date.getMinutes()}`;
  return hourMinStr;
};
