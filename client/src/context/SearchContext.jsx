import React, { createContext, useReducer } from "react";

const SearchContext = createContext();
export const SEARCH_BOX = {
  searchText: "",
};

export const serachReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
};

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serachReducer, SEARCH_BOX);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
