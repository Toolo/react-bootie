import 'rxjs';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/paper/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import reducer from './reducers'
import epics from './epics';
import App from './App';


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const loggerMiddleware = createLogger({duration: true});
const epicMiddleware = createEpicMiddleware(epics);
const enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware, loggerMiddleware)
);

const store = createStore(reducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
