import {configureStore} from '@reduxjs/toolkit';
import movieSlice from '../../../src/redux/movieSlice';
import {store} from '../../../src/redux/store';

describe('Redux Store', () => {
  it('should configure the store correctly', () => {
    const testStore = configureStore({
      reducer: {movieReducer: movieSlice},
    });

    expect(testStore.getState()).toHaveProperty('movieReducer');
  });

  it('should export RootState type correctly', () => {
    type TestRootState = ReturnType<typeof store.getState>;
    const testState: TestRootState = store.getState();

    expect(testState).toBeInstanceOf(Object);
    expect(testState).toHaveProperty('movieReducer');
  });

  it('should export AppDispatch type correctly', () => {
    type TestAppDispatch = typeof store.dispatch;
    const testDispatch: TestAppDispatch = store.dispatch;

    expect(testDispatch).toBeInstanceOf(Function);
  });
});
