import { configureStore } from '@reduxjs/toolkit';
import navigation from './slices/navigation';
import stringReducer from './slices/url';

const store = configureStore({
  reducer: {
    toggle: navigation,
    string: stringReducer,
  },
});

export default store;