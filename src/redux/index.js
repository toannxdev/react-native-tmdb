import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';

export default store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});
