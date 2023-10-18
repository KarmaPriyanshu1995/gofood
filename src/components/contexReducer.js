import React, { createContext, useContext, useReducer } from "react";

const CartStateContex = createContext();
const CartDispatchContex = createContext();
// const reducer = (action, state) => {
//   switch (state?.type) {
//     case "ADD":
//       return [...action, { id: state.id, name: state.name, qty: state.qty, size: state.size, price: state.price, img: state.img }]
//       case "REMOVE":
//         let newArr = [...action]
//         newArr.splice(state.index, 1)
//         return newArr;

//     default:
//       console.log("Error in Reducer")
//   }
// }
const reducer = (state, action) => {
  console.log("state", state, action);
  switch (action.type) {
    case "ADD":
      return [...state, ...[action]];
    case "REMOVE":
      // Handle removal logic here
      return state.filter((item) => item.id !== action.id);
    case "UPDATE":
      // Handle update logic here
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            qty: item.qty + action.qty,
            price: item.price + action.price,
          };
        }
        return item;
      });
      case "DROP":
        let empArray=[]
        return empArray
    default:
      return state;
  }
};

export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContex.Provider value={dispatch}>
      <CartStateContex.Provider value={state}>
        {children}
      </CartStateContex.Provider>
    </CartDispatchContex.Provider>
  );
};
export const useCart = () => useContext(CartStateContex);
export const useDispatchCart = () => useContext(CartDispatchContex);
