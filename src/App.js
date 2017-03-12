import React, { PropTypes } from 'react';
import {connect} from 'react-redux'
import classnames from 'classnames';
import { getEvents, updateMapPosition, openMarker, closeMarker, updateOnlineStatus } from './actions';
import AutoBindComponent from './AutoBindComponent';
import Map from './Map';
import List from './List';
import constants from './constants';
import { filteredEventsSelector, mapSelector, appOnlineStatusSelector, initialDateSelector, endDateSelector } from './selectors';
import ViewSelector from './ViewSelector';
import SearchBarContainer from './SearchBarContainer';
import TimeLineBarContainer from './TimeLineBarContainer';
import './App.css';

class App extends AutoBindComponent {

    constructor() {
        super();

        this.state = {
            activeView: constants.MAP_VIEW
        };
    }

    handleOnlineStatusUpdate() {
        this.props.updateOnlineStatus({online: navigator.onLine});
    }

    componentDidMount() {
        this.props.getEvents({
            lat: this.props.map.center[0],
            lon: this.props.map.center[1],
            initialDate: this.props.initialDate,
            endDate: this.props.endDate
        });
        window.addEventListener('online',  this.handleOnlineStatusUpdate);
        window.addEventListener('offline', this.handleOnlineStatusUpdate);
    }

    componentDidUpdate() {
        if (!this.props.online) {
            this.setState({activeView: constants.LIST_VIEW});
        }
    }

    componentWillUnmount() {
        window.removeEventListener('online',  this.handleOnlineStatusUpdate);
        window.removeEventListener('offline', this.handleOnlineStatusUpdate);
    }

    render() {
        return (
            <div className={classnames('app', this.state.activeView)}>
                {this.state.activeView === constants.MAP_VIEW
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
                <SearchBarContainer/>
                <TimeLineBarContainer/>
                <ViewSelector
                    activeView={this.state.activeView}
                    onListViewSelected={this.onListViewSelected}
                    onMapViewSelected={this.onMapViewSelected}/>
            </div>
        );
    }

    onMapViewSelected() {
        this.setState({
            activeView: constants.MAP_VIEW
        });
    }

    onListViewSelected() {
        this.setState({
            activeView: constants.LIST_VIEW
        });
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
