import _get from "lodash/get";

export const userName = (cookie) => _get(cookie, "user.name", "");
export const userRole = (cookie) => _get(cookie, "user.role", "");

export const isCountLoading = (state) =>
  _get(state, "dashboard.isCountLoading", true);
export const noOfClients = (state) => _get(state, "dashboard.noOfClients", 0);
export const noOfCandidates = (state) =>
  _get(state, "dashboard.noOfCandidates", 0);
export const noOfPositions = (state) =>
  _get(state, "dashboard.noOfPositions", 0);
export const noOfRecruiters = (state) =>
  _get(state, "dashboard.noOfRecruiters", 0);
export const noOfShortlisted = (state) =>
  _get(state, "dashboard.noOfShortlisted", 0);
export const noOfSelected = (state) => _get(state, "dashboard.noOfSelected", 0);
export const noOfOffered = (state) => _get(state, "dashboard.noOfOffered", 0);
export const noOfJoined = (state) => _get(state, "dashboard.noOfJoined", 0);

export const isInterviewsLoading = (state) =>
  _get(state, "dashboard.isInterviewsLoading", true);
export const todaysInterviews = (state) =>
  _get(state, "dashboard.todaysInterviews", []);
export const tomorrowsInterviews = (state) =>
  _get(state, "dashboard.tomorrowsInterviews", []);

export const isEventsLoading = (state) =>
  _get(state, "dashboard.isEventsLoading", true);
export const events = (state) => _get(state, "dashboard.events", []);

export const loggedUserEmail = (cookie) => _get(cookie, "user.email", "email");
