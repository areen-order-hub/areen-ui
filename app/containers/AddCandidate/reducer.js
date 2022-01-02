/*
 *
 * AddCandidate reducer
 *
 */
import produce from "immer";
import moment from "moment-timezone";
import {
  INIT,
  CHANGE_NAME,
  CHANGE_DOB,
  CHANGE_EMAIL,
  CHANGE_PHONE_NUMBER,
  CHANGE_GENDER,
  CHANGE_MARITAL_STATUS,
  CHANGE_PRESENT_LOCATION,
  CHANGE_NATIVE_LOCATION,
  ADD_NEW_QUALIFICATION,
  CHANGE_QUALIFICATION,
  CHANGE_YEARS_OF_EXPERIENCE,
  CHANGE_MONTHS_OF_EXPERIENCE,
  CHANGE_PRESENT_CTC,
  CHANGE_PRESENT_CTC_REMARKS,
  CHANGE_EXPECTED_CTC,
  CHANGE_EXPECTED_CTC_REMARKS,
  CHANGE_NOTICE_PERIOD,
  CHANGE_NOTICE_PERIOD_REMARKS,
  ADD_NEW_EXPERIENCE,
  CHANGE_EXPERIENCES,
  CHANGE_REPORTING_TO,
  CHANGE_NUMBER_OF_REPORTEES,
  CHANGE_REASON_FOR_CHANGE,
  ADD_NEW_ASSESSMENT,
  CHANGE_CONSULTANT_ASSESSMENT,
  CHANGE_EXISTING_OFFERED_AMOUNT,
  CHANGE_HOLDING_OFFER_STATUS,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_CANDIDATE_DETAILS,
} from "./constants";

export const initialState = {
  name: "",
  dateOfBirth: "",
  candidateEmail: "",
  phoneNumber: "",
  gender: "",
  maritalStatus: "",
  presentLocation: "",
  nativeLocation: "",
  qualification: [
    {
      degree: "",
      institution: "",
      passedOutYear: "",
      percentage: "",
    },
  ],
  yearsOfExperience: "",
  monthsOfExperience: "",
  presentCTC: "",
  presentCTCRemarks: "",
  expectedCTC: "",
  expectedCTCRemarks: "",
  noticePeriod: "",
  noticePeriodRemarks: "",
  experiences: [
    {
      companyName: "",
      designation: "",
      employmentPeriod: "",
    },
  ],
  reportingTo: "",
  noOfReportees: "",
  reasonForChange: "",
  consultantAssessment: [""],
  existingOfferAmount: "",
  isHoldingOffer: "",
  positionId: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const addCandidateReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_CANDIDATE_DETAILS:
        draft.name = action.payload.name;
        draft.dateOfBirth = moment(action.payload.dateOfBirth);
        draft.candidateEmail = action.payload.candidateEmail;
        draft.phoneNumber = action.payload.phoneNumber;
        draft.gender = {
          value: action.payload.gender,
          label: action.payload.gender,
        };
        draft.maritalStatus = {
          value: action.payload.maritalStatus,
          label: action.payload.maritalStatus,
        };
        draft.presentLocation = action.payload.presentLocation;
        draft.nativeLocation = action.payload.nativeLocation;
        draft.qualification = action.payload.qualification;
        draft.yearsOfExperience = action.payload.yearsOfExperience.split(
          "."
        )[0];
        draft.monthsOfExperience = action.payload.yearsOfExperience.split(
          "."
        )[1];
        draft.presentCTC = action.payload.presentCTC;
        draft.presentCTCRemarks = action.payload.presentCTCRemarks;
        draft.expectedCTC = action.payload.expectedCTC;
        draft.expectedCTCRemarks = action.payload.expectedCTCRemarks;
        draft.noticePeriod = action.payload.noticePeriod;
        draft.noticePeriodRemarks = action.payload.noticePeriodRemarks;
        draft.experiences = action.payload.experiences;
        draft.reportingTo = action.payload.reportingTo;
        draft.noOfReportees = action.payload.noOfReportees;
        draft.reasonForChange = action.payload.reasonForChange;
        draft.consultantAssessment = action.payload.consultantAssessment || [
          "",
        ];
        draft.existingOfferAmount = action.payload.existingOfferAmount;
        draft.isHoldingOffer = {
          value: `${action.payload.isHoldingOffer}`,
          label: action.payload.isHoldingOffer ? "Yes" : "No",
        };
        draft.positionId = action.payload.positionId;
        draft.isEdit = true;
        break;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_DOB:
        draft.dateOfBirth = action.payload;
        break;
      case CHANGE_EMAIL:
        draft.candidateEmail = action.payload;
        break;
      case CHANGE_PHONE_NUMBER:
        draft.phoneNumber = action.payload;
        break;
      case CHANGE_GENDER:
        draft.gender = action.payload;
        break;
      case CHANGE_MARITAL_STATUS:
        draft.maritalStatus = action.payload;
        break;
      case CHANGE_PRESENT_LOCATION:
        draft.presentLocation = action.payload;
        break;
      case CHANGE_NATIVE_LOCATION:
        draft.nativeLocation = action.payload;
        break;
      case ADD_NEW_QUALIFICATION:
        draft.qualification = [
          ...draft.qualification,
          {
            degree: "",
            institution: "",
            passedOutYear: "",
            percentage: "",
          },
        ];
        break;
      case CHANGE_QUALIFICATION:
        const {
          index: qualificationIndex,
          payload: qualificationPayload,
        } = action.payload;
        draft.qualification[qualificationIndex] = qualificationPayload;
        break;
      case CHANGE_YEARS_OF_EXPERIENCE:
        draft.yearsOfExperience = action.payload;
        break;
      case CHANGE_MONTHS_OF_EXPERIENCE:
        draft.monthsOfExperience = action.payload;
        break;
      case CHANGE_PRESENT_CTC:
        draft.presentCTC = action.payload;
        break;
      case CHANGE_PRESENT_CTC_REMARKS:
        draft.presentCTCRemarks = action.payload;
        break;
      case CHANGE_EXPECTED_CTC:
        draft.expectedCTC = action.payload;
        break;
      case CHANGE_EXPECTED_CTC_REMARKS:
        draft.expectedCTCRemarks = action.payload;
        break;
      case CHANGE_NOTICE_PERIOD:
        draft.noticePeriod = action.payload;
        break;
      case CHANGE_NOTICE_PERIOD_REMARKS:
        draft.noticePeriodRemarks = action.payload;
        break;
      case ADD_NEW_EXPERIENCE:
        draft.experiences = [
          ...draft.experiences,
          {
            companyName: "",
            designation: "",
            employmentPeriod: "",
          },
        ];
        break;
      case CHANGE_EXPERIENCES:
        const {
          index: experienceIndex,
          payload: experiencePayload,
        } = action.payload;
        draft.experiences[experienceIndex] = experiencePayload;
        break;
      case CHANGE_REPORTING_TO:
        draft.reportingTo = action.payload;
        break;
      case CHANGE_NUMBER_OF_REPORTEES:
        draft.noOfReportees = action.payload;
        break;
      case CHANGE_REASON_FOR_CHANGE:
        draft.reasonForChange = action.payload;
        break;
      case ADD_NEW_ASSESSMENT:
        draft.consultantAssessment = [...draft.consultantAssessment, ""];
        break;
      case CHANGE_CONSULTANT_ASSESSMENT:
        const {
          index: assessmentIndex,
          payload: assessmentPayload,
        } = action.payload;
        draft.consultantAssessment[assessmentIndex] = assessmentPayload;
        break;
      case CHANGE_EXISTING_OFFERED_AMOUNT:
        draft.existingOfferAmount = action.payload;
        break;
      case CHANGE_HOLDING_OFFER_STATUS:
        draft.isHoldingOffer = action.payload;
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

export default addCandidateReducer;
