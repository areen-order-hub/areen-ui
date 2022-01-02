import _get from "lodash/get";

export const positionStatus = (state) =>
  _get(state, "addPosition.positionStatus", "Open");
export const receivedDate = (state) =>
  _get(state, "addPosition.receivedDate", "");
export const jobTitle = (state) => _get(state, "addPosition.jobTitle", "");
export const spocId = (state) => _get(state, "addPosition.spocId", "");
export const department = (state) => _get(state, "addPosition.department", "");
export const reportingTo = (state) =>
  _get(state, "addPosition.reportingTo", "");
export const reportees = (state) => _get(state, "addPosition.reportees", "");
export const noOfVacancies = (state) =>
  _get(state, "addPosition.noOfVacancies", "");
export const minBudget = (state) => _get(state, "addPosition.minBudget", "");
export const maxBudget = (state) => _get(state, "addPosition.maxBudget", "");
export const budgetRemarks = (state) =>
  _get(state, "addPosition.budgetRemarks", "");
export const minYearsOfExperience = (state) =>
  _get(state, "addPosition.minYearsOfExperience", "");
export const maxYearsOfExperience = (state) =>
  _get(state, "addPosition.maxYearsOfExperience", "");
export const yearsOfExperienceRemarks = (state) =>
  _get(state, "addPosition.yearsOfExperienceRemarks", "");
export const ageRange = (state) => _get(state, "addPosition.ageRange", "");
export const qualification = (state) =>
  _get(state, "addPosition.qualification", "");
export const location = (state) => _get(state, "addPosition.location", "");
export const skillsRequired = (state) =>
  _get(state, "addPosition.skillsRequired", []);
export const targetIndustry = (state) =>
  _get(state, "addPosition.targetIndustry", []);
export const targetCompanies = (state) =>
  _get(state, "addPosition.targetCompanies", []);
export const nonPoachCompanies = (state) =>
  _get(state, "addPosition.nonPoachCompanies", []);
export const remarks = (state) => _get(state, "addPosition.remarks", "");
export const clientId = (state) => _get(state, "addPosition.clientId", "");
export const recruiterAssigned = (state) =>
  _get(state, "addPosition.recruiterAssigned", "");

export const availableClients = (state) =>
  _get(state, "addPosition.availableClients", []);
export const availableSpocs = (state) =>
  _get(state, "addPosition.availableSpocs", []);
export const jobDescriptionFile = (state) =>
  _get(state, "addPosition.jobDescriptionFile", "");
export const signedUrl = (state) => _get(state, "addPosition.signedUrl", "");
export const availableUsers = (state) =>
  _get(state, "addPosition.availableUsers", []);

export const isLoading = (state) => _get(state, "addPosition.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addPosition.errorMessage", null);
export const validations = (state) =>
  _get(state, "addPosition.validationError", null);
export const isEdit = (state) => _get(state, "addPosition.isEdit", false);

export const getUserId = (cookie) => _get(cookie, "user.id", null);
export const getRole = (cookie) => _get(cookie, "user.role", null);
