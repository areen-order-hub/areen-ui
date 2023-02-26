import { get } from "lodash";

export const shopifyDisplayId = (state) =>
  get(state, "orderDetails.shopifyDisplayId", "");
export const shopifyOrderDate = (state) =>
  get(state, "orderDetails.shopifyOrderDate", "");
export const syncedAt = (state) => get(state, "orderDetails.syncedAt", "");
export const storeDetails = (state) =>
  get(state, "orderDetails.storeDetails", {});
export const billingAddress = (state) =>
  get(state, "orderDetails.billingAddress", {});
export const shippingAddress = (state) =>
  get(state, "orderDetails.shippingAddress", {});
export const shopifyOrderItems = (state) =>
  get(state, "orderDetails.shopifyOrderItems", {});
export const shopifyPrice = (state) =>
  get(state, "orderDetails.shopifyPrice", "");
export const invoiceDetails = (state) =>
  get(state, "orderDetails.invoiceDetails", {});
export const financialStatus = (state) =>
  get(state, "orderDetails.financialStatus", "");
export const fulfillmentStatus = (state) =>
  get(state, "orderDetails.fulfillmentStatus", "");

export const isLoading = (state) => get(state, "orderDetails.isLoading", "");
