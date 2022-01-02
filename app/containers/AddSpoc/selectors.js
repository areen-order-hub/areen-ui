import _get from "lodash/get";

export const name = (state) => _get(state, "addSpoc.name", "");
export const spocEmail = (state) => _get(state, "addSpoc.spocEmail", "");
export const phoneNumber = (state) => _get(state, "addSpoc.phoneNumber", "");
export const designation = (state) => _get(state, "addSpoc.designation", "");
export const officeAddress = (state) =>
  _get(state, "addSpoc.officeAddress", "");
export const accHolder = (state) => _get(state, "addSpoc.accHolder", "");
export const availableUsers = (state) =>
  _get(state, "addSpoc.availableUsers", []);

export const isLoading = (state) => _get(state, "addSpoc.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addSpoc.errorMessage", null);
export const validations = (state) =>
  _get(state, "addSpoc.validationError", null);
export const isEdit = (state) => _get(state, "addSpoc.isEdit", false);
