// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = {
    email: "",
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
      return updateObject(state,  {email: action.email} );
    default:
      return state;
  }
};

export default authReducer;
