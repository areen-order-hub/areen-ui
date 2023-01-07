import { get } from "lodash";

export const name = (state) => get(state, "storeForm.name", "");
export const alias = (state) => get(state, "storeForm.alias", "");
export const shopifyURL = (state) => get(state, "storeForm.shopifyURL", "");
export const apiAccessToken = (state) =>
  get(state, "storeForm.apiAccessToken", "");

export const isLoading = (state) => get(state, "storeForm.isLoading", "");
export const errorMessage = (state) => get(state, "storeForm.errorMessage", "");
export const validations = (state) =>
  get(state, "storeForm.validationError", "");
export const isEdit = (state) => get(state, "storeForm.isEdit", "");
