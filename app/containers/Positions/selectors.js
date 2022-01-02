import _get from "lodash/get";

export const isLoading = (state) => _get(state, "positions.isLoading", true);

export const positions = (state) => _get(state, "positions.positions", []);
export const availableClients = (state) =>
  _get(state, "positions.availableClients", []);
export const availableRecruiters = (state) =>
  _get(state, "positions.availableRecruiters", []);
export const availableSpocs = (state) =>
  _get(state, "positions.availableSpocs", []);

export const getUserId = (cookie) => _get(cookie, "user.id", null);
export const userRole = (cookie) => _get(cookie, "user.role", null);
