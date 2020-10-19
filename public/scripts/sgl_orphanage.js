const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
};

var map = L.map("mapid", options).setView([-19.8500051, -43.9827995], 14);
var sizeicon = 40;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [sizeicon, sizeicon],
  iconAnchor: [20, 35],
  popupAnchor: [170, 2],
});

L.marker([-19.8500051, -43.9827995], { icon }).addTo(map);

/*Image gallery*/

function selectImage(event) {
  const button = event.currentTarget;

  //remover todas classes 'active'
  const allbuttons = document.querySelectorAll(".images button");
  allbuttons.forEach((element) => {
    element.classList.remove("active");
  });

  //selecionar imagem
  const image = button.children[0]; //elementos derivados do elemento html
  const container = document.querySelector(".orphanage-details > img");

  //atualizar container de imagem (main image)
  container.src = image.src;

  //adicionar classe .active para botao clicado
  button.classList.add("active");
}
