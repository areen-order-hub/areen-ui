/*
 *
 * StoreForm actions
 *
 */

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
import { getStore, addStore, editStore } from "api/store";
import history from "../../utils/history";
import { get } from "lodash";
import schema from "./validations";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (storeDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(storeDetails);
      if (!isValid) {
        const err = await schema.validate(storeDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      await addStore(storeDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Store added successfully",
      });
      history.push("/stores");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Store",
      });
    }
  };
};

export const onEdit = (id, storeDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(storeDetails);
      if (!isValid) {
        const err = await schema.validate(storeDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      await editStore(id, storeDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Store updated successfully",
      });
      history.push("/stores");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the store",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getStore(id);
      dispatch(setStoreDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch store details",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setStoreDetails = (payload) => ({
  type: SET_STORE_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const addStoreInit = (dispatch) => () => {
  dispatch({ type: INIT });
};

export const changeName = (payload) => ({
  type: CHANGE_NAME,
  payload,
});

export const changeAlias = (payload) => ({
  type: CHANGE_ALIAS,
  payload,
});

export const changeShopifyUrl = (payload) => ({
  type: CHANGE_SHOPIFY_URL,
  payload,
});

export const changeApiAccessToken = (payload) => ({
  type: CHANGE_API_ACCESS_TOKEN,
  payload,
});
