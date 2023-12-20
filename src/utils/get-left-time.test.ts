import getLeftTime from './get-left-time';

describe('Function: getLeftTime', () => {
  it('should return correct left time in minutes and seconds', () => {
    const expectedResult = '-40:20';

    const result = getLeftTime(2420);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return correct left time in seconds, minutes, hours', () => {
    const expectedResult = '-01:00:20';

    const result = getLeftTime(3620);

    expect(result).toStrictEqual(expectedResult);
  });
});
