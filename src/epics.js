import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { getEventsFulfilled } from './actions';
import constants from './constants';
import EventsService from './EventsService';

function getEventsEpic(action$) {
    return action$.ofType(constants.GET_EVENTS)
        .mergeMap(action => {
            const eventsService = new EventsService();
            return Observable.fromPromise(eventsService.getEvents(action.payload.date))
                .map(getEventsFulfilled);
        });
}

export default combineEpics(getEventsEpic);
