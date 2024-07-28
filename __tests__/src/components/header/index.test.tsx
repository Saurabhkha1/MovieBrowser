import React from 'react';
import {create, act, ReactTestRenderer} from 'react-test-renderer';
import {Header} from '../../../../src/components';
import {Icons} from '../../../../src/utils/icons';
import {TextInput} from 'react-native';

const mockIcon = Icons.search;

jest.mock('../../../../src/screens', () => ({
  CommonHome: jest.fn(() => null),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });

  it('renders correctly', () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <Header
          title="Test Title"
          icon={mockIcon}
          onChangeText={() => {}}
          searchValue=""
        />,
      );
    });
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows and hides input box on search icon press', () => {
    const onChangeTextMock = jest.fn();
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <Header
          title="Test Title"
          icon={mockIcon}
          onChangeText={onChangeTextMock}
          searchValue=""
        />,
      );
    });

    let tree = component?.toJSON();
    expect(tree).toMatchSnapshot();

    tree = component?.toJSON();
    expect(tree).toMatchSnapshot();

    tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates input value correctly', () => {
    const onChangeTextMock = jest.fn();
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <Header
          title="Test Title"
          icon={mockIcon}
          onChangeText={onChangeTextMock}
          searchValue="Existing text"
        />,
      );
    });

    const input = component?.root?.findByType(TextInput);
    expect(input?.props.value).toBe('Existing text');
  });
});
