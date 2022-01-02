import _get from "lodash/get";
import {
  REGISTER_PAGE_INIT,
  REGISTER_PAGE_CHANGE_NAME,
  REGISTER_PAGE_CHANGE_EMAIL,
  REGISTER_PAGE_CHANGE_PASSWORD,
  REGISTER_PAGE_CHANGE_ORG_NAME,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_PAGE_SHOW_LOADING,
  REGISTER_VALIDATION_ERROR,
  REGISTER_TOOGLE_EMAIL_VERIFY,
  REGISTER_PAGE_CHANGE_EMAIL_CODE,
  REGISTER_PAGE_DISABLE_RESEND_CODE,
} from "./constants";
import history from "../../utils/history";
import { registerUser, verifyEmailCode, resentEmailCode } from "./registerApi";
import { formSchema, emailCodeSchema } from "./validations";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const resendCode = (email) => {
  return async (dispatch) => {
    dispatch(setDisableResendCode(true));
    try {
      const { data } = await resentEmailCode(email);
      NotificationHandler.open({
        operation: "success",
        title: `New verification code sent to ${email}`,
      });
      dispatch(setDisableResendCode(false));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to send the verefication code",
      });
      dispatch(setDisableResendCode(false));
    }
  };
};

export const onSubmit = (userDetails) => {
  return async (dispatch) => {
    try {
      const isValid = formSchema.isValidSync(userDetails);
      if (!isValid) {
        const err = await formSchema.validate(userDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading());
      const user = await registerUser(userDetails);
      dispatch(toggleEmailVerifyDisplay());
    } catch (err) {
      dispatch(userRegisterError(err));
    }
  };
};

export const verifyCode = (code) => {
  return async (dispatch) => {
    try {
      const isValid = emailCodeSchema.isValidSync(code);
      if (!isValid) {
        const err = await emailCodeSchema.validate(code).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading());
      const user = await verifyEmailCode(code);
      dispatch(userRegistered(user));
      history.push("/");
    } catch (err) {
      dispatch(userRegisterError(err));
    }
  };
};

const validationFailed = (payload) => ({
  type: REGISTER_VALIDATION_ERROR,
  payload,
});

const showLoading = () => ({
  type: REGISTER_PAGE_SHOW_LOADING,
});

const userRegistered = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const userRegisterError = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

const toggleEmailVerifyDisplay = () => ({
  type: REGISTER_TOOGLE_EMAIL_VERIFY,
});

export const toggleEmailVerify = (dispatch) => () => {
  dispatch(toggleEmailVerifyDisplay());
};

export const registerInit = (dispatch) => () => {
  dispatch({
    type: REGISTER_PAGE_INIT,
  });
};

export const changeName = (dispatch) => (payload) => {
  dispatch({
    type: REGISTER_PAGE_CHANGE_NAME,
    payload,
  });
};

export const changeEmail = (dispatch) => (payload) => {
  dispatch({
    type: REGISTER_PAGE_CHANGE_EMAIL,
    payload,
  });
};

export const changePassword = (dispatch) => (payload) => {
  dispatch({
    type: REGISTER_PAGE_CHANGE_PASSWORD,
    payload,
  });
};

export const changeOrgName = (dispatch) => (payload) => {
  dispatch({
    type: REGISTER_PAGE_CHANGE_ORG_NAME,
    payload,
  });
};

export const changeEmailCode = (dispatch) => (payload) => {
  dispatch({
    type: REGISTER_PAGE_CHANGE_EMAIL_CODE,
    payload,
  });
};

const setDisableResendCode = (payload) => ({
  type: REGISTER_PAGE_DISABLE_RESEND_CODE,
  payload,
});
