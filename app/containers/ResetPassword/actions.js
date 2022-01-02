import {
  RESET_PAGE_INIT,
  RESET_PAGE_CHANGE_EMAIL,
  RESET_PAGE_CHANGE_PASSWORD,
  RESET_USER_SUCCESS,
  RESET_USER_FAILURE,
  RESET_PAGE_SHOW_LOADING,
  RESET_VALIDATION_ERROR,
} from "./constants";
import history from "../../utils/history";
import { resetUser } from "./resetApi";
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
      const user = await resetUser(userDetails);
      dispatch(userReset(user));
    } catch (err) {
      dispatch(userResetError(err));
    }
  };
};

const validationFailed = (payload) => ({
  type: RESET_VALIDATION_ERROR,
  payload,
});

const showLoading = () => ({
  type: RESET_PAGE_SHOW_LOADING,
});

export const userReset = (user) => ({
  type: RESET_USER_SUCCESS,
  payload: user,
});

const userResetError = (error) => ({
  type: RESET_USER_FAILURE,
  payload: error,
});

export const resetInit = (dispatch) => () => {
  dispatch({
    type: RESET_PAGE_INIT,
  });
};

export const changeEmail = (dispatch) => (payload) => {
  dispatch({
    type: RESET_PAGE_CHANGE_EMAIL,
    payload,
  });
};

export const changePassword = (dispatch) => (payload) => {
  dispatch({
    type: RESET_PAGE_CHANGE_PASSWORD,
    payload,
  });
};
