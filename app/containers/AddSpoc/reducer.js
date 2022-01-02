/*
 *
 * AddSpoc reducer
 *
 */
import produce from "immer";
import {
  INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_DESIGNATION,
  CHANGE_OFFICE_ADDRESS,
  CHANGE_ACC_HOLDER,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_SPOC_DETAILS,
  SET_AVAILABLE_USERS,
} from "./constants";

import { shapeAvailableUsers } from "./helpers.js";

export const initialState = {
  name: "",
  spocEmail: "",
  phoneNumber: "",
  designation: "",
  officeAddress: "",
  accHolder: "",
  availableUsers: [],
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const addSpocReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_EMAIL:
        draft.spocEmail = action.payload;
        break;
      case CHANGE_PHONE:
        draft.phoneNumber = action.payload;
        break;
      case CHANGE_DESIGNATION:
        draft.designation = action.payload;
        break;
      case CHANGE_OFFICE_ADDRESS:
        draft.officeAddress = action.payload;
        break;
      case CHANGE_ACC_HOLDER:
        draft.accHolder = action.payload;
        break;
      case SET_AVAILABLE_USERS:
        draft.availableUsers = shapeAvailableUsers(action.payload);
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
      case VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
      case SET_SPOC_DETAILS: {
        draft.name = action.payload.name;
        draft.spocEmail = action.payload.spocEmail;
        draft.phoneNumber = action.payload.phoneNumber;
        draft.designation = action.payload.designation;
        draft.officeAddress = action.payload.officeAddress;
        draft.accHolder = {
          value: action.payload.accHolder._id,
          label: action.payload.accHolder.name,
        };
        draft.isEdit = true;
        break;
      }
    }
  });

export default addSpocReducer;
