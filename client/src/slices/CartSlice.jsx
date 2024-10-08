import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setToCart: (state, action) => {
      state.cart = action.payload.cartProducts;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id != action.payload.id);
    },
  },
});

export const {
  setToCart,
  addToCart,
  removeFromCart,
  incItem,
  decItem,
} = CartSlice.actions;

export default CartSlice.reducer;
