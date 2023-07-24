import { configureStore } from '@reduxjs/toolkit';
import ratingRaducer from './Rating/reducer';

export const store = configureStore({
  reducer: {
    rating: ratingRaducer,
  },
});
