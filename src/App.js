import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import { getEvents, updateMapPosition, openMarker, closeMarker, updateOnlineStatus } from './actions';
import AutoBindComponent from './AutoBindComponent';
import Map from './Map';
import List from './List';
import { filteredEventsSelector, mapSelector, appOnlineStatusSelector, initialDateSelector, endDateSelector } from './selectors';
import './App.css';

class App extends AutoBindComponent {

    handleOnlineStatusUpdate() {
        this.props.updateOnlineStatus({online: navigator.onLine});
    }

    componentDidMount() {
        console.log(this.props.map.center[0]);
        this.props.getEvents({
            lat: this.props.map.center[0],
            lon: this.props.map.center[1],
            initialDate: this.props.initialDate,
            endDate: this.props.endDate
        });
        window.addEventListener('online',  this.handleOnlineStatusUpdate);
        window.addEventListener('offline', this.handleOnlineStatusUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('online',  this.handleOnlineStatusUpdate);
        window.removeEventListener('offline', this.handleOnlineStatusUpdate);
    }


    render() {
        return (
            <div className="app">
                {this.props.online
                ? (
                    <Map
                        {...this.props.map}
                        events={this.props.events}
                        onUpdatePosition={this.props.updateMapPosition}
                        onOpenMarker={this.props.openMarker}
                        onCloseMarker={this.props.closeMarker}
                    />
                )
                : (
                    <List events={this.props.events} />
                )}
            </div>
        );
    }
}

App.propTypes = {
    map: PropTypes.object,
    getEvents: PropTypes.func.isRequired,
    openMarker: PropTypes.func.isRequired,
    closeMarker: PropTypes.func.isRequired,
    updateMapPosition: PropTypes.func.isRequired,
    updateOnlineStatus: PropTypes.func.isRequired,
    online: PropTypes.bool.isRequired,
    initialDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    map: {
        ...mapSelector(state),
    },
    events: filteredEventsSelector(state),
    online: appOnlineStatusSelector(state),
    initialDate: initialDateSelector(state),
    endDate: endDateSelector(state)
});

export default connect(mapStateToProps, {getEvents, updateMapPosition, openMarker, closeMarker, updateOnlineStatus})(App);
