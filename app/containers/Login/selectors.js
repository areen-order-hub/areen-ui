import _get from "lodash/get";

export const email = (state) => _get(state, "loginPage.email", "");

export const password = (state) => _get(state, "loginPage.password", "");

export const isLoading = (state) => _get(state, "loginPage.isLoading", false);

export const errorMessage = (state) =>
  _get(state, "loginPage.errorMessage", null);

export const validations = (state) =>
  _get(state, "loginPage.validationError", null);
