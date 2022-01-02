import _get from "lodash/get";

export const email = (state) => _get(state, "changePasswordPage.email", null);

export const password = (state) =>
  _get(state, "changePasswordPage.password", null);

export const confirmPassword = (state) =>
  _get(state, "changePasswordPage.confirmPassword", null);

export const isLoading = (state) =>
  _get(state, "changePasswordPage.isLoading", false);

export const isResetSuccess = (state) =>
  _get(state, "changePasswordPage.isResetSuccess", false);

export const errorMessage = (state) =>
  _get(state, "changePasswordPage.errorMessage", null);

export const validations = (state) =>
  _get(state, "changePasswordPage.validationError", null);
