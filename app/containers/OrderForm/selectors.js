import { get } from "lodash";

export const bulkStoreAlias = (state) =>
  get(state, "orderForm.bulkStoreAlias", "");
export const bulkStoreName = (state) =>
  get(state, "orderForm.bulkStoreName", "");
export const customerName = (state) => get(state, "orderForm.customerName", "");
export const paymentMode = (state) =>
  get(state, "orderForm.paymentMode", "COD");
export const shopifyOrderDate = (state) =>
  get(state, "orderForm.shopifyOrderDate", "");
export const shopifyOrderName = (state) =>
  get(state, "orderForm.shopifyOrderName", "");
export const shopifyPrice = (state) => get(state, "orderForm.shopifyPrice", "");
export const weight = (state) => get(state, "orderForm.weight", 0);
export const billingAddress = (state) =>
  get(state, "orderForm.billingAddress", {});
export const shippingAddress = (state) =>
  get(state, "orderForm.shippingAddress", {});
export const shopifyOrderItems = (state) =>
  get(state, "orderForm.shopifyOrderItems", []);

export const isLoading = (state) => get(state, "orderForm.isLoading", "");
export const errorMessage = (state) => get(state, "orderForm.errorMessage", "");
export const validations = (state) =>
  get(state, "orderForm.validationError", "");
