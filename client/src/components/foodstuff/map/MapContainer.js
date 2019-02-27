import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import MarkerIcon from '../assets/img/marker-icon.png';

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      foodstuffs: {},
      markers: []
    }
  }
  componentWillMount() {
      var self = this;
      const google = window.google;
      const geocoder = new google.maps.Geocoder();
      function getMarkerData(foodstuff) {
          return new Promise(function (resolve, reject) {
              geocoder.geocode( { 'address': foodstuff['address']}, function(results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                      resolve([foodstuff['id'], results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
                  } else {
                      reject(new Error('Couldnt\'t find the location ' + foodstuff['address']));
                  }
              });
          })
      }
      function getMarkers() {
          const markers = [];
          self.props.foodstuffs && self.props.foodstuffs['hydra:member'].forEach(function(foodstuff) {
              markers.push(getMarkerData(foodstuff))
          });
          return markers;

      }
      const markerPromises = getMarkers();
      Promise.all(markerPromises).then(function (markers) {
          self.setState({
              markers: markers
          })
      });
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
      {this.state.markers.map((marker) => {
          return <Marker
              name='Location'
              position={{ lat: marker[1], lng: marker[2] }}
              key={marker[0]}
              id={marker[0]}
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