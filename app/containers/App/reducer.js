/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, FETCH_ROLES_SUCCESS,
  FETCH_SKILLS_SUCCESS, FETCH_SKILLS_FAILED, FETCH_ROLES_FAILED,
  PROFILE_DOWNLOAD_IMAGE_FAILED, PROFILE_DOWNLOAD_IMAGE_SUCCESS
} from './constants';


// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  availableRoles: [],
  availableSkills: [],
  profilePicture: ""
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;
      case PROFILE_DOWNLOAD_IMAGE_SUCCESS:
        draft.profilePicture = action.payload;
        break;
      case PROFILE_DOWNLOAD_IMAGE_FAILED:
        draft.profilePicture = "";
        break;
      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;
      case FETCH_ROLES_SUCCESS:
        draft.availableRoles = action.payload
        break;
      case FETCH_ROLES_FAILED:
        draft.availableRoles = [];
        break;
      case FETCH_SKILLS_SUCCESS:
        draft.availableSkills = action.payload
        break;
      case FETCH_SKILLS_FAILED:
        draft.availableSkills = [];
        break;
      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      default:
        break;
    }
  });

export default appReducer;
