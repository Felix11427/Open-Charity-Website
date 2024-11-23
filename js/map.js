// Create a map instance and set the initial view to specific coordinates and zoom level
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to the map
const marker = L.marker([51.505, -0.09]).addTo(map);

// Add a popup to the marker
marker.bindPopup("<b>Hello!</b><br>This is a marker.").openPopup();

// Add a circle with custom properties to the map
const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

// Add a polygon to the map
const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Bind popups to the circle and polygon
circle.bindPopup("I am a red circle.");
polygon.bindPopup("I am a polygon.");

// Add an event listener to the map to show coordinates when clicked
map.on('click', function (e) {
    const { lat, lng } = e.latlng;
    L.popup()
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at<br>Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`)
        .openOn(map);
});
