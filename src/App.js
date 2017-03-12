import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import { getEvents, updateMapCenter } from './actions';
import Map from './Map';
import { mapCenterSelector } from './selectors';
import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.getEvents({});
    }

    render() {
        return (
            <div className="app">
                <Map {...this.props.map} onUpdateCenter={this.props.updateMapCenter} />
            </div>
        );
    }
}

App.propTypes = {
    map: PropTypes.object,
    getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    map: {
        events: state.events.list,
        center: mapCenterSelector(state)
    }
});
export default connect(mapStateToProps, {getEvents, updateMapCenter})(App);
