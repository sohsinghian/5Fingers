import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    cart: [],
    subTotal: 0,
    total: 0,
    deliverFee: 0,
    gst: 0,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.cart = [];
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    setSubTotal(state, action) {
      state.subTotal = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setDeliveryFee(state, action) {
      state.deliveryFee = action.payload;
    },
    setGst(state, action) {
      state.gst = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
