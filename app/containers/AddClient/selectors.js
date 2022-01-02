import _get from "lodash/get";

export const name = (state) => _get(state, "addClient.name", "");
export const alias = (state) => _get(state, "addClient.alias", "");
export const about = (state) => _get(state, "addClient.about", "");
export const industry = (state) => _get(state, "addClient.industry", []);
export const officeAddress = (state) =>
  _get(state, "addClient.officeAddress", "");
export const officeCity = (state) => _get(state, "addClient.officeCity", "");
export const website = (state) => _get(state, "addClient.website", "");
export const noOfSiteLocations = (state) =>
  _get(state, "addClient.noOfSiteLocations", "0");
export const siteLocations = (state) =>
  _get(state, "addClient.siteLocations", []);
export const products = (state) => _get(state, "addClient.products", []);
export const employeeHeadCount = (state) =>
  _get(state, "addClient.employeeHeadCount", "");
export const noOfWorkingDays = (state) =>
  _get(state, "addClient.noOfWorkingDays", "");
export const generalShiftDetails = (state) =>
  _get(state, "addClient.generalShiftDetails", {});
export const shiftBased = (state) =>
  _get(state, "addClient.shiftBased", "false");
export const shiftDetails = (state) =>
  _get(state, "addClient.shiftDetails", []);
export const nonPoachCompanies = (state) =>
  _get(state, "addClient.nonPoachCompanies", []);
export const targetCompanies = (state) =>
  _get(state, "addClient.targetCompanies", []);
export const gstin = (state) => _get(state, "addClient.gstin", "");
export const remarks = (state) => _get(state, "addClient.remarks", "");
export const agreementExpiryDate = (state) =>
  _get(state, "addClient.agreementExpiryDate", "");
export const commercial = (state) => _get(state, "addClient.commercial", "");
export const superAccHolder = (state) =>
  _get(state, "addClient.superAccHolder", "");
export const agreementFile = (state) =>
  _get(state, "addClient.agreementFile", "");
export const signedUrl = (state) => _get(state, "addClient.signedUrl", "");
export const availableUsers = (state) =>
  _get(state, "addClient.availableUsers", []);

export const isLoading = (state) => _get(state, "addClient.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addClient.errorMessage", null);
export const validations = (state) =>
  _get(state, "addClient.validationError", null);
export const isEdit = (state) => _get(state, "addClient.isEdit", false);
