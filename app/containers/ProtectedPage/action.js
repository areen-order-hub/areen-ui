import { authenticateUser } from './authApi';
import { AUTHENTICATE_USER, AUTH_PAGE_INIT } from './constant';

export const isValidUser = () => {
    return async dispatch => {
        const { data } = await authenticateUser();
        dispatch(validateUser(data));
    }
}

const validateUser = (payload) => ({
    type: AUTHENTICATE_USER,
    payload
});

export const authInit = dispatch => () => {
    dispatch({
        type: AUTH_PAGE_INIT
    });
};