import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from '@/components/sidebar/sidebarSlice';
import getProSlice from '@/components/getPro/getProSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    getPro: getProSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
