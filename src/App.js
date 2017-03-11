import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import { getEvents } from './actions';
import Map from './Map';
import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.getEvents({});
    }

    render() {
        return (
            <div className="app">
                <Map />
            </div>
        );
    }
}

App.propTypes = {
    getEvents: PropTypes.func.isRequired
};

export default connect((state) => ({}), {getEvents})(App);
