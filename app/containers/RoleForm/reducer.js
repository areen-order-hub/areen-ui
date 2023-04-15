/*
 *
 * RoleForm reducer
 *
 */
import produce from "immer";
import {
  INIT,
  CHANGE_ROLE,
  CHANGE_ACCESS,
  SHOW_LOADING,
  SET_ROLE_DETAILS,
  VALIDATION_ERROR,
} from "./constants";

export const initialState = {
  role: "",
  access: [
    {
      moduleName: "Stores",
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    {
      moduleName: "Orders",
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    {
      moduleName: "Users",
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    {
      moduleName: "Roles",
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  ],
  isLoading: false,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const roleFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_ROLE_DETAILS:
        draft.role = action.payload.role;
        draft.access = action.payload.access;
        draft.isEdit = true;
        break;
      case CHANGE_ROLE:
        draft.role = action.payload;
        break;
      case CHANGE_ACCESS:
        const { index: accessIndex, payload: accessPayload } = action.payload;
        draft.access[accessIndex] = accessPayload;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR:
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
    }
  });

export default roleFormReducer;
