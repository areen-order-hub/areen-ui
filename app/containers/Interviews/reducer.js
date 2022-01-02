/*
 *
 * Interviews reducer
 *
 */
import produce from "immer";
import { SET_LOADING, SET_INTERVIEW_LIST } from "./constants";

export const initialState = {
  isLoading: true,
  interviews: [],
};

/* eslint-disable default-case, no-param-reassign */
const interviewsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SET_INTERVIEW_LIST:
        draft.interviews = action.payload;
        draft.isLoading = false;
        break;
    }
  });

export default interviewsReducer;
