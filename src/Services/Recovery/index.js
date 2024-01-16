import config from "../../Assets/localConfig.json";

const Recovery = (email, callback, callbackError) => {
  let url = config.baseApi + `user_forgot_account.php?email=${email}`;
  fetch(url, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
    },
    // body: { ...data },
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callbackError(error);
      //console.log(error);
    });
};

export { Recovery };
