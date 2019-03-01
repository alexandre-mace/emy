import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import {markerIcon}  from '../../assets/js/marker-icon.js'
import {bouncingMarkerIcon} from "../../assets/js/bouncing-marker-icon";

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
        if (this.state.markerIcon.options.className && this.state.markerIcon.options.className.includes('bounce')) {
            this.setState({markerIcon: markerIcon});
            const foodstuff = document.getElementsByClassName('foodstuff-' + this.props.marker[0]);
            foodstuff[0].classList.remove('selected');
        } else {
            this.setState({markerIcon: bouncingMarkerIcon});
            const foodstuff = document.getElementsByClassName('foodstuff-' + this.props.marker[0]);
            foodstuff[0].classList.add('selected');
        }
    }

    render() {
        this.state.markerIcon.options.className = this.state.markerIcon.options.className + ' marker-' + this.props.marker[0];
        return (<Marker onClick={this.handleClick} icon={this.state.markerIcon} key={this.props.marker[0]} position={[this.props.marker[1], this.props.marker[2]]}>
            </Marker>
        )
    }
}
