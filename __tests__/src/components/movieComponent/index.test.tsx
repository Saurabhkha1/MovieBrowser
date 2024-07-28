import React from 'react';
import {create, act, ReactTestRenderer} from 'react-test-renderer';
import {Image, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MovieComponent} from '../../../../src/components';
import {Movie} from '../../../../src/redux/movieSlice';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/testpath.jpg',
  release_date: '2022-01-01',
  vote_average: 8.5,
  overview: '',
};

describe('MovieComponent', () => {
  it('renders correctly with given movie', () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<MovieComponent movie={mockMovie} />);
    });

    const tree = component?.toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();

    const image = component?.root.findByType(Image);
    const titleText = component?.root
      .findAllByType(Text)
      .find(node => node.props.style && node.props.style.fontWeight === '500');
    const releaseDateText = component?.root.findByProps({
      children: 'Release Date:',
    });

    expect(image?.props.source.uri).toBe(
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`,
    );
    expect(titleText?.props.children).toBe(mockMovie.title);
    expect(releaseDateText).toBeTruthy();
  });

  it('navigates to MovieDetails on press', () => {
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: navigateMock});

    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<MovieComponent movie={mockMovie} />);
    });

    const touchable = component?.root.findByType(TouchableOpacity);
    act(() => {
      touchable?.props.onPress();
    });

    expect(navigateMock).toHaveBeenCalledWith('MovieDetails', {
      movie: mockMovie,
    });
  });

  it('renders correctly with different movie prop values', () => {
    const anotherMockMovie: Movie = {
      id: 2,
      title: 'Another Test Movie',
      poster_path: '/anotherpath.jpg',
      release_date: '2021-12-12',
      vote_average: 7.3,
      overview: '',
    };

    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<MovieComponent movie={anotherMockMovie} />);
    });

    const tree = component?.toJSON();
    console.log(tree); // Log the component tree
    expect(tree).toMatchSnapshot();

    const titleText = component?.root
      .findAllByType(Text)
      .find(node => node.props.style && node.props.style.fontWeight === '500');
    expect(titleText?.props.children).toBe(anotherMockMovie.title);
  });
});
