import React, { createContext, useReducer, useEffect } from "react";
import { reducerUsers } from "./ReducerUsers";

export const AuthContext = createContext({
  operators: null,
  setOperator: () => {},
  clearOperator: () => {},
});

const initialState = {
  operators: JSON.parse(localStorage.getItem("currentUser")),
};

export const AuthProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducerUsers, initialState);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(value.operators));
  }, [value.operators]);

  const setOperator = (operatorData) => {
    dispatch({ type: "SET_OPERATOR", payload: operatorData });
  };

  const clearOperator = () => {
    dispatch({ type: "CLEAR_OPERATOR", payload: null });
  };

  return (
    <AuthContext.Provider value={{ ...value, setOperator, clearOperator }}>
      {children}
    </AuthContext.Provider>
  );
};
