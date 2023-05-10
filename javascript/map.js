const directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

//Renderizar en el mapa la ruta más cercana
const map = new google.maps.Map(document.getElementById("map"), {
  center: new google.maps.LatLng(-101.6313894764541, 21.166128124361702),
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});

// Obtenemos los parámetros de la URL que son los datos que envió el usuario
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nombre = urlParams.get("nombre");
const latitud = parseFloat(urlParams.get("latitud"));
const longitud = parseFloat(urlParams.get("longitud"));

//Consumir de la API todas las sucursales y renderizarlas en el DOM

let mensajeNombre = document.getElementById('nombre-label')
mensajeNombre.innerHTML = nombre

let branches = [{}];
async function getBranches() {
  const response = await fetch("http://IP:4005/api/branches/all"); // AQUI SE CAMBIA POR TU IP
  const jsonData = await response.json();
  branches = jsonData.features;
}
await getBranches();

//console.log(branches);
var mylatlng = { lat: latitud, lng:longitud };
//Cambiar despues por este arreglo
let branchesSort = [{}];

//Funcion para empezar a calcular el tiempo
//Funcion para empezar a calcular el tiempo
function calcRoute() {
  const promises = [];

  for (let i = 0; i < branches.length; i++) {
    const request = {
      origin: mylatlng,
      destination: `${branches[i].geometry.coordinates[1]},${branches[i].geometry.coordinates[0]}`,
      travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING AND TRANSIT
      unitSystem: google.maps.UnitSystem.IMPRERIAL,
    };

    const promise = new Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve({
            branches: branches[i],
            result: {
              distance: result.routes[0].legs[0].distance,
              duration: result.routes[0].legs[0].duration,
            },
          });
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      });
    });

    promises.push(promise);
  }

  return Promise.all(promises);
}


calcRoute().then((branchesSort) => {
  branchesSort.sort(
    (a, b) => a.result.duration.value - b.result.duration.value
  );

  console.log(branchesSort);

  const cards = branchesSort
    .map((branch) => {
      return `
        <div class="card">
          <h4 id="sucursal"> ${branch.branches.properties.name}</h4>
          <p id="gerente" class="manager-label"><b>Manager: </b>${
            branch.branches.properties.manager_name
          }</p>
          <p id="latitud">Latitude: <span>${
            branch.branches.geometry.coordinates[0]
          }</span></p>
          <p id="longitud">Longitud: <span>${
            branch.branches.geometry.coordinates[1]
          }</span></p>
          <p id="longitud">Distancia: <span>${
            branch.result.distance.text
          }</span></p>
          <p id="longitud">Tiempo: <span>${
            branch.result.duration.text
          }</span></p>
        </div>
      `;
    })
    .join(" ");

const card = `
<img class="img-bar" src="/bar.jpg" alt="imgBar" />
<div>
    <p class="subtitle">Ruta más cercana</p>
    <h4>${branchesSort[0].branches.properties.name}</h4>
    <p class="manager-label"><b>Manager: </b>${
      branchesSort[0].branches.properties.manager_name
    }</p>
    <p>Latitude: <span>${
      branchesSort[0].branches.geometry.coordinates[0]
    }</span></p>
    <p>Longitud: <span>${
      branchesSort[0].branches.geometry.coordinates[1]
    }</span></p><p id="longitud">Distancia: <span>${
      branchesSort[0].result.distance.text
    }</span></p>
    <p id="longitud">Tiempo: <span>${
      branchesSort[0].result.duration.text
    }</span></p>
  </div
`

directionsService.route(
  {
    origin: mylatlng,
    destination: `${
      branchesSort[0].branches.geometry.coordinates[1] +
      "," +
      branchesSort[0].branches.geometry.coordinates[0]
    }`,
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

   console.log( branchesSort[0].branches.properties.name)

  document.getElementById("id-component").innerHTML = cards;
  document.getElementById("sucursal_card").innerHTML = card;
});
//Hacer lógica para encontrar la sucursal más cercana y excluirla del arregjlo que se va a mostrar en
//la lista de sucursales






