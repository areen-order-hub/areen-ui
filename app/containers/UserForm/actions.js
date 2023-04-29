/*
 *
 * UserForm actions
 *
 */

import {
  INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_ROLES,
  SHOW_LOADING,
  SET_USER_DETAILS,
  VALIDATION_ERROR,
} from "./constants";
import { sendInvite, getUser, patchUser } from "api/user";
import history from "../../utils/history";
import { get } from "lodash";
import schema from "./validations";
import NotificationHandler from "components/Notifications/NotificationHandler";

export const onSubmit = (userDetails, userType) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(userDetails);
      if (!isValid) {
        const err = await schema.validate(userDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      await sendInvite(userDetails);
      NotificationHandler.open({
        operation: "success",
        title: "User invited successfully",
      });
      history.push(`/users/${userType}`);
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to invite User",
      });
    } finally {
      dispatch(showLoading(false));
    }
  };
};

export const onEdit = (id, userDetails, userType) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(userDetails);
      if (!isValid) {
        const err = await schema.validate(userDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      await patchUser(id, userDetails);
      NotificationHandler.open({
        operation: "success",
        title: "User updated successfully",
      });
      history.push(`/users/${userType}`);
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update User",
      });
    } finally {
      dispatch(showLoading(false));
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getUser(id);
      dispatch(setUserDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch user details",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setUserDetails = (payload) => ({
  type: SET_USER_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const addUserInit = (dispatch) => () => {
  dispatch({ type: INIT });
};

export const changeName = (payload) => ({
  type: CHANGE_NAME,
  payload,
});

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const changeRoles = (payload) => ({
  type: CHANGE_ROLES,
  payload,
});
