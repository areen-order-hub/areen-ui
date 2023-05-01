/*
 *
 * OrderForm actions
 *
 */

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
import { createOrder } from "api/order";
import history from "utils/history";
import { get, reduce } from "lodash";
import schema from "./validations";
import NotificationHandler from "components/Notifications/NotificationHandler";

export const onSubmit = (orderDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(orderDetails);
      if (!isValid) {
        const err = await schema.validate(orderDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await createOrder({
        ...orderDetails,
        shopifyOrderItems: reduce(
          orderDetails.shopifyOrderItems,
          (acc, item) => {
            acc[item.sku] = {
              ...item,
            };
            return acc;
          },
          {}
        ),
        shippingAddressString: `\n ${get(
          orderDetails,
          "shippingAddress.name",
          ""
        )}, \n${get(orderDetails, "shippingAddress.address1", "")} ${get(
          orderDetails,
          "shippingAddress.address2",
          ""
        )}, \n${get(orderDetails, "shippingAddress.city", "")} - ${get(
          orderDetails,
          "shippingAddress.zip",
          ""
        )}, \n${get(orderDetails, "shippingAddress.province", "")}, ${get(
          orderDetails,
          "shippingAddress.country",
          ""
        )}, \nPhone: ${get(orderDetails, "shippingAddress.phone", "")} \n`,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Order added successfully",
      });
      history.push("/orders");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Order",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const addOrderInit = (dispatch) => () => {
  dispatch({ type: INIT });
};

export const changeStoreAlias = (payload) => ({
  type: CHANGE_STORE_ALIAS,
  payload,
});

export const changeStoreName = (payload) => ({
  type: CHANGE_STORE_NAME,
  payload,
});

export const changeCustomerName = (payload) => ({
  type: CHANGE_CUSTOMER_NAME,
  payload,
});

export const changePaymentMode = (payload) => ({
  type: CHANGE_PAYMENT_MODE,
  payload,
});

export const changeShopifyOrderDate = (payload) => ({
  type: CHANGE_SHOPIFY_ORDER_DATE,
  payload,
});

export const changeShopifyOrderName = (payload) => ({
  type: CHANGE_SHOPIFY_ORDER_NAME,
  payload,
});

export const changeShopifyPrice = (payload) => ({
  type: CHANGE_SHOPIFY_PRICE,
  payload,
});

export const changeWeight = (payload) => ({
  type: CHANGE_WEIGHT,
  payload,
});

export const changeBillingAddress = (payload) => ({
  type: CHANGE_BILLING_ADDRESS,
  payload,
});

export const changeShippingAddress = (payload) => ({
  type: CHANGE_SHIPPING_ADDRESS,
  payload,
});

export const changeShopifyOrderItems = (payload) => ({
  type: CHANGE_SHOPIFY_ORDER_ITEMS,
  payload,
});

export const addNewItem = () => ({
  type: ADD_NEW_ITEM,
});

export const deleteItem = (payload) => ({
  type: DELETE_ITEM,
  payload,
});
