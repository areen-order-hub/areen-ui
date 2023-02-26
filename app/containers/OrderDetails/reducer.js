/*
 *
 * OrderDetails reducer
 *
 */
import produce from "immer";
import { INIT_ORDER_DETAILS, SET_ORDER_DETAILS } from "./constants";
import { getDateTimeString } from "utils/dateTimeHelpers";

export const initialState = {
  isLoading: true,
  shopifyDisplayId: "",
  shopifyOrderDate: "",
  billingAddress: {},
  shippingAddress: {},
  shopifyOrderItems: {},
  shopifyPrice: "",
  invoiceDetails: {},
  syncedAt: "",
  storeDetails: {},
  financialStatus: "",
  fulfillmentStatus: "",
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ORDER_DETAILS:
        draft.shopifyDisplayId = action.payload.shopifyDisplayId;
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
        draft.financialStatus = action.payload.financialStatus;
        draft.fulfillmentStatus = action.payload.fulfillmentStatus;
        draft.isLoading = false;
        break;
    }
  });

export default orderDetailsReducer;
