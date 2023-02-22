import { isEmpty, some } from "lodash";

export const getStoreFilter = (selectedStores = [], stores = []) => {
  const defaultOption = [{ value: undefined, label: "All" }];
  const storeOptions = stores.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  if (isEmpty(selectedStores)) {
    return defaultOption.concat(storeOptions);
  }

  if (some(selectedStores, { value: undefined })) {
    return [];
  }

  return storeOptions;
};
