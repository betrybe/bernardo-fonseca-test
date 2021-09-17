const initialState = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CURRENCY":
      return {
        ...state,
        currencies: state.currencies.concat(action.currencies),
      };
    default:
      return state;
  }
};

export default walletReducer;
