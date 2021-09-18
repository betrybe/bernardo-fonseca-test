// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = {
  email: "",
  senha: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        ...{ email: action.email, senha: action.senha },
      };
    default:
      return state;
  }
};

export default authReducer;
