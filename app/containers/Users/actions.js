/*
 *
 * Users actions
 *
 */

import { SET_USER_LIST, SET_USER_LOADING } from "./constants";
import { paginateUsers, patchUser } from "api/user";
import NotificationHandler from "components/Notifications/NotificationHandler";
import { get } from "lodash";

export const fetchUsers = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await paginateUsers(params);
      dispatch(setUserList(data));
    } catch (err) {
      dispatch(setUserList());
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Users",
      });
    }
  };
};

export const updateUserStatus = (id, userDetails, params) => {
  return async (dispatch) => {
    try {
      await patchUser(id, userDetails);
      NotificationHandler.open({
        operation: "success",
        title: "User status changed successfully",
      });
      dispatch(fetchUsers(params));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to change User status",
      });
    }
  };
};

const setUserList = (payload = []) => ({
  type: SET_USER_LIST,
  payload,
});
