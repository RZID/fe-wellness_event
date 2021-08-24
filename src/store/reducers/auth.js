const initState = {
  token: localStorage.getItem("token") || null,
  isError: false,
  isLoading: false,
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  message: null,
  toast: false
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        token: null,
        isError: false,
        userData: {},
        toast: false,
        message: null
      };
    case "GET_LOGIN_FULFILLED":
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify(action.payload.data.userData)
      );
      return {
        ...state,
        isLoading: false,
        isError: false,
        token: action.payload.data.token,
        toast: true,
        userData: action.payload.data.userData,
        message: action.payload.status.message
      };
    case "GET_LOGIN_REJECTED":
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      return {
        ...state,
        isLoading: false,
        token: null,
        isError: true,
        toast: true,
        userData: {},
        message: action.payload.data.status.message
      };

    case "GET_LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      return {
        token: null,
        isError: false,
        isLoading: false,
        userData: {},
        message: "Success logout"
      };
    case "CLOSE_TOAST":
      return { ...state, toast: false };
    default:
      return state;
  }
};

export default Reducer;
