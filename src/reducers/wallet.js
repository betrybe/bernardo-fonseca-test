
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
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.concat({...action.expense, id: state.expenses.length})
      }
      case "DELETE_EXPENSE":
        return {
          ...state,
          expenses: state.expenses.filter(expense => expense.id !== action.id).map(expense => {
            if(expense.id > action.id) expense.id--

            return expense;
          })
        }
    default:
      return state;
  }
};

export default walletReducer;
