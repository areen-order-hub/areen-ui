/*
 *
 * Dashboard reducer
 *
 */
import produce from "immer";
import {
  DASHBOARD_SET_LOADING,
  SET_COUNT_LOADING,
  SET_DASHBOARD_DETAILS,
  SET_INTERVIEW_DETAILS,
  SET_EVENT_DETAILS,
} from "./constants";

export const initialState = {
  isCountLoading: true,
  posts: [],
  noOfStores: 0,
  noOfOrders: 0,
  noOfPositions: 0,
  noOfRecruiters: 0,
  noOfShortlisted: 0,
  noOfSelected: 0,
  noOfOffered: 0,
  noOfJoined: 0,
  isInterviewsLoading: true,
  todaysInterviews: [],
  tomorrowsInterviews: [],
  isEventsLoading: true,
  events: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_COUNT_LOADING:
        draft.isCountLoading = action.payload;
        break;
      case SET_DASHBOARD_DETAILS:
        draft.noOfStores = action.payload.noOfStores;
        draft.noOfOrders = action.payload.noOfOrders;
        draft.isCountLoading = false;
        break;
      case SET_INTERVIEW_DETAILS:
        draft.todaysInterviews = action.payload.todaysInterviews;
        draft.tomorrowsInterviews = action.payload.tomorrowsInterviews;
        draft.isInterviewsLoading = false;
        break;
      case SET_EVENT_DETAILS:
        draft.events = action.payload;
        draft.isEventsLoading = false;
        break;
    }
  });

export default dashboardReducer;
