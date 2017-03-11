import React, { PropTypes } from 'react';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import moment from 'moment';
import AutoBindComponent from './AutoBindComponent';
import SearchBarContainer from './SearchBarContainer';
import TimeLineBarContainer from './TimeLineBarContainer';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default class MapContainer extends AutoBindComponent {
    render() {
        const position = [37.7822, -122.3934];
        return (
            <div className="map">
                <Map center={position} zoom={15} zoomControl={false}>
                    <ZoomControl position="bottomright" />
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.props.events.map(event => {
                        const estimatedLength = event.name.length * 8;
                        return (<Marker
                            key={event.id}
                            position={[event.latitude, event.longitude]}
                            icon={new L.DivIcon({
                                className: 'markerIcon',
                                iconAnchor: new L.Point(estimatedLength / 2, 35),
                                iconSize:  new L.Point(estimatedLength, 28),
                                html: `<div class="markerIcon-content">${event.name}</div>`
                            })}
                        >
                            <Popup>
                                <div>
                                    <div>{event.name}</div>
                                    <div>{`${moment(event.startDateTime, 'x').format('MM/DD hh:mm a')} - ${moment(event.endDateTime, 'x').format('MM/DD hh:mm a')}`}</div>
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
  events: PropTypes.array.isRequired
};
