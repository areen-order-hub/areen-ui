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
  status: "",
  syncedAt: "",
  storeDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ORDER_DETAILS:
        draft.shopifyDisplayId = action.payload.shopifyDisplayId;
        draft.status = action.payload.status;
        draft.shopifyOrderDate = getDateTimeString(
          action.payload.shopifyOrderDate
        );
        draft.syncedAt = getDateTimeString(action.payload.updatedAt);
        draft.storeDetails = action.payload.storeId;
        draft.isLoading = false;
        break;
    }
  });

export default orderDetailsReducer;
