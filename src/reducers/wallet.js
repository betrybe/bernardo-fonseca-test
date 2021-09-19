const initialState = {
  currencies: [],
  expenses: [],
};

const alocador = (expenses, id) => {
  let returnedId = 0;

  for (let i = 0; i < id; i++) {
    if (i === expenses[i].id) {
      returnedId++;
    }
  }

  return returnedId;
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
        expenses: state.expenses
          .concat({
            ...action.expense,
            id: alocador(state.expenses, state.expenses.length),
          })
          .sort(function (expense1, expense2) {
            if (expense1.id > expense2.id) {
              return 1;
            }
            if (expense1.id < expense2.id) {
              return -1;
            }

            return 0;
          }),
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.id),
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.expenseData.id) {
            return {
              ...expense,
              ...action.expenseData,
            };
          }

          return expense;
        }),
      };
    default:
      return state;
  }
};

export default walletReducer;
