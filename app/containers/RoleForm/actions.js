/*
 *
 * RoleForm actions
 *
 */

import {
  INIT,
  CHANGE_ROLE,
  CHANGE_ACCESS,
  SHOW_LOADING,
  SET_ROLE_DETAILS,
  VALIDATION_ERROR,
} from "./constants";
import { addRole, getRole, editRole } from "api/role";
import history from "../../utils/history";
import { get } from "lodash";
import schema from "./validations";
import NotificationHandler from "components/Notifications/NotificationHandler";

export const onSubmit = (roleDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(roleDetails);
      if (!isValid) {
        const err = await schema.validate(roleDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      await addRole(roleDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Role added successfully",
      });
      history.push("/roles");
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add role",
      });
    } finally {
      dispatch(showLoading(false));
    }
  };
};

export const onEdit = (id, roleDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(roleDetails);
      if (!isValid) {
        const err = await schema.validate(roleDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      await editRole(id, roleDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Role updated successfully",
      });
      history.push("/roles");
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the role",
      });
    } finally {
      dispatch(showLoading(false));
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getRole(id);
      dispatch(setRoleDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch role details",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setRoleDetails = (payload) => ({
  type: SET_ROLE_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const addRoleInit = (dispatch) => () => {
  dispatch({ type: INIT });
};

export const changeRole = (payload) => ({
  type: CHANGE_ROLE,
  payload,
});

export const changeAccess = (payload) => ({
  type: CHANGE_ACCESS,
  payload,
});
