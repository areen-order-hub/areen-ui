/*
 *
 * Users reducer
 *
 */
import produce from "immer";
import { SET_USER_LIST, SET_USER_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  users: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER_LIST:
        const { docs, totalPages, ...rest } = action.payload;
        draft.users = docs;
        draft.paginationDetails = {
          totalPages,
          pageNumbers: Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ),
          ...rest,
        };
        draft.isLoading = false;
        break;
      case SET_USER_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default usersReducer;
