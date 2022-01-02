/*
 *
 * AddCandidate actions
 *
 */

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
import history from "../../utils/history";
import _get from "lodash/get";
import schema from "./validations";
import { uploadFile } from "api/file";
import {
  addCandidateApi,
  editCandidateApi,
  fetchCandidateDetails,
} from "api/candidate";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
const { v4: uuidv4 } = require("uuid");

export const onSubmit = (
  {
    files,
    mergedFile,
    yearsOfExperience,
    monthsOfExperience,
    ...candidateDetails
  },
  postAdd,
  next
) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync({
        yearsOfExperience,
        monthsOfExperience,
        ...candidateDetails,
      });
      if (!isValid) {
        const err = await schema
          .validate({
            yearsOfExperience,
            monthsOfExperience,
            ...candidateDetails,
          })
          .catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      let fileKeys = [];
      let formData = new FormData();
      formData.append("file", mergedFile);
      const fileKey = uuidv4();
      const response = await uploadFile(formData, "snapshots", fileKey);
      fileKeys.push(fileKey);

      await addCandidateApi({
        ...candidateDetails,
        fileUrl: fileKeys,
        yearsOfExperience: `${yearsOfExperience
          .toString()
          .padStart(2, 0)}.${monthsOfExperience.toString().padStart(2, 0)}`,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Candidate added successfully",
      });
      postAdd();
      dispatch(addCandidateInit());
      next();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Candidate",
      });
    }
  };
};

export const editCandidate = (
  id,
  {
    files,
    mergedFile,
    yearsOfExperience,
    monthsOfExperience,
    ...candidateDetails
  },
  postAdd,
  next
) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync({
        yearsOfExperience,
        monthsOfExperience,
        ...candidateDetails,
      });
      if (!isValid) {
        const err = await schema
          .validate({
            yearsOfExperience,
            monthsOfExperience,
            ...candidateDetails,
          })
          .catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      let fileKeys = [];
      let formData = new FormData();
      formData.append("file", mergedFile);
      const fileKey = uuidv4();
      const response = await uploadFile(formData, "snapshots", fileKey);
      fileKeys.push(fileKey);

      await editCandidateApi(id, {
        ...candidateDetails,
        fileUrl: fileKeys,
        yearsOfExperience: `${yearsOfExperience
          .toString()
          .padStart(2, 0)}.${monthsOfExperience.toString().padStart(2, 0)}`,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Candidate updated successfully",
      });
      postAdd();
      dispatch(addCandidateInit());
      next();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the candidate",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchCandidateDetails(id);
      dispatch(setCandidateDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch candidate details",
      });
    }
  };
};

export const addCandidateInit = () => ({
  type: INIT,
});

export const changeName = (payload) => ({
  type: CHANGE_NAME,
  payload,
});

export const changeDob = (payload) => ({
  type: CHANGE_DOB,
  payload,
});

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const changePhoneNumber = (payload) => ({
  type: CHANGE_PHONE_NUMBER,
  payload,
});

export const changeGender = (payload) => ({
  type: CHANGE_GENDER,
  payload,
});

export const changeMaritalStatus = (payload) => ({
  type: CHANGE_MARITAL_STATUS,
  payload,
});

export const changePresentLocation = (payload) => ({
  type: CHANGE_PRESENT_LOCATION,
  payload,
});

export const changeNativeLocation = (payload) => ({
  type: CHANGE_NATIVE_LOCATION,
  payload,
});

export const addNewQualification = () => ({
  type: ADD_NEW_QUALIFICATION,
});

export const changeQualification = (payload) => ({
  type: CHANGE_QUALIFICATION,
  payload,
});

export const changeYearsOfExperience = (payload) => ({
  type: CHANGE_YEARS_OF_EXPERIENCE,
  payload,
});

export const changeMonthsOfExperience = (payload) => ({
  type: CHANGE_MONTHS_OF_EXPERIENCE,
  payload,
});

export const changePresentCTC = (payload) => ({
  type: CHANGE_PRESENT_CTC,
  payload,
});

export const changePresentCTCRemarks = (payload) => ({
  type: CHANGE_PRESENT_CTC_REMARKS,
  payload,
});

export const changeExpectedCTC = (payload) => ({
  type: CHANGE_EXPECTED_CTC,
  payload,
});

export const changeExpectedCTCRemarks = (payload) => ({
  type: CHANGE_EXPECTED_CTC_REMARKS,
  payload,
});

export const changeNoticePeriod = (payload) => ({
  type: CHANGE_NOTICE_PERIOD,
  payload,
});

export const changeNoticePeriodRemarks = (payload) => ({
  type: CHANGE_NOTICE_PERIOD_REMARKS,
  payload,
});

export const addNewExperience = () => ({
  type: ADD_NEW_EXPERIENCE,
});

export const changeExperiences = (payload) => ({
  type: CHANGE_EXPERIENCES,
  payload,
});

export const changeReportingTo = (payload) => ({
  type: CHANGE_REPORTING_TO,
  payload,
});

export const changeNumberOfReportees = (payload) => ({
  type: CHANGE_NUMBER_OF_REPORTEES,
  payload,
});

export const changeReasonForChange = (payload) => ({
  type: CHANGE_REASON_FOR_CHANGE,
  payload,
});

export const addNewAssessment = () => ({
  type: ADD_NEW_ASSESSMENT,
});

export const changeconsultantAssessment = (payload) => ({
  type: CHANGE_CONSULTANT_ASSESSMENT,
  payload,
});

export const changeExistingOfferedAmount = (payload) => ({
  type: CHANGE_EXISTING_OFFERED_AMOUNT,
  payload,
});

export const changeHoldingOfferStatus = (payload) => ({
  type: CHANGE_HOLDING_OFFER_STATUS,
  payload,
});

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setCandidateDetails = (payload) => ({
  type: SET_CANDIDATE_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});
