// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = {
  user: {
    email: "",
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const updateObject = (prevObject, update) => {
  return {
    ...prevObject,
    ...update,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return updateObject(state, { user: { email: action.email } });
    default:
      return state;
  }
};

export default authReducer;
