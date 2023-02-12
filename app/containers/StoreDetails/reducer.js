/*
 *
 * StoreDetails reducer
 *
 */
import produce from "immer";
import { SET_STORE_DETAILS, INIT_STORE_DETAILS } from "./constants";
import { parseDate } from "utils/dateTimeHelpers";

export const initialState = {
  isLoading: true,
  name: "",
  alias: "",
  shopifyURL: "",
  createdAt: "",
  isActive: false,
};

/* eslint-disable default-case, no-param-reassign */
const storeDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_STORE_DETAILS:
        draft.name = action.payload.name;
        draft.alias = action.payload.alias;
        draft.shopifyURL = `https://${action.payload.shopifyURL}.myshopify.com`;
        draft.createdAt = parseDate(action.payload.createdAt, "DD MMM YYYY");
        draft.isActive = action.payload.isActive;
        draft.isLoading = false;
        break;
      case INIT_STORE_DETAILS:
        return initialState;
    }
  });

export default storeDetailsReducer;
