import { createSlice } from '@reduxjs/toolkit';

const tabActive = createSlice({
  name: 'tabActive',
  initialState: {
    activeTab: '',
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabActive.actions;
export default tabActive.reducer;