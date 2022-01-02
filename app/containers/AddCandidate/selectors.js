import _get from "lodash/get";

export const name = (state) => _get(state, "addCandidate.name", "");
export const dateOfBirth = (state) =>
  _get(state, "addCandidate.dateOfBirth", "");
export const candidateEmail = (state) =>
  _get(state, "addCandidate.candidateEmail", "");
export const phoneNumber = (state) =>
  _get(state, "addCandidate.phoneNumber", "");
export const gender = (state) => _get(state, "addCandidate.gender", "");
export const maritalStatus = (state) =>
  _get(state, "addCandidate.maritalStatus", "");
export const presentLocation = (state) =>
  _get(state, "addCandidate.presentLocation", "");
export const nativeLocation = (state) =>
  _get(state, "addCandidate.nativeLocation", "");
export const qualification = (state) =>
  _get(state, "addCandidate.qualification", [
    {
      degree: "",
      institution: "",
      passedOutYear: "",
      percentage: "",
    },
  ]);
export const yearsOfExperience = (state) =>
  _get(state, "addCandidate.yearsOfExperience", "");
export const monthsOfExperience = (state) =>
  _get(state, "addCandidate.monthsOfExperience", "");
export const presentCTC = (state) => _get(state, "addCandidate.presentCTC", "");
export const presentCTCRemarks = (state) =>
  _get(state, "addCandidate.presentCTCRemarks", "");
export const expectedCTC = (state) =>
  _get(state, "addCandidate.expectedCTC", "");
export const expectedCTCRemarks = (state) =>
  _get(state, "addCandidate.expectedCTCRemarks", "");
export const noticePeriod = (state) =>
  _get(state, "addCandidate.noticePeriod", "");
export const noticePeriodRemarks = (state) =>
  _get(state, "addCandidate.noticePeriodRemarks", "");
export const experiences = (state) =>
  _get(state, "addCandidate.experiences", [
    {
      companyName: "",
      designation: "",
      employmentPeriod: "",
    },
  ]);
export const reportingTo = (state) =>
  _get(state, "addCandidate.reportingTo", "");
export const noOfReportees = (state) =>
  _get(state, "addCandidate.noOfReportees", "");
export const reasonForChange = (state) =>
  _get(state, "addCandidate.reasonForChange", "");
export const consultantAssessment = (state) =>
  _get(state, "addCandidate.consultantAssessment", [""]);
export const isHoldingOffer = (state) =>
  _get(state, "addCandidate.isHoldingOffer", "false");
export const existingOfferAmount = (state) =>
  _get(state, "addCandidate.existingOfferAmount", "");
export const positionId = (state) => _get(state, "addCandidate.positionId", "");

export const isLoading = (state) =>
  _get(state, "addCandidate.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addCandidate.errorMessage", null);
export const validations = (state) =>
  _get(state, "addCandidate.validationError", null);
export const isEdit = (state) => _get(state, "addCandidate.isEdit", false);
