import * as actionTypes from "../Actions/actionTypes";

export const Search = (SearchedProducts, searchBar) => {
  return {
    type: actionTypes.SEARCH,
    SearchedProducts,
    searchBar,
  };
};
