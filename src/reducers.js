import { combineReducers } from 'redux';
import constants from './constants';

const events = (state = {list: []}, {type, payload}) => {
  switch (type) {
      case constants.GET_EVENTS_FULFILLED:
          return {
              ...state,
              list: payload.events
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
