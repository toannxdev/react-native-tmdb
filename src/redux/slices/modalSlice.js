import { createSlice } from '@reduxjs/toolkit';

const initialState = { visible: false, content: null };

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.content = action.payload;
    },
    hideModal: (state) => {
      state.visible = false;
      state.content = null;
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