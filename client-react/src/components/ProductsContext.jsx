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

  /*   
  const addToBacked = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return { ...orderItem, quantity: orderItem.quantity + 1 };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
  };

  const removeBucket = (id) => {
    setOrder(order.filter((product) => product.id !== id));
  };

  const incQuantity = (itemId) => {
    const newOrder = order.map((element) => {
      if (element.id === itemId) {
        const newQuantity = element.quantity + 1;
        return {
          ...element,
          quantity: newQuantity,
        };
      }
      return element;
    });
    setOrder(newOrder);
  };

  const decQuantity = (itemId) => {
    const newOrder = order.map((element) => {
      if (element.id === itemId) {
        const newQuantity = element.quantity - 1;
        return {
          ...element,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      }
      return element;
    });
    setOrder(newOrder);
  };
 */
  /*  const value = {
    productData,
    addToBacked,
    removeBucket,
    incQuantity,
    decQuantity,
    clearBucket,
    order,
  }; */

  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  );
};
