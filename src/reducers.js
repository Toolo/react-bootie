import { combineReducers } from 'redux';
import constants from './constants';

const events = (state = {list: []}, {type, payload}) => {
  switch (type) {
      case constants.GET_EVENTS_FULFILLED:
          return {
              ...state,
              list: payload
          };
      default:
          return state;
  }
};

export default combineReducers({events});
