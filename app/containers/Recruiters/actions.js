/*
 *
 * Recruiters actions
 *
 */

import {
  UPDATE_RECRUITERS_LIST,
  RECRUITERS_PAGE_SET_LOADING,
} from "./constants";
import { getRecruiters } from "api/user";
import { patchUser } from "api/recruiter";
import NotificationHandler from "components/Notifications/NotificationHandler";

export const updateRecruiterStatus = (id, recruiterDetails) => {
  return async (dispatch) => {
    try {
      await patchUser(id, recruiterDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Recruiter's status changed successfully",
      });
      dispatch(fetchRecruiters());
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to change Recruiter's status",
      });
    }
  };
};

export function fetchRecruiters() {
  return async (dispatch) => {
    try {
      const { data } = await getRecruiters();
      dispatch(updateRecruitersList(data));
    } catch (err) {
      dispatch(updateRecruitersList());
    }
  };
}

const setLoading = (payload) => ({
  type: RECRUITERS_PAGE_SET_LOADING,
  payload,
});

const updateRecruitersList = (payload = []) => ({
  type: UPDATE_RECRUITERS_LIST,
  payload,
});
