/*
 *
 * Orders reducer
 *
 */
import produce from "immer";
import { SET_ORDER_LIST, SET_STORE_LIST } from "./constants";

export const initialState = {
  orders: [],
  stores: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const ordersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ORDER_LIST:
        const { docs, totalPages, ...rest } = action.payload;
        draft.orders = docs;
        draft.paginationDetails = {
          totalPages,
          pageNumbers: Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ),
          ...rest,
        };
        break;
      case SET_STORE_LIST:
        draft.stores = action.payload;
        break;
    }
  });

export default ordersReducer;
