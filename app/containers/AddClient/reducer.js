/*
 *
 * AddClient reducer
 *
 */
import produce from "immer";
import moment from "moment-timezone";
import {
  INIT,
  CHANGE_NAME,
  CHANGE_ALIAS,
  CHANGE_ABOUT,
  CHANGE_INDUSTRY,
  CHANGE_ADDRESS,
  CHANGE_CITY,
  CHANGE_WEBSITE,
  CHANGE_NO_OF_SITE_LOCATIONS,
  CHANGE_SITE_LOCATIONS,
  CHANGE_PRODUCTS,
  CHANGE_EMPLOYEE_COUNT,
  CHANGE_NO_OF_WORKING_DAYS,
  CHANGE_GENERAL_SHIFT_DETAILS,
  CHANGE_SHIFT_BASED,
  ADD_NEW_SHIFT,
  CHANGE_SHIFT_DETAILS,
  CHANGE_NON_POACH_COMPANIES,
  CHANGE_TARGET_COMPANIES,
  CHANGE_GSTIN,
  CHANGE_REMARKS,
  CHANGE_AGREEMENT_EXPIRY_DATE,
  CHANGE_COMMERCIAL,
  CHANGE_SUPER_ACC_HOLDER,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_CLIENT_DETAILS,
  SET_AVAILABLE_USERS,
} from "./constants";

import { shapeAvailableUsers } from "./helpers.js";

export const initialState = {
  name: "",
  alias: "",
  about: "",
  industry: [],
  officeAddress: "",
  officeCity: "",
  website: "",
  noOfSiteLocations: "0",
  siteLocations: [],
  products: [],
  employeeHeadCount: "",
  noOfWorkingDays: "",
  generalShiftDetails: {},
  shiftBased: "false",
  shiftDetails: [],
  nonPoachCompanies: [],
  targetCompanies: [],
  gstin: "",
  remarks: "",
  agreementExpiryDate: "",
  commercial: "",
  superAccHolder: "",
  agreementFile: "",
  signedUrl: "",
  availableUsers: [],
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

const getTags = (items = []) => {
  return items.map((item) => {
    return { value: item, label: item };
  });
};

/* eslint-disable default-case, no-param-reassign */
const addClientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_CLIENT_DETAILS:
        draft.name = action.payload.name;
        draft.alias = action.payload.alias;
        draft.about = action.payload.about;
        draft.industry = getTags(action.payload.industry);
        draft.officeAddress = action.payload.officeAddress;
        draft.officeCity = action.payload.officeCity;
        draft.website = action.payload.website;
        draft.noOfSiteLocations = action.payload.noOfSiteLocations;
        draft.siteLocations = action.payload.siteLocations;
        draft.products = getTags(action.payload.products);
        draft.employeeHeadCount = action.payload.employeeHeadCount;
        draft.noOfWorkingDays = action.payload.noOfWorkingDays;
        draft.generalShiftDetails = {
          ...action.payload.generalShiftDetails,
          startTime: moment(action.payload.generalShiftDetails.startTime),
          endTime: moment(action.payload.generalShiftDetails.endTime),
        };
        draft.shiftBased = `${action.payload.shiftBased}`;
        draft.shiftDetails = action.payload.shiftDetails.map((detail) => {
          return {
            ...detail,
            startTime: moment(detail.startTime),
            endTime: moment(detail.endTime),
          };
        });
        draft.nonPoachCompanies = getTags(action.payload.nonPoachCompanies);
        draft.targetCompanies = getTags(action.payload.targetCompanies);
        draft.gstin = action.payload.gstin;
        draft.remarks = action.payload.remarks;
        draft.agreementExpiryDate =
          action.payload.agreementExpiryDate == null
            ? ""
            : moment(action.payload.agreementExpiryDate);
        draft.commercial = action.payload.commercial;
        draft.superAccHolder = action.payload.superAccHolder._id;
        draft.agreementFile = action.payload.agreementFile;
        draft.signedUrl = action.payload.signedUrl;
        draft.isEdit = true;
        break;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_ALIAS:
        draft.alias = action.payload;
        break;
      case CHANGE_ABOUT:
        draft.about = action.payload;
        break;
      case CHANGE_INDUSTRY:
        draft.industry = action.payload;
        break;
      case CHANGE_ADDRESS:
        draft.officeAddress = action.payload;
        break;
      case CHANGE_CITY:
        draft.officeCity = action.payload;
        break;
      case CHANGE_WEBSITE:
        draft.website = action.payload;
        break;
      case CHANGE_NO_OF_SITE_LOCATIONS:
        draft.noOfSiteLocations = action.payload;
        draft.siteLocations = Array(parseInt(action.payload)).fill("");
        break;
      case CHANGE_SITE_LOCATIONS:
        const { index: siteIndex, payload: sitePayload } = action.payload;
        draft.siteLocations[siteIndex] = sitePayload;
        break;
      case CHANGE_PRODUCTS:
        draft.products = action.payload;
        break;
      case CHANGE_EMPLOYEE_COUNT:
        draft.employeeHeadCount = action.payload;
        break;
      case CHANGE_NO_OF_WORKING_DAYS:
        draft.noOfWorkingDays = action.payload;
        break;
      case CHANGE_GENERAL_SHIFT_DETAILS:
        draft.generalShiftDetails = action.payload;
        break;
      case CHANGE_SHIFT_BASED:
        draft.shiftBased = action.payload;
        if (action.payload == "true") {
          draft.shiftDetails = [
            {
              startTime: "00:00 AM",
              endTime: "00:00 AM",
              additionalDetails: "",
            },
          ];
        } else {
          draft.shiftDetails = [];
        }
        break;
      case ADD_NEW_SHIFT:
        draft.shiftDetails = [
          ...draft.shiftDetails,
          {
            startTime: "00:00 AM",
            endTime: "00:00 AM",
            additionalDetails: "",
          },
        ];
        break;
      case CHANGE_SHIFT_DETAILS:
        const { index: detailIndex, payload: detailPayload } = action.payload;
        draft.shiftDetails[detailIndex] = detailPayload;
        break;
      case CHANGE_NON_POACH_COMPANIES:
        draft.nonPoachCompanies = action.payload;
        break;
      case CHANGE_TARGET_COMPANIES:
        draft.targetCompanies = action.payload;
        break;
      case CHANGE_GSTIN:
        draft.gstin = action.payload;
        break;
      case CHANGE_REMARKS:
        draft.remarks = action.payload;
        break;
      case CHANGE_AGREEMENT_EXPIRY_DATE:
        draft.agreementExpiryDate = action.payload;
        break;
      case CHANGE_COMMERCIAL:
        draft.commercial = action.payload;
        break;
      case CHANGE_SUPER_ACC_HOLDER:
        draft.superAccHolder = action.payload;
        break;
      case SET_AVAILABLE_USERS:
        draft.availableUsers = shapeAvailableUsers(action.payload);
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
    }
  });

export default addClientReducer;
