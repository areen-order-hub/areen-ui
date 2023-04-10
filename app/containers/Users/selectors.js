import _get from "lodash/get";

export const isLoading = (state) => _get(state, "users.isLoading", true);

export const users = (state) => _get(state, "users.users", []);
export const paginationDetails = (state) =>
  _get(state, "users.paginationDetails", {});
