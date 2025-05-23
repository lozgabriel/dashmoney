import { createSlice } from '@reduxjs/toolkit';
import { getSummary } from './dashboardActions';

const dashboard = createSlice({
  name: 'dashboard',
  initialState: { summary: {credit: 0, debit: 0}, loading: false, error: null },
  reducers: {
    setCredit: (state, action) => {
      state.summary.credit = action.payload;
    },
    setDebit: (state, action) => {
      state.summary.debit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export const { setCredit, setDebit } = dashboard.actions;
export default dashboard.reducer;