import produce from "immer";
import _get from "lodash/get";
import {
  REGISTER_PAGE_INIT,
  REGISTER_PAGE_CHANGE_NAME,
  REGISTER_PAGE_CHANGE_EMAIL,
  REGISTER_PAGE_CHANGE_PASSWORD,
  REGISTER_PAGE_CHANGE_ORG_NAME,
  REGISTER_PAGE_SHOW_LOADING,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  REGISTER_VALIDATION_ERROR,
  REGISTER_TOOGLE_EMAIL_VERIFY,
  REGISTER_PAGE_CHANGE_EMAIL_CODE,
  REGISTER_PAGE_DISABLE_RESEND_CODE,
} from "./constants";

const initialState = {
  name: "",
  email: "",
  password: "",
  orgName: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
  showEmailVerification: false,
  emailCode: "",
  disableResendCode: false,
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) ||
  "Something went wrong. Please try again later";

const RegisterPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_PAGE_INIT:
        return initialState;
      case REGISTER_PAGE_CHANGE_NAME:
        draft.name = action.payload;
        break;
      case REGISTER_PAGE_CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case REGISTER_PAGE_CHANGE_PASSWORD:
        draft.password = action.payload;
        break;
      case REGISTER_PAGE_CHANGE_ORG_NAME:
        draft.orgName = action.payload;
        break;
      case REGISTER_PAGE_SHOW_LOADING:
        draft.isLoading = true;
        break;
      case REGISTER_PAGE_CHANGE_EMAIL_CODE:
        draft.emailCode = action.payload;
        break;
      case REGISTER_USER_SUCCESS: {
        return initialState;
      }
      case REGISTER_USER_FAILURE: {
        draft.isLoading = false;
        draft.errorMessage = getErrorMessage(action.payload);
        break;
      }
      case REGISTER_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      }
      case REGISTER_TOOGLE_EMAIL_VERIFY: {
        draft.showEmailVerification = !state.showEmailVerification;
        draft.isLoading = false;
        draft.validationError = null;
        draft.errorMessage = null;
        draft.emailCode = "";
        break;
      }
      case REGISTER_PAGE_DISABLE_RESEND_CODE:
        draft.disableResendCode = action.payload;
        break;
    }
  });

export default RegisterPageReducer;
