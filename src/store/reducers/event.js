const initState = {
  data: [],
  role: null,
  isError: false,
  isLoading: true,
  message: null,
  toast: false
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_EVENT_PENDING":
      return {
        isLoading: true,
        isError: false,
        message: "Please wait...",
        data: []
      };

    case "GET_EVENT_FULFILLED":
      return {
        isLoading: false,
        role: action.payload.data.role,
        message: action.payload.status.message,
        data: action.payload.data.events
      };

    case "GET_EVENT_REJECTED":
      return {
        isLoading: false,
        isError: true,
        message: action.payload.status.message,
        role: null,
        data: [],
        toast: true
      };

    case "CLOSE_TOAST":
      return {
        ...state,
        toast: false
      };

    default:
      return state;
  }
};

export default Reducer;
