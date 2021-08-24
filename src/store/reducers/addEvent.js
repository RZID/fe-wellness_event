const initState = {
  isError: false,
  isLoading: true,
  message: null,
  toast: false
};

const Reducer = (state = initState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "ADD_EVENT_PENDING":
      return {
        isError: false,
        isLoading: true,
        message: "Please wait..."
      };

    case "ADD_EVENT_FULFILLED":
      return {
        isError: false,
        isLoading: false,
        message: action.payload.status.message,
        reload: true,
        toast: true
      };

    case "ADD_EVENT_REJECTED":
      return {
        isError: true,
        isLoading: false,
        message: action.payload.status.message,
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
