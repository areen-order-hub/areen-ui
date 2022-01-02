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
import history from "../../utils/history";
import { changeUserPassword } from "./changePasswordApi";
import schema from "./validations";

export const onSubmit = (userDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(userDetails);
      if (!isValid) {
        const err = await schema.validate(userDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      if (userDetails.password !== userDetails.confirmPassword) {
        const misMatchErr = {
          path: "confirmPassword",
          message: "Passwords doesn't match!",
        };
        dispatch(validationFailed(misMatchErr));
        return;
      }
      dispatch(showLoading());
      const user = await changeUserPassword(userDetails);
      dispatch(passwordChanged(user));
      history.push("/auth/login");
    } catch (err) {
      dispatch(changePasswordError(err));
    }
  };
};

const validationFailed = (payload) => ({
  type: CHANGE_PSWD_VALIDATION_ERROR,
  payload,
});

const showLoading = () => ({
  type: CHANGE_PSWD_PAGE_SHOW_LOADING,
});

const passwordChanged = (user) => ({
  type: CHANGE_PSWD_USER_SUCCESS,
  payload: user,
});

const changePasswordError = (error) => ({
  type: CHANGE_PSWD_USER_FAILURE,
  payload: error,
});

export const changePasswordInit = (dispatch) => () => {
  dispatch({
    type: CHANGE_PSWD_PAGE_INIT,
  });
};

export const changeEmail = (dispatch) => (payload) => {
  dispatch({
    type: CHANGE_PSWD_PAGE_CHANGE_EMAIL,
    payload,
  });
};

export const changePassword = (dispatch) => (payload) => {
  dispatch({
    type: CHANGE_PSWD_PAGE_CHANGE_PASSWORD,
    payload,
  });
};
export const changeConfirmPassword = (dispatch) => (payload) => {
  dispatch({
    type: CHANGE_PSWD_PAGE_CONFIRM_PASSWORD,
    payload,
  });
};
