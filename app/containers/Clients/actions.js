/*
 *
 * Clients actions
 *
 */

import { CLIENT_PAGE_SET_LOADING, UPDATE_CLIENT_LIST } from "./constants";
import { getClients } from "api/client";

export const fetchClients = () => {
  return async (dispatch) => {
    try {
      const { data } = await getClients();
      dispatch(updateClientList(data));
    } catch (err) {
      dispatch(updateClientList());
    }
  };
};

const setLoading = (payload) => ({
  type: CLIENT_PAGE_SET_LOADING,
  payload,
});

const updateClientList = (payload = []) => ({
  type: UPDATE_CLIENT_LIST,
  payload,
});
