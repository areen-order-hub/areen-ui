import {
  LOGIN_PAGE_INIT,
  LOGIN_PAGE_CHANGE_EMAIL,
  LOGIN_PAGE_CHANGE_PASSWORD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_PAGE_SHOW_LOADING,
  LOGIN_VALIDATION_ERROR,
} from "./constants";
import history from "../../utils/history";
import { loginUser } from "./loginApi";
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
      dispatch(showLoading());
      const user = await loginUser(userDetails);
      dispatch(userLoggedin(user));
      history.push("/");
    } catch (err) {
      dispatch(userLoginError(err));
    }
  };
};

const validationFailed = (payload) => ({
  type: LOGIN_VALIDATION_ERROR,
  payload,
});

const showLoading = () => ({
  type: LOGIN_PAGE_SHOW_LOADING,
});

const userLoggedin = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const userLoginError = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginInit = (dispatch) => () => {
  dispatch({
    type: LOGIN_PAGE_INIT,
  });
};

export const changeEmail = (dispatch) => (payload) => {
  dispatch({
    type: LOGIN_PAGE_CHANGE_EMAIL,
    payload,
  });
};

export const changePassword = (dispatch) => (payload) => {
  dispatch({
    type: LOGIN_PAGE_CHANGE_PASSWORD,
    payload,
  });
};
