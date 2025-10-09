import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSilce'
import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
   auth: authReducer,
   goal : goalReducer
  },
});
