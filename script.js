var map = L.map("map");
map.setView([18.5204, 73.8567], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var polyline;

//obj to store clicked location...
var drawnPoints = [];

//calling funtion....
navigator.geolocation.watchPosition(success, error);

//writhing funtion...
function success(pos) {
  const lat = pos.coords.latitude;
  const longi = pos.coords.longitude;

  drawnPoints.push([lat, longi]);

  //getting custom icon....
  var customIcon = L.icon({
    iconUrl: "https://img.icons8.com/color/96/visit.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  //draw marker on map...
  var icon = L.marker([lat, longi], { icon: customIcon }).addTo(map);
  icon.on("click", function (e) {
    popup
      .setLatLng(e.latlng)
      .setContent(
        `Your current location is at ${e.latlng.lat.toFixed(
          6
        )}, ${e.latlng.lng.toFixed(6)}`
      )
      .openOn(map);
    setTimeout(function () {
      map.closePopup();
    }, 5000);
  });

  //draw circle about 500 radius...
  var circle = L.circle([lat, longi], {
    color: "#222831",
    fillColor: "#AD88C6",
    fillOpacity: 0.2,
    radius: 500,
  }).addTo(map);

  var popup = L.popup();

  //click event for onmapclick....
  function onMapClick(e) {
    drawnPoints.push(e.latlng);
    if (polyline) {
      map.removeLayer(polyline);
    }
    polyline = L.polyline(drawnPoints, { color: "blue" }).addTo(map);
    popup
      .setLatLng(e.latlng)
      .setContent(
        `You clicked the map at ${e.latlng.lat.toFixed(
          6
        )}, ${e.latlng.lng.toFixed(6)}`
      )
      .openOn(map);
    setTimeout(function () {
      map.closePopup();
    }, 5000);
  }
  map.on("click", onMapClick);
}

//to check location....
function error(err) {
  if (err.code === 1) {
    alert("Please allow geolocation access");
  } else {
    alert("Something went wrong");
  }
}
