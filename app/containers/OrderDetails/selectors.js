import { get } from "lodash";

export const shopifyDisplayId = (state) =>
  get(state, "orderDetails.shopifyDisplayId", "");
export const shopifyOrderDate = (state) =>
  get(state, "orderDetails.shopifyOrderDate", "");
export const status = (state) => get(state, "orderDetails.status", "");
export const syncedAt = (state) => get(state, "orderDetails.syncedAt", "");
export const storeDetails = (state) =>
  get(state, "orderDetails.storeDetails", {});

export const isLoading = (state) => get(state, "orderDetails.isLoading", "");
