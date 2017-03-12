export const eventsStateSelector = state => state.events;
export const filterSelector = state => eventsStateSelector(state).filter;
export const initialDateSelector = state => eventsStateSelector(state).initialDate;
export const endDateSelector = state => eventsStateSelector(state).endDate;
export const listSelector = state => eventsStateSelector(state).list;
export const eventSelector = (state, id) => listSelector(state).find(event => event.id === id);
export const currentEventSelector = state => eventsStateSelector(state).currentEvent;

// TODO reselect would be good to have
export const filteredEventsSelector = state => {
    const filter = filterSelector(state);
    const filterRegEx = new RegExp(filter, 'ig');
    return listSelector(state)
        .filter(event => event.name.match(filterRegEx));
};

export const mapSelector = state => state.map;

export const appOnlineStatusSelector = state => state.app.online;
