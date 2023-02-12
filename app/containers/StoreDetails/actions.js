/*
 *
 * StoreDetails actions
 *
 */

import { get } from "lodash";
import { SET_STORE_DETAILS, INIT_STORE_DETAILS } from "./constants";
import { getStore, editStore } from "api/store";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchStore = (storeId) => {
  return async (dispatch) => {
    try {
      const { data } = await getStore(storeId);
      dispatch(setStoreDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Store details",
      });
    }
  };
};

export const updateStoreStatus = (id, storeDetails) => {
  return async (dispatch) => {
    try {
      await editStore(id, storeDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Store status changed successfully",
      });
      dispatch(fetchStore(id));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to change Store status",
      });
    }
  };
};

const setStoreDetails = (payload) => ({
  type: SET_STORE_DETAILS,
  payload,
});

export const storeDetailsInit = () => ({
  type: INIT_STORE_DETAILS,
});
