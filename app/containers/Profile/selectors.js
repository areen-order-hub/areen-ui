import _get from "lodash/get";

export const name = (state) => _get(state, "profile.name", "");
export const designation = (state) => _get(state, "profile.designation", "");
export const email = (state) => _get(state, "profile.email", "");
export const joiningDate = (state) => _get(state, "profile.joiningDate", "");

export const isLoading = (state) => _get(state, "profile.isLoading", true);
