import { get } from "lodash";

export const shopifyOrderName = (state) =>
  get(state, "orderDetails.shopifyOrderName", "");
export const shopifyOrderDate = (state) =>
  get(state, "orderDetails.shopifyOrderDate", "");
export const syncedAt = (state) => get(state, "orderDetails.syncedAt", "");
export const storeDetails = (state) =>
  get(state, "orderDetails.storeDetails", {});
export const billingAddress = (state) =>
  get(state, "orderDetails.billingAddress", {});
export const shippingAddress = (state) =>
  get(state, "orderDetails.shippingAddress", {});
export const contactEmail = (state) =>
  get(state, "orderDetails.contactEmail", "");
export const shopifyOrderItems = (state) =>
  get(state, "orderDetails.shopifyOrderItems", {});
export const finalDisplayItems = (state) =>
  get(state, "orderDetails.finalDisplayItems", {});
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
export const carrierTrackingLink = (state) =>
  get(state, "orderDetails.carrierTrackingLink", "");
export const assignedDeliveryPartner = (state) =>
  get(state, "orderDetails.assignedDeliveryPartner", {});
export const weight = (state) => get(state, "orderDetails.weight", 0);
export const lastScannedTimeStamp = (state) =>
  get(state, "orderDetails.lastScannedTimeStamp", "");
export const paymentMode = (state) =>
  get(state, "orderDetails.paymentMode", "");
export const bulkStoreName = (state) =>
  get(state, "orderDetails.bulkStoreName", "");
export const comments = (state) => get(state, "orderDetails.comments", []);
export const isSaleOrderCreated = (state) =>
  get(state, "orderDetails.isSaleOrderCreated", false);
export const saleOrderComments = (state) =>
  get(state, "orderDetails.saleOrderComments", null);

export const isLoading = (state) => get(state, "orderDetails.isLoading", "");
export const isShipmentCancelling = (state) =>
  get(state, "orderDetails.isShipmentCancelling", false);
