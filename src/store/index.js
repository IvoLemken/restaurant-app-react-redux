import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import tablesReducer from "./tables/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    tables: tablesReducer,
  },
});