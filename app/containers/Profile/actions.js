/*
 *
 * Profile actions
 *
 */

import { SET_PROFILE_DETAILS, PROFILE_DETAILS_INIT } from "./constants";
import { fetchUserDetails } from "api/recruiter";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchProfile = (recruiterId) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchUserDetails(recruiterId);
      dispatch(setProfileDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Profile details",
      });
    }
  };
};

const setProfileDetails = (payload) => ({
  type: SET_PROFILE_DETAILS,
  payload,
});

export const initProfileDetails = () => ({
  type: PROFILE_DETAILS_INIT,
});
