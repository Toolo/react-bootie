import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { getEvents, getEventsFulfilled, updateFilterFulfilled, updateFilter, clearCurrentEvent, updateMapPosition} from './actions';
import constants from './constants';
import EventsService from './EventsService';
import { mapSelector } from './selectors';

function getEventsEpic(action$) {
    return action$.ofType(constants.GET_EVENTS)
        .mergeMap(action => {
            const eventsService = new EventsService();
            return Observable.fromPromise(eventsService.getEvents(action.payload))
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
        .map(action => updateFilter({filter: action.payload.event.name}));
    const updateMapPosition$ = action$.ofType(constants.SET_CURRENT_EVENT)
        .map(action => {
            const event = action.payload.event;
            const map = mapSelector(store.getState());
            return updateMapPosition({
                center: [event.latitude, event.longitude],
                zoom: map.zoom
            });
        });
    return Observable.merge(setCurrentEvent$, updateMapPosition$);
}

export default combineEpics(getEventsEpic, updateFilterEpic, updateTimeLineEpic, setCurrentEventEpic);
