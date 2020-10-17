var map = L.map("mapid").setView([-19.8500051, -43.9827995], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

//popup overlay
const popup = L.popup({
  closeButton: false,
  className: "map-popup",
  minWidth: 230,
  minHeight: 160,
}).setContent(
  'Lar das meninas <a href="sgl-orphanage.html" class="choose-orphanage"> <img src="./public/images/arrow-white.svg"></a>'
);

L.marker([-19.8500051, -43.9827995], { icon }).addTo(map).bindPopup(popup);
