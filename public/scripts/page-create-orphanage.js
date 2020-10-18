/* Map */
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

/* Field upload photo */
function addPhotoField() {
  var ContainerPhoto, FieldsContainer, NewFieldContainer;
  var Input_FieldContainer;

  //container de fotos: #images
  ContainerPhoto = document.querySelector("#images");

  //container a ser duplicado: .new-image
  FieldsContainer = document.querySelectorAll(".new-upload");

  //clonar ultima imagem adicionada
  NewFieldContainer = FieldsContainer[FieldsContainer.length - 1].cloneNode(1);

  console.log(NewFieldContainer);

  Input_FieldContainer = NewFieldContainer.children[0];

  if (!(Input_FieldContainer.value == "")) {
    //injetar no HTML novo input ".new-upload"
    Input_FieldContainer.value = "";
    ContainerPhoto.appendChild(NewFieldContainer);
  } else {
    return;
  }
}

function deletePhotoField(event) {
  var ContainerPhoto, FieldsContainer, elementHTML;
  var DeleteFieldContainer;

  this_elementHTML = event.currentTarget;

  FieldsContainer = document.querySelectorAll(".new-upload");

  if (FieldsContainer.length < 2) {
    //limpar campo
    this_elementHTML.parentNode.children[0].value = "";
  } else {
    //deleta campo
    DeleteFieldContainer = this_elementHTML.parentNode;
    DeleteFieldContainer.remove();
  }
}

/* Select yes or no */
function toggleselect(event) {
  //pegar botao clicado
  var this_elementHTML = event.currentTarget;

  //verifica 'sim' ou 'nao'
  var button_value = this_elementHTML.value;

  //limpar qualquer classe active
  var buttons_elements = document.querySelectorAll(".button-select button");
  buttons_elements.forEach((element) => {
    element.classList.remove("active");
  });

  //inserir classe active no botao selecionado
  this_elementHTML.classList.add("active");

  //atualizar input hidden
  var input = document.querySelector("[name=open_on_weekends]");
  input.value = button_value;
}
