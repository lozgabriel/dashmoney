import { createSlice } from '@reduxjs/toolkit';
import { getList, deleteBillingCycle } from './billingCycleActions';

const billingCycle = createSlice({
  name: 'billingCycle',
  initialState: {
    list: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteBillingCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBillingCycle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBillingCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
      
  }
});
export const { setPage, setLimit } = billingCycle.actions;
export default billingCycle.reducer;