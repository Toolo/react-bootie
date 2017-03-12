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
        const eventsMap = {};
        this.props.events.forEach(event => {
            const lat = event.latitude;
            const lng = event.longitude;
            const key = `${lat};${lng}`;
            if (!eventsMap[key]) {
                eventsMap[key] = [];
            }
            eventsMap[key].push(event);
        });
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
                    {Object.keys(eventsMap).map((latlngKey, idx)=> {
                        const [lat, lng] = latlngKey.split(';');
                        const events = eventsMap[latlngKey];
                        const assistants = events.reduce((acc, event) => (acc + event.assistants), 0);
                        const strAssistants = assistants.toString();
                        const estimatedLength = (strAssistants.length * 8) + (strAssistants.length < 7 ? 15 : 1);
                        const minSize = 30;
                        const size = Math.max(estimatedLength, minSize);
                        const type = events.length > 1 ? 'busy' : events[0].type;
                        return (<Marker
                            key={idx}
                            position={[Number(lat), Number(lng)]}
                            icon={new L.DivIcon({
                                className: classnames(
                                    'markerIcon',
                                    `markerIcon--${type}`,
                                    {'is-open': events[0].isOpen}
                                ),
                                iconSize: new L.Point(size, size),
                                html: `<div class="markerIcon-content">${assistants}</div>`
                            })}
                            onClick={() => this.props.onOpenMarker({id: events[0].id})}
                            onPopupclose={() => this.props.onCloseMarker({id: events[0].id})}
                        >
                            <Popup>
                                <div className="events-popup">
                                    {events.map((event, idx) => {
                                        return <div className="events-popup-event" key={idx}>
                                            <div className="events-popup-name"><a href={event.url} target="_blank">{event.name}</a></div>
                                            <div>{`${moment(event.time, 'x').format('MM/DD hh:mm a')}`}</div>
                                            <div>{event.assistants} assistants</div>
                                        </div>;
                                    })}
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
