import produce from "immer";
import _get from "lodash/get";
import {
  LOGIN_PAGE_INIT,
  LOGIN_PAGE_CHANGE_EMAIL,
  LOGIN_PAGE_CHANGE_PASSWORD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_PAGE_SHOW_LOADING,
  LOGIN_VALIDATION_ERROR,
} from "./constants";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) ||
  "Something went wrong. Please try again later";

const LoginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_PAGE_INIT:
        return initialState;
      case LOGIN_PAGE_CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case LOGIN_PAGE_CHANGE_PASSWORD:
        draft.password = action.payload;
        break;
      case LOGIN_PAGE_SHOW_LOADING: {
        draft.isLoading = true;
        draft.validationError = null;
        break;
      }
      case LOGIN_USER_SUCCESS:
        return initialState;
      case LOGIN_USER_FAILURE: {
        draft.isLoading = false;
        draft.errorMessage = getErrorMessage(action.payload);
        break;
      }
      case LOGIN_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
    }
  });

export default LoginReducer;
