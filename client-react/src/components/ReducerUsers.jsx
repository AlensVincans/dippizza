export function reducerUsers(state, { type, payload }) {
  switch (type) {
    case "SET_OPERATOR":
      return {
        ...state,
        operators: payload || null,
      };
    case "CLEAR_OPERATOR":
      return {
        ...state,
        operators: payload,
      };
    default:
      return state;
  }
}
