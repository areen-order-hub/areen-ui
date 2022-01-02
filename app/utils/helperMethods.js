export const truncateText = (str, length = 30) => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};
