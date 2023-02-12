/*
 *
 * StoreDetails actions
 *
 */

import { get } from "lodash";
import { SET_STORE_DETAILS, INIT_STORE_DETAILS } from "./constants";
import { getStore } from "api/store";
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

const setStoreDetails = (payload) => ({
  type: SET_STORE_DETAILS,
  payload,
});

export const storeDetailsInit = () => ({
  type: INIT_STORE_DETAILS,
});
