import { createSlice } from '@reduxjs/toolkit';

const initialState = { visible: false, cancelable: true };

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.cancelable = action.payload.cancelable;
    },
    hideModal: (state) => {
      state.visible = initialState.visible;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

/**
 * Global state of LoadingModal
 * Use in body of createAsyncThunk to show and hide the loading modal
 * Example:
 * try {
 *    // show the loading modal
 *    dispatch(showModal());
 *    ...
 *  } finally {
 *    // hide the loading modal
 *    dispatch(hideModal());
 *  }
 */
