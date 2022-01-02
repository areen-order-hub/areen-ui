/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR, FETCH_ROLES_FAILED,FETCH_ROLES_SUCCESS,
  FETCH_SKILLS_FAILED,FETCH_SKILLS_SUCCESS,PROFILE_DOWNLOAD_IMAGE_SUCCESS,PROFILE_DOWNLOAD_IMAGE_FAILED } from './constants';


  import {GetRoles,GetSkills,downloadFile} from "./AppApi"
/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}



export const fetchRoles = () => {
  return async (dispatch) => {
    try {    
      dispatch(loadRepos());           
      const response = await GetRoles();
      dispatch(fetchRoleSuccess(response.data));      
      dispatch(loadRepos());     
    } catch (error) {
      console.log("Error---", error);
      dispatch(fetchRolesFailed(error));
      dispatch(loadRepos());     
    }
  };
}


const fetchRoleSuccess = (data) => ({
  type: FETCH_ROLES_SUCCESS,
  payload: data
})

const fetchRolesFailed = (error) => ({
  type: FETCH_ROLES_FAILED,
  payload: error
})

export const fetchSkills = () => {
  return async (dispatch) => {
    try {
      dispatch(loadRepos());           
      const response = await GetSkills();
      dispatch(fetchSkillSuccess(response.data));      
      dispatch(loadRepos());     
    } catch (error) {
      console.log("Error---", error);
      dispatch(fetchSkillsFailed(error));
      dispatch(loadRepos());     
    }
  };
}


const fetchSkillSuccess = (data) => ({
  type: FETCH_SKILLS_SUCCESS,
  payload: data
})

const fetchSkillsFailed = (error) => ({
  type: FETCH_SKILLS_FAILED,
  payload: error
})


export const profileDownloadSuccess = (imageUrl) => ({
  type: PROFILE_DOWNLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const profileDownloadFailed = (imageUrl) => ({
  type: PROFILE_DOWNLOAD_IMAGE_FAILED,
  payload: imageUrl,
});

export const downloadProfilePicture = (email) => {
  return async (dispatch) => {
    try {
      dispatch(loadRepos());        
      const response = await downloadFile(email);
      dispatch(profileDownloadSuccess(response.data));
      dispatch(loadRepos());    
    }
    catch (error) {
      console.log("Error---", error);
      dispatch(profileDownloadFailed(error));
      dispatch(loadRepos());     
    }
  }
}