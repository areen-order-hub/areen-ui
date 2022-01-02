/*
 *
 * Candidate reducer
 *
 */
import produce from "immer";
import { parseDate } from "../../utils/dateTimeHelpers";

import {
  SET_CANDIDATE_DETAILS,
  SET_INTERVIEW_DETAILS,
  CANDIDATE_DETAILS_INIT,
} from "./constants";

export const initialState = {
  name: "",
  dateOfBirth: "",
  candidateEmail: "",
  gender: "",
  maritalStatus: "",
  presentLocation: "",
  nativeLocation: "",
  qualification: [],
  yearsOfExperience: "",
  presentCTC: "",
  presentCTCRemarks: "",
  expectedCTC: "",
  expectedCTCRemarks: "",
  noticePeriod: "",
  noticePeriodRemarks: "",
  experiences: [],
  reportingTo: "",
  reasonForChange: "",
  consultantAssessment: [],
  isHoldingOffer: "",
  existingOfferAmount: "",
  joiningDate: "",
  currentOfferAmount: "",
  addedBy: "",
  candidateFile: "",
  isLoading: true,
  isInterviewsLoading: true,
  interviews: [],
};

/* eslint-disable default-case, no-param-reassign */
const candidateReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CANDIDATE_DETAILS:
        draft.name = action.payload.name;
        draft.dateOfBirth = parseDate(
          action.payload.dateOfBirth,
          "DD MMM YYYY"
        );
        draft.candidateEmail = action.payload.candidateEmail;
        draft.gender = action.payload.gender;
        draft.maritalStatus = action.payload.maritalStatus;
        draft.presentLocation = action.payload.presentLocation;
        draft.nativeLocation = action.payload.nativeLocation;
        draft.qualification = action.payload.qualification;
        draft.yearsOfExperience = action.payload.yearsOfExperience;
        draft.presentCTC = action.payload.presentCTC;
        draft.presentCTCRemarks = action.payload.presentCTCRemarks;
        draft.expectedCTC = action.payload.expectedCTC;
        draft.expectedCTCRemarks = action.payload.expectedCTCRemarks;
        draft.noticePeriod = action.payload.noticePeriod;
        draft.noticePeriodRemarks = action.payload.noticePeriodRemarks;
        draft.experiences = action.payload.experiences;
        draft.reportingTo = action.payload.reportingTo;
        draft.reasonForChange = action.payload.reasonForChange;
        draft.consultantAssessment = action.payload.consultantAssessment;
        draft.isHoldingOffer = action.payload.isHoldingOffer ? "Yes" : "No";
        draft.existingOfferAmount = action.payload.existingOfferAmount;
        draft.joiningDate = action.payload.joiningDate
          ? parseDate(action.payload.joiningDate, "DD MMM YYYY")
          : "-";
        draft.currentOfferAmount = action.payload.currentOfferAmount
          ? action.payload.currentOfferAmount
          : "-";
        draft.addedBy = action.payload.addedBy;
        draft.candidateFile = action.payload.candidateFile;
        draft.isLoading = false;
        break;
      case SET_INTERVIEW_DETAILS:
        draft.interviews = action.payload;
        draft.isInterviewsLoading = false;
        break;
      case CANDIDATE_DETAILS_INIT:
        return initialState;
    }
  });

export default candidateReducer;
