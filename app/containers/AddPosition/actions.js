/*
 *
 * AddPosition actions
 *
 */

import {
  INIT,
  CHANGE_POSITION_STATUS,
  CHANGE_RECEIVED_DATE,
  CHANGE_JOB_TITLE,
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
  CHANGE_SPOC_ID,
  CHANGE_RECRUITER_ASSIGNED,
  AVAILABLE_CLIENTS,
  AVAILABLE_SPOCS,
  SET_AVAILABLE_USERS,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_POSITION_DETAILS,
} from "./constants";
import history from "../../utils/history";
import _get from "lodash/get";
import schema from "./validations";
import { getClientsForPosition } from "api/client";
import { getSpocs } from "api/spoc";
import { getRecruiters } from "api/user";
import { uploadFile, downloadFile } from "api/file";
import { addPositionApi, editPositionApi, getPosition } from "api/position";
import { filterAndShapeClients, filterAndShapeSpocs } from "./helpers";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
const { v4: uuidv4 } = require("uuid");

export const fetchClients = (userId, userRole) => {
  return async (dispatch) => {
    try {
      let { data } = await getClientsForPosition();
      for (let i = 0; i < data.length; i++) {
        const { data: spocData } = await getSpocs({
          clientId: data[i]._id,
        });
        data[i].spocDetails = spocData;
      }
      const clientsAvailable = filterAndShapeClients(data, userId, userRole);
      dispatch(setAvailableClientDetails(clientsAvailable));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch clients",
      });
    }
  };
};

export const fetchSpocs = (clientId, userId, userRole) => {
  return async (dispatch) => {
    try {
      const { data } = await getSpocs({ clientId });
      const spocsAvailable = filterAndShapeSpocs(data, userId, userRole);
      dispatch(setAvailableSpocs(spocsAvailable));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch spocs",
      });
    }
  };
};

export const fetchAvailableUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await getRecruiters();
      dispatch(setAvailableUsers(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch User details",
      });
    }
  };
};

export const onSubmit = ({ file, ...positionDetails }) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(positionDetails);
      if (!isValid) {
        const err = await schema.validate(positionDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      const skillsRequired = positionDetails.skillsRequired.map(
        (skill) => skill.value
      );
      const targetIndustry = positionDetails.targetIndustry.map(
        (industry) => industry.value
      );
      const targetCompanies = positionDetails.targetCompanies.map(
        (company) => company.value
      );
      const nonPoachCompanies = positionDetails.nonPoachCompanies.map(
        (company) => company.value
      );

      let jobDescriptionFile = "";
      if (file[0]) {
        let formData = new FormData();
        formData.append("file", file[0]);
        const fileKey = uuidv4();
        const response = await uploadFile(formData, "jobDescriptions", fileKey);
        jobDescriptionFile = fileKey;
      }

      await addPositionApi({
        ...positionDetails,
        skillsRequired,
        targetIndustry,
        targetCompanies,
        nonPoachCompanies,
        jobDescriptionFile,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Position added successfully",
      });
      history.push("/positions");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Position",
      });
    }
  };
};

export const editPosition = (id, { file, ...positionDetails }) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(positionDetails);
      if (!isValid) {
        const err = await schema.validate(positionDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      const skillsRequired = positionDetails.skillsRequired.map(
        (skill) => skill.value
      );
      const targetIndustry = positionDetails.targetIndustry.map(
        (industry) => industry.value
      );
      const targetCompanies = positionDetails.targetCompanies.map(
        (company) => company.value
      );
      const nonPoachCompanies = positionDetails.nonPoachCompanies.map(
        (company) => company.value
      );

      let fileKeyId = "";
      if (file[0]) {
        let formData = new FormData();
        formData.append("file", file[0]);
        const fileKey = uuidv4();
        const response = await uploadFile(formData, "jobDescriptions", fileKey);
        fileKeyId = fileKey;
      }

      await editPositionApi(id, {
        ...positionDetails,
        skillsRequired,
        targetIndustry,
        targetCompanies,
        nonPoachCompanies,
        jobDescriptionFile:
          fileKeyId == "" ? positionDetails.jobDescriptionFile : fileKeyId,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Position updated successfully",
      });
      history.push("/positions");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the position",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getPosition(id);
      const { data: url } = await downloadFile(
        "jobDescriptions",
        data.jobDescriptionFile
      );
      dispatch(setPositionDetails({ ...data, signedUrl: url }));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch position details",
      });
    }
  };
};

const setPositionDetails = (payload) => ({
  type: SET_POSITION_DETAILS,
  payload,
});

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

const setAvailableClientDetails = (payload) => ({
  type: AVAILABLE_CLIENTS,
  payload,
});

const setAvailableSpocs = (payload) => ({
  type: AVAILABLE_SPOCS,
  payload,
});

const setAvailableUsers = (payload) => ({
  type: SET_AVAILABLE_USERS,
  payload,
});

export const addPositionInit = (dispatch) => () => {
  dispatch({ type: INIT });
};

export const changePositionStatus = (payload) => ({
  type: CHANGE_POSITION_STATUS,
  payload,
});

export const changeReceivedDate = (payload) => ({
  type: CHANGE_RECEIVED_DATE,
  payload,
});

export const changeJobTitle = (payload) => ({
  type: CHANGE_JOB_TITLE,
  payload,
});

export const changeDepartment = (payload) => ({
  type: CHANGE_DEPARTMENT,
  payload,
});

export const changeReportingTo = (payload) => ({
  type: CHANGE_REPORTING_TO,
  payload,
});

export const changeReportees = (payload) => ({
  type: CHANGE_REPORTEES,
  payload,
});

export const changeNoOfVacancies = (payload) => ({
  type: CHANGE_NUMBER_OF_VACANCIES,
  payload,
});

export const changeMinBudget = (payload) => ({
  type: CHANGE_MIN_BUDGET,
  payload,
});

export const changeMaxBudget = (payload) => ({
  type: CHANGE_MAX_BUDGET,
  payload,
});

export const changeBudgetRemarks = (payload) => ({
  type: CHANGE_BUDGET_REMARKS,
  payload,
});

export const changeMinYoe = (payload) => ({
  type: CHANGE_MIN_YEARS_OF_EXPERIENCE,
  payload,
});

export const changeMaxYoe = (payload) => ({
  type: CHANGE_MAX_YEARS_OF_EXPERIENCE,
  payload,
});

export const changeYoeRemarks = (payload) => ({
  type: CHANGE_YEARS_OF_EXPERIENCE_REMARKS,
  payload,
});

export const changeAgeRange = (payload) => ({
  type: CHANGE_AGE_RANGE,
  payload,
});

export const changeQualification = (payload) => ({
  type: CHANGE_QUALIFICATION,
  payload,
});

export const changeLocation = (payload) => ({
  type: CHANGE_LOCATION,
  payload,
});

export const changeSkillsRequired = (payload) => ({
  type: CHANGE_SKILLS_REQUIRED,
  payload,
});

export const changeTargetIndustry = (payload) => ({
  type: CHANGE_TARGET_INDUSTRY,
  payload,
});

export const changeTargetCompanies = (payload) => ({
  type: CHANGE_TARGET_COMPANIES,
  payload,
});

export const changeNonPoachCompanies = (payload) => ({
  type: CHANGE_NON_POACH_COMPANIES,
  payload,
});

export const changeRemarks = (payload) => ({
  type: CHANGE_REMARKS,
  payload,
});

export const changeClientId = (payload) => ({
  type: CHANGE_CLIENT_ID,
  payload,
});

export const changeSpocId = (payload) => ({
  type: CHANGE_SPOC_ID,
  payload,
});

export const changeRecruiterAssigned = (payload) => ({
  type: CHANGE_RECRUITER_ASSIGNED,
  payload,
});
