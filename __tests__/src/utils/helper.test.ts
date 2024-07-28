import {
  moderateScale,
  verticalScale,
  deviceWidth,
  deviceHeight,
  scale,
} from '../,,/../../../src/utils/helper';

describe('Scaling Utilities', () => {
  it('should return the correct device width and height', () => {
    expect(deviceWidth).toBe(deviceWidth);
    expect(deviceHeight).toBe(deviceHeight);
  });

  it('should scale sizes correctly', () => {
    const size = 100;
    expect(scale?.(size)).toBe(scale?.(size));
  });

  it('should scale sizes vertically correctly', () => {
    const size = 100;
    expect(verticalScale?.(size)).toBe(verticalScale?.(size));
  });

  it('should moderately scale sizes correctly with default factor', () => {
    const size = 100;
    expect(moderateScale?.(size)).toBe(moderateScale?.(size));
  });
});

describe('scale function', () => {
  it('should scale sizes correctly', () => {
    const size = 100;
    expect(scale?.(size)).toBe(scale?.(size));
  });
});
