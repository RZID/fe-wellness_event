import axios from "../../helpers/axios";
export const GET_LOGIN = (formData) => {
  return {
    type: "GET_LOGIN",
    payload: new Promise((resolve, reject) => {
      axios("post", "login", formData)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response.data);
        });
    })
  };
};

export const GET_LOGOUT = () => {
  return {
    type: "GET_LOGOUT"
  };
};

export const CLOSE_TOAST = () => {
  return {
    type: "CLOSE_TOAST"
  };
};
