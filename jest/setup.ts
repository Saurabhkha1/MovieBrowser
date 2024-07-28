jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: 'MockedFontAwesomeIcon',
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated = {
    ...RN.Animated,
    timing: jest.fn(() => ({
      start: jest.fn(),
    })),
    spring: jest.fn(() => ({
      start: jest.fn(),
    })),
  };
  RN.Dimensions = {
    get: jest.fn(() => ({
      width: 375,
      height: 812,
    })),
  };
  return RN;
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('axios');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../src/utils/colors', () => ({
  Colors: {
    black: '#000',
    white: '#fff',
    grey: '#ccc',
    darkGrey: '#999',
  },
}));

jest.mock('../src/utils/helper', () => ({
  moderateScale: (size: number) => size,
}));

jest.mock('../src/utils/constants', () => ({
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
}));
