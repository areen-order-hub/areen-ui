/*
 *
 * AddPosition reducer
 *
 */
import produce from "immer";
import moment from "moment-timezone";
import {
  INIT,
  CHANGE_POSITION_STATUS,
  CHANGE_RECEIVED_DATE,
  CHANGE_JOB_TITLE,
  CHANGE_SPOC_ID,
  CHANGE_DEPARTMENT,
  CHANGE_REPORTING_TO,
  CHANGE_REPORTEES,
  CHANGE_NUMBER_OF_VACANCIES,
  CHANGE_MIN_BUDGET,
  CHANGE_MAX_BUDGET,
  CHANGE_BUDGET_REMARKS,
  CHANGE_MIN_YEARS_OF_EXPERIENCE,
  CHANGE_MAX_YEARS_OF_EXPERIENCE,
  CHANGE_YEARS_OF_EXPERIENCE_REMARKS,
  CHANGE_AGE_RANGE,
  CHANGE_QUALIFICATION,
  CHANGE_LOCATION,
  CHANGE_SKILLS_REQUIRED,
  CHANGE_TARGET_INDUSTRY,
  CHANGE_TARGET_COMPANIES,
  CHANGE_NON_POACH_COMPANIES,
  CHANGE_REMARKS,
  CHANGE_CLIENT_ID,
  CHANGE_RECRUITER_ASSIGNED,
  AVAILABLE_CLIENTS,
  AVAILABLE_SPOCS,
  SET_AVAILABLE_USERS,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_POSITION_DETAILS,
} from "./constants";

import { shapeToDropDown } from "./helpers.js";

export const initialState = {
  positionStatus: "Open",
  receivedDate: "",
  jobTitle: "",
  clientId: "",
  spocId: "",
  department: "",
  reportingTo: "",
  reportees: "",
  noOfVacancies: "",
  minBudget: "",
  maxBudget: "",
  budgetRemarks: "",
  minYearsOfExperience: "",
  maxYearsOfExperience: "",
  yearsOfExperienceRemarks: "",
  ageRange: "",
  qualification: "",
  location: "",
  skillsRequired: [],
  targetIndustry: [],
  targetCompanies: [],
  nonPoachCompanies: [],
  remarks: "",
  recruiterAssigned: "",
  availableClients: [],
  availableSpocs: [],
  jobDescriptionFile: "",
  signedUrl: "",
  availableUsers: [],
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

const getTags = (items = []) =>
  items.map((item) => {
    return { value: item, label: item };
  });

/* eslint-disable default-case, no-param-reassign */
const addPositionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_POSITION_DETAILS:
        draft.positionStatus = action.payload.positionStatus;
        draft.receivedDate = moment(action.payload.receivedDate);
        draft.jobTitle = action.payload.jobTitle;
        draft.department = action.payload.department;
        draft.reportingTo = action.payload.reportingTo;
        draft.reportees = action.payload.reportees;
        draft.noOfVacancies = action.payload.noOfVacancies;
        draft.minBudget = action.payload.minBudget;
        draft.maxBudget = action.payload.maxBudget;
        draft.budgetRemarks = action.payload.budgetRemarks;
        draft.minYearsOfExperience = action.payload.minYearsOfExperience;
        draft.maxYearsOfExperience = action.payload.maxYearsOfExperience;
        draft.yearsOfExperienceRemarks =
          action.payload.yearsOfExperienceRemarks;
        draft.ageRange = action.payload.ageRange;
        draft.qualification = action.payload.qualification;
        draft.location = action.payload.location;
        draft.skillsRequired = getTags(action.payload.skillsRequired);
        draft.targetIndustry = getTags(action.payload.targetIndustry);
        draft.targetCompanies = getTags(action.payload.targetCompanies);
        draft.nonPoachCompanies = getTags(action.payload.nonPoachCompanies);
        draft.remarks = action.payload.remarks;
        draft.clientId = action.payload.clientId.id;
        draft.spocId = action.payload.spocId.id;
        draft.recruiterAssigned = action.payload.recruiterAssigned._id;
        draft.jobDescriptionFile = action.payload.jobDescriptionFile;
        draft.signedUrl = action.payload.signedUrl;
        draft.isEdit = true;
        break;
      case CHANGE_POSITION_STATUS:
        draft.positionStatus = action.payload;
        break;
      case CHANGE_RECEIVED_DATE:
        draft.receivedDate = action.payload;
        break;
      case CHANGE_JOB_TITLE:
        draft.jobTitle = action.payload;
        break;
      case CHANGE_DEPARTMENT:
        draft.department = action.payload;
        break;
      case CHANGE_REPORTING_TO:
        draft.reportingTo = action.payload;
        break;
      case CHANGE_REPORTEES:
        draft.reportees = action.payload;
        break;
      case CHANGE_NUMBER_OF_VACANCIES:
        draft.noOfVacancies = action.payload;
        break;
      case CHANGE_MIN_BUDGET:
        draft.minBudget = action.payload;
        break;
      case CHANGE_MAX_BUDGET:
        draft.maxBudget = action.payload;
        break;
      case CHANGE_BUDGET_REMARKS:
        draft.budgetRemarks = action.payload;
        break;
      case CHANGE_MIN_YEARS_OF_EXPERIENCE:
        draft.minYearsOfExperience = action.payload;
        break;
      case CHANGE_MAX_YEARS_OF_EXPERIENCE:
        draft.maxYearsOfExperience = action.payload;
        break;
      case CHANGE_YEARS_OF_EXPERIENCE_REMARKS:
        draft.yearsOfExperienceRemarks = action.payload;
        break;
      case CHANGE_AGE_RANGE:
        draft.ageRange = action.payload;
        break;
      case CHANGE_QUALIFICATION:
        draft.qualification = action.payload;
        break;
      case CHANGE_LOCATION:
        draft.location = action.payload;
        break;
      case CHANGE_SKILLS_REQUIRED:
        draft.skillsRequired = action.payload;
        break;
      case CHANGE_TARGET_INDUSTRY:
        draft.targetIndustry = action.payload;
        break;
      case CHANGE_TARGET_COMPANIES:
        draft.targetCompanies = action.payload;
        break;
      case CHANGE_NON_POACH_COMPANIES:
        draft.nonPoachCompanies = action.payload;
        break;
      case CHANGE_REMARKS:
        draft.remarks = action.payload;
        break;
      case CHANGE_CLIENT_ID:
        draft.clientId = action.payload;
        break;
      case CHANGE_SPOC_ID:
        draft.spocId = action.payload;
        break;
      case CHANGE_RECRUITER_ASSIGNED:
        draft.recruiterAssigned = action.payload;
        break;
      case AVAILABLE_CLIENTS:
        draft.availableClients = action.payload;
        break;
      case SET_AVAILABLE_USERS:
        draft.availableUsers = shapeToDropDown(action.payload);
        break;
      case AVAILABLE_SPOCS:
        draft.availableSpocs = action.payload;
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

export default addPositionReducer;
