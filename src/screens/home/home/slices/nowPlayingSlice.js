import { getNowPlayingList } from '../../../../api/movieApi';
import Status from '../../../../constants/status';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchNowPlaying = createAsyncThunk(
  'nowPlaying/fetchNowPlaying',
  async (params, { dispatch }) => {
    try {
      dispatch(setNowPlayingStatus(Status.InProgress));

      const data = await getNowPlayingList(params.page);

      const payload = {
        movies: data.results,
        page: data.page,
      };
      dispatch(setNowPlaying(payload));
      dispatch(setNowPlayingStatus(Status.Succeeded));
    } catch (error) {
      console.log('Error fetching now playing:', error.message);
      dispatch(setNowPlayingStatus(Status.Failed));
    }
  }
);

const initialState = {
  status: Status.Initial,
  movies: [],
  page: 1,
};

const nowPlayingReducer = createSlice({
  name: 'nowPlaying',
  initialState: initialState,
  reducers: {
    setNowPlaying: (state, action) => {
      state.movies = action.payload.movies;
      state.page = action.payload.page;
    },
    setNowPlayingStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setNowPlaying, setNowPlayingStatus } = nowPlayingReducer.actions;
export default nowPlayingReducer.reducer;
