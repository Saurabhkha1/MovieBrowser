import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import moviesReducer, {
  fetchMoviesByCategory,
  resetState,
  MoviesState,
} from '../../../src/redux/movieSlice';
import {fetchMovies} from '../../../src/network';

jest.mock('../../../src/network');

type RootState = {
  movies: MoviesState;
};

let store: EnhancedStore<RootState>;

describe('movies slice', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(store.getState().movies).toEqual({
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
      status: 'idle',
      error: null,
      page: 1,
      hasMore: true,
    });
  });

  it('should handle resetState', () => {
    store.dispatch(resetState());
    expect(store.getState().movies).toEqual({
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
      status: 'idle',
      error: null,
      page: 1,
      hasMore: true,
    });
  });

  it('should handle fetchMoviesByCategory.pending', async () => {
    store.dispatch(
      fetchMoviesByCategory.pending('fetchMoviesByCategory', {
        category: 'popular',
        page: 1,
      }),
    );
    expect(store.getState().movies.status).toBe('loading');
    expect(store.getState().movies.error).toBeNull();
  });

  it('should handle fetchMoviesByCategory.fulfilled', async () => {
    const mockMovies = [
      {
        id: 1,
        title: 'Movie 1',
        poster_path: '/path1.jpg',
        release_date: '2024-01-01',
        vote_average: 8.5,
        overview: 'Overview of movie 1',
      },
      {
        id: 2,
        title: 'Movie 2',
        poster_path: '/path2.jpg',
        release_date: '2024-02-01',
        vote_average: 7.5,
        overview: 'Overview of movie 2',
      },
    ];

    (fetchMovies as jest.Mock).mockResolvedValue(mockMovies);

    await store.dispatch(
      fetchMoviesByCategory({category: 'popular', page: 1}) as any,
    );

    const state = store.getState().movies;
    expect(state.status).toBe('succeeded');
    expect(state.popular).toEqual(mockMovies);
    expect(state.page).toBe(1);
    expect(state.hasMore).toBe(true);
  });

  it('should handle fetchMoviesByCategory.rejected', async () => {
    (fetchMovies as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await store.dispatch(
      fetchMoviesByCategory({category: 'popular', page: 1}) as any,
    );

    const state = store.getState().movies;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network Error');
  });
});
