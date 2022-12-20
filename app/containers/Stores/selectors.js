import _get from "lodash/get";

export const isLoading = (state) => _get(state, "stores.isLoading", true);

export const stores = (state) => _get(state, "stores.stores", []);
