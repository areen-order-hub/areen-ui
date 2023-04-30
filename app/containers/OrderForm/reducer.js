/*
 *
 * OrderForm reducer
 *
 */
import produce from "immer";
import moment from "moment-timezone";
import {
  INIT,
  CHANGE_STORE_ALIAS,
  CHANGE_STORE_NAME,
  CHANGE_CUSTOMER_NAME,
  CHANGE_PAYMENT_MODE,
  CHANGE_SHOPIFY_ORDER_DATE,
  CHANGE_SHOPIFY_ORDER_NAME,
  CHANGE_SHOPIFY_PRICE,
  CHANGE_WEIGHT,
  CHANGE_BILLING_ADDRESS,
  CHANGE_SHIPPING_ADDRESS,
  CHANGE_SHOPIFY_ORDER_ITEMS,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from "./constants";

export const initialState = {
  bulkStoreAlias: "",
  bulkStoreName: "",
  customerName: "",
  paymentMode: "COD",
  shopifyOrderDate: moment(),
  shopifyOrderName: "",
  shopifyPrice: "",
  weight: "",
  billingAddress: {},
  shippingAddress: {},
  shopifyOrderItems: [
    {
      title: "",
      quantity: "",
      price: "",
      sku: "",
    },
  ],
  isLoading: false,
  validationError: null,
  errorMessage: null,
};

/* eslint-disable default-case, no-param-reassign */
const orderFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_STORE_ALIAS:
        draft.bulkStoreAlias = action.payload;
        break;
      case CHANGE_STORE_NAME:
        draft.bulkStoreName = action.payload;
        break;
      case CHANGE_CUSTOMER_NAME:
        draft.customerName = action.payload;
        break;
      case CHANGE_PAYMENT_MODE:
        draft.paymentMode = action.payload;
        break;
      case CHANGE_SHOPIFY_ORDER_DATE:
        draft.shopifyOrderDate = action.payload;
        break;
      case CHANGE_SHOPIFY_ORDER_NAME:
        draft.shopifyOrderName = action.payload;
        break;
      case CHANGE_SHOPIFY_PRICE:
        draft.shopifyPrice = action.payload;
        break;
      case CHANGE_WEIGHT:
        draft.weight = action.payload;
        break;
      case CHANGE_BILLING_ADDRESS:
        draft.billingAddress = action.payload;
        break;
      case CHANGE_SHIPPING_ADDRESS:
        draft.shippingAddress = action.payload;
        break;
      case CHANGE_SHOPIFY_ORDER_ITEMS:
        const { index: itemIndex, payload: itemPayload } = action.payload;
        draft.shopifyOrderItems[itemIndex] = itemPayload;
        break;
      case ADD_NEW_ITEM:
        draft.shopifyOrderItems = [
          ...draft.shopifyOrderItems,
          {
            title: "",
            quantity: "",
            price: "",
            sku: "",
          },
        ];
        break;
      case DELETE_ITEM:
        draft.shopifyOrderItems = draft.shopifyOrderItems.filter(
          (_, index) => index !== action.payload
        );
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

export default orderFormReducer;
