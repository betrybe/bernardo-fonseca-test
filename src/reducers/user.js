// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = {
  email: "",
  password: "",
  isLoggedIn: false,
};

const updateObject = (prevObject, update) => {
  return {
    ...prevObject,
    ...update,
  };
};

const authReducer = (state = initialState, action) => {
  const { email, password, isLoggedIn } = action;
  switch (action.type) {
    case "AUTH_SUCCESS":
      return updateObject(state, { email, password, isLoggedIn });
    default:
      return state;
  }
};

export default authReducer;
