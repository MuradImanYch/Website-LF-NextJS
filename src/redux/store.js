import { configureStore } from '@reduxjs/toolkit';
import navigation from './slices/navigation';

const store = configureStore({
  reducer: {
    toggle: navigation,
  },
});

export default store;