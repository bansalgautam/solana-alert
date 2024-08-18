import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    email: null,
    alerts: [],
    transactions: {},
    isTransactionsLoading: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions[action.payload.alertId] = action.payload.transactions;
    },
    setIsTransactionsLoading: (state, action) => {
      state.isTransactionsLoading = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setEmail,
  setAlerts,
  setTransactions,
  setIsTransactionsLoading,
} = userSlice.actions;
export default userSlice.reducer;
