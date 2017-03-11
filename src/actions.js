import constants from './constants';

export const getEvents = date => ({
    type: constants.GET_EVENTS,
    payload: {date}
});

export const getEventsFulfilled = events => ({
    type: constants.GET_EVENTS_FULFILLED,
    payload: events
});
