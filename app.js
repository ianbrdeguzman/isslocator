// Map tiles from https://cloud.maptiler.com/maps/streets/
const tileURL = 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=p7ihCRQWhKjuuO74RERo';

// Attribution from https://cloud.maptiler.com/maps/streets/
const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

// create map and add tiles
const issMap = L.map('map', { zoomControl: false }).setView([0, 0], 2);
const tiles = L.tileLayer(tileURL, {
    attribution,
    minZoom: 2,
    maxZoom: 2,
});
tiles.addTo(issMap);    

// create marker with custom icon
const issIcon = L.icon({
    iconUrl: './iss.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});
const iss = L.marker([0,0], {icon: issIcon}).addTo(issMap);

// API url from https://wheretheiss.at/w/developer
const APIURL = 'https://api.wheretheiss.at/v1/satellites/25544';

// getData function
const getData = async () => {

    // fetch data
    const response = await fetch(APIURL);

    // convert data into json
    const data = await response.json();

    // assign latitude and longitude
    const latitude = data.latitude;
    const longitude = data.longitude;

    // update map and marker location
    issMap.setView([latitude, longitude], 2);
    iss.setLatLng([latitude, longitude]);

    // show current location
    document.querySelector('#latitude')
        .textContent = latitude;
    document.querySelector('#longitude')
        .textContent = longitude;
};

// call getData every second
getData();
setInterval(getData, 1000);