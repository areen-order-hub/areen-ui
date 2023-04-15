import _get from "lodash/get";

export const isLoading = (state) => _get(state, "roles.isLoading", true);

export const roles = (state) => _get(state, "roles.roles", []);
export const paginationDetails = (state) =>
  _get(state, "roles.paginationDetails", {});
