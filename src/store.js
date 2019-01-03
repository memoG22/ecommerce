import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      searchItems: [],
      shoppingCart: []
    };
  }
  if (action.type === "SET_SEARCHRESULTS") {
    return {
      ...state,
      searchItems: action.searchItems
    };
  }
  if (action.type === "SET_SHOPPINGCART") {
    return {
      ...state,
      shoppingCart: action.shoppingCart
    };
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
