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
