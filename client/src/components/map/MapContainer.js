import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import MarkerIcon from '../foodstuff/assets/img/marker-icon.png';

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodstuffs: {},
            markers: []
        }
    }
    getMarkerData = foodstuff => {
        const google = window.google;
        const geocoder = new google.maps.Geocoder();
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
    getMarkers = (foodstuffs) => {
        const markers = [];
        foodstuffs && foodstuffs['hydra:member'].forEach(foodstuff => {
            markers.push(this.getMarkerData(foodstuff))
        });
        return markers;

    }
    componentDidMount() {
        if (this.props.foodstuffs && this.props.foodstuffs['hydra:member'].length > 0) {
            const markerPromises = this.getMarkers(this.props.foodstuffs);
            Promise.all(markerPromises).then(markers => {
                this.setState({
                    markers: markers
                })
            });
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