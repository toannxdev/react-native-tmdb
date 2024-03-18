import { configureStore } from '@reduxjs/toolkit';
import nowPlayingReducer from '../screens/home/home/slices/nowPlayingSlice';
import popularReducer from '../screens/home/home/slices/popularSlice';
import topRatedReducer from '../screens/home/home/slices/topRatedSlice';
import upcomingReducer from '../screens/home/home/slices/upcomingSlice';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';

export default store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    nowPlaying: nowPlayingReducer,
    popular: popularReducer,
    topRated: topRatedReducer,
    upcoming: upcomingReducer,
  },
});
