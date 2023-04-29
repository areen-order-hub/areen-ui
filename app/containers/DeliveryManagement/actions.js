/*
 *
 * DeliveryManagement actions
 *
 */

import { SET_ORDER_LIST } from "./constants";
import NotificationHandler from "components/Notifications/NotificationHandler";
import { handleDelivery, paginateOrders } from "api/order";
import { get } from "lodash";

export const onSubmit = (deliveryDetails) => {
  return async (dispatch) => {
    try {
      const { data } = await handleDelivery(deliveryDetails);
      dispatch(fetchOrders({ page: 1, carrierStatus: "Out for Delivery" }));
      NotificationHandler.open({
        operation: "success",
        title: "Order scanned successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to save scanned details",
      });
    }
  };
};

export const fetchOrders = (params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await paginateOrders({ ...params, isForDelivery: true });
      dispatch(setOrderList(data));
    } catch (err) {
      dispatch(setOrderList());
    }
  };
};

const setOrderList = (payload = []) => ({
  type: SET_ORDER_LIST,
  payload,
});
