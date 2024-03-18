import { getUpcomingList } from '../../../../api/movieApi';
import Status from '../../../../constants/status';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUpcoming = createAsyncThunk(
  'upcoming/fetchUpcoming',
  async (params, { dispatch }) => {
    try {
      dispatch(setUpcomingStatus(Status.InProgress));

      const data = await getUpcomingList(params.page);

      const payload = {
        movies: data.results,
        page: data.page,
      };
      dispatch(setUpcoming(payload));
      dispatch(setUpcomingStatus(Status.Succeeded));
    } catch (error) {
      console.log('Error fetching upcoming:', error.message);
      dispatch(setUpcomingStatus(Status.Failed));
    }
  }
);

const initialState = {
  status: Status.Initial,
  movies: [],
  page: 1,
};

const upcomingReducer = createSlice({
  name: 'upcoming',
  initialState: initialState,
  reducers: {
    setUpcoming: (state, action) => {
      state.movies = action.payload.movies;
      state.page = action.payload.page;
    },
    setUpcomingStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUpcoming, setUpcomingStatus } = upcomingReducer.actions;
export default upcomingReducer.reducer;
