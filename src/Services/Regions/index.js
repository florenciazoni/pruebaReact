import config from "../../Assets/localConfig.json";
const GetRegions = (token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "regiones.php?format=search";

  fetch(url, requestOptions)
    .then((response) => {
      console.log("response");
      return response.json();
    })
    .then((json) => {
      console.log("then");
      callback(json);
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
};

export { GetRegions };
