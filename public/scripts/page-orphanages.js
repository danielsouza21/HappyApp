var map = L.map("mapid").setView([-19.8500051, -43.9827995], 14);
var sizeicon = 40;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [sizeicon, sizeicon],
  iconAnchor: [20, 35],
  popupAnchor: [170, 2],
});

function addPopups({ id, name, lat, lng }) {
  /*
  var lat = orphanage.lat;
  var lng = orphanage.lng;
  var id = orphanage.id;
  */

  //popup overlay
  const popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 230,
    minHeight: 160,
  }).setContent(
    `${name} <a href="/sgl-orphanage?id=${id}" class="choose-orphanage"> <img src="/images/arrow-white.svg"></a>`
  );

  L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll(".orphanages span");
orphanagesSpan.forEach((span) => {
  const orphanage = {
    id: span.dataset.id,
    name: span.dataset.name,
    lat: span.dataset.lat,
    lng: span.dataset.lng,
  }; //buscando hidden data-xxx para cada span passados no #each dentro do html

  addPopups(orphanage);
});
