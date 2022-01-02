import produce from "immer";
import _get from "lodash/get";
import {
  RESET_PAGE_INIT,
  RESET_PAGE_CHANGE_EMAIL,
  RESET_PAGE_CHANGE_PASSWORD,
  RESET_USER_SUCCESS,
  RESET_USER_FAILURE,
  RESET_PAGE_SHOW_LOADING,
  RESET_VALIDATION_ERROR,
} from "./constants";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  validationError: null,
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) ||
  "Something went wrong. Please try again later";

const ResetReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_PAGE_INIT:
        return initialState;
      case RESET_PAGE_CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case RESET_PAGE_CHANGE_PASSWORD:
        draft.password = action.payload;
        break;
      case RESET_PAGE_SHOW_LOADING: {
        draft.isLoading = true;
        draft.validationError = null;
        break;
      }
      case RESET_USER_SUCCESS: {
        draft.isLoading = false;
        draft.successMessage = "Email sent to the registered account";
        break;
      }

      case RESET_USER_FAILURE: {
        draft.isLoading = false;
        draft.errorMessage = getErrorMessage(action.payload);
        break;
      }
      case RESET_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
    }
  });

export default ResetReducer;
