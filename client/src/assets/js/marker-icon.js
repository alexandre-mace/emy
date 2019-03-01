import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: require('../img/marker-icon.png'),
    iconRetinaUrl: require('../img/marker-icon.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 55),
});

export { markerIcon };