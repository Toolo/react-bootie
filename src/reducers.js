import {combineReducers} from 'redux';
import constants from './constants';

const eventsInitialState = {
    list: [],
    filter: '',
    initialDate: Date.now() - (1000 * 60 * 60 * 24 * 7),
    endDate: Date.now()
};
const events = (state = eventsInitialState, {type, payload}) => {
    switch (type) {
        case constants.GET_EVENTS_FULFILLED:
            return {
                ...state,
                list: payload.events
            };
        case constants.UPDATE_FILTER:
            return {
                ...state,
                filter: payload.filter
            };
        case constants.UPDATE_FILTER_FULFILLED:
            return {...state};
        case constants.UPDATE_TIME_LINE:
            return {
                ...state,
                initialDate: payload.initialDate,
                endDate: payload.endDate
            };
        default:
            return state;
    }
};

const mapInitialState = {center: [37.7822, -122.3934]};
const map = (state = mapInitialState, {type, payload}) => {
    switch (type) {
        case constants.UPDATE_MAP_CENTER:
            return {
                ...state,
                center: payload.center
            };
        default:
            return state;
    }
};

export default combineReducers({events, map});
