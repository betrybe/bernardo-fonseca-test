// Coloque aqui suas actions

export const auth = (email, password, isLoggedIn = true) => {
  return (dispatch) => {
    dispatch({
      type: "AUTH_SUCCESS",
      email,
      password,
      isLoggedIn,
    });
  };
};

export const fetchCurrencyData = () => {
  return async (dispatch) => {
    const response = await fetch("https://economia.awesomeapi.com.br/json/all")

    const data = await response.json()
  ;
    dispatch({ type: "FETCH_CURRENCY", currencies: data });
  };
};
