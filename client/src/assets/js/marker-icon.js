import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: require('../img/marker-icon.png'),
    iconRetinaUrl: require('../img/marker-icon.png'),
    iconSize: [24,36],
    iconAnchor: [24,54],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 55),
});

export { markerIcon };