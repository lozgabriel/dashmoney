import { configureStore } from '@reduxjs/toolkit';
import dashboard from './dashboardReducer';

const store = configureStore({
  reducer: {
    dashboard,
  },
});

export default store;

