import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchMovies} from '../network';

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
};

export type MoviesState = {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
};

const initialState: MoviesState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchMoviesByCategory = createAsyncThunk(
  'movies/fetchMoviesByCategory',
  async ({
    category,
    page,
  }: {
    category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
    page: number;
  }) => {
    const movies = await fetchMovies(category, page);
    return {category, movies, page};
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetState: state => {
      state.nowPlaying = [];
      state.popular = [];
      state.topRated = [];
      state.upcoming = [];
      state.status = 'idle';
      state.error = null;
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesByCategory.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchMoviesByCategory.fulfilled,
        (
          state,
          action: PayloadAction<{
            category: string;
            movies: Movie[];
            page: number;
          }>,
        ) => {
          state.status = 'succeeded';
          if (action.payload.movies.length === 0) {
            state.hasMore = false;
          }
          switch (action.payload.category) {
            case 'now_playing':
              if (action.payload.page === 1) {
                state.nowPlaying = action.payload.movies;
              } else {
                state.nowPlaying = [
                  ...state.nowPlaying,
                  ...action.payload.movies,
                ];
              }
              break;
            case 'popular':
              if (action.payload.page === 1) {
                state.popular = action.payload.movies;
              } else {
                state.popular = [...state.popular, ...action.payload.movies];
              }
              break;
            case 'top_rated':
              if (action.payload.page === 1) {
                state.topRated = action.payload.movies;
              } else {
                state.topRated = [...state.topRated, ...action.payload.movies];
              }
              break;
            case 'upcoming':
              if (action.payload.page === 1) {
                state.upcoming = action.payload.movies;
              } else {
                state.upcoming = [...state.upcoming, ...action.payload.movies];
              }
              break;
            default:
              break;
          }
          state.page = action.payload.page;
        },
      )
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const {resetState} = moviesSlice.actions;
export default moviesSlice.reducer;
