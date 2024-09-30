import { configureStore } from "@reduxjs/toolkit";
import WaterReducer from "../WaterSlice/WaterSlice";

export const store = configureStore({
  reducer: {
    counter: WaterReducer,
  },
});
