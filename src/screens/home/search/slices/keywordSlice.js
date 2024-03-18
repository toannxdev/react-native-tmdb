import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSuggestionKeywords } from '../../../../api/movieApi';

export const fetchKeywordSuggestions = createAsyncThunk(
  'keyword/fetchSuggestions',
  async (keyword, { dispatch }) => {
    try {
      const { results } = await fetchSuggestionKeywords(keyword);
      dispatch(setResults({ results, keyword }));
    } catch (error) {
      console.log('Error fetching suggestions:', error.message);
    }
  }
);

const initialState = {
  keyword: '',
  suggestions: [],
};

const keywordSlice = createSlice({
  name: 'keyword',
  initialState: initialState,
  reducers: {
    setResults: (state, action) => {
      state.keyword = action.payload.keyword;
      state.suggestions = action.payload.results;
    },
  },
});

export const { setResults } = keywordSlice.actions;
export default keywordSlice.reducer;
