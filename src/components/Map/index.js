import React from "react";

import "leaflet/dist/leaflet.css";
import { Map, TileLayer } from "react-leaflet";

export default class Map2 extends React.Component {
  render() {
    return (
      <div id="mapid">
        <Map
          classname="map"
          center={[this.props.lat || this.props.lat2, this.props.lng]}
          zoom={this.props.zoom}
          onClick={this.props.getlatlng}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
        </Map>
      </div>
    );
  }
}
