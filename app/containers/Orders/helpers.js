export const getStoreFilter = (stores = []) => {
  return stores.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));
};
