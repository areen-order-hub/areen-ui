/*
 *
 * Roles reducer
 *
 */
import produce from "immer";
import { SET_ROLE_LIST, SET_ROLE_LIST_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  roles: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const rolesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ROLE_LIST:
        const { docs, totalPages, ...rest } = action.payload;
        draft.roles = docs;
        draft.paginationDetails = {
          totalPages,
          pageNumbers: Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ),
          ...rest,
        };
        break;
      case SET_ROLE_LIST_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default rolesReducer;
