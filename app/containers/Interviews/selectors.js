import _get from "lodash/get";

export const isLoading = (state) => _get(state, "interviews.isLoading", true);

export const interviews = (state) => _get(state, "interviews.interviews", []);
