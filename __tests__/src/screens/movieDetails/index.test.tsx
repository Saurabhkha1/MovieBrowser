import React from 'react';
import renderer from 'react-test-renderer';
import {useNavigation} from '@react-navigation/native';
import {Movie} from '../../../../src/redux/movieSlice';
import {MovieDetails} from '../../../../src/screens/MovieDetails';
import {TouchableOpacity} from 'react-native';

describe('MovieDetails', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    release_date: '2023-01-01',
    overview: 'Test movie overview',
    vote_average: 1.5,
  };

  const route = {
    params: {
      movie: mockMovie,
    },
  };

  const navigation = {
    pop: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigation);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<MovieDetails route={route} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls navigation.pop on back button press', () => {
    const component = renderer.create(<MovieDetails route={route} />);
    const backButton = component.root.findByType(TouchableOpacity);

    renderer.act(() => {
      backButton.props.onPress();
    });

    expect(navigation.pop).toHaveBeenCalled();
  });

  it('displays the correct movie details', () => {
    const component = renderer.create(<MovieDetails route={route} />);
    const instance = component.root;

    const title = instance.findByProps({children: mockMovie.title}).props
      .children;
    const releaseDate = instance.findByProps({children: mockMovie.release_date})
      .props.children;
    const overview = instance.findByProps({children: mockMovie.overview}).props
      .children;

    expect(title).toBe(mockMovie.title);
    expect(releaseDate).toBe(mockMovie.release_date);
    expect(overview).toBe(mockMovie.overview);
  });
});
