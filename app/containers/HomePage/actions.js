/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_USERNAME,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';
import { getRepo } from './homeApi';

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function loadRepos(username) {
  return async dispatch => {
    try {
      // Call our request helper (see 'utils/request')
      const repos = await getRepo(username);
      console.log(typeof repos);
      dispatch(reposLoaded(repos.data, username));
    } catch (err) {
      dispatch(repoLoadingError(err));
    }
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
