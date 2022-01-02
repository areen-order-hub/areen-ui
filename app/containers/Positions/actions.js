/*
 *
 * Positions actions
 *
 */

import {
  POSITION_PAGE_SET_LOADING,
  UPDATE_POSITION_LIST,
  SET_AVAILABLE_CLIENTS,
  SET_AVAILABLE_RECRUITERS,
  SET_AVAILABLE_SPOCS,
} from "./constants";
import { getClients } from "api/client";
import { getPositions, editPositionApi, getAssignedByMe } from "api/position";
import { filterPositions } from "./helpers";
import { getRecruiters } from "api/user";
import { getSpocs } from "api/spoc";

export const fetchClients = () => {
  return async (dispatch) => {
    try {
      const { data } = await getClients();
      dispatch(setAvailableClients(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchRecruiters = () => {
  return async (dispatch) => {
    try {
      const { data } = await getRecruiters();
      dispatch(setAvailableRecruiters(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSpocs = () => {
  return async (dispatch) => {
    try {
      const { data } = await getSpocs();
      dispatch(setAvailableSpocs(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePosition = (positionId, updates, userId, userRole) => {
  return async (dispatch) => {
    try {
      await editPositionApi(positionId, updates);
      dispatch(fetchPositions(userId, userRole));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchPositions = (userId, userRole, params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getPositions(params);
      dispatch(updatePositionList(filterPositions(data, userId, userRole)));
    } catch (err) {
      dispatch(updatePositionList());
    }
  };
};

export const fetchAssignedByMe = (params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getAssignedByMe(params);
      dispatch(updatePositionList(data));
    } catch (err) {
      dispatch(updatePositionList());
    }
  };
};

const setLoading = (payload) => ({
  type: POSITION_PAGE_SET_LOADING,
  payload,
});

const updatePositionList = (payload = []) => ({
  type: UPDATE_POSITION_LIST,
  payload,
});

const setAvailableClients = (payload = []) => ({
  type: SET_AVAILABLE_CLIENTS,
  payload,
});

const setAvailableRecruiters = (payload = []) => ({
  type: SET_AVAILABLE_RECRUITERS,
  payload,
});

const setAvailableSpocs = (payload = []) => ({
  type: SET_AVAILABLE_SPOCS,
  payload,
});
