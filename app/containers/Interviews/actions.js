/*
 *
 * Interviews actions
 *
 */

import { SET_LOADING, SET_INTERVIEW_LIST } from "./constants";
import { getInterviews } from "api/interview";

export const fetchInterviews = (params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getInterviews(params);
      dispatch(setInterviewList(data));
    } catch (err) {
      dispatch(setInterviewList());
    }
  };
};

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

const setInterviewList = (payload = []) => ({
  type: SET_INTERVIEW_LIST,
  payload,
});
