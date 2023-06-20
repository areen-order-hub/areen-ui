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
import { getDateTimeString, parseDate } from "utils/dateTimeHelpers";
import { isEmpty, get } from "lodash";

export const initialState = {
  isLoading: true,
  isShipmentCancelling: false,
  shopifyOrderName: "",
  shopifyOrderDate: "",
  billingAddress: {},
  shippingAddress: {},
  contactEmail: "",
  shopifyOrderItems: {},
  shopifyPrice: "",
  invoiceDetails: {},
  syncedAt: "",
  storeDetails: {},
  carrierService: "",
  carrierStatus: "",
  carrierServiceId: "",
  carrierTrackingLink: "",
  assignedDeliveryPartner: {},
  lastScannedTimeStamp: "",
  weight: 0,
  paymentMode: "",
  bulkStoreName: "",
  isBulkOrder: "",
  finalDisplayItems: {},
  comments: [],
  isSaleOrderCreated: false,
  saleOrderComments: null,
};

const mapItemsForDisplay = ({
  shopifyOrderItems = {},
  invoiceDetails = {},
  stockInHand = {},
}) => {
  const { items: invoiceItems = [] } = invoiceDetails;
  let finalDisplayItems = { ...shopifyOrderItems };
  for (let item of invoiceItems) {
    const { itemCode, quantity = 0, price = 0, unitPrice = 0 } = item;
    if (!isEmpty(finalDisplayItems[itemCode])) {
      finalDisplayItems[itemCode] = {
        ...finalDisplayItems[itemCode],
        invoicedQty: quantity,
        invoicedPrice: price,
        invoicedUnitPrice: unitPrice,
      };
    } else {
      finalDisplayItems[itemCode] = {
        invoicedQty: quantity,
        invoicedPrice: price,
        invoicedUnitPrice: unitPrice,
      };
    }
  }

  for (let key of Object.keys(finalDisplayItems)) {
    finalDisplayItems[key]["stockInHand"] = get(stockInHand, key, "NA");
  }

  return finalDisplayItems;
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
        draft.contactEmail = action.payload.contactEmail;
        draft.shopifyOrderItems = action.payload.shopifyOrderItems;
        draft.shopifyPrice = action.payload.shopifyPrice;
        draft.invoiceDetails = action.payload.invoiceDetails;
        draft.carrierService = action.payload.carrierService;
        draft.carrierStatus = action.payload.carrierStatus;
        draft.carrierServiceId = action.payload.carrierServiceId;
        draft.carrierTrackingLink = action.payload.carrierTrackingLink;
        draft.assignedDeliveryPartner = action.payload.assignedDeliveryPartner;
        draft.lastScannedTimeStamp = action.payload.lastScannedTimeStamp
          ? parseDate(
              action.payload.lastScannedTimeStamp,
              "DD MMM YYYY / HH:mm"
            )
          : "N/A";
        draft.weight = action.payload.weight;
        draft.paymentMode = action.payload.paymentMode;
        draft.bulkStoreName = action.payload.bulkStoreName;
        draft.isBulkOrder = action.payload.isBulkOrder;
        draft.finalDisplayItems = mapItemsForDisplay(action.payload);
        draft.isSaleOrderCreated = action.payload.isSaleOrderCreated;
        draft.saleOrderComments = action.payload.saleOrderComments;
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
