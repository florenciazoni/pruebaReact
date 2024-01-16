import config from "../../Assets/localConfig.json";

const Login = (data, callback, errorCallback) => {
  let url = config.baseApi + "user_login_account.php";
  var myHeaders = new Headers();
  //myHeaders.append("Content-Type", "application/json");

  fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.response === "INVALID_ACCOUNT_PASSWORD") {
        errorCallback(json.response);
      } else {
        callback(json);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const LoginFacebookGoogle = (data, callback, errorCallback) => {
  var raw = JSON.stringify({
    email: data.email,
    nombre: data.nombre,
    photo_url: data.photo_url,
    device_name: config.device_name,
    tipo_login: data.tipo_login,
    doctor_vet_unique_id: data.doctor_vet_unique_id,
  });

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };
  let url = config.baseApi + "user_facebook_google_login.php";
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      callback(result);
    })
    .catch((error) => errorCallback(error));
};

export { Login, LoginFacebookGoogle };
