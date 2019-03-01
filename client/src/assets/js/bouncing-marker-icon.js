import L from 'leaflet';

const bouncingMarkerIcon = new L.Icon({
    iconUrl: require('../img/marker-icon.png'),
    iconRetinaUrl: require('../img/marker-icon.png'),
    iconAnchor: 'hi',
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 55),
    className: 'bounce'
});

export { bouncingMarkerIcon };