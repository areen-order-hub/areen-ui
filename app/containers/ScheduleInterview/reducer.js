/*
 *
 * ScheduleInterview reducer
 *
 */
import produce from "immer";
import {
  SET_LOADING,
  SET_INTERVIEW_DETAILS,
  VALIDATION_ERROR,
  INIT,
  CHANGE_ROUND,
  CHANGE_VENUE,
  CHANGE_INTERVIEW_MODE,
  CHANGE_INSTRUCTIONS,
  CHANGE_DATE_TIME,
} from "./constants";

export const initialState = {
  round: "",
  venue: "",
  interviewMode: "",
  instructions: "",
  dateTime: "",
  errorMessage: null,
  validationError: null,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const scheduleInterviewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SET_INTERVIEW_DETAILS:
        break;
      case INIT:
        return initialState;
      case CHANGE_ROUND:
        draft.round = action.payload;
        break;
      case CHANGE_VENUE:
        draft.venue = action.payload;
        break;
      case CHANGE_INTERVIEW_MODE:
        draft.interviewMode = action.payload;
        break;
      case CHANGE_INSTRUCTIONS:
        draft.instructions = action.payload;
        break;
      case CHANGE_DATE_TIME:
        draft.dateTime = action.payload;
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

export default scheduleInterviewReducer;
