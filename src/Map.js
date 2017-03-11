import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import SearchBar from './SearchBar';
import TimeLineBar from './TimeLineBar';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export default class MapContainer extends Component {
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
                <SearchBar/>
                <TimeLineBar/>
            </div>
        );
    }
}
