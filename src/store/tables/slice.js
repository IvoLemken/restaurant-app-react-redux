import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tablelist: null,
  reserved: null
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tablelist = action.payload.tables;
    },
    reservedTables: (state, action) => {
      state.reserved = action.payload.reserved;
    },
  },
});

export const { getTables, reservedTables } = tablesSlice.actions;

export default tablesSlice.reducer;