import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchMovies } from '../../../../api/movieApi';
import Status from '../../../../constants/status';

export const searchMoviesByQuery = createAsyncThunk(
  'movie/search',
  async (keyword, { dispatch }) => {
    try {
      // Set the status to in progress
      dispatch(setStatus(Status.InProgress));

      const { results } = await searchMovies(keyword);
      dispatch(setResults({ results, keyword, status: Status.Succeeded }));
    } catch (error) {
      console.log('Error fetching suggestions:', error.message);
      dispatch(setStatus(Status.Failed));
    }
  }
);

const initialState = {
  keyword: '',
  movies: [],
  status: Status.Initial,
};

const movieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState: initialState,
  reducers: {
    setResults: (state, action) => {
      state.keyword = action.payload;
      state.movies = action.payload.results;
      state.status = action.payload.status;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setResults, setStatus } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
