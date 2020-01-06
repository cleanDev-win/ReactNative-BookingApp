import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import ServiceReducer from './serviceReducer';
const RootReducer = combineReducers({
    AuthReducer,
    ServiceReducer
});

export default RootReducer;