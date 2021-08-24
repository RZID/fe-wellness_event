import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers/root";
import reduxPromise from "redux-promise-middleware";
import ReduxThunk from "redux-thunk"; // no changes here 😀

const middleware = applyMiddleware(reduxPromise, ReduxThunk);
const store = createStore(rootReducers, middleware);

export default store;
