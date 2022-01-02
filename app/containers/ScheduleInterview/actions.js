/*
 *
 * ScheduleInterview actions
 *
 */

import {
  SET_LOADING,
  SET_INTERVIEW_DETAILS,
  VALIDATION_ERROR,
  INIT,
  CHANGE_ROUND,
  CHANGE_VENUE,
  CHANGE_INTERVIEW_MODE,
  CHANGE_INSTRUCTIONS,
  CHANGE_DATE_TIME,
} from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import { scheduleInterview } from "api/interview";
import _get from "lodash/get";
import schema from "./validations";

export const onSubmit = (interviewDetails, postAdd, next) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(interviewDetails);
      if (!isValid) {
        const err = await schema.validate(interviewDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await scheduleInterview(interviewDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Interview Scheduled successfully",
      });
      postAdd();
      dispatch(scheduleInterviewInit());
      next();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to schedule Interview",
      });
    }
  };
};

const showLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

const setInterviewDetails = (payload) => ({
  type: SET_INTERVIEW_DETAILS,
  payload,
});

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

export const scheduleInterviewInit = () => ({
  type: INIT,
});

export const changeRound = (payload) => ({
  type: CHANGE_ROUND,
  payload,
});

export const changeVenue = (payload) => ({
  type: CHANGE_VENUE,
  payload,
});

export const changeInterviewMode = (payload) => ({
  type: CHANGE_INTERVIEW_MODE,
  payload,
});

export const changeInstructions = (payload) => ({
  type: CHANGE_INSTRUCTIONS,
  payload,
});

export const changeDateTime = (payload) => ({
  type: CHANGE_DATE_TIME,
  payload,
});
