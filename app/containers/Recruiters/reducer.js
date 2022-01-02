/*
 *
 * Recruiters reducer
 *
 */
import produce from "immer";
import {
  UPDATE_RECRUITERS_LIST,
  RECRUITERS_PAGE_SET_LOADING,
} from "./constants";

export const initialState = {
  recruiters: [],
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const recruitersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RECRUITERS_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case UPDATE_RECRUITERS_LIST:
        draft.recruiters = action.payload;
        draft.isLoading = false;
        break;
    }
  });

export default recruitersReducer;
