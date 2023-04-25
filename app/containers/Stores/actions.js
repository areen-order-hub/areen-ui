/*
 *
 * Stores actions
 *
 */

import { SET_STORE_LIST, STORES_PAGE_SET_LOADING } from "./constants";
import { paginateStores, editStore } from "api/store";
import NotificationHandler from "components/Notifications/NotificationHandler";
import { get } from "lodash";

export const fetchStores = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await paginateStores({
        ...params,
        isShopifyStore: true,
      });
      dispatch(setStoreList(data));
    } catch (err) {
      dispatch(setStoreList());
    }
  };
};

export const updateStoreStatus = (id, storeDetails, params) => {
  return async (dispatch) => {
    try {
      await editStore(id, storeDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Store status changed successfully",
      });
      dispatch(fetchStores(params));
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

const setStoreList = (payload = []) => ({
  type: SET_STORE_LIST,
  payload,
});
