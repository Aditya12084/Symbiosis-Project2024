import axios from "axios";

export const commonRequest = async (methods, url, body, header) => {
  let config = {
    method: methods,
    url,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null,
    },
    data: body,
  };

  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
