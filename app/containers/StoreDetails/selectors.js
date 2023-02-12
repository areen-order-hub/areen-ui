import { get } from "lodash";

export const name = (state) => get(state, "storeDetails.name", "");
export const alias = (state) => get(state, "storeDetails.alias", "");
export const shopifyURL = (state) => get(state, "storeDetails.shopifyURL", "");
export const createdAt = (state) => get(state, "storeDetails.createdAt", "");
export const isActive = (state) => get(state, "storeDetails.isActive", false);

export const isLoading = (state) => get(state, "storeDetails.isLoading", "");
