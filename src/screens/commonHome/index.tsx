import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Header, Loader, MovieComponent} from '../../components';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Colors} from '../../utils/colors';
import {moderateScale} from '../../utils/helper';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMoviesByCategory, Movie, resetState} from '../../redux/movieSlice';

type Props = {
  route: {
    params: {
      title: string;
      icon: IconProp;
    };
  };
};

const FooterComponent = ({loading}: {loading: boolean}) => (
  <View style={styles.footer}>
    {loading && <ActivityIndicator size="large" color={Colors.black} />}
  </View>
);

export const CommonHome = ({route}: Props) => {
  const {title, icon} = route?.params;
  const dispatch = useDispatch<AppDispatch>();
  const {
    nowPlaying,
    popular,
    topRated,
    upcoming,
    status,
    error,
    page,
    hasMore,
  } = useSelector((state: RootState) => state.movieReducer);
  const [isFetching, setIsFetching] = useState(false);
  const category = useRef<'now_playing' | 'popular' | 'top_rated' | 'upcoming'>(
    'now_playing',
  );
  const [searchValue, setSearchValue] = useState('');
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>();

  const pageRef = useRef(1);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    dispatch(resetState());
  }, [title, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      switch (title.toLowerCase()) {
        case 'now playing':
          category.current = 'now_playing';
          break;
        case 'popular':
          category.current = 'popular';
          break;
        case 'top rated':
          category.current = 'top_rated';
          break;
        case 'upcoming':
          category.current = 'upcoming';
          break;
        default:
          return;
      }
      dispatch(fetchMoviesByCategory({category: category.current, page: 1}));
    }
  }, [dispatch, title, status]);

  let movies: Movie[] = useMemo(() => [], []);
  switch (title.toLowerCase()) {
    case 'now playing':
      movies = nowPlaying;
      break;
    case 'popular':
      movies = popular;
      break;
    case 'top rated':
      movies = topRated;
      break;
    case 'upcoming':
      movies = upcoming;
      break;
    default:
      break;
  }

  const loadMoreMovies = () => {
    if (hasMore && !isFetching && status !== 'loading') {
      setIsFetching(true);
      pageRef.current += 1;
      dispatch(
        fetchMoviesByCategory({
          category: category.current,
          page: page + 1,
        }),
      ).then(() => {
        setIsFetching(false);
      });
    }
  };

  useEffect(() => {
    if (searchValue?.length) {
      let timeout = setTimeout(() => {
        const searchedMoviesTemp: Movie[] = movies.filter(item =>
          item?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()),
        );
        setSearchedMovies(searchedMoviesTemp);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchValue, movies]);

  return (
    <View style={styles.container}>
      <Header
        title={title}
        icon={icon}
        searchValue={searchValue}
        onChangeText={text => setSearchValue(text)}
      />
      <View style={styles.mainView}>
        {status === 'loading' && pageRef.current === 1 && <Loader />}
        {status === 'failed' && <Text>Error: {error}</Text>}
        {(status === 'succeeded' || isFetching) && (
          <FlatList
            style={styles.flatlistStyle}
            data={searchValue?.length ? searchedMovies : movies}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            renderItem={({item}) => <MovieComponent movie={item} />}
            ListFooterComponent={<FooterComponent loading={isFetching} />}
            onEndReached={searchValue?.length ? () => null : loadMoreMovies}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    padding: moderateScale(10),
  },
  footer: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
  },
  flatlistStyle: {height: '100%'},
});
