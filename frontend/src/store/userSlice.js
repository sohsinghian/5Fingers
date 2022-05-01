import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
