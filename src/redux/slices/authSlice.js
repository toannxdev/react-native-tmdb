import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Status from '../../constants/status';
import { hideModal, showModal } from './modalSlice';

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { dispatch }) => {
    try {
      console.log('Getting the current user...');

      // make a network request to get the current user
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a network request

      console.log('Got the current user');
      // dispatch the login action with the user data
      dispatch(setUserState({ user: null, status: Status.Succeeded }));
    } catch (error) {
      console.log('Error getting the current user:', error.message);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { dispatch }) => {
    try {
      // show the loading modal that can't be canceled
      dispatch(showModal({ cancelable: false }));

      const { username, password } = credentials;
      // make a network request to sign in the user
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a network request

      // dispatch the login action with the user data
      dispatch(setUserState({ user: { username }, status: Status.Succeeded }));
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
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserState: (state, action) => {
      state.user = action.payload.user;
      state.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    // handle additional cases for async actions if needed
  },
});

export const { setUserState } = authSlice.actions;
export default authSlice.reducer;
