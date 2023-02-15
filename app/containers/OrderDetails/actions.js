/*
 *
 * OrderDetails actions
 *
 */

import { get } from "lodash";
import { INIT_ORDER_DETAILS, SET_ORDER_DETAILS } from "./constants";
import { getOrder } from "api/order";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await getOrder(orderId);
      dispatch(setOrderDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Order details",
      });
    }
  };
};

const setOrderDetails = (payload) => ({
  type: SET_ORDER_DETAILS,
  payload,
});

export const orderDetailsInit = () => ({
  type: INIT_ORDER_DETAILS,
});
