import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import { getEvents, updateMapPosition, openMarker, closeMarker } from './actions';
import Map from './Map';
import { filteredEventsSelector, mapSelector } from './selectors';
import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.getEvents({});
    }

    render() {
        return (
            <div className="app">
                <Map
                    {...this.props.map}
                    onUpdatePosition={this.props.updateMapPosition}
                    onOpenMarker={this.props.openMarker}
                    onCloseMarker={this.props.closeMarker}
                />
            </div>
        );
    }
}

App.propTypes = {
    map: PropTypes.object,
    getEvents: PropTypes.func.isRequired,
    openMarker: PropTypes.func.isRequired,
    closeMarker: PropTypes.func.isRequired,
    updateMapPosition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    map: {
        ...mapSelector(state),
        events: filteredEventsSelector(state)
    }
});
export default connect(mapStateToProps, {getEvents, updateMapPosition, openMarker, closeMarker})(App);
