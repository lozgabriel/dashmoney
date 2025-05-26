import { configureStore } from '@reduxjs/toolkit';
import dashboard from './dashboardReducer';
import tab from './tabReducer';

const store = configureStore({
  reducer: {
    dashboard,
    tab
  },
});

export default store;

