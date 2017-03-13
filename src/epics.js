import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {
    getEvents,
    getEventsFulfilled,
    updateFilterFulfilled,
    openMarker,
    clearCurrentEvent,
    updateMapPosition,
    updateMapPositionFulfilled
} from './actions';
import constants from './constants';
import EventsService from './EventsService';
import {mapSelector, initialDateSelector, endDateSelector, eventSelector, listSelector} from './selectors';

function getEventsEpic(action$, store) {
    return action$.ofType(constants.GET_EVENTS)
        .mergeMap(action => {
            const state = store.getState();
            const eventsService = new EventsService();
            const map = mapSelector(state);
            const lat = action.payload.lat || map.center[0];
            const lon = action.payload.lon || map.center[1];
            const initialDate = action.payload.initialDate || initialDateSelector(state);
            const endDate = action.payload.endDate || endDateSelector(state);
            return Observable.fromPromise(eventsService.getEvents({
                initialDate,
                endDate,
                lat,
                lon
            }))
                .map(events => getEventsFulfilled({events}));
        });
}

function updateFilterEpic(action$) {
    const debounced$ = action$.ofType(constants.UPDATE_FILTER)
        .debounceTime(400)
        .map(action => updateFilterFulfilled(action.payload));
    const synchronous$ = action$.ofType(constants.UPDATE_FILTER)
        .map(() => clearCurrentEvent());
    return Observable.merge(synchronous$, debounced$);
}

function updateTimeLineEpic(action$) {
    return action$.ofType(constants.UPDATE_TIME_LINE)
        .map(action => getEvents(action.payload));
}

function setCurrentEventEpic(action$, store) {
    const setCurrentEvent$ = action$.ofType(constants.SET_CURRENT_EVENT)
        .map(action => updateFilterFulfilled({filter: action.payload.event.name}));
    const updateMapPosition$ = action$.ofType(constants.SET_CURRENT_EVENT)
        .map(action => {
            const event = action.payload.event;
            const map = mapSelector(store.getState());
            return updateMapPosition({
                center: [event.latitude, event.longitude],
                zoom: map.zoom
            });
        });
    const openMarker$ = action$.ofType(constants.SET_CURRENT_EVENT)
        .map(action => openMarker({id: action.payload.event.id}));
    return Observable.merge(setCurrentEvent$, openMarker$, updateMapPosition$);
}

function updateMapPositionEpic(action$, store) {
    const updateMapPosition$ = action$.ofType(constants.UPDATE_MAP_POSITION)
        .throttleTime(300)
        .map(action => updateMapPositionFulfilled(action.payload));
    const getEvents$ = action$.ofType(constants.UPDATE_MAP_POSITION)
        .filter(() => !listSelector(store.getState()).find(event => event.isOpen))
        .debounceTime(1000)
        .map(() => getEvents({}));
    return Observable.merge(updateMapPosition$, getEvents$);
}

function openMarkerEpic(action$, store) {
    return action$.ofType(constants.OPEN_MARKER)
        .map(action => {
            let state = store.getState();
            const {latitude, longitude} = eventSelector(state, action.payload.id);
            const {zoom} = mapSelector(state);
            return updateMapPosition({center: [latitude, longitude], zoom});
        });
}

export default combineEpics(getEventsEpic, updateFilterEpic, updateTimeLineEpic, setCurrentEventEpic, updateMapPositionEpic, openMarkerEpic);
