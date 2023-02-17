export const getStoreFilter = (stores = []) => {
  return stores.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));
};

export const getPaymentFilter = () => {
  return [
    {
      value: "paid",
      label: "Paid",
    },
    {
      value: "pending",
      label: "Pending",
    },
  ];
};

export const getFulfillmentFilter = () => {
  return [
    {
      value: "fulfilled",
      label: "Fulfilled",
    },
    {
      value: "unfulfilled",
      label: "Unfulfilled",
    },
  ];
};
