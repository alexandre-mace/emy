import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {GoogleApiWrapper} from 'google-maps-react';

type State = {
    lat: number,
    lng: number,
    zoom: number,
}

export class LeafletMap extends Component<{}, State> {

    constructor(props){
        super(props);
        this.state = {
            foodstuffs: {},
            markers: [],
            zoom: 13
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
                });
                console.log(markers);
            });
        }
    }

    render() {
        window.dispatchEvent(new Event('resize'));
        console.log(this.state.markers);
        this.state.markers.forEach(marker => {
            console.log(marker[1]);
        });
        return (
            <Map center={[ 44.8637065, -0.6561808]} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {this.state.markers.map((marker) => {
                    return <Marker key={marker[0]} position={[marker[1], marker[2]]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                    }
                )}
            </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyCgFf-er2mba4V3HG0awy_w7M13nlrNtaY')
})(LeafletMap)