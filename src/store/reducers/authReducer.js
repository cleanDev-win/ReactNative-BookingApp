import {
    AUTH_SET_TOKEN,
    AUTH_SET_USER,
    AUTH_REMOVE_TOKEN,
    AUTH_SIGNIN_ERROR,
    AUTH_SIGNUP_ERROR,
    AUTH_SIGNUP_SUCCESS,
    AUTH_LOGGING_IN,
    AUTH_REGISTERING
} from '../constants';

const initialState = {
    access: '',
    refresh: '',
    user: '',
    signinerror: null,
    signuperror: null,
    is_authenticated: false,
    loggingIn: false,
    registering: false
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                access: action.access,
                refresh: action.refresh,
                user: action.user
            }
        case AUTH_LOGGING_IN:
            return {
                ...state,
                loggingIn: true
            }
        case AUTH_SET_USER:
            return {
                ...state,
                user: action.user,
                is_authenticated: true,
                loggingIn: false
            }
        case AUTH_SIGNIN_ERROR:
            return {
                ...state,
                signinerror: action.error,
                loggingIn: false
            }
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                user: null,
                is_authenticated: false
            }
        case AUTH_SIGNUP_ERROR:
            return {
                ...state,
                signuperror: action.error,
                registering: false
            }
        case AUTH_REGISTERING:
            return {
                ...state,
                registering: true
            }
        case AUTH_SIGNUP_SUCCESS:
            return {
                ...state,
                pinNum: action.pinNum,
                registering: false
            }
        default:
            return state;
    }
}