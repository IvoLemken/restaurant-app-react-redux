import { createSlice } from "@reduxjs/toolkit";

const initialState = { reservedTables: null };

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    getReservations: (state, action) => {
      state.reservedTables = action.payload.reservation;
    },
  },
});

export const { getReservations } = reservationSlice.actions;

export default reservationSlice.reducer;