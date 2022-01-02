/*
 *
 * Candidate actions
 *
 */
import _get from "lodash/get";
import {
  SET_CANDIDATE_DETAILS,
  SET_INTERVIEW_DETAILS,
  CANDIDATE_DETAILS_INIT,
} from "./constants";
import { downloadFile } from "api/file";
import { getInterviews } from "api/interview";
import { fetchCandidateDetails, deleteCandidate } from "api/candidate";
import history from "utils/history";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchInterviews = (candidateId) => {
  return async (dispatch) => {
    try {
      const { data } = await getInterviews({ candidateId });
      dispatch(setInterviewDetails(data));
    } catch (error) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Interview details",
      });
    }
  };
};

export const fetchCandidate = (candidateId) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchCandidateDetails(candidateId);
      const { data: url } = await downloadFile("snapshots", data.fileUrl[0]);
      dispatch(setCandidateDetails({ ...data, candidateFile: url }));
    } catch (err) {
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

export const onDelete = (id) => {
  return async (dispatch) => {
    try {
      await deleteCandidate(id);
      history.push("/candidates");
      NotificationHandler.open({
        operation: "success",
        title: "Candidate deleted successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Candidate",
      });
    }
  };
};

export const candidateDetailsInit = () => ({
  type: CANDIDATE_DETAILS_INIT,
});

const setCandidateDetails = (payload) => ({
  type: SET_CANDIDATE_DETAILS,
  payload,
});

const setInterviewDetails = (payload = []) => ({
  type: SET_INTERVIEW_DETAILS,
  payload,
});
