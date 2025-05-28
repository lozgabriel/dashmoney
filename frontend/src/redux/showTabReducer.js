import { createSlice } from '@reduxjs/toolkit';

const visibleTabs = createSlice({
  name: 'visibleTabs',
  initialState: {
    visibleTabs: [],
  },
  reducers: {
    setVisibleTabs: (state, action) => {
      state.visibleTabs = action.payload;
    }
  },
});

export const { setVisibleTabs } = visibleTabs.actions;
export default visibleTabs.reducer;