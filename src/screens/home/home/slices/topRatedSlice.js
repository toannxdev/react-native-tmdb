import { getTopRatedList } from '../../../../api/movieApi';
import Status from '../../../../constants/status';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTopRated = createAsyncThunk(
  'topRated/fetchTopRated',
  async (params, { dispatch }) => {
    try {
      dispatch(setTopRatedStatus(Status.InProgress));

      const data = await getTopRatedList(params.page);

      const payload = {
        movies: data.results,
        page: data.page,
      };
      dispatch(setTopRated(payload));
      dispatch(setTopRatedStatus(Status.Succeeded));
    } catch (error) {
      console.log('Error fetching topRated:', error.message);
      dispatch(setTopRatedStatus(Status.Failed));
    }
  }
);

const initialState = {
  status: Status.Initial,
  movies: [],
  page: 1,
};

const topRatedReducer = createSlice({
  name: 'topRated',
  initialState: initialState,
  reducers: {
    setTopRated: (state, action) => {
      state.movies = action.payload.movies;
      state.page = action.payload.page;
    },
    setTopRatedStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setTopRated, setTopRatedStatus } = topRatedReducer.actions;
export default topRatedReducer.reducer;
