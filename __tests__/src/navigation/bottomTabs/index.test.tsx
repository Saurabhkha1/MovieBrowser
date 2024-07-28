import React from 'react';
import TestRenderer, {
  create,
  act,
  ReactTestRenderer,
} from 'react-test-renderer';
import {IconComponent} from '../../../../src/components';
import {Icons} from '../../../../src/utils/icons';
import {BottomTabNavigator} from '../../../../src/navigation';

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({children}: any) => <>{children}</>,
    Screen: ({children}: any) => <>{children}</>,
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}: any) => <>{children}</>,
    Screen: ({children}: any) => <>{children}</>,
  }),
}));

describe('BottomTabNavigator', () => {
  let component: ReactTestRenderer;

  beforeEach(() => {
    act(() => {
      component = create(<BottomTabNavigator />);
    });
  });

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('contains the NowPlaying screen with correct icon and label', () => {
    const nowPlayingScreen = component.root.findByProps({name: 'NowPlaying'});
    expect(nowPlayingScreen).toBeTruthy();

    const testRenderer = TestRenderer.create(
      <IconComponent icon={Icons.nowPlaying} size={25} />,
    );
    const testInstance = testRenderer.root;

    const nowPlayingIcon = testInstance.findByType(IconComponent);
    expect(nowPlayingIcon.props.icon).toBe(Icons.nowPlaying);
    expect(nowPlayingIcon.props.size).toBe(25);

    const tabBarLabel = nowPlayingScreen.props.options.tabBarLabel;
    expect(tabBarLabel).toBe('Now Playing');
  });

  it('contains the Popular screen with correct icon and label', () => {
    const popularScreen = component.root.findByProps({name: 'Popular'});
    expect(popularScreen).toBeTruthy();

    const testRenderer = TestRenderer.create(
      <IconComponent icon={Icons.popular} size={25} />,
    );
    const testInstance = testRenderer.root;

    const popularIcon = testInstance.findByType(IconComponent);
    expect(popularIcon.props.icon).toBe(Icons.popular);
    expect(popularIcon.props.size).toBe(25);

    const tabBarLabel = popularScreen.props.options.tabBarLabel;
    expect(tabBarLabel).toBe('Popular');
  });

  it('contains the TopRated screen with correct icon and label', () => {
    const topRatedScreen = component.root.findByProps({name: 'TopRated'});
    expect(topRatedScreen).toBeTruthy();

    const testRenderer = TestRenderer.create(
      <IconComponent icon={Icons.topRated} size={25} />,
    );
    const testInstance = testRenderer.root;

    const topRatedIcon = testInstance.findByType(IconComponent);
    expect(topRatedIcon.props.icon).toBe(Icons.topRated);
    expect(topRatedIcon.props.size).toBe(25);

    const tabBarLabel = topRatedScreen.props.options.tabBarLabel;
    expect(tabBarLabel).toBe('Top Rated');
  });

  it('contains the Upcoming screen with correct icon', () => {
    const upcomingScreen = component.root.findByProps({name: 'Upcoming'});
    expect(upcomingScreen).toBeTruthy();

    const testRenderer = TestRenderer.create(
      <IconComponent icon={Icons.upcoming} size={25} />,
    );
    const testInstance = testRenderer.root;

    const upcomingIcon = testInstance.findByType(IconComponent);
    expect(upcomingIcon.props.icon).toBe(Icons.upcoming);
    expect(upcomingIcon.props.size).toBe(25);
  });
});
