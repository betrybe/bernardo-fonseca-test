// Coloque aqui suas actions

export const auth = (email, password, isLoggedIn = true) => {
  return (dispatch) => {
    dispatch({
      type: "AUTH_SUCCESS",
      email,
      password,
      isLoggedIn
    });
  };
};
