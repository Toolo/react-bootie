import {combineReducers} from 'redux';
import constants from './constants';

const eventsInitialState = {
    list: [],
    filter: '',
    initialDate: Date.now() - (1000 * 60 * 60 * 24 * 15),
    endDate: Date.now() + (1000 * 60 * 60 * 24 * 15),
    currentEvent: {}
};
const events = (state = eventsInitialState, {type, payload}) => {
    switch (type) {
        case constants.GET_EVENTS_FULFILLED:
            return {
                ...state,
                list: payload.events
            };
        case constants.UPDATE_FILTER_FULFILLED:
            return {
                ...state,
                filter: payload.filter
            };
        case constants.UPDATE_TIME_LINE:
            return {
                ...state,
                initialDate: payload.initialDate,
                endDate: payload.endDate
            };
        case constants.OPEN_MARKER:
            return {
                ...state,
                list: state.list.map(event => ({
                    ...event,
                    isOpen: event.id === payload.id
                }))
            };
        case constants.CLOSE_MARKER:
            return {
                ...state,
                list: state.list.map(event => ({
                    ...event,
                    isOpen: event.id === payload.id
                        ? false
                        : event.isOpen
                }))
            };
        case constants.SET_CURRENT_EVENT:
            return {
                ...state,
                currentEvent: {...payload.event}
            };
        case constants.CLEAR_CURRENT_EVENT:
            return {
                ...state,
                currentEvent: {}
            };
        default:
            return state;
    }
};

const mapInitialState = {center: [37.7822, -122.3934], zoom: 15};
const map = (state = mapInitialState, {type, payload}) => {
    switch (type) {
        case constants.UPDATE_MAP_POSITION:
            return {
                ...state,
                center: payload.center || state.center,
                zoom: payload.zoom || state.zoom
            };
        default:
            return state;
    }
};

const appInitialState = {online: navigator.onLine};
const app = (state = appInitialState, {type, payload}) => {
    switch (type) {
        case constants.UPDATE_ONLINE_STATUS:
            return {...state, online: payload.online};
        default:
            return state;
    }
};

export default combineReducers({events, map, app});
