import { configureStore } from '@reduxjs/toolkit';
import { authSlice, uiSlice, calendarSlice } from './';

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      ui: uiSlice.reducer,
      calendar: calendarSlice.reducer
   },
   middleware: ( getdefaultMiddleware ) => getdefaultMiddleware({
      serializableCheck: false
   })
});