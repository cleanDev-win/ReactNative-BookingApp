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
import {API_URL} from '../../config';
import { AsyncStorage } from 'react-native';
import navigationService from './../../service/navigationService';
export const signin = (authData) => {
    return dispatch => {
        dispatch(authSetSigninError(''));
        dispatch(authSetLogginIn());
        let url = `${API_URL}/token/`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: `${authData.email}_client`,
                email: authData.email,
                password: authData.password,
                user_type: 'Client'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache'
        })
        .catch(err => {
            console.log(err);
        })
        .then(res => res.json())
        .then(result => {
            if(!result.access) {
                dispatch(authSetSigninError(result.detail));
            } else {
                dispatch(authStoreTokenSimple());
                dispatch(authSetUser(result.user));
                dispatch(authSetSigninError(''));
                navigationService.navigate('App');
            }
        });
    };
};

export const signup = (authData) => {
    return dispatch => {
        dispatch(authSetSignUpError(''));
        dispatch(authRegistering());
        let url = `${API_URL}/client/`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password
            }),
            headers: {
                'Content-Type': 'application/json', 
            },
            mode: 'cors',
            cache: 'no-cache'
        })
        .catch(err=>{
            console.log(err);
        })
        .then(res=>res.json())
        .then(result => {
            console.log("sign up result=>", result);
            // if(!result.access) {
            //     dispatch(authSetSignUpError(result.status));
            // }
            if(result.status == "0" || result.status == "1") {
                // dispatch(authSignUpSuccess(pinNum));
                dispatch(authSetSignUpError(result.detail));
                navigationService.navigate('ConfirmEmail', {status: 'signup'});
            }else if(result.status == "2") {
                dispatch(authSetSignUpError(result.detail));
            }else if(result.status == "3") {
                dispatch(authSetSignUpError(result.detail));
                // navigationService.navigate('ConfirmEmail', {status: 'signup'});
            }
        })
    }
}
export const authSetUser = user => {
    return {
        type: AUTH_SET_USER,
        user
    }
}

export const authSetLogginIn = () => {
    return {
        type: AUTH_LOGGING_IN
    }
}
export const authStoreTokenSimple = () => {
    return dispatch => {
        dispatch(authSetTokenSimple());
        AsyncStorage.setItem('userToken', 'true');
    }
}

export const authSetTokenSimple = () => {
    return {
        type: AUTH_SET_TOKEN
    }
}

export const authSetSigninError = error => {
    return {
        type: AUTH_SIGNIN_ERROR,
        error
    }
}

export const authSetSignUpError = error => {
    return {
        type: AUTH_SIGNUP_ERROR,
        error
    }
}

export const authRegistering = () => {
    return {
        type: AUTH_REGISTERING
    }
}

export const authSignUpSuccess = pinNum => {
    return {
        type: AUTH_SIGNUP_SUCCESS,
        pinNum
    }
}
export const authLogout = () => {
    return dispatch => {
        return dispatch(authRemoveToken());
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};