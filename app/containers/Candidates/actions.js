/*
 *
 * Candidates actions
 *
 */

import { CANDIDATE_PAGE_SET_LOADING, UPDATE_CANDIDATE_LIST } from "./constants";
import { getCandidates } from "api/candidate";

export const fetchCandidates = (params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getCandidates(params);
      dispatch(updateCandidateList(data));
    } catch (err) {
      dispatch(updateCandidateList());
    }
  };
};

export const searchForCandidates = (searchText) => {
  return async (dispatch) => {
    try {
      const { data } = await getCandidates({ searchText });
      dispatch(updateCandidateList(data));
    } catch (err) {
      dispatch(updateCandidateList());
    }
  };
};

const setLoading = (payload) => ({
  type: CANDIDATE_PAGE_SET_LOADING,
  payload,
});

const updateCandidateList = (payload = []) => ({
  type: UPDATE_CANDIDATE_LIST,
  payload,
});
