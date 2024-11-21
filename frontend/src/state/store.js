import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

// create store for different slices
const store = configureStore({
	reducer: {
		userData: userSlice
	}
});

export default store;