import _get from "lodash/get";

export const name = (state) => _get(state, "addRecruiter.name", "");
export const email = (state) => _get(state, "addRecruiter.email", "");
export const phoneNumber = (state) =>
  _get(state, "addRecruiter.phoneNumber", "");
export const role = (state) => _get(state, "addRecruiter.role", "");
export const designation = (state) =>
  _get(state, "addRecruiter.designation", "");
export const joiningDate = (state) =>
  _get(state, "addRecruiter.joiningDate", "");

export const isLoading = (state) =>
  _get(state, "addRecruiter.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addRecruiter.errorMessage", null);
export const validations = (state) =>
  _get(state, "addRecruiter.validationError", null);
export const isEdit = (state) => _get(state, "addRecruiter.isEdit", false);
