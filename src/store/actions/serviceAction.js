import {
    GET_SERVICES,
    GETTING_SERVICES,
    SEARCHING_SERVICE,
    SEARCH_SERVICE
} from '../constants';
import {API_URL} from '../../config';
import navigationService from './../../service/navigationService';
export const getServices = () => {
    return dispatch => {
        dispatch(_gettingService());
        let url = `${API_URL}/service/get_business_types/`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(err => {
            console.log(err);
        })
        .then(res => res.json())
        .then(result => {
            dispatch(_getServices(result));
        })
    }
}

export const searchService = (searchData) => {
    return dispatch => {
        dispatch(searchingService());
        let url = `${API_URL}/client/search_service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                businessType: searchData.businessType,
                nearBy: searchData.nearBy,
                longitude: searchData.longitude,
                latitude: searchData.latitude,
                availableNow: searchData.availableNow,
                dateTime: searchData.dateTime
            }),
            mode: 'cors',
            cache: 'no-cache'
        })
        .catch(err=>{
            console.log(err);
        })
        .then(res=>res.json())
        .then(result=>{
            dispatch(_searchService(result));
            navigationService.navigate('Fifth');
        })
    }
}

export const _getServices = services => {
    return {
        type: GET_SERVICES,
        services
    }
}

export const _gettingService = () => {
    return {
        type: GETTING_SERVICES
    }
}

export const searchingService = () => {
    return {
        type: SEARCHING_SERVICE
    }
}

export const _searchService = result => {
    return {
        type: SEARCH_SERVICE,
        result
    }
}