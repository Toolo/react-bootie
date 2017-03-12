export const eventsStateSelector = state => state.events;

export const filterSelector = state => eventsStateSelector(state).filter;
export const initialDateSelector = state => eventsStateSelector(state).initialDate;
export const endDateSelector = state => eventsStateSelector(state).endDate;

export const mapSelector = state => state.map;
