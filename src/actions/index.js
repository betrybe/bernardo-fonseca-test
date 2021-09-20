const isFetching = () => ({
  type: 'IS_FETCHING',
  isFetching: true,
});

const isFetched = () => ({
  type: 'IS_FETCHING',
  isFetching: false,
});

const dataFetching = async (dispatch) => {
  dispatch(isFetching());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');

    const data = await response.json();

    dispatch(isFetched());

    return data;
  } catch (error) {
    dispatch(isFetched());
    return error;
  }
};

export const auth = (email) => (dispatch) => {
  dispatch({
    type: 'AUTH_SUCCESS',
    email,
  });
};

export const fetchCurrencyData = () => async (dispatch) => {
  const data = await dataFetching(dispatch);

  const currencies = [];

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'USDT' && key !== 'DOGE') currencies.push(value.code);
  }

  dispatch({ type: 'FETCH_CURRENCY', currencies });
};

export const addExpense = (expenseData) => async (dispatch) => {
  const data = await dataFetching(dispatch);

  const exchangeRates = {};

  /*
      !!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      No README.md tópico 7 pede que "Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).", contudo ao realizar os testes locais, observei que caso eu não mantenha o dólar turismo, o teste falha
      !!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!
      */

  for (const [key, value] of Object.entries(data)) {
    if (/* key !== 'USDT' && */ key !== 'DOGE') {
      Object.assign(exchangeRates, {
        [`${key}`]: {
          ...value,
          name: value.name.split('/')[0],
        },
      });
    }
  }

  const expense = { ...expenseData, exchangeRates };

  dispatch({ type: 'ADD_EXPENSE', expense });
};

export const deleteExpense = (id) => (dispatch) => {
  dispatch({ type: 'DELETE_EXPENSE', id });
};

export const editExpense = (expenseData) => (dispatch) => {
  dispatch({ type: 'EDIT_EXPENSE', expenseData });
};
