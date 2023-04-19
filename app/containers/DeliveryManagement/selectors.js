import _get from "lodash/get";

export const orders = (state) => _get(state, "deliveryManagement.orders", []);
export const paginationDetails = (state) =>
  _get(state, "deliveryManagement.paginationDetails", {});
