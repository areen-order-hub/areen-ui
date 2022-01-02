/*
 *
 * AddRecruiter reducer
 *
 */
import produce from "immer";
import {
  INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PHONE_NUMBER,
  CHANGE_ROLE,
  CHANGE_DESIGNATION,
  CHANGE_JOINING_DATE,
  SET_RECRUITER_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from "./constants";
import moment from "moment-timezone";

export const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
  designation: "",
  joiningDate: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const addRecruiterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_RECRUITER_DETAILS:
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.phoneNumber = action.payload.phoneNumber;
        draft.role = action.payload.role;
        draft.designation = action.payload.designation;
        draft.joiningDate =
          action.payload.joiningDate == null
            ? ""
            : moment(action.payload.joiningDate);
        draft.isEdit = true;
        break;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case CHANGE_PHONE_NUMBER:
        draft.phoneNumber = action.payload;
        break;
      case CHANGE_ROLE:
        draft.role = action.payload;
        break;
      case CHANGE_DESIGNATION:
        draft.designation = action.payload;
        break;
      case CHANGE_JOINING_DATE:
        draft.joiningDate = action.payload;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
    }
  });

export default addRecruiterReducer;
