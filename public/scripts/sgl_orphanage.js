const map_data = document.querySelector(".map-container span");

const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
};

var map = L.map("mapid", options).setView(
  [map_data.dataset.lat, map_data.dataset.lng],
  14
);
var sizeicon = 40;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [sizeicon, sizeicon],
  iconAnchor: [20, 35],
  popupAnchor: [170, 2],
});

L.marker([map_data.dataset.lat, map_data.dataset.lng], { icon }).addTo(map);

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

///

/* Field upload photo */
function addCardField() {
  var ContainerPhoto, FieldsContainer, NewFieldContainer;
  var Input_FieldContainer;

  //container de fotos: #images
  ContainerPhoto = document.querySelector("#cards");

  //container a ser duplicado: .new-image
  FieldsContainer = document.querySelectorAll(".new-upload");

  //clonar ultima imagem adicionada
  NewFieldContainer = FieldsContainer[FieldsContainer.length - 1].cloneNode(1);

  Input_FieldContainer = NewFieldContainer.children[0];

  if (!(Input_FieldContainer.value == "")) {
    //injetar no HTML novo input ".new-upload"
    Input_FieldContainer.value = "";
    ContainerPhoto.appendChild(NewFieldContainer);
  } else {
    return;
  }
}

function deleteCardField(event) {
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
