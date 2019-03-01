import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import {markerIcon}  from '../../assets/js/marker-icon.js'
import {bouncingMarkerIcon}  from '../../assets/js/bouncing-marker-icon.js'

export default class LeafletMarker extends Component {

    constructor(props){
        super(props);
        this.state = {
            markerIcon: markerIcon,
            marker: [],
            bounce: false
        }
    }

    handleClick = event => {
        this.setState({bounce: true});
    }

    render() {
        let renderedMarker = markerIcon;
        if (this.state.bounce === true ) {
            renderedMarker = bouncingMarkerIcon;
        }
        return (<Marker onClick={this.handleClick} icon={renderedMarker} key={this.props.marker[0]} position={[this.props.marker[1], this.props.marker[2]]}>
            </Marker>
        )
    }
}
