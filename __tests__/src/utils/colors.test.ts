import {Colors} from '../../../src/utils/colors';

describe('Colors', () => {
  it('should have the correct color values', () => {
    expect(Colors.black).toBe(Colors.black);
    expect(Colors.white).toBe(Colors.white);
    expect(Colors.lightBlue).toBe(Colors.lightBlue);
    expect(Colors.darkBlue).toBe(Colors.darkBlue);
    expect(Colors.brightBlue).toBe(Colors.brightBlue);
    expect(Colors.grey).toBe(Colors.grey);
    expect(Colors.darkGrey).toBe(Colors.darkGrey);
    expect(Colors.red).toBe(Colors.red);
  });
});
