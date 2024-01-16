import config from "../../Assets/localConfig.json";
import { Base64ToJson } from "../Utils";

const GetOwnersMin = (token, vet_id, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url =
    config.baseApi + `propietarios.php?id_veterinaria=${vet_id}&format=MIN`;
  //console.log(url)
  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(Base64ToJson(json));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetOwners = (token, vet_id, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url =
    config.baseApi +
    `propietarios.php?id_veterinaria=${vet_id}&recientes=1&format=MIN`;
  //console.log(url)
  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(Base64ToJson(json));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetOwner = (token, id, id_veterinaria, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url =
    config.baseApi +
    `propietarios.php?id_veterinaria=${id_veterinaria}&id_propietario=${id}`;

  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const AddOwner = (data, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", data.token);
  // myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      direccion: data.direccion,
      email: data.email,
      id_region: data.region,
      identificacion_regional: data.id_regional,
      nombre: data.nombre,
      notas: data.notas,
      telefono: data.telefono,
      id_veterinaria: data.id_veterinaria,
      planificadas_tarea: data.planificadas_tarea,
    },
    {},
  ]);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let url = config.baseApi + "propietarios.php";
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let aux = result.split(" ");
      console.log(aux);
      if (aux[0] === "Duplicate") errorCallback(null);
      else callback(result);
      //console.log(result)
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      console.log("error", error);
    });
};

const DeleteOwner = (data, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", data.token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    //body: raw,
    redirect: "follow",
  };
  let url =
    config.baseApi +
    `propietarios.php?id_propietario=${data.id_propietario}&id_veterinaria=${data.id_veterinaria}`;
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      callback(result);
      //console.log(result)
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      console.log("error", error);
    });
};

const EditOwner = (data, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", data.token);
  // myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      direccion: data.direccion,
      email: data.email,
      id: data.id,
      id_region: data.id_region,
      identificacion_regional: data.identificacion_regional,
      nombre: data.nombre,
      notas: data.notas,
      telefono: data.telefono,
      thumb: 0,
      id_veterinaria: data.id_veterinaria,
      planificadas_tarea: data.planificadas_tarea,
    },
    {},
  ]);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let url = config.baseApi + "propietarios.php";
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let aux = result.split(" ");
      console.log(aux);
      if (aux[0] === "Duplicate") errorCallback(null);
      else callback(result);
      //console.log(result)
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      console.log("error", error);
    });
};

export { GetOwners, GetOwner, AddOwner, DeleteOwner, EditOwner, GetOwnersMin };
