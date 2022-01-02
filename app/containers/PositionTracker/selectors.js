import _get from "lodash/get";

export const isFieldsLoading = (state) =>
  _get(state, "positionTracker.isFieldsLoading", true);
export const firstRowFields = (state) =>
  _get(state, "positionTracker.firstRowFields", []);
export const secondRowFields = (state) =>
  _get(state, "positionTracker.secondRowFields", []);
export const thirdRowFields = (state) =>
  _get(state, "positionTracker.thirdRowFields", []);
export const candidates = (state) =>
  _get(state, "positionTracker.candidates", []);
export const candidatesMap = (state) =>
  _get(state, "positionTracker.candidatesMap", {});
