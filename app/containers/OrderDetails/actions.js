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
} from "./constants";
import { getOrder } from "api/order";
import { saveComment, getComments } from "api/comment";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

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
