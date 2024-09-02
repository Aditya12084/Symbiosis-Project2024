import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../slices/CartSlice";
import UserSlice from "../slices/UserSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
  },
});
export default Store;
