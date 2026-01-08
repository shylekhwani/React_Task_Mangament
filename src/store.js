import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/taskSlice";

const store = configureStore({
  // Using redux toolkit
  reducer: {
    task: taskSlice.reducer,
  },
});

export default store;
