/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const  FETCH_SKILLS_FAILED = "FETCH_SKILLS_FAILED";
export const  FETCH_ROLES_FAILED = "FETCH_ROLES_FAILED";
export const  FETCH_ROLES_SUCCESS = "FETCH_ROLES_SUCCESS";
export const FETCH_SKILLS_SUCCESS = "FETCH_SKILLS_SUCCESS";
export const  PROFILE_DOWNLOAD_IMAGE_SUCCESS = "PROFILE_DOWNLOAD_IMAGE_SUCCESS";
export const PROFILE_DOWNLOAD_IMAGE_FAILED = "PROFILE_DOWNLOAD_IMAGE_FAILED";