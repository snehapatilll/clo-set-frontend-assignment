import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './contentSlice'; // you'll create this next

export const store = configureStore({
  reducer: {
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
