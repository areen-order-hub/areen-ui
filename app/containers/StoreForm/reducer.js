/*
 *
 * StoreForm reducer
 *
 */
import produce from "immer";
import {
  INIT,
  CHANGE_NAME,
  CHANGE_ALIAS,
  CHANGE_SHOPIFY_URL,
  CHANGE_API_ACCESS_TOKEN,
  SHOW_LOADING,
  SET_STORE_DETAILS,
  VALIDATION_ERROR,
} from "./constants";

export const initialState = {
  name: "",
  alias: "",
  shopifyURL: "",
  apiAccessToken: "",
  isLoading: false,
  validationError: null,
  errorMessage: null,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const storeFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_STORE_DETAILS:
        draft.name = action.payload.name;
        draft.alias = action.payload.alias;
        draft.shopifyURL = action.payload.shopifyURL;
        draft.apiAccessToken = action.payload.apiAccessToken;
        draft.isEdit = true;
        break;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_ALIAS:
        draft.alias = action.payload;
        break;
      case CHANGE_SHOPIFY_URL:
        draft.shopifyURL = action.payload;
        break;
      case CHANGE_API_ACCESS_TOKEN:
        draft.apiAccessToken = action.payload;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR:
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
    }
  });

export default storeFormReducer;
