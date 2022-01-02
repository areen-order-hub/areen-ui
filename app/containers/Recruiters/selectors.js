import _get from "lodash/get";

export const isLoading = (state) => _get(state, "recruiters.isLoading", true);

export const recruiters = (state) => _get(state, "recruiters.recruiters", []);
