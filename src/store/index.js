import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import tablesReducer from "./tables/slice";
import reservationReducer from "./reservation/slice";
import userListReducer from "./userList/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    tables: tablesReducer,
    reservation: reservationReducer,
    userList: userListReducer
  },
});