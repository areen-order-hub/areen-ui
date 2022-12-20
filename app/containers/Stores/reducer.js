/*
 *
 * Stores reducer
 *
 */
import produce from "immer";
import { SET_STORE_LIST, STORES_PAGE_SET_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  stores: [],
};

/* eslint-disable default-case, no-param-reassign */
const storesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_STORE_LIST:
        draft.stores = action.payload;
        draft.isLoading = false;
        break;
      case STORES_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default storesReducer;
