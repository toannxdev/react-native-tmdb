import { getPopularList } from '../../../../api/movieApi';
import Status from '../../../../constants/status';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async (params, { dispatch }) => {
    try {
      dispatch(setPopularStatus(Status.InProgress));

      const data = await getPopularList(params.page);

      const payload = {
        movies: data.results,
        page: data.page,
      };
      dispatch(setPopular(payload));
      dispatch(setPopularStatus(Status.Succeeded));
    } catch (error) {
      console.log('Error fetching popular:', error.message);
      dispatch(setPopularStatus(Status.Failed));
    }
  }
);

const initialState = {
  status: Status.Initial,
  movies: [],
  page: 1,
};

const popularReducer = createSlice({
  name: 'popular',
  initialState: initialState,
  reducers: {
    setPopular: (state, action) => {
      state.movies = action.payload.movies;
      state.page = action.payload.page;
    },
    setPopularStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setPopular, setPopularStatus } = popularReducer.actions;
export default popularReducer.reducer;
