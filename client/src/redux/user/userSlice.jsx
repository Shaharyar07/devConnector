import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
  hasProfile: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.hasProfile = true;
      state.user = payload;
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { getUserPending, getUserSuccess, getUserFail } =
  userSlice.actions;

export default userSlice.reducer;
