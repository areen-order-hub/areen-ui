import _get from "lodash/get";

export const isLoading = (state) => _get(state, "clients.isLoading", true);

export const clients = (state) => _get(state, "clients.clients", []);
