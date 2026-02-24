import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      state.cart.push(action.payload);
    },

    incrementQuantity(state, action) {
      const pizzaId = action.payload;
      const pizza = state.cart.find(item => item.pizzaId === pizzaId);

      if (pizza) {
        pizza.quantity += 1;
        pizza.totalPrice = pizza.quantity * pizza.unitPrice;
      }
    },

    decrementQuantity(state, action) {
      const pizzaId = action.payload;
      const pizza = state.cart.find(item => item.pizzaId === pizzaId);

      if (pizza && pizza.quantity > 1) {
        pizza.quantity -= 1;
        pizza.totalPrice = pizza.quantity * pizza.unitPrice;
      }
    },

    removeFromCart(state, action) {
      const pizzaId = action.payload;
      state.cart = state.cart.filter(item => item.pizzaId !== pizzaId);
    },

    clearCart(state) {
      state.cart = [];
  },
}});

export const  {
    addtoCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const getQuantityById = id => state => {
  const pizza = state.cart.cart.find(item => item.pizzaId === id);
  return pizza ? pizza.quantity : 0;
};


export const getTotalPrice = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);
};  

export const getTotalItems = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
};


export const getCart = (state) => state.cart.cart;

    


