import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      searchItems: null,
      shoppingCart: null
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      searchItems: action.searchItems,
      shoppingCart: action.shoppingCart
    };
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
