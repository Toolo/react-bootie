import React, {PropTypes} from 'react';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import moment from 'moment';
import AutoBindComponent from './AutoBindComponent';
import classnames from 'classnames';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default class MapContainer extends AutoBindComponent {
    render() {
        return (
            <div className="map">
                <Map
                    center={this.props.center}
                    onMove={this.handleMove}
                    zoom={this.props.zoom}
                    zoomControl={false}
                >
                    <ZoomControl position="bottomright"/>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.props.events.map(event => {
                        const assistants = event.assistants.toString();
                        const estimatedLength = (assistants.length * 8) + (assistants.length < 7 ? 15 : 1);
                        const minSize = 30;
                        const size = Math.max(estimatedLength, minSize);
                        return (<Marker
                            key={event.id}
                            position={[event.latitude, event.longitude]}
                            icon={new L.DivIcon({
                                className: classnames(
                                    'markerIcon',
                                    `markerIcon--${event.type}`,
                                    { 'is-open': event.isOpen}
                                ),
                                iconSize: new L.Point(size, size),
                                html: `<div class="markerIcon-content">${assistants}</div>`
                            })}
                            onClick={() => this.props.onOpenMarker({id: event.id})}
                            onPopupclose={() => this.props.onCloseMarker({id: event.id})}
                        >
                            <Popup>
                                <div>
                                    <div>{event.name}</div>
                                    <div>{`${moment(event.time, 'x').format('MM/DD hh:mm a')}`}</div>
                                    <div>{event.assistants} assistants</div>
                                </div>
                            </Popup>
                        </Marker> );
                    })}
                </Map>
            </div>
        );
    }

    handleMove({target}) {
        const {lat, lng} = target.getCenter();
        this.props.onUpdatePosition({
            center: [lat, lng],
            zoom: target.getZoom()
        });
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
