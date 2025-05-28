import { createSlice } from '@reduxjs/toolkit';
import { createBillingCycle } from './billingCycleActions';

const billingCycleCreate = createSlice({
  name: 'billingCycleCreate',
  initialState: { data: null, loading: false, error: null, success: false},
  reducers: {
    resetStatus: (state) => {
        state.success = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBillingCycle.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
      })
      .addCase(createBillingCycle.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.data = action.payload;
      })
      .addCase(createBillingCycle.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
          state.success = false;
      });
  }
});

export const { resetStatus } = billingCycleCreate.actions;
export default billingCycleCreate.reducer;