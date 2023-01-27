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
export const carrierService = (state) =>
  get(state, "orderDetails.carrierService", "");
export const carrierStatus = (state) =>
  get(state, "orderDetails.carrierStatus", "");
export const carrierServiceId = (state) =>
  get(state, "orderDetails.carrierServiceId", "");
export const weight = (state) => get(state, "orderDetails.weight", 0);
export const paymentMode = (state) =>
  get(state, "orderDetails.paymentMode", "");
export const comments = (state) => get(state, "orderDetails.comments", []);

export const isLoading = (state) => get(state, "orderDetails.isLoading", "");
