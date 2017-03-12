import React, {PropTypes} from 'react';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import moment from 'moment';
import AutoBindComponent from './AutoBindComponent';
import SearchBarContainer from './SearchBarContainer';
import TimeLineBarContainer from './TimeLineBarContainer';
import classnames from 'classnames';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default class MapContainer extends AutoBindComponent {
    handleMoveEnd({target}) {
        const {lat, lng} = target.getCenter();
        this.props.onUpdatePosition({
            center: [lat, lng],
            zoom: target.getZoom()
        });
    }

    render() {
        return (
            <div className="map">
                <Map
                    center={this.props.center}
                    onMoveend={this.handleMoveEnd}
                    minZoom={16}
                    zoom={this.props.zoom}
                    zoomControl={false}
                >
                    <ZoomControl position="bottomright"/>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.props.events.map(event => {
                        const estimatedLength = (event.name.length * 8) + (event.name.length < 7 ? 10 : 1);
                        return (<Marker
                            key={event.id}
                            position={[event.latitude, event.longitude]}
                            icon={new L.DivIcon({
                                className: classnames(
                                    'markerIcon',
                                    `markerIcon--${event.type}`,
                                    { 'is-open': event.isOpen}
                                ),
                                iconAnchor: new L.Point(estimatedLength / 2, 35),
                                iconSize: new L.Point(estimatedLength, 28),
                                html: `<div class="markerIcon-content">${event.name}</div>`
                            })}
                            onClick={() => this.props.onOpenMarker({id: event.id})}
                            onPopupclose={() => this.props.onCloseMarker({id: event.id})}
                        >
                            <Popup>
                                <div>
                                    <div>{event.name}</div>
                                    <div>{`${moment(event.startDateTime, 'x').format('MM/DD hh:mm a')} - ${moment(event.endDateTime, 'x').format('MM/DD hh:mm a')}`}</div>
                                    <div>{event.assistants} assistants</div>
                                </div>
                            </Popup>
                        </Marker> );
                    })}
                </Map>
                <SearchBarContainer/>
                <TimeLineBarContainer/>
            </div>
        );
    }
}

MapContainer.propTypes = {
    events: PropTypes.array.isRequired,
    center: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    onUpdatePosition: PropTypes.func.isRequired,
    onOpenMarker: PropTypes.func.isRequired,
    onCloseMarker: PropTypes.func.isRequired
};
