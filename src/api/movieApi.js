import api from './request';

export const getNowPlayingList = async (page = 1) => {
  return await api.get('/movie/now_playing', {
    params: { page: page, language: 'en-US' },
  });
};

export const getPopularList = async (page = 1) => {
  return await api.get('/movie/popular', {
    params: { page: page, language: 'en-US' },
  });
};

export const getTopRatedList = async (page = 1) => {
  return await api.get('/movie/top_rated', {
    params: { page: page, language: 'en-US' },
  });
};

export const getUpcomingList = async (page = 1) => {
  return await api.get('/movie/upcoming', {
    params: { page: page, language: 'en-US' },
  });
};

export const searchMovies = async (query, page = 1) => {
  return await api.get('/search/movie', {
    params: { query: query, page: page, language: 'en-US' },
  });
};

export const fetchSuggestionKeywords = async (query) => {
  return await api.get('/search/keyword', {
    params: { query: query, language: 'en-US' },
  });
};
