/*
 *
 * UserForm reducer
 *
 */
import produce from "immer";
import {
  INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_USER_DETAILS,
} from "./constants";

export const initialState = {
  name: "",
  email: "",
  isLoading: false,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const userFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_USER_DETAILS:
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.isEdit = true;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR:
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
    }
  });

export default userFormReducer;
