import { get } from "lodash";

export const role = (state) => get(state, "roleForm.role", "");
export const access = (state) => get(state, "roleForm.access", []);

export const isLoading = (state) => get(state, "roleForm.isLoading", "");
export const errorMessage = (state) => get(state, "roleForm.errorMessage", "");
export const validations = (state) =>
  get(state, "roleForm.validationError", "");
export const isEdit = (state) => get(state, "roleForm.isEdit", "");
