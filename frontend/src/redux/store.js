import { configureStore } from '@reduxjs/toolkit';
import dashboard from './dashboardReducer';
import billingCycle from './billingCycleReducer';
import billingCycleCreate from './billingCycleCreateReducer';
import tab from './tabReducer';
import visibleTabs from './showTabReducer';

const store = configureStore({
  reducer: {
    dashboard,
    tab,
    visibleTabs,
    billingCycle,
    billingCycleCreate
  },
});

export default store;

