/*
 *
 * Dashboard actions
 *
 */
import _get from "lodash/get";
import moment from "moment-timezone";
import {
  DASHBOARD_SET_LOADING,
  SET_DASHBOARD_DETAILS,
  SET_INTERVIEW_DETAILS,
  SET_EVENT_DETAILS,
} from "./constants";
import { downloadFile, getDashboardDetails } from "./dashboardApi";
import { getInterviews } from "api/interview";
import { getEvents } from "api/commonDetail";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const getCount = () => {
  return async (dispatch) => {
    try {
      const { data } = await getDashboardDetails();
      dispatch(updateDashboardDetails(data));
    } catch (err) {
      dispatch(updateDashboardDetails());
    }
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      const { data } = await getEvents();
      dispatch(setEventDetails(data));
    } catch (err) {
      dispatch(setEventDetails());
    }
  };
};

export const fetchInterviews = () => {
  return async (dispatch) => {
    try {
      const { data: todaysInterviews } = await getInterviews({
        from: moment()
          .startOf("day")
          .valueOf(),
        to: moment()
          .endOf("day")
          .valueOf(),
      });

      const { data: tomorrowsInterviews } = await getInterviews({
        from: moment()
          .add(1, "days")
          .startOf("day")
          .valueOf(),
        to: moment()
          .add(1, "days")
          .endOf("day")
          .valueOf(),
      });
      dispatch(setInterviewDetails({ todaysInterviews, tomorrowsInterviews }));
    } catch (err) {
      dispatch(setInterviewDetails());
    }
  };
};

const setLoading = (payload) => ({
  type: DASHBOARD_SET_LOADING,
  payload,
});

const updateDashboardDetails = (payload = []) => ({
  type: SET_DASHBOARD_DETAILS,
  payload,
});

const setInterviewDetails = (payload = []) => ({
  type: SET_INTERVIEW_DETAILS,
  payload,
});

const setEventDetails = (payload = []) => ({
  type: SET_EVENT_DETAILS,
  payload,
});
