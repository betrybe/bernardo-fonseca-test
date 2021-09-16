// Coloque aqui suas actions

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: "AUTH_SUCCESS",
      email,
      password,
    });
  };
};
