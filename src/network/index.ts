import axios from 'axios';
import {BASE_URL, BEARER_TOKEN} from '../utils/constants';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
};

export const fetchMovies = async (
  endpoint: string,
  page: number = 1,
): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/movie/${endpoint}`, {
    params: {language: 'en-US', page},
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Accept: 'application/json',
    },
  });
  return response.data.results;
};
