import constants from './constants';

export const getEvents = ({
    initialDate,
    endDate,
    mapCenterX,
    mapCenterY,
}) => ({
    type: constants.GET_EVENTS,
    payload: {initialDate, endDate, mapCenterX, mapCenterY}
});

export const getEventsFulfilled = ({events}) => ({
    type: constants.GET_EVENTS_FULFILLED,
    payload: {events}
});

export const updateFilter = ({filter}) => ({
    type: constants.UPDATE_FILTER,
    payload: {filter}
});

export const updateFilterFulfilled = ({filter}) => ({
    type: constants.UPDATE_FILTER_FULFILLED,
    payload: {filter}
});

export const updateTimeLine = ({initialDate, endDate}) => ({
    type: constants.UPDATE_TIME_LINE,
    payload: {initialDate, endDate}
});

export const updateMapPosition = ({center, zoom}) => ({
    type: constants.UPDATE_MAP_POSITION,
    payload: {center, zoom}
});

export const openMarker = ({id}) => ({
    type: constants.OPEN_MARKER,
    payload: {id}
});

export const closeMarker = ({id}) => ({
    type: constants.CLOSE_MARKER,
    payload: {id}
});
