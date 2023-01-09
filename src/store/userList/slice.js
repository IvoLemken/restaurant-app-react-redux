import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
        state.users = action.payload.users;
    },
  },
});

export const { getAllUsers } = userListSlice.actions;

export default userListSlice.reducer;