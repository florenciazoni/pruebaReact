import config from "../../Assets/localConfig.json";
import { Base64ToJson } from "../Utils";

const GetPetsMin = (token, id_vet, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url =
    config.baseApi +
    `mascotas.php?id_veterinaria=${id_vet}&recientes=1&format=MIN`;

  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(Base64ToJson(json));
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const AddPet = (token, data, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  //myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      chip: data.chip,
      id_caracter: data.id_caracter,
      id_pelaje: data.id_pelaje,
      id_raza: data.id_raza,
      id_sexo: data.id_sexo,
      nacimiento: data.nacimiento,
      nombre: data.nombre,
      notas: data.notas,
      peso: data.peso,
      deceso: data.deceso,
      thumb: 0,
      id_veterinaria: data.id_veterinaria,
      id_propietario: data.id_propietario,
    },
    {},
  ]);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let url = config.baseApi + "mascotas.php";
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => callback(result))
    .catch((error) => console.log("error", error));
};

const GetRace = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_razas.php?format=min";
  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(Base64ToJson(json));
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const GetFur = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_pelajes.php?format=min";

  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(Base64ToJson(json));
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const GetSex = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_sexos.php";
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const GetCharacter = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_caracteres.php";
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const GetPets = (token, id_vet, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url =
    config.baseApi +
    `mascotas.php?id_veterinaria=${id_vet}&recientes=1&format=MIN`;

  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(Base64ToJson(json));
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const GetPet = (token, id_vet, idPet, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url =
    config.baseApi +
    `mascotas.php?id_veterinaria=${id_vet}&id_mascota=${idPet}`;

  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      //console.log(error);
    });
};

const DeletePet = (data, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", data.token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  let url =
    config.baseApi +
    `mascotas.php?id_mascota=${data.id_mascota}&id_veterinaria=${data.id_veterinaria}`;
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

const UpdatePet = (token, data, callback, errorcallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  // myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      id: data.id,
      chip: data.chip,
      id_caracter: data.id_caracter,
      id_pelaje: data.id_pelaje,
      id_raza: data.id_raza,
      id_sexo: data.id_sexo,
      nacimiento: data.nacimiento,
      nombre: data.nombre,
      notas: data.notas,
      peso: data.peso,
      deceso: data.deceso,
      thumb: 0,
      id_veterinaria: data.id_veterinaria,
      id_propietario: data.propietarios[0].id,
    },
    {},
  ]);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let url = config.baseApi + "mascotas.php";
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => errorcallback(error));
};

export {
  GetRace,
  GetFur,
  GetSex,
  GetCharacter,
  AddPet,
  GetPets,
  GetPet,
  DeletePet,
  UpdatePet,
  GetPetsMin,
};
