import _get from "lodash/get";

export const stores = (state) => _get(state, "orders.stores", []);
export const orders = (state) => _get(state, "orders.orders", []);
export const carrierStatusOptions = (state) =>
  _get(state, "orders.carrierStatusOptions", []);
export const isExportLoading = (state) =>
  _get(state, "orders.isExportLoading", false);
export const ordersForExport = (state) =>
  _get(state, "orders.ordersForExport", []);
export const isShipmentGenerating = (state) =>
  _get(state, "orders.isShipmentGenerating", false);
export const paginationDetails = (state) =>
  _get(state, "orders.paginationDetails", {});
