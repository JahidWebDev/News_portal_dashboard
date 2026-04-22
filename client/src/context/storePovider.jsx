import React, { useReducer } from "react";
import storeReducer from "./storeReducer";
// eslint-disable-next-line no-unused-vars
import storeContext from "./storeContext";
import decode_token from "../utils/index";

const token = localStorage.getItem("token");

// safe decode
let decodedUser = null;
if (token) {
  try {
    decodedUser = decode_token(token);
  } catch (error) {
    console.log("Token decode error:", error);
    decodedUser = null;
  }
}

const initialState = {
  user: decodedUser,
  token: token || "",
};

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialState);

  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;