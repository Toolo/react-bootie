import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import { getEvents, updateMapPosition, openMarker, closeMarker, updateOnlineStatus } from './actions';
import AutoBindComponent from './AutoBindComponent';
import Map from './Map';
import { filteredEventsSelector, mapSelector, appOnlineStatusSelector } from './selectors';
import './App.css';

class App extends AutoBindComponent {

    handleOnlineStatusUpdate() {
        this.props.updateOnlineStatus({online: navigator.onLine});
    }

    componentDidMount() {
        this.props.getEvents({});
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
    updateMapPosition: PropTypes.func.isRequired,
    updateOnlineStatus: PropTypes.func.isRequired,
    online: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    map: {
        ...mapSelector(state),
        events: filteredEventsSelector(state)
    },
    online: appOnlineStatusSelector(state)
});

export default connect(mapStateToProps, {getEvents, updateMapPosition, openMarker, closeMarker, updateOnlineStatus})(App);
