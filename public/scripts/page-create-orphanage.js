var map = L.map("mapid").setView([-19.8500051, -43.9827995], 14);
var sizeicon = 40;
var marker; //have a single marker on map

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [sizeicon, sizeicon],
  iconAnchor: [20, 35],
  popupAnchor: [170, 2],
});

//create and add marker
map.on("click", function (event) {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  //remove icon
  if (marker) {
    map.removeLayer(marker);
  }

  //create maker on map layer
  marker = L.marker([lat, lng], { icon }).addTo(map);

  //input form coordenate
  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;
});
