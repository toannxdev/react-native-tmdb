import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchMovies } from '../../../../api/movieApi';
import Status from '../../../../constants/status';

export const searchMoviesByQuery = createAsyncThunk(
  'movie/search',
  async (payload, thunkAPI) => {
    try {
      // If the query is the same as the previous query, do not fetch again
      const state = thunkAPI.getState().movieSearch;
      const isSameQuery = state.query === payload.query;
      if (isSameQuery && payload.page === state.page && !payload.forceRefresh) {
        return;
      }
      const { dispatch } = thunkAPI;
      if (payload.query === '') {
        dispatch(
          setResults({
            results: [],
            query: payload.query,
            status: Status.Succeeded,
            isLastPage: true,
          })
        );
        return;
      }

      // Set the status to in progress
      dispatch(setStatus(Status.InProgress));

      const { page, results, total_pages } = await searchMovies(
        payload.query,
        payload.page ?? 1
      );
      const isLastPage = page >= total_pages;

      if (payload.page === 1 || !isSameQuery) {
        // clear the previous results
        console.log('Setting results:', results.length);
        dispatch(
          setResults({
            results: [],
            query: payload.query,
            status: Status.Succeeded,
            isLastPage: isLastPage,
            page: page,
          })
        );
        dispatch(
          setResults({
            results,
            query: payload.query,
            status: Status.Succeeded,
            isLastPage: isLastPage,
            page: page,
          })
        );
        return;
      }

      console.log('Adding results:', results.length);
      dispatch(
        addResults({
          results,
          query: payload.query,
          status: Status.Succeeded,
          isLastPage: isLastPage,
          page: page,
        })
      );
    } catch (error) {
      console.log('Error fetching suggestions:', error.message);
      dispatch(setStatus(Status.Failed));
    }
  }
);

const initialState = {
  query: '',
  movies: [],
  isLastPage: false,
  status: Status.Initial,
  page: 1,
};

const movieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState: initialState,
  reducers: {
    setResults: (state, action) => {
      state.query = action.payload.query;
      state.movies = action.payload.results;
      state.status = action.payload.status;
      state.isLastPage = action.payload.isLastPage;
      state.page = action.payload.page;
    },
    addResults: (state, action) => {
      state.query = action.payload.query;
      state.movies = [...state.movies, ...action.payload.results];
      state.status = action.payload.status;
      state.isLastPage = action.payload.isLastPage;
      state.page = action.payload.page;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setResults, setStatus, addResults } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
