/*
 *
 * AddSpoc actions
 *
 */

import {
  INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_DESIGNATION,
  CHANGE_OFFICE_ADDRESS,
  CHANGE_ACC_HOLDER,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_SPOC_DETAILS,
  SET_AVAILABLE_USERS,
} from "./constants";
import { addSpocApi, editSpocApi, getSpoc } from "api/spoc";
import { getRecruiters } from "api/user";
import schema from "./validations";
import _get from "lodash/get";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (details, postAdd, next) => {
  return async (dispatch) => {
    try {
      const isValid = await schema.isValid(details);
      if (!isValid) {
        const err = await schema.validate(details).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      const {
        data: { _id, name },
      } = await addSpocApi(details);
      NotificationHandler.open({
        operation: "success",
        title: "SPOC added successfully",
      });
      postAdd({ id: _id, name });
      dispatch(initPage());
      next();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add the SPOC details",
      });
    }
  };
};

export const onEdit = (spocId, details, postAdd, next) => {
  return async (dispatch) => {
    try {
      const isValid = await schema.isValid(details);
      if (!isValid) {
        const err = await schema.validate(details).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await editSpocApi(spocId, details);
      postAdd({ id: spocId, name: details.name });
      NotificationHandler.open({
        operation: "success",
        title: "SPOC details updated successfully",
      });
      dispatch(initPage());
      next();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the SPOC details",
      });
    }
  };
};

export const fetchSpoc = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getSpoc(id);
      dispatch(setSpocDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch SPOC Details",
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

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setSpocDetails = (payload) => ({
  type: SET_SPOC_DETAILS,
  payload,
});

const setAvailableUsers = (payload) => ({
  type: SET_AVAILABLE_USERS,
  payload,
});

export const initPage = () => ({
  type: INIT,
});

export const changeName = (payload) => ({
  type: CHANGE_NAME,
  payload,
});

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const changePhone = (payload) => ({
  type: CHANGE_PHONE,
  payload,
});

export const changeDesignation = (payload) => ({
  type: CHANGE_DESIGNATION,
  payload,
});

export const changeOfficeAddress = (payload) => ({
  type: CHANGE_OFFICE_ADDRESS,
  payload,
});

export const changeAccHolder = (payload) => ({
  type: CHANGE_ACC_HOLDER,
  payload,
});
