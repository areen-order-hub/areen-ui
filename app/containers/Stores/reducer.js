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
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const storesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_STORE_LIST:
        const { docs, totalPages, ...rest } = action.payload;
        draft.stores = docs;
        draft.paginationDetails = {
          totalPages,
          pageNumbers: Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ),
          ...rest,
        };
        break;
      case STORES_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default storesReducer;
