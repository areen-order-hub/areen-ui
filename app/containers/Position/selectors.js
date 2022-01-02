import _get from "lodash/get";

export const positionStatus = (state) =>
  _get(state, "position.positionStatus", "");
export const receivedDate = (state) => _get(state, "position.receivedDate", "");
export const jobTitle = (state) => _get(state, "position.jobTitle", "");
export const department = (state) => _get(state, "position.department", "");
export const reportingTo = (state) => _get(state, "position.reportingTo", "");
export const reportees = (state) => _get(state, "position.reportees", "");
export const noOfVacancies = (state) =>
  _get(state, "position.noOfVacancies", "");
export const minBudget = (state) => _get(state, "position.minBudget", "");
export const maxBudget = (state) => _get(state, "position.maxBudget", "");
export const budgetRemarks = (state) =>
  _get(state, "position.budgetRemarks", "");
export const minYearsOfExperience = (state) =>
  _get(state, "position.minYearsOfExperience", "");
export const maxYearsOfExperience = (state) =>
  _get(state, "position.maxYearsOfExperience", "");
export const yearsOfExperienceRemarks = (state) =>
  _get(state, "position.yearsOfExperienceRemarks", "");
export const ageRange = (state) => _get(state, "position.ageRange", "");
export const qualification = (state) =>
  _get(state, "position.qualification", "");
export const location = (state) => _get(state, "position.location", "");
export const skillsRequired = (state) =>
  _get(state, "position.skillsRequired", "");
export const targetIndustry = (state) =>
  _get(state, "position.targetIndustry", "");
export const targetCompanies = (state) =>
  _get(state, "position.targetCompanies", "");
export const nonPoachCompanies = (state) =>
  _get(state, "position.nonPoachCompanies", "");
export const jobDescriptionFile = (state) =>
  _get(state, "position.jobDescriptionFile", "");
export const remarks = (state) => _get(state, "position.remarks", "");
export const clientId = (state) => _get(state, "position.clientId", "");
export const clientName = (state) => _get(state, "position.clientName", "");
export const clientAlias = (state) => _get(state, "position.clientAlias", "");
export const clientIndustry = (state) =>
  _get(state, "position.clientIndustry", "");
export const clientAbout = (state) => _get(state, "position.clientAbout", "");
export const clientWebsite = (state) =>
  _get(state, "position.clientWebsite", "");
export const candidateDetails = (state) =>
  _get(state, "position.candidateDetails", []);
export const interviews = (state) => _get(state, "position.interviews", []);
export const addedBy = (state) => _get(state, "position.addedBy", "");
export const recruiterAssigned = (state) =>
  _get(state, "position.recruiterAssigned", "");
export const superAccHolder = (state) =>
  _get(state, "position.superAccHolder", "");

export const isLoading = (state) => _get(state, "position.isLoading", true);
export const isCandidateDetailsLoading = (state) =>
  _get(state, "position.isCandidateDetailsLoading", true);
export const isInterviewsLoading = (state) =>
  _get(state, "position.isInterviewsLoading", true);

export const getUserId = (cookie) => _get(cookie, "user.id", null);
export const userRole = (cookie) => _get(cookie, "user.role", null);
