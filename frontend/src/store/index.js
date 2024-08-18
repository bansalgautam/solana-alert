import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import appReducer from "./slices/app";

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
