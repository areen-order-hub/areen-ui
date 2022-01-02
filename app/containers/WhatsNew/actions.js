/*
 *
 * WhatsNew actions
 *
 */

import { SET_UPDATES_LIST } from "./constants";
import { getUpdates } from "api/commonDetail";

export const fetchUpdates = () => {
  return async (dispatch) => {
    try {
      const { data } = await getUpdates();
      dispatch(setUpdatesList(data));
    } catch (err) {
      dispatch(setUpdatesList());
    }
  };
};

const setUpdatesList = (payload = []) => ({
  type: SET_UPDATES_LIST,
  payload,
});
