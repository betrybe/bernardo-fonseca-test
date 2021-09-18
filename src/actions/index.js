
const dataFetching = async () => {
  const response = await fetch("https://economia.awesomeapi.com.br/json/all");

  const data = await response.json();

  return data;
};

export const auth = (email) => {
  return (dispatch) => {
    dispatch({
      type: "AUTH_SUCCESS",
      email
    });
  };
};

export const fetchCurrencyData = () => {
  return async (dispatch) => {
    const data = await dataFetching();

    const currencies = [];

    for (const [key, value] of Object.entries(data)) {
      if (key !== "USDT" && key !== "DOGE") currencies.push(value.code);
    }

    dispatch({ type: "FETCH_CURRENCY", currencies });
  };
};

export const addExpense = (expenseData) => {
  return async (dispatch) => {
    const data = await dataFetching();

    const exchangeRates = {};

    for (const [key, value] of Object.entries(data)) {
      if (key !== "USDT" && key !== "DOGE") Object.assign(exchangeRates, { [`${key}`]: {
        ...value,
        name: value.name.split('/')[0]
      } });
    }

    const expense = { ...expenseData, exchangeRates };

    dispatch({ type: "ADD_EXPENSE", expense });
  };
};

export const deleteExpense = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_EXPENSE", id });
  };
};

export const editExpense = (expenseData) => {
  return dispatch => {
    dispatch({type: "EDIT_EXPENSE", expenseData})
  }
}
