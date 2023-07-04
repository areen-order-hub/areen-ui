import { get } from "lodash";

export const configId = (state) =>
  get(state, "emailNotifications.configId", "");
export const orderComments = (state) =>
  get(state, "emailNotifications.orderComments", []);
export const notDeliveredOrders = (state) =>
  get(state, "emailNotifications.notDeliveredOrders", []);
export const notInvoicedOrders = (state) =>
  get(state, "emailNotifications.notInvoicedOrders", []);
export const existingConfig = (state) =>
  get(state, "emailNotifications.existingConfig", {});

export const isLoading = (state) =>
  get(state, "emailNotifications.isLoading", false);
export const validations = (state) =>
  get(state, "emailNotifications.validationError", null);
