/*
 *
 * Client reducer
 *
 */
import produce from "immer";
import { parseDate, parseTime } from "utils/dateTimeHelpers";
import {
  SET_CLIENT_DETAILS,
  SET_SPOC_DETAILS,
  SET_POSITION_LIST,
  CLIENT_DETAILS_INIT,
} from "./constants";

export const initialState = {
  isLoading: true,
  name: "",
  alias: "",
  about: "",
  industry: [],
  officeAddress: "",
  officeCity: "",
  website: "",
  siteLocations: [],
  products: [],
  employeeHeadCount: "",
  noOfWorkingDays: "",
  generalShiftDetails: "",
  shiftBased: "",
  shiftDetails: [],
  nonPoachCompanies: "",
  targetCompanies: "",
  gstin: "",
  remarks: "",
  agreementExpiryDate: "",
  commercial: "",
  superAccHolder: "",
  agreementFile: "",
  noOfPositions: "",
  spocDetails: [],
  positions: [],
};

/* eslint-disable default-case, no-param-reassign */
const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CLIENT_DETAILS:
        draft.name = action.payload.name;
        draft.alias = action.payload.alias;
        draft.about = action.payload.about ? action.payload.about : "-";
        draft.industry = action.payload.industry;
        draft.officeAddress = action.payload.officeAddress;
        draft.officeCity = action.payload.officeCity;
        draft.website = action.payload.website;
        draft.siteLocations = action.payload.siteLocations;
        draft.products = action.payload.products;
        draft.employeeHeadCount = action.payload.employeeHeadCount;
        draft.noOfWorkingDays = action.payload.noOfWorkingDays;
        draft.generalShiftDetails = {
          ...action.payload.generalShiftDetails,
          startTime: action.payload.generalShiftDetails.startTime
            ? parseTime(action.payload.generalShiftDetails.startTime)
            : "-",
          endTime: action.payload.generalShiftDetails.endTime
            ? parseTime(action.payload.generalShiftDetails.endTime)
            : "-",
        };
        draft.shiftBased = action.payload.shiftBased;
        draft.shiftDetails = action.payload.shiftDetails.map((detail) => {
          return {
            ...detail,
            startTime: parseTime(detail.startTime),
            endTime: parseTime(detail.endTime),
          };
        });
        draft.nonPoachCompanies = action.payload.nonPoachCompanies;
        draft.targetCompanies = action.payload.targetCompanies;
        draft.gstin = action.payload.gstin;
        draft.remarks = action.payload.remarks;
        draft.agreementExpiryDate =
          action.payload.agreementExpiryDate == null
            ? "NA"
            : parseDate(action.payload.agreementExpiryDate, "DD/MM/YYYY");
        draft.commercial = action.payload.commercial;
        draft.superAccHolder = action.payload.superAccHolder.name;
        draft.agreementFile = action.payload.agreementFile;
        draft.noOfPositions = action.payload.noOfPositions;
        draft.isLoading = false;
        break;
      case SET_SPOC_DETAILS:
        draft.spocDetails = action.payload;
        break;
      case SET_POSITION_LIST:
        draft.positions = action.payload;
        break;
      case CLIENT_DETAILS_INIT:
        return initialState;
    }
  });

export default clientReducer;
