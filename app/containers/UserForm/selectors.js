import { get } from "lodash";

export const name = (state) => get(state, "userForm.name", "");
export const email = (state) => get(state, "userForm.email", "");
export const phone = (state) => get(state, "userForm.phone", "");
export const roles = (state) => get(state, "userForm.roles", []);

export const isLoading = (state) => get(state, "userForm.isLoading", "");
export const errorMessage = (state) => get(state, "userForm.errorMessage", "");
export const validations = (state) =>
  get(state, "userForm.validationError", "");
export const isEdit = (state) => get(state, "userForm.isEdit", "");
