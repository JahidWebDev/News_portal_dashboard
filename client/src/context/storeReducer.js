const storeReducer = (state, action) => {
  switch (action.type) {

    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        user: null,
        token: "",
      };

    default:
      return state;
  }
};

export default storeReducer;