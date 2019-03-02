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
        let renderedMarker = this.state.markerIcon;
        console.log(this.props.marker[0]);
        renderedMarker.options.className = 'undefined'
            ? 'marker-' + this.props.marker[0]
            : renderedMarker.options.className + ' marker-' + this.props.marker[0];
        console.log(renderedMarker.options.className);
        return (<Marker onClick={this.handleClick} icon={renderedMarker} key={this.props.marker[0]} position={[this.props.marker[1], this.props.marker[2]]}>
            </Marker>
        )
    }
}
