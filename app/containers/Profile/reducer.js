/*
 *
 * Profile reducer
 *
 */
import produce from "immer";
import { SET_PROFILE_DETAILS, PROFILE_DETAILS_INIT } from "./constants";
import { parseDate } from "utils/dateTimeHelpers";

export const initialState = {
  isLoading: true,
  name: "",
  designation: "",
  email: "",
  joiningDate: "",
};

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PROFILE_DETAILS_INIT:
        return initialState;
      case SET_PROFILE_DETAILS:
        draft.name = action.payload.name;
        draft.designation = action.payload.designation;
        draft.email = action.payload.email;
        draft.joiningDate = action.payload.joiningDate
          ? parseDate(action.payload.joiningDate, "DD MMM YYYY")
          : "-";
        draft.isLoading = false;
        break;
    }
  });

export default profileReducer;
