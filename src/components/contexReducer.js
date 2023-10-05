import React, { createContext, useContext, useReducer } from "react";

const CartStateContex = createContext();
const CartDispatchContex = createContext();
const reducer = (action, state) => {
  switch (state?.type) {
    case "ADD":
      return [...action, { id: state.id, name: state.name, qty: state.qty, size: state.size, price: state.price, img: state.img }]
      case "REMOVE":
        let newArr = [...action]
        newArr.splice(state.index, 1)
        return newArr;

    default:
      console.log("Error in Reducer")
  }
}
export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <CartDispatchContex.Provider value={dispatch}>
      <CartStateContex.Provider value={state}>
        {children}
      </CartStateContex.Provider>

    </CartDispatchContex.Provider>
  )
}
export const useCart = () => useContext(CartStateContex)
export const useDispatchCart = () => useContext(CartDispatchContex)