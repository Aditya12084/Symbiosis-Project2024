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
