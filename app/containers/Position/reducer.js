/*
 *
 * Position reducer
 *
 */
import produce from "immer";
import { parseDate } from "utils/dateTimeHelpers";
import {
  SET_POSITION_DETAILS,
  SET_CANDIDATE_DETAILS,
  SET_INTERVIEW_DETAILS,
  POSITION_DETAILS_INIT,
} from "./constants";

export const initialState = {
  isLoading: true,
  isCandidateDetailsLoading: true,
  isInterviewsLoading: true,
  positionStatus: "",
  receivedDate: "",
  jobTitle: "",
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
  targetIndustry: "",
  targetCompanies: "",
  nonPoachCompanies: "",
  jobDescriptionFile: "",
  remarks: "",
  clientId: "",
  clientName: "",
  clientAlias: "",
  clientIndustry: "",
  clientAbout: "",
  clientWebsite: "",
  candidateDetails: [],
  interviews: [],
  addedBy: "",
  recruiterAssigned: "",
  superAccHolder: "",
};

/* eslint-disable default-case, no-param-reassign */
const positionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POSITION_DETAILS:
        draft.positionStatus = action.payload.positionStatus;
        draft.receivedDate = parseDate(
          action.payload.receivedDate,
          "DD/MM/YYYY"
        );
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
        draft.skillsRequired = action.payload.skillsRequired;
        draft.targetIndustry = action.payload.targetIndustry;
        draft.targetCompanies = action.payload.targetCompanies;
        draft.nonPoachCompanies = action.payload.nonPoachCompanies;
        draft.jobDescriptionFile = action.payload.jobDescriptionFile;
        draft.remarks = action.payload.remarks;
        draft.clientId = action.payload.clientId.id;
        draft.clientName = action.payload.clientId.name;
        draft.clientAlias = action.payload.clientId.alias;
        draft.clientIndustry = action.payload.clientId.industry[0];
        draft.clientAbout = action.payload.clientId.about || "-";
        draft.clientWebsite = action.payload.clientId.website || "-";
        draft.addedBy = action.payload.addedBy;
        draft.recruiterAssigned = action.payload.recruiterAssigned._id;
        draft.superAccHolder = action.payload.clientId.superAccHolder;
        draft.isLoading = false;
        break;
      case SET_CANDIDATE_DETAILS:
        draft.candidateDetails = action.payload;
        draft.isCandidateDetailsLoading = false;
        break;
      case SET_INTERVIEW_DETAILS:
        draft.interviews = action.payload;
        draft.isInterviewsLoading = false;
        break;
      case POSITION_DETAILS_INIT:
        return initialState;
    }
  });

export default positionReducer;
