/*
 *
 * PositionTracker actions
 *
 */

import { SET_CANDIDATE_FIELDS, SET_CANDIDATES } from "./constants";
import { getFields, getCandidates } from "api/candidate";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import _get from "lodash/get";

export const fetchFields = () => {
  return async (dispatch) => {
    try {
      const { data } = await getFields();
      dispatch(setCandidateFields(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchCandidates = (positionId) => {
  return async (dispatch) => {
    try {
      const { data } = await getCandidates({ positionId });
      dispatch(setCandidates(data));
    } catch (err) {
      console.warn(err);
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Candidate details",
      });
    }
  };
};

const setCandidateFields = (payload = []) => ({
  type: SET_CANDIDATE_FIELDS,
  payload,
});

const setCandidates = (payload = []) => ({
  type: SET_CANDIDATES,
  payload,
});
