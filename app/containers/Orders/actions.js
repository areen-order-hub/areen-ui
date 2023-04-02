/*
 *
 * Orders actions
 *
 */

import {
  SET_ORDER_LIST,
  SET_STORE_LIST,
  SET_IS_SHIPMENT_GENERATING,
} from "./constants";
import {
  paginateOrders,
  triggerProductSync,
  triggerInvoiceSync,
  triggerOrderSync,
  createAreenShipment,
  createBeeThereShipment,
  createEliteShipment,
} from "api/order";
import { getStores } from "api/store";
import { get } from "lodash";
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

export const generateAreenShipment = (ordersString, pageParams) => {
  return async (dispatch) => {
    try {
      dispatch(setIsShipmentGenerating(true));
      await createAreenShipment({ ordersString });
      NotificationHandler.open({
        operation: "success",
        title: "Areen Shipment Created Successfully",
      });
      dispatch(fetchOrders(pageParams));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to create Areen Shipment",
      });
    } finally {
      dispatch(setIsShipmentGenerating(false));
    }
  };
};

export const generateBeeThereShipment = (ordersString, pageParams) => {
  return async (dispatch) => {
    try {
      dispatch(setIsShipmentGenerating(true));
      await createBeeThereShipment({ ordersString });
      NotificationHandler.open({
        operation: "success",
        title: "Shipment Created Successfully",
      });
      dispatch(fetchOrders(pageParams));
    } catch (err) {
      console.error(err);
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to create BeeThere Shipment",
      });
    } finally {
      dispatch(setIsShipmentGenerating(false));
    }
  };
};

export const generateEliteShipment = (ordersString, pageParams) => {
  return async (dispatch) => {
    try {
      dispatch(setIsShipmentGenerating(true));
      await createEliteShipment({ ordersString });
      NotificationHandler.open({
        operation: "success",
        title: "Shipment Created Successfully",
      });
      dispatch(fetchOrders(pageParams));
    } catch (err) {
      console.error(err);
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to create Elite Shipment",
      });
    } finally {
      dispatch(setIsShipmentGenerating(false));
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

export const setIsShipmentGenerating = (payload = false) => ({
  type: SET_IS_SHIPMENT_GENERATING,
  payload,
});
