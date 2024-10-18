import { configureStore } from '@reduxjs/toolkit';
import featureReducer from './featureSlice'; 

const store = configureStore({
  reducer: {
    yourSlice: featureReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
