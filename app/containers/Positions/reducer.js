/*
 *
 * Positions reducer
 *
 */
import produce from "immer";
import {
  POSITION_PAGE_SET_LOADING,
  UPDATE_POSITION_LIST,
  SET_AVAILABLE_CLIENTS,
  SET_AVAILABLE_RECRUITERS,
  SET_AVAILABLE_SPOCS,
} from "./constants";
import {
  shapeClientsToDropdown,
  shapeRecruitersToDropdown,
  shapeSpocsToDropdown,
} from "./helpers";

export const initialState = {
  isLoading: true,
  positions: [],
  availableClients: [],
  availableRecruiters: [],
  availableSpocs: [],
};

/* eslint-disable default-case, no-param-reassign */
const positionsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POSITION_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case UPDATE_POSITION_LIST:
        draft.positions = action.payload;
        draft.isLoading = false;
        break;
      case SET_AVAILABLE_CLIENTS:
        draft.availableClients = shapeClientsToDropdown(action.payload);
        break;
      case SET_AVAILABLE_RECRUITERS:
        draft.availableRecruiters = shapeRecruitersToDropdown(action.payload);
        break;
      case SET_AVAILABLE_SPOCS:
        draft.availableSpocs = shapeSpocsToDropdown(action.payload);
        break;
    }
  });

export default positionsReducer;
