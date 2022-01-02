import _get from "lodash/get";

export const name = (state) => _get(state, "client.name", "");
export const alias = (state) => _get(state, "client.alias", "");
export const about = (state) => _get(state, "client.about", "");
export const industry = (state) => _get(state, "client.industry", []);
export const officeAddress = (state) => _get(state, "client.officeAddress", "");
export const officeCity = (state) => _get(state, "client.officeCity", "");
export const website = (state) => _get(state, "client.website", "");
export const siteLocations = (state) => _get(state, "client.siteLocations", []);
export const products = (state) => _get(state, "client.products", []);
export const employeeHeadCount = (state) =>
  _get(state, "client.employeeHeadCount", "");
export const noOfWorkingDays = (state) =>
  _get(state, "client.noOfWorkingDays", "");
export const generalShiftDetails = (state) =>
  _get(state, "client.generalShiftDetails", {});
export const shiftBased = (state) => _get(state, "client.shiftBased", "");
export const shiftDetails = (state) => _get(state, "client.shiftDetails", []);
export const nonPoachCompanies = (state) =>
  _get(state, "client.nonPoachCompanies", "");
export const targetCompanies = (state) =>
  _get(state, "client.targetCompanies", "");
export const gstin = (state) => _get(state, "client.gstin", "");
export const remarks = (state) => _get(state, "client.remarks", "");
export const agreementExpiryDate = (state) =>
  _get(state, "client.agreementExpiryDate", "");
export const commercial = (state) => _get(state, "client.commercial", "");
export const superAccHolder = (state) =>
  _get(state, "client.superAccHolder", "");
export const agreementFile = (state) => _get(state, "client.agreementFile", "");
export const noOfPositions = (state) => _get(state, "client.noOfPositions", "");
export const spocDetails = (state) => _get(state, "client.spocDetails", []);
export const positions = (state) => _get(state, "client.positions", []);

export const isLoading = (state) => _get(state, "client.isLoading", true);

export const userRole = (cookie) => _get(cookie, "user.role", null);
export const userId = (cookie) => _get(cookie, "user.id", null);
