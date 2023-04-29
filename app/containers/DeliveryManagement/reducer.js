/*
 *
 * DeliveryManagement reducer
 *
 */
import produce from "immer";
import { SET_ORDER_LIST } from "./constants";

export const initialState = {
  orders: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const deliveryManagementReducer = (state = initialState, action) =>
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
    }
  });

export default deliveryManagementReducer;
