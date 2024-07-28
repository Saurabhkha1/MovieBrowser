import axios from 'axios';
import {fetchMovies} from '../../../src/network';
import {BASE_URL, BEARER_TOKEN} from '../../../src/utils/constants';

describe('fetchMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches movies successfully from an API', async () => {
    const data = {
      results: [
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
      ],
    };

    (axios.get as jest.Mock).mockResolvedValue({data});

    const movies = await fetchMovies('popular', 1);

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/movie/popular`, {
      params: {language: 'en-US', page: 1},
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: 'application/json',
      },
    });
    expect(movies).toEqual(data.results);
  });

  it('handles API errors', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(fetchMovies('popular', 1)).rejects.toThrow('Network Error');
  });
});
