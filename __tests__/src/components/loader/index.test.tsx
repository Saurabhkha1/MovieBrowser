import React from 'react';
import {create, act, ReactTestRenderer} from 'react-test-renderer';
import {View, ActivityIndicator} from 'react-native';
import {Loader} from '../../../../src/components';
import {Colors} from '../../../../src/utils/colors';

describe('Loader Component', () => {
  it('renders correctly with default props', () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<Loader />);
    });

    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();

    const view = component?.root.findByType(View);
    const activityIndicator = component?.root.findByType(ActivityIndicator);

    expect(view?.props.style).toEqual(
      expect.objectContaining({
        alignItems: 'center',
        justifyContent: 'center',
      }),
    );

    expect(activityIndicator?.props.size).toBe('large');
    expect(activityIndicator?.props.color).toBe(Colors.black);
  });

  it('renders correctly with full size', () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<Loader size="full" />);
    });

    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();

    const view = component?.root.findByType(View);

    expect(view?.props.style).toEqual(
      expect.objectContaining({
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }),
    );
  });

  it('renders correctly with custom color', () => {
    const customColor = 'red';
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<Loader color={customColor} />);
    });

    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();

    const activityIndicator = component?.root.findByType(ActivityIndicator);

    expect(activityIndicator?.props.color).toBe(customColor);
  });

  it('renders correctly with normal size and custom color', () => {
    const customColor = 'blue';
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(<Loader size="normal" color={customColor} />);
    });

    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();

    const view = component?.root.findByType(View);
    const activityIndicator = component?.root.findByType(ActivityIndicator);

    expect(view?.props.style).toEqual(
      expect.objectContaining({
        alignItems: 'center',
        justifyContent: 'center',
      }),
    );

    expect(activityIndicator?.props.size).toBe('large');
    expect(activityIndicator?.props.color).toBe(customColor);
  });
});
