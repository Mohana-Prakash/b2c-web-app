import { combineReducers } from "@reduxjs/toolkit";
import UIReducer from "./slices/UI/uiSlice";
import authReducer from "./slices/auth/authSlice";
import registerReducer from "./slices/register/registerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: UIReducer,
  register: registerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
