export function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        productData: payload || [],
      };
    case "CLEAR_BUCKET":
      return {
        ...state,
        order: [],
      };
    case "REMOVE_BUCKET":
      return {
        ...state,
        order: state.order.filter((product) => product.id !== payload.id),
      };
    case "ADD_TO_BUCKET": {
      const itemIndex = state.order.findIndex(
        (orderItem) => orderItem.id === payload.id
      );
      let newOrder = null;
      if (itemIndex < 0) {
        const newItem = {
          ...payload,
          quantity: 1,
          order_receipt_id: 0,
        };
        newOrder = [...state.order, newItem];
      } else {
        newOrder = state.order.map((orderItem, index) => {
          if (index === itemIndex) {
            return { ...orderItem, quantity: orderItem.quantity + 1 };
          } else {
            return orderItem;
          }
        });
      }
      return {
        ...state,
        order: newOrder,
      };
    }
    case "INC_QUANTITY":
      return {
        ...state,
        order: state.order.map((element) => {
          if (element.id === payload.id) {
            const newQuantity = element.quantity + 1;
            return {
              ...element,
              quantity: newQuantity,
            };
          }
          return element;
        }),
      };
    case "DEC_QUANTITY":
      return {
        ...state,
        order: state.order.map((element) => {
          if (element.id === payload.id) {
            const newQuantity = element.quantity - 1;
            return {
              ...element,
              quantity: newQuantity >= 0 ? newQuantity : 0,
            };
          }
          return element;
        }),
      };
    case "ADD_NEW_USER":
      return {
        ...state,
        users: payload || [],
      };
    case "ORDER_RECEIPT_ID":
      return {
        ...state,
        order: state.order.map((element) => {
          if (element.id === payload.id) {
            return {
              ...element,
              order_receipt_id: payload.order_receipt_id,
            };
          }
          return element;
        }),
      };

    default:
      return state;
  }
}
