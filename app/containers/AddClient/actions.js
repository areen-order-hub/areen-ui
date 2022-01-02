/*
 *
 * AddClient actions
 *
 */

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
import history from "../../utils/history";
import _get from "lodash/get";
import schema from "./validations";
import { getRecruiters } from "api/user";
import { uploadFile, downloadFile } from "api/file";
import { getClient, addClientApi, editClientApi } from "api/client";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
const { v4: uuidv4 } = require("uuid");

export const onSubmit = ({ file, ...clientDetails }) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(clientDetails);
      if (!isValid) {
        const err = await schema.validate(clientDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      const industry = clientDetails.industry.map((industry) => industry.value);
      const products = clientDetails.products.map((product) => product.value);
      const targetCompanies = clientDetails.targetCompanies.map(
        (targetCompanies) => targetCompanies.value
      );
      const nonPoachCompanies = clientDetails.nonPoachCompanies.map(
        (nonPoachCompanies) => nonPoachCompanies.value
      );

      let agreementFile = "";

      if (file[0]) {
        let formData = new FormData();
        formData.append("file", file[0]);
        const fileKey = uuidv4();
        await uploadFile(formData, "clientAgreements", fileKey);
        agreementFile = fileKey;
      }

      await addClientApi({
        ...clientDetails,
        industry,
        products,
        targetCompanies,
        nonPoachCompanies,
        agreementFile,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Client added successfully",
      });
      history.push("/clients");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Client",
      });
    }
  };
};

export const editClient = (id, { file, ...clientDetails }) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(clientDetails);
      if (!isValid) {
        const err = await schema.validate(clientDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      const industry = clientDetails.industry.map((industry) => industry.value);
      const products = clientDetails.products.map((product) => product.value);
      const targetCompanies = clientDetails.targetCompanies.map(
        (targetCompanies) => targetCompanies.value
      );
      const nonPoachCompanies = clientDetails.nonPoachCompanies.map(
        (nonPoachCompanies) => nonPoachCompanies.value
      );

      let fileKeyId = "";
      if (file[0]) {
        let formData = new FormData();
        formData.append("file", file[0]);
        const fileKey = uuidv4();
        const response = await uploadFile(
          formData,
          "clientAgreements",
          fileKey
        );
        fileKeyId = fileKey;
      }

      await editClientApi(id, {
        ...clientDetails,
        industry,
        products,
        targetCompanies,
        nonPoachCompanies,
        agreementFile:
          fileKeyId == "" ? clientDetails.agreementFile : fileKeyId,
      });

      NotificationHandler.open({
        operation: "success",
        title: "Client updated successfully",
      });
      history.push("/clients");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the client",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getClient(id);
      let signedUrl = "";
      if (data.agreementFile) {
        let { data: url } = await downloadFile(
          "clientAgreements",
          data.agreementFile
        );
        signedUrl = url;
      }
      dispatch(setClientDetails({ ...data, signedUrl }));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch client details",
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

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setClientDetails = (payload) => ({
  type: SET_CLIENT_DETAILS,
  payload,
});

const setAvailableUsers = (payload) => ({
  type: SET_AVAILABLE_USERS,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const addClientInit = (dispatch) => () => {
  dispatch({ type: INIT });
};

export const changeName = (payload) => ({
  type: CHANGE_NAME,
  payload,
});

export const changeAlias = (payload) => ({
  type: CHANGE_ALIAS,
  payload,
});

export const changeAbout = (payload) => ({
  type: CHANGE_ABOUT,
  payload,
});

export const changeIndustry = (payload) => ({
  type: CHANGE_INDUSTRY,
  payload,
});

export const changeAddress = (payload) => ({
  type: CHANGE_ADDRESS,
  payload,
});

export const changeCity = (payload) => ({
  type: CHANGE_CITY,
  payload,
});

export const changeWebsite = (payload) => ({
  type: CHANGE_WEBSITE,
  payload,
});

export const changeNoOfSiteLocations = (payload) => ({
  type: CHANGE_NO_OF_SITE_LOCATIONS,
  payload,
});

export const changeSiteLocations = (payload) => ({
  type: CHANGE_SITE_LOCATIONS,
  payload,
});

export const changeProducts = (payload) => ({
  type: CHANGE_PRODUCTS,
  payload,
});

export const changeEmployeeCount = (payload) => ({
  type: CHANGE_EMPLOYEE_COUNT,
  payload,
});

export const changeNoOfWorkingDays = (payload) => ({
  type: CHANGE_NO_OF_WORKING_DAYS,
  payload,
});

export const changeGeneralShiftDetails = (payload) => ({
  type: CHANGE_GENERAL_SHIFT_DETAILS,
  payload,
});

export const changeShiftBased = (payload) => ({
  type: CHANGE_SHIFT_BASED,
  payload,
});

export const addNewShift = () => ({
  type: ADD_NEW_SHIFT,
});

export const changeShiftDetails = (payload) => ({
  type: CHANGE_SHIFT_DETAILS,
  payload,
});

export const changeNonPoachCompanies = (payload) => ({
  type: CHANGE_NON_POACH_COMPANIES,
  payload,
});

export const changeTargetCompanies = (payload) => ({
  type: CHANGE_TARGET_COMPANIES,
  payload,
});

export const changeGSTIN = (payload) => ({
  type: CHANGE_GSTIN,
  payload,
});

export const changeRemarks = (payload) => ({
  type: CHANGE_REMARKS,
  payload,
});

export const changeAgreementExpiryDate = (payload) => ({
  type: CHANGE_AGREEMENT_EXPIRY_DATE,
  payload,
});

export const changeCommercial = (payload) => ({
  type: CHANGE_COMMERCIAL,
  payload,
});

export const changeSuperAccHolder = (payload) => ({
  type: CHANGE_SUPER_ACC_HOLDER,
  payload,
});
