/*
 *
 * RtNavBar reducer
 *
 */
import produce from "immer";
import { UPDATE_NOTIFICATIONS } from "./constants";

export const initialState = {
  notifications: [],
  unreadNotifications: 0,
};

/* eslint-disable default-case, no-param-reassign */
const rtNavBarReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_NOTIFICATIONS:
        draft.notifications = action.payload.notifications;
        draft.unreadNotifications = action.payload.notificationCount;
        break;
    }
  });

export default rtNavBarReducer;
