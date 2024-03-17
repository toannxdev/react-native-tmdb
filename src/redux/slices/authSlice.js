import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import {
  createGuestSession,
  createRequestToken,
  createSession,
  validateWithLogin,
} from '../../api/authApi';
import AppConfig from '../../constants/appConfig';
import Status from '../../constants/status';
import { hideModal, showModal } from './modalSlice';

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { dispatch }) => {
    try {
      console.log('Getting the current user...');

      // get the session from local storage
      const session = await AsyncStorage.getItem('session_id');
      const guestSession = await AsyncStorage.getItem('guest_session_id');

      if (session) {
        console.log('Got the current user:', session);
        // dispatch the login action with the user data
        dispatch(setUserState({ session: session, status: Status.Succeeded }));
      } else if (guestSession) {
        const expiresAt = await AsyncStorage.getItem('expires_at');

        const expired = moment(expiresAt, AppConfig.serverFormatDate);
        const now = new Date();

        if (expiresAt && expired.toDate().getTime() > now.getTime()) {
          console.log('Got the current guest:', guestSession);
          // dispatch the login action with the user data
          dispatch(
            setUserState({ session: guestSession, status: Status.Succeeded })
          );
        } else {
          console.log('Guest session expired');
          await AsyncStorage.removeItem('guest_session_id');
          await AsyncStorage.removeItem('expires_at');
          dispatch(setUserState({ session: null, status: Status.Succeeded }));
        }
      } else {
        console.log('No session found');
        dispatch(setUserState({ session: null, status: Status.Succeeded }));
      }
    } catch (error) {
      console.log('Error getting the current user:', error.message);
      dispatch(setUserState({ session: null, status: Status.Succeeded }));
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { dispatch }) => {
    try {
      // show the loading modal that can't be canceled
      dispatch(showModal({ cancelable: false }));
      console.log('Signing in...', credentials);
      const { username, password } = credentials;

      // create request token
      const { request_token } = await createRequestToken();

      // validate with login
      await validateWithLogin(request_token, username, password);

      // create session
      const { session_id } = await createSession(request_token);

      // store session in local storage
      await AsyncStorage.setItem('session_id', session_id);
      console.log('Signed in:', session_id);

      // dispatch the login action with the user data
      dispatch(setUserState({ session: session_id, status: Status.Succeeded }));
    } catch (error) {
      dispatch(setUserState({ session: null, status: Status.Succeeded }));
    } finally {
      // hide the loading modal
      dispatch(hideModal());
    }
  }
);

export const signInAsGuest = createAsyncThunk(
  'auth/signInAsGuest',
  async (_, { dispatch }) => {
    try {
      // show the loading modal that can't be canceled
      dispatch(showModal({ cancelable: false }));
      console.log('Signing in as a guest...');

      // create guest session
      const { guest_session_id, expires_at } = await createGuestSession();

      // store session in local storage
      await AsyncStorage.setItem('guest_session_id', guest_session_id);
      await AsyncStorage.setItem('expires_at', expires_at);

      // dispatch the login action with the user data
      dispatch(
        setUserState({
          session: guest_session_id,
          status: Status.Succeeded,
        })
      );
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    } finally {
      // hide the loading modal
      dispatch(hideModal());
    }
  }
);

const initialState = {
  status: Status.Initial,
  session: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // handle additional cases for async actions if needed
  },
});

export const { setUserState } = authSlice.actions;
export default authSlice.reducer;
