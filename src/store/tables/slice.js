import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tablelist: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tablelist = action.payload.tables;
    },
  },
});

export const { getTables } = tablesSlice.actions;

export default tablesSlice.reducer;