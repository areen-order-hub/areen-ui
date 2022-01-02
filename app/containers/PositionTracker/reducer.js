/*
 *
 * PositionTracker reducer
 *
 */
import produce from "immer";
import { SET_CANDIDATE_FIELDS, SET_CANDIDATES } from "./constants";

export const initialState = {
  isFieldsLoading: true,
  candidateFields: [],
  firstRowFields: [],
  secondRowFields: [],
  thirdRowFields: [],
  candidates: [],
  candidatesMap: {},
};

const shapeCandidatesMap = (candidates) => {
  let resultMap = {};

  candidates.forEach((candidate) => {
    resultMap = { ...resultMap, [candidate.id]: candidate };
  });

  return resultMap;
};

/* eslint-disable default-case, no-param-reassign */
const positionTrackerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CANDIDATE_FIELDS:
        let copiedArray = [...action.payload];
        const threePartIndex = Math.ceil(copiedArray.length / 3);
        draft.firstRowFields = copiedArray.splice(0, threePartIndex);
        draft.secondRowFields = copiedArray.splice(0, threePartIndex);
        draft.thirdRowFields = copiedArray.splice(0, threePartIndex);
        draft.isFieldsLoading = false;
        break;
      case SET_CANDIDATES:
        draft.candidates = action.payload;
        draft.candidatesMap = shapeCandidatesMap(action.payload);
        break;
    }
  });

export default positionTrackerReducer;
