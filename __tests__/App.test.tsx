import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({children}: {children: React.ReactNode}) => children,
  };
});

jest.mock('../src/navigation', () => {
  return {
    StackNavigator: () => <div>StackNavigator</div>,
  };
});

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
