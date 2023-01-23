import _get from "lodash/get";

export const stores = (state) => _get(state, "orders.stores", []);
export const orders = (state) => _get(state, "orders.orders", []);
export const isShipmentGenerating = (state) =>
  _get(state, "orders.isShipmentGenerating", false);
export const paginationDetails = (state) =>
  _get(state, "orders.paginationDetails", {});
