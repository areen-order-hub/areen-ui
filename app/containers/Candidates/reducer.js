/*
 *
 * Candidates reducer
 *
 */
import produce from "immer";
import { CANDIDATE_PAGE_SET_LOADING, UPDATE_CANDIDATE_LIST } from "./constants";

export const initialState = {
  isLoading: true,
  candidates: [],
};

/* eslint-disable default-case, no-param-reassign */
const candidatesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CANDIDATE_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case UPDATE_CANDIDATE_LIST:
        draft.candidates = action.payload;
        draft.isLoading = false;
        break;
    }
  });

export default candidatesReducer;
