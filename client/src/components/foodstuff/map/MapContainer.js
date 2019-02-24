import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import MarkerIcon from '../assets/img/marker-icon.png';

export class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      points : [
        {lat: 44.85839, lng: -0.5600507},
        {lat: 44.87939, lng: -0.7600507},
        {lat: 44.65839, lng: -0.3300507},
        {lat: 44.65839, lng: -0.4300507},
        {lat: 44.736503, lng: -0.4670567}
      ]
    }
  }

  render() {

    return (
      <Map
        zoom={10}
        google={this.props.google}
        initialCenter={{
          lat: 44.8416487,
          lng: -0.5704502
        }}
      >
        {this.state.points.map((location) => {
          return <Marker
            name='Location'
            position={{ lat: location.lat, lng: location.lng }}
            key={Math.random(100)}
            id={location.id}
            icon={MarkerIcon}
          />
        }
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCgFf-er2mba4V3HG0awy_w7M13nlrNtaY')
})(MapContainer)