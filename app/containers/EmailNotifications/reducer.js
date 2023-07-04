/*
 *
 * EmailNotifications reducer
 *
 */
import produce from "immer";
import {
  SET_EMAIL_CONFIG,
  UPDATE_ORDER_COMMENT_EMAILS,
  UPDATE_ORDER_NOT_DELIVERED_EMAILS,
  UPDATE_ORDER_NOT_INVOICED_EMAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from "./constants";

export const initialState = {
  configId: "",
  orderComments: [],
  notDeliveredOrders: [],
  notInvoicedOrders: [],
  existingConfig: {
    orderComments: [],
    notDeliveredOrders: [],
    notInvoicedOrders: [],
  },
  isLoading: false,
  validationError: null,
};

/* eslint-disable default-case, no-param-reassign */
const emailNotificationsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_EMAIL_CONFIG:
        draft.configId = action.payload._id;
        draft.orderComments = action.payload.orderComments.map((entry) => ({
          label: entry,
          value: entry,
        }));
        draft.notDeliveredOrders = action.payload.notDeliveredOrders.map(
          (entry) => ({
            label: entry,
            value: entry,
          })
        );
        draft.notInvoicedOrders = action.payload.notInvoicedOrders.map(
          (entry) => ({
            label: entry,
            value: entry,
          })
        );
        draft.existingConfig = {
          orderComments: action.payload.orderComments,
          notDeliveredOrders: action.payload.notDeliveredOrders,
          notInvoicedOrders: action.payload.notInvoicedOrders,
        };
        break;
      case UPDATE_ORDER_COMMENT_EMAILS:
        draft.orderComments = action.payload;
        break;
      case UPDATE_ORDER_NOT_DELIVERED_EMAILS:
        draft.notDeliveredOrders = action.payload;
        break;
      case UPDATE_ORDER_NOT_INVOICED_EMAILS:
        draft.notInvoicedOrders = action.payload;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR:
        draft.validationError = {
          path: action.payload.path.split("[")[0],
          message: action.payload.message,
        };
        break;
    }
  });

export default emailNotificationsReducer;
