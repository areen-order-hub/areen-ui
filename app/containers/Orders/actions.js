/*
 *
 * Orders actions
 *
 */

import {
  SET_ORDER_LIST,
  SET_CARRIER_STATUS_OPTIONS,
  SET_IS_EXPORT_LOADING,
  SET_ORDERS_FOR_EXPORT,
  SET_STORE_LIST,
  SET_IS_SHIPMENT_GENERATING,
} from "./constants";
import {
  bulkCreate,
  paginateOrders,
  getCarrierStatus,
  getOrdersForExport,
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

export const fetchCarrierStatus = () => {
  return async (dispatch) => {
    try {
      const { data } = await getCarrierStatus();
      dispatch(setCarrierStatusOptions(data));
    } catch (err) {
      dispatch(setCarrierStatusOptions());
    }
  };
};

export const fetchOrdersForExport = (params) => {
  return async (dispatch) => {
    try {
      dispatch(setIsExportLoading(true));
      const { data } = await getOrdersForExport(params);
      dispatch(setOrdersForExport(data));
    } catch (err) {
      dispatch(setOrdersForExport());
    } finally {
      dispatch(setIsExportLoading(false));
    }
  };
};

export const saveBulkOrders = (orders) => {
  return async (dispatch) => {
    try {
      await bulkCreate(orders);
      NotificationHandler.open({
        operation: "success",
        title: "Bulk Orders saved successfully",
      });
      dispatch(fetchOrders({ page: 1 }));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to save bulk orders",
      });
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

const setCarrierStatusOptions = (payload = []) => ({
  type: SET_CARRIER_STATUS_OPTIONS,
  payload,
});

export const setOrdersForExport = (payload = []) => ({
  type: SET_ORDERS_FOR_EXPORT,
  payload,
});

export const setIsExportLoading = (payload = false) => ({
  type: SET_IS_EXPORT_LOADING,
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
