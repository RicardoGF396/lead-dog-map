// Obtenemos los parámetros de la URL que son los datos que envió el usuario
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nombre = urlParams.get("nombre");
const latitud = urlParams.get("latitud");
const longitud = urlParams.get("longitud");

//Consumir de la API todas las sucursales y renderizarlas en el DOM

//Hacer lógica para encontrar la sucursal más cercana y excluirla del arreglo que se va a mostrar en
//la lista de sucursales

//Renderizar en el mapa la ruta más cercana
const map = new google.maps.Map(document.getElementById("map"), {
  center: new google.maps.LatLng(-101.6313894764541, 21.166128124361702),
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});

const directionsService = new google.maps.DirectionsService();

directionsService.route(
  {
    origin: "21.15156966306249, -101.71159175332481",
    destination: "21.14531903546891, -101.66066969060792",
    travelMode: "DRIVING",
  },
  (response, status) => {
    if (status === "OK") {
      new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        directions: response,
        map: map,
      });
    }
  }
);
