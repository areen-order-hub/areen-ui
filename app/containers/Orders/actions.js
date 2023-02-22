/*
 *
 * Orders actions
 *
 */

import { SET_ORDER_LIST, SET_STORE_LIST } from "./constants";
import { paginateOrders } from "api/order";
import { getStores } from "api/store";

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
