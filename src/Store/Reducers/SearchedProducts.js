import { UpdateObject } from "./utility";

import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  SearchedProducts: [],
  searchBar: "",
};

// HELPER FUNCIONS
const Search = (state, action) => {
  return UpdateObject(state, {
    SearchedProducts: action.SearchedProducts,
    searchBar: action.searchBar,
  });
};
// MAIN REDUCER

const SearchedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH:
      return Search(state, action);
    default:
      return state;
  }
};
export default SearchedProductsReducer;
