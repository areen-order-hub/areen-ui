import _get from "lodash/get";

export const round = (state) => _get(state, "scheduleInterview.round", "");
export const venue = (state) => _get(state, "scheduleInterview.venue", "");
export const interviewMode = (state) =>
  _get(state, "scheduleInterview.interviewMode", "");
export const instructions = (state) =>
  _get(state, "scheduleInterview.instructions", "");
export const dateTime = (state) =>
  _get(state, "scheduleInterview.dateTime", "");

export const errorMessage = (state) =>
  _get(state, "scheduleInterview.errorMessage", null);
export const validations = (state) =>
  _get(state, "scheduleInterview.validationError", null);
export const isLoading = (state) =>
  _get(state, "scheduleInterview.isLoading", null);
