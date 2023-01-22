/*
 *
 * OrderDetails reducer
 *
 */
import produce from "immer";
import {
  INIT_ORDER_DETAILS,
  SET_ORDER_DETAILS,
  SET_COMMENT_DETAILS,
  SET_IS_SHIPMENT_CANCELLING,
} from "./constants";
import { getDateTimeString } from "utils/dateTimeHelpers";

export const initialState = {
  isLoading: true,
  isShipmentCancelling: false,
  shopifyOrderName: "",
  shopifyOrderDate: "",
  billingAddress: {},
  shippingAddress: {},
  shopifyOrderItems: {},
  shopifyPrice: "",
  invoiceDetails: {},
  syncedAt: "",
  storeDetails: {},
  carrierService: "",
  carrierStatus: "",
  carrierServiceId: "",
  weight: 0,
  paymentMode: "",
  comments: [],
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ORDER_DETAILS:
        draft.shopifyOrderName = action.payload.shopifyOrderName;
        draft.shopifyOrderDate = getDateTimeString(
          action.payload.shopifyOrderDate
        );
        draft.syncedAt = getDateTimeString(action.payload.updatedAt);
        draft.storeDetails = action.payload.storeId;
        draft.billingAddress = action.payload.billingAddress;
        draft.shippingAddress = action.payload.shippingAddress;
        draft.shopifyOrderItems = action.payload.shopifyOrderItems;
        draft.shopifyPrice = action.payload.shopifyPrice;
        draft.invoiceDetails = action.payload.invoiceDetails;
        draft.carrierService = action.payload.carrierService;
        draft.carrierStatus = action.payload.carrierStatus;
        draft.carrierServiceId = action.payload.carrierServiceId;
        draft.weight = action.payload.weight;
        draft.paymentMode = action.payload.paymentMode;
        draft.isLoading = false;
        break;
      case SET_COMMENT_DETAILS:
        draft.comments = action.payload;
        break;
      case INIT_ORDER_DETAILS:
        return initialState;
      case SET_IS_SHIPMENT_CANCELLING:
        draft.isShipmentCancelling = action.payload;
        break;
    }
  });

export default orderDetailsReducer;
