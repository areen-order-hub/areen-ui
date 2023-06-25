/*
 *
 * Orders reducer
 *
 */
import produce from "immer";
import {
  SET_ORDER_LIST,
  SET_CARRIER_STATUS_OPTIONS,
  SET_FILTER_COUNT,
  SET_IS_FILTER_COUNT_LOADING,
  SET_IS_EXPORT_LOADING,
  SET_ORDERS_FOR_EXPORT,
  SET_STORE_LIST,
  SET_IS_SHIPMENT_GENERATING,
} from "./constants";

export const initialState = {
  orders: [],
  carrierStatusOptions: [],
  filterCount: {},
  isFilterCountLoading: true,
  isExportLoading: false,
  ordersForExport: [],
  stores: [],
  paginationDetails: {},
  isShipmentGenerating: false,
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
      case SET_CARRIER_STATUS_OPTIONS:
        draft.carrierStatusOptions = action.payload;
        break;
      case SET_FILTER_COUNT:
        draft.filterCount = action.payload;
        break;
      case SET_IS_FILTER_COUNT_LOADING:
        draft.isFilterCountLoading = action.payload;
        break;
      case SET_IS_EXPORT_LOADING:
        draft.isExportLoading = action.payload;
        break;
      case SET_ORDERS_FOR_EXPORT:
        draft.ordersForExport = action.payload;
        break;
      case SET_STORE_LIST:
        draft.stores = action.payload;
        break;
      case SET_IS_SHIPMENT_GENERATING:
        draft.isShipmentGenerating = action.payload;
        break;
    }
  });

export default ordersReducer;
