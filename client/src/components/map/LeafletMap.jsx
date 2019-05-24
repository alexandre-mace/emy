import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import {GoogleApiWrapper} from 'google-maps-react';
import LeafletMarker from './LeafletMarker.jsx';
import MapSearchAutoComplete from './MapSearchAutoComplete';

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
            zoom: 13,
        }

        this.goToAddress = this.goToAddress.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.foodstuffs['hydra:totalItems'] || props.foodstuffs['hydra:totalItems'] === 0) {
            if (this.state.markers.length !== props.foodstuffs['hydra:totalItems']) {
                const markerPromises = this.getMarkers(props.foodstuffs);
                Promise.all(markerPromises).then(markers => {
                    this.setState({
                        markers: markers
                    });
                });
            }
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
        if (this.props.foodstuffs && this.props.foodstuffs['hydra:totalItems'] > 0) {
            const markerPromises = this.getMarkers(this.props.foodstuffs);
            Promise.all(markerPromises).then(markers => {
                this.setState({
                    markers: markers
                });
            });
        }
    }

    goToAddress = (coordinates) => {
        console.log(coordinates)
        this.setState({
            coordinates: {lat: coordinates.lat, lng: coordinates.lng}
        });
    }

    render() {
        const coordinates = this.state.coordinates
        ? [ this.state.coordinates.lat, this.state.coordinates.lng ]
        : [ 44.8337080, -0.5821208]
        
        window.dispatchEvent(new Event('resize'));
        return (
            <>
            <Map center={coordinates} zoom={this.state.zoom}>
                <TileLayer
                    url='http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png'
                    attribution='map data © [[http://osm.org/copyright|OpenStreetMap contributors]] under ODbL  - tiles OpenRiverboatMap'
                />
                {this.state.markers.map(marker => (
                    <LeafletMarker key={marker[0]} marker={marker} productAdded={this.state.productAdded}></LeafletMarker>
                ))}
            </Map>
            {
                !this.state.coordinates &&
                <div className="ctn-search-map">
                    <div className="center-search-map">
                        <MapSearchAutoComplete mapSearchContext={true} goToAddress={this.goToAddress}/>
                    </div>
                </div>
            }
           
            </>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyCgFf-er2mba4V3HG0awy_w7M13nlrNtaY')
})(LeafletMap)