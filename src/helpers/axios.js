import axios from "axios";
import store from "../store/index";
import env from "./env";
const instance = axios.create({
  baseURL: env.api_url
});

const fetcher = (method, path, data) => {
  const token = store.getState().auth.token;
  let config = [];
  if (token)
    config =
      method.toLowerCase() === "get"
        ? [path, { headers: { Authorization: token } }]
        : [path, data, { headers: { Authorization: token } }];
  else config = method.toLowerCase() === "get" ? [path] : [path, data];
  return new Promise((resolve, reject) => {
    instance[method.toLowerCase()](...config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export default fetcher;
