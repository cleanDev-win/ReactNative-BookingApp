import {
    GET_SERVICES,
    GETTING_SERVICES,
    SEARCHING_SERVICE,
    SEARCH_SERVICE
} from '../constants';

const initialState = {
    services: [],
    gettingService: false,
    searchingService: false,
    searchedServices: []
}

export default function ServiceReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: action.services,
                gettingService: false
            }
        case GETTING_SERVICES:
            return {
                ...state,
                gettingService: true
            }
        case SEARCHING_SERVICE:
            return {
                ...state,
                searchingService: true
            }
        case SEARCH_SERVICE:
            return {
                ...state,
                searchedServices: action.result,
                searchingService: false
            }
        default:
            return state;
    }
}