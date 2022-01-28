export const getChatCurrTime = () => {
  const date = new Date();
  const hourMinStr = `${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  }`;
  return hourMinStr;
};
