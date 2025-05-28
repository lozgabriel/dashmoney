import { createSlice } from '@reduxjs/toolkit';
import { getList } from './billingCycleActions';

const billingCycle = createSlice({
  name: 'billingCycle',
  initialState: { list: [], loading: false, error: null },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export default billingCycle.reducer;