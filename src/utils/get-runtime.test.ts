import { getRunTime } from './get-runtime';

describe('Function: getRunTime', () => {
  it('should return correct runtime', () => {
    const expectedResult = '1h 1m';

    const result = getRunTime(61);

    expect(result).toStrictEqual(expectedResult);
  });
});
