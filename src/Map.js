import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
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
                <Map center={position} zoom={15}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                        </Popup>
                    </Marker>
                </Map>
                <SearchBarContainer/>
                <TimeLineBarContainer/>
            </div>
        );
    }
}
