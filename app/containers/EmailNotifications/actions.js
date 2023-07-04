/*
 *
 * EmailNotifications actions
 *
 */

import {
  SET_EMAIL_CONFIG,
  UPDATE_ORDER_COMMENT_EMAILS,
  UPDATE_ORDER_NOT_DELIVERED_EMAILS,
  UPDATE_ORDER_NOT_INVOICED_EMAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from "./constants";
import {
  getEmailNotificationConfig,
  updateEmailNotificationConfig,
} from "api/emailNotification";
import { get } from "lodash";
import schema from "./validations";
import NotificationHandler from "components/Notifications/NotificationHandler";

export const fetchEmailNotificationConfig = () => {
  return async (dispatch) => {
    try {
      const { data } = await getEmailNotificationConfig();
      dispatch(setEmailConfigDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Email Notification Config",
      });
    }
  };
};

export const patchEmailNotificationConfig = (id, emailConfig) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(emailConfig);
      if (!isValid) {
        const err = await schema.validate(emailConfig).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await updateEmailNotificationConfig(id, emailConfig);
      NotificationHandler.open({
        operation: "success",
        title: "Email Config updated successfully",
      });
      dispatch(fetchEmailNotificationConfig());
      dispatch(showLoading(false));
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update Email Notification Config",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setEmailConfigDetails = (payload) => ({
  type: SET_EMAIL_CONFIG,
  payload,
});

const showLoading = (payload) => ({
  type: SHOW_LOADING,
  payload,
});

export const updateOrderCommentsEmails = (payload) => ({
  type: UPDATE_ORDER_COMMENT_EMAILS,
  payload,
});

export const updateOrderNotDeliveredEmails = (payload) => ({
  type: UPDATE_ORDER_NOT_DELIVERED_EMAILS,
  payload,
});

export const updateOrderNotInvoicedEmails = (payload) => ({
  type: UPDATE_ORDER_NOT_INVOICED_EMAILS,
  payload,
});
