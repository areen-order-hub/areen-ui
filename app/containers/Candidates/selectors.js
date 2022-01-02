import _get from "lodash/get";

export const isLoading = (state) => _get(state, "candidates.isLoading", true);

export const candidates = (state) => _get(state, "candidates.candidates", []);
