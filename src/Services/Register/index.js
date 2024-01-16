import config from "../../Assets/localConfig.json";

const Register = (data, callback, callBackError) => {
  let url = config.baseApi + "user_create_account.php";
  fetch(url, {
    method: "POST",
    headers: {
      //  "Content-Type": "text/plain",
    },

    body: JSON.stringify(data),
  })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callBackError(error);
    });
};
export { Register };
