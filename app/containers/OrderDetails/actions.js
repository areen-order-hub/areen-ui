/*
 *
 * OrderDetails actions
 *
 */

import { get } from "lodash";
import {
  INIT_ORDER_DETAILS,
  SET_ORDER_DETAILS,
  SET_COMMENT_DETAILS,
  SET_IS_FILE_UPLOADING,
  SET_ORDER_FILES,
  SET_IS_SHIPMENT_CANCELLING,
} from "./constants";
import { getOrder, cancelShipment, deleteOrder } from "api/order";
import { saveComment, getComments } from "api/comment";
import { uploadOrderFiles, getOrderFiles, deleteOrderFile } from "api/file";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import history from "utils/history";

export const fetchOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await getOrder(orderId);
      dispatch(setOrderDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Order details",
      });
    }
  };
};

export const fetchOrderFiles = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await getOrderFiles(orderId);
      dispatch(setOrderFiles(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Order files",
      });
    }
  };
};

export const addFiles = (orderId, files) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFileUploading(true));
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });
      await uploadOrderFiles(formData, orderId);
      NotificationHandler.open({
        operation: "success",
        title: "File(s) uploaded successfully",
      });
      dispatch(fetchOrderFiles(orderId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to upload file(s)",
      });
    } finally {
      dispatch(setIsFileUploading(false));
    }
  };
};

export const removeOrderFile = (orderId, data) => {
  return async (dispatch) => {
    try {
      await deleteOrderFile(orderId, data);
      NotificationHandler.open({
        operation: "success",
        title: "File deleted successfully",
      });
      dispatch(fetchOrderFiles(orderId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete file",
      });
    }
  };
};

export const deleteShipment = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch(setIsShipmentCancelling(true));
      await cancelShipment(orderId);
      NotificationHandler.open({
        operation: "success",
        title: "Shipment cancelled successfully",
      });
      dispatch(fetchOrder(orderId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to cancel shipment",
      });
    } finally {
      dispatch(setIsShipmentCancelling(false));
    }
  };
};

export const fetchComments = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await getComments({ orderId });
      dispatch(setCommentDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch comments",
      });
    }
  };
};

export const addComment = (commentDetails) => {
  return async (dispatch) => {
    try {
      await saveComment(commentDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Comment added successfully",
      });
      dispatch(fetchComments(commentDetails.orderId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to save comment",
      });
    }
  };
};

export const onDelete = (orderId) => {
  return async (dispatch) => {
    try {
      await deleteOrder(orderId);
      NotificationHandler.open({
        operation: "success",
        title: "Order deleted successfully",
      });
      history.push("/orders");
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete order",
      });
    }
  };
};

const setOrderDetails = (payload) => ({
  type: SET_ORDER_DETAILS,
  payload,
});

const setCommentDetails = (payload) => ({
  type: SET_COMMENT_DETAILS,
  payload,
});

export const orderDetailsInit = () => ({
  type: INIT_ORDER_DETAILS,
});

const setIsFileUploading = (payload = false) => ({
  type: SET_IS_FILE_UPLOADING,
  payload,
});

const setOrderFiles = (payload = []) => ({
  type: SET_ORDER_FILES,
  payload,
});

const setIsShipmentCancelling = (payload = false) => ({
  type: SET_IS_SHIPMENT_CANCELLING,
  payload,
});
