import produce from "immer";
import _get from "lodash/get";
import {
  CHANGE_PSWD_PAGE_INIT,
  CHANGE_PSWD_PAGE_CHANGE_EMAIL,
  CHANGE_PSWD_PAGE_CHANGE_PASSWORD,
  CHANGE_PSWD_PAGE_CONFIRM_PASSWORD,
  CHANGE_PSWD_USER_SUCCESS,
  CHANGE_PSWD_USER_FAILURE,
  CHANGE_PSWD_PAGE_SHOW_LOADING,
  CHANGE_PSWD_VALIDATION_ERROR,
} from "./constants";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  isResetSuccess: false,
  errorMessage: null,
  validationError: null,
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) ||
  "Something went wrong. Please try again later";

const changePasswordReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_PSWD_PAGE_INIT:
        return initialState;
      case CHANGE_PSWD_PAGE_CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case CHANGE_PSWD_PAGE_CHANGE_PASSWORD:
        draft.password = action.payload;
        break;
      case CHANGE_PSWD_PAGE_CONFIRM_PASSWORD:
        draft.confirmPassword = action.payload;
        break;
      case CHANGE_PSWD_PAGE_SHOW_LOADING: {
        draft.isLoading = true;
        draft.validationError = null;
        break;
      }
      case CHANGE_PSWD_USER_SUCCESS: {
        draft.isLoading = false;
        draft.isResetSuccess = true;
        break;
      }
      case CHANGE_PSWD_USER_FAILURE: {
        draft.isLoading = false;
        draft.errorMessage = getErrorMessage(action.payload);
        break;
      }
      case CHANGE_PSWD_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
    }
  });

export default changePasswordReducer;
