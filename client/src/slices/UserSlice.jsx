import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",

  initialState: {
    userDetails: {
      userId: 0,
      username: "",
      email: "",
    },
  },

  reducers: {
    assignUserDetails: (state, action) => {
      state.userDetails.username = action.payload.username;
      state.userDetails.email = action.payload.email;
      state.userDetails.userId = action.payload.id;
    },

    removeUserDetails: (state, action) => {},
  },
});

export const { assignUserDetails, removeUserDetails } = UserSlice.actions;

export default UserSlice.reducer;
