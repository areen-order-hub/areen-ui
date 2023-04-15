/*
 *
 * Roles actions
 *
 */

import { SET_ROLE_LIST, SET_ROLE_LIST_LOADING } from "./constants";
import { paginateRoles } from "api/role";

export const fetchRoles = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await paginateRoles(params);
      dispatch(setRoleList(data));
    } catch (err) {
      dispatch(setRoleList());
    }
  };
};

const setRoleList = (payload = []) => ({
  type: SET_ROLE_LIST,
  payload,
});
