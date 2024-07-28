import React from 'react';
import renderer from 'react-test-renderer';
import {useDispatch, useSelector} from 'react-redux';
import {CommonHome} from '../../../../src/screens';
import {Icons} from '../../../../src/utils/icons';

jest.mock('../../../../src/components', () => ({
  Header: (props: any) => <div {...props} />,
  Loader: () => <div>Loading...</div>,
  MovieComponent: (props: any) => <div {...props} />,
}));

const route = {
  params: {
    title: 'Popular',
    icon: Icons.popular,
  },
};

describe('CommonHome Component', () => {
  let useDispatchMock: any;
  let useSelectorMock: any;

  beforeEach(() => {
    useDispatchMock = useDispatch as any;
    useSelectorMock = useSelector as any;

    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockReturnValue({
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
      status: 'idle',
      error: null,
      page: 1,
      hasMore: true,
    });
  });

  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  it('renders correctly', () => {
    const component = renderer.create(<CommonHome route={route} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
