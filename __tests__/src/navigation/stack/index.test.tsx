import React from 'react';
import {create} from 'react-test-renderer';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from '../../../../src/navigation';

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({children}: any) => <>{children}</>,
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({children}: any) => <>{children}</>,
      Screen: ({component}: any) => {
        const Component = component;
        return <Component />;
      },
    }),
  };
});

jest.mock('../../../../src/navigation/bottomTabs', () => {
  return {
    BottomTabNavigator: () => <div>BottomTabNavigator Component</div>,
  };
});

jest.mock('../../../../src/screens', () => {
  return {
    MovieDetails: () => <div>MovieDetails Component</div>,
  };
});

describe('StackNavigator', () => {
  it('renders the BottomTabs screen', () => {
    const tree = create(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders the MovieDetails screen', () => {
    const tree = create(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
