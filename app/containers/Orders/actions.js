/*
 *
 * Orders actions
 *
 */

import { SET_ORDER_LIST, SET_STORE_LIST } from "./constants";
import {
  paginateOrders,
  triggerProductSync,
  triggerInvoiceSync,
  triggerOrderSync,
} from "api/order";
import { getStores } from "api/store";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchOrders = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await paginateOrders(params);
      dispatch(setOrderList(data));
    } catch (err) {
      dispatch(setOrderList());
    }
  };
};

export const syncProducts = () => {
  return async (dispatch) => {
    try {
      await triggerProductSync();
      NotificationHandler.open({
        operation: "success",
        title: "Product Sync Started Successfully",
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const syncInvoices = () => {
  return async (dispatch) => {
    try {
      await triggerInvoiceSync();
      NotificationHandler.open({
        operation: "success",
        title: "Invoice Sync Started Successfully",
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const syncOrders = () => {
  return async (dispatch) => {
    try {
      await triggerOrderSync();
      NotificationHandler.open({
        operation: "success",
        title: "Order Sync Started Successfully",
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchStores = () => {
  return async (dispatch) => {
    try {
      const { data } = await getStores();
      dispatch(setStoresList(data));
    } catch (err) {
      dispatch(setStoresList());
    }
  };
};

const setOrderList = (payload = []) => ({
  type: SET_ORDER_LIST,
  payload,
});

const setStoresList = (payload = []) => ({
  type: SET_STORE_LIST,
  payload,
});
