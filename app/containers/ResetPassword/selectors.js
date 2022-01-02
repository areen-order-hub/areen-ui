import _get from "lodash/get";

export const email = (state) => _get(state, "resetPage.email", null);

export const password = (state) => _get(state, "resetPage.password", null);

export const isLoading = (state) => _get(state, "resetPage.isLoading", false);

export const errorMessage = (state) =>
  _get(state, "resetPage.errorMessage", null);

export const successMessage = (state) =>
  _get(state, "resetPage.successMessage", null);

export const validations = (state) =>
  _get(state, "resetPage.validationError", null);
