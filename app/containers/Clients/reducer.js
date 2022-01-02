/*
 *
 * Clients reducer
 *
 */
import produce from "immer";
import { CLIENT_PAGE_SET_LOADING, UPDATE_CLIENT_LIST } from "./constants";

export const initialState = {
  isLoading: true,
  clients: [],
};

/* eslint-disable default-case, no-param-reassign */
const clientsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLIENT_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case UPDATE_CLIENT_LIST:
        draft.clients = action.payload;
        draft.isLoading = false;
        break;
    }
  });

export default clientsReducer;
