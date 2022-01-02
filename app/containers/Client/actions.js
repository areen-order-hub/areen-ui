/*
 *
 * Client actions
 *
 */
import _get from "lodash/get";
import {
  SET_CLIENT_DETAILS,
  SET_SPOC_DETAILS,
  SET_POSITION_LIST,
  CLIENT_DETAILS_INIT,
} from "./constants";
import { getClient, deleteClient } from "api/client";
import { getPositions } from "api/position";
import { downloadFile } from "api/file";
import { getSpocs, deleteSpocApi } from "api/spoc";
import { filterSpocs, filterPositions } from "./helpers";
import history from "utils/history";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchClient = (clientId, userRole, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await getClient(clientId);
      if (data.agreementFile) {
        const { data: url } = await downloadFile(
          "clientAgreements",
          data.agreementFile
        );
        dispatch(setClientDetails({ ...data, agreementFile: url }));
      } else {
        dispatch(setClientDetails(data));
      }
      dispatch(fetchSpocs(clientId, userRole, userId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Client details",
      });
    }
  };
};

export const fetchPositions = (userId, userRole, params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getPositions(params);
      dispatch(setPositionList(filterPositions(data, userId, userRole)));
    } catch (err) {
      dispatch(setPositionList());
    }
  };
};

export const fetchSpocs = (clientId, userRole, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await getSpocs({ clientId });
      dispatch(setSpocDetails(filterSpocs(data, userRole, userId)));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Spocs",
      });
    }
  };
};

export const onDelete = (id) => {
  return async (dispatch) => {
    try {
      await deleteClient(id);
      history.push("/clients");
      NotificationHandler.open({
        operation: "success",
        title: "Client deleted successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Client",
      });
    }
  };
};

export const deleteSpoc = (id, clientId, userRole, userId) => {
  return async (dispatch) => {
    try {
      await deleteSpocApi(id);
      dispatch(fetchClient(clientId, userRole, userId));
      NotificationHandler.open({
        operation: "success",
        title: "SPOC deleted successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the spoc",
      });
    }
  };
};

export const clientDetailsInit = () => ({
  type: CLIENT_DETAILS_INIT,
});

const setClientDetails = (payload) => ({
  type: SET_CLIENT_DETAILS,
  payload,
});

const setSpocDetails = (payload) => ({
  type: SET_SPOC_DETAILS,
  payload,
});

const setPositionList = (payload) => ({
  type: SET_POSITION_LIST,
  payload,
});
