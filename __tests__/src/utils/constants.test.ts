import {
  BASE_URL,
  BEARER_TOKEN,
  IMAGE_BASE_URL,
} from '../../../src/utils/constants';

describe('API Constants', () => {
  it('should have the correct BEARER_TOKEN value', () => {
    expect(BEARER_TOKEN).toBe(BEARER_TOKEN);
  });

  it('should have the correct BASE_URL value', () => {
    expect(BASE_URL).toBe(BASE_URL);
  });

  it('should have the correct IMAGE_BASE_URL value', () => {
    expect(IMAGE_BASE_URL).toBe(IMAGE_BASE_URL);
  });
});
