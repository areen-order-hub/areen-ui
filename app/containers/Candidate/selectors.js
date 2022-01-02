import _get from "lodash/get";

export const name = (state) => _get(state, "candidate.name", "");
export const dateOfBirth = (state) => _get(state, "candidate.dateOfBirth", "");
export const candidateEmail = (state) =>
  _get(state, "candidate.candidateEmail", "");
export const gender = (state) => _get(state, "candidate.gender", "");
export const maritalStatus = (state) =>
  _get(state, "candidate.maritalStatus", "");
export const presentLocation = (state) =>
  _get(state, "candidate.presentLocation", "");
export const nativeLocation = (state) =>
  _get(state, "candidate.nativeLocation", "");
export const qualification = (state) =>
  _get(state, "candidate.qualification", []);
export const yearsOfExperience = (state) =>
  _get(state, "candidate.yearsOfExperience", "");
export const presentCTC = (state) => _get(state, "candidate.presentCTC", "");
export const presentCTCRemarks = (state) =>
  _get(state, "candidate.presentCTCRemarks", "");
export const expectedCTC = (state) => _get(state, "candidate.expectedCTC", "");
export const expectedCTCRemarks = (state) =>
  _get(state, "candidate.expectedCTCRemarks", "");
export const noticePeriod = (state) =>
  _get(state, "candidate.noticePeriod", "");
export const noticePeriodRemarks = (state) =>
  _get(state, "candidate.noticePeriodRemarks", "");
export const experiences = (state) => _get(state, "candidate.experiences", []);
export const reportingTo = (state) => _get(state, "candidate.reportingTo", "");
export const reasonForChange = (state) =>
  _get(state, "candidate.reasonForChange", "");
export const consultantAssessment = (state) =>
  _get(state, "candidate.consultantAssessment", []);
export const isHoldingOffer = (state) =>
  _get(state, "candidate.isHoldingOffer", "");
export const existingOfferAmount = (state) =>
  _get(state, "candidate.existingOfferAmount", "");
export const joiningDate = (state) => _get(state, "candidate.joiningDate", "");
export const currentOfferAmount = (state) =>
  _get(state, "candidate.currentOfferAmount", "");
export const addedBy = (state) => _get(state, "candidate.addedBy", "");
export const candidateFile = (state) =>
  _get(state, "candidate.candidateFile", "");

export const interviews = (state) => _get(state, "candidate.interviews", []);

export const isLoading = (state) => _get(state, "candidate.isLoading", true);
export const isInterviewsLoading = (state) =>
  _get(state, "candidate.isInterviewsLoading", true);
export const getUserId = (cookie) => _get(cookie, "user.id", null);
export const userRole = (cookie) => _get(cookie, "user.role", null);
