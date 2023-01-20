/*
 *
 * Orders actions
 *
 */

import { SET_ORDER_LIST } from "./constants";
import { paginateOrders } from "api/order";

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

const setOrderList = (payload = []) => ({
  type: SET_ORDER_LIST,
  payload,
});
