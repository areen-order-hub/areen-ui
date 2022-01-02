/*
 *
 * AddRecruiter actions
 *
 */

import {
  INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PHONE_NUMBER,
  CHANGE_ROLE,
  CHANGE_DESIGNATION,
  CHANGE_JOINING_DATE,
  SET_RECRUITER_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from "./constants";
import history from "../../utils/history";
import _get from "lodash/get";
import schema from "./validations";
import { sendInvite, fetchUserDetails, patchUser } from "api/recruiter";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (recruiterDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(recruiterDetails);
      if (!isValid) {
        const err = await schema.validate(recruiterDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await sendInvite(recruiterDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Recruiter added successfully",
      });
      history.push("/recruiters");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Recruiters",
      });
    }
  };
};

export const onEdit = (id, recruiterDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(recruiterDetails);
      if (!isValid) {
        const err = await schema.validate(recruiterDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await patchUser(id, recruiterDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Recruiter edit successfully",
      });
      history.push("/recruiters");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit Recruiter",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchUserDetails(id);
      dispatch(setRecruiterDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch recruiter details",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setRecruiterDetails = (payload) => ({
  type: SET_RECRUITER_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const addRecruiterInit = (dispatch) => () => {
  dispatch({
    type: INIT,
  });
};

export const changeName = (payload) => ({
  type: CHANGE_NAME,
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

export const changeRole = (payload) => ({
  type: CHANGE_ROLE,
  payload,
});

export const changeDesignation = (payload) => ({
  type: CHANGE_DESIGNATION,
  payload,
});

export const changeJoiningDate = (payload) => ({
  type: CHANGE_JOINING_DATE,
  payload,
});
