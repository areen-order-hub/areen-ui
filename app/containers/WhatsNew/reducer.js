/*
 *
 * WhatsNew reducer
 *
 */
import produce from "immer";
import { SET_UPDATES_LIST } from "./constants";

export const initialState = {
  updates: [],
};

/* eslint-disable default-case, no-param-reassign */
const whatsNewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_UPDATES_LIST:
        draft.updates = action.payload;
        break;
    }
  });

export default whatsNewReducer;
