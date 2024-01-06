// import { createStore} from 'redux'
// import rootReducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension'; // middleware 
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/components/auth/authSlice';
import sidebarSlice from '@/components/sidebar/sidebarSlice';
import getProSlice from '@/components/getPro/getProSlice';
// const composeEnhancer = composeWithDevTools();

// const store = createStore(rootReducer, composeEnhancer)
const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar: sidebarSlice,
    getProSlice: getProSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
