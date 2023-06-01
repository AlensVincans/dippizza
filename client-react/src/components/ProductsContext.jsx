import React, { createContext, useReducer } from "react";
import { reducer } from "./Reducer";

export const CustomContext = createContext();

const initialState = {
  order: [],
  productData: [],
  users: [],
};

export const ProductsContext = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  value.clearBucket = () => {
    dispatch({ type: "CLEAR_BUCKET" });
  };

  value.updateProduct = (updateProduct) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: updateProduct });
  };

  value.removeProduct = (itemId) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id: itemId } });
  };

  value.removeBucket = (itemId) => {
    dispatch({ type: "REMOVE_BUCKET", payload: { id: itemId } });
  };

  value.addToBacked = (item) => {
    dispatch({ type: "ADD_TO_BUCKET", payload: item });
  };

  value.incQuantity = (itemId) => {
    dispatch({ type: "INC_QUANTITY", payload: { id: itemId } });
  };

  value.decQuantity = (itemId) => {
    dispatch({ type: "DEC_QUANTITY", payload: { id: itemId } });
  };

  value.setProducts = (data) => {
    dispatch({ type: "SET_PRODUCTS", payload: data });
  };

  value.addUser = (dataUser) => {
    dispatch({ type: "ADD_NEW_USER", payload: dataUser });
  };

  value.addOrderReceiptId = (itemID) => {
    dispatch({ type: "ORDER_RECEIPT_ID", payload: itemID });
  };

  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
