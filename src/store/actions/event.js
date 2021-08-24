import axios from "../../helpers/axios";
export const GET_EVENT = () => {
  return {
    type: "GET_EVENT",
    payload: new Promise((resolve, reject) => {
      axios("get", "event")
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    })
  };
};

export const CONFIRM_EVENT = (id, formData) => {
  return {
    type: "CONFIRM_EVENT",
    payload: new Promise((resolve, reject) => {
      axios("post", `event/${id}`, formData)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    })
  };
};

export const ADD_EVENT = (formData) => {
  return {
    type: "ADD_EVENT",
    payload: new Promise((resolve, reject) => {
      axios("post", "event", formData)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response.data));
    })
  };
};

export const CLOSE_TOAST = () => {
  return {
    type: "CLOSE_TOAST"
  };
};

export const DONE_RELOAD = () => {
  return {
    type: "DONE_RELOAD"
  };
};
