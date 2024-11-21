import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// initial state of user data (an empty array)
const initialState = {
	userData: [],
	userObj: {
		id: -1,
		name: "",
		username: "",
		email: "",
		address: {},
		phone: "",
		website: "",
		company: {}
	}
};

// create a slice for user data
const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		// actions for updating state
		add(state) {
			if(state.userData.length > 0) {
				state.userData.push(state.userData[0]);
			}
		}
	},
	// extraReducers for async function
	extraReducers: (builder) => {
		builder
			.addCase(loadAsync.pending, () => {
				console.log("loadAsync.pending");
			})
			.addCase(loadAsync.fulfilled, (state, action) => {
				state.userData = action.payload;
			});
	}
});

// for async function (fetching API data)
export const loadAsync = createAsyncThunk(
	"user/loadAsync",
	async (userData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return userData;
	}
);

export const {add} = userSlice.actions;

export default userSlice.reducer;