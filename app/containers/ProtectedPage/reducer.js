import produce from 'immer';
import { AUTHENTICATE_USER, AUTH_PAGE_INIT } from './constant';

const initialState = {
    isLoading: true,
    isUser: null,
    permissions: []
}

const AuthReducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case AUTH_PAGE_INIT:
                return initialState;
            case AUTHENTICATE_USER: {
                draft.isLoading = false;
                draft.isUser = action.payload.isUser;
                draft.permissions = action.payload.permissions;
                break;
            }
        }
    }
);

export default AuthReducer;