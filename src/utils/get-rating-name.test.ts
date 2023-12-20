import getRatingName from './get-rating-name';

describe('Function: getRatingName', () => {
  it('should return rating name is "Awesome" when rating 10', () => {
    const expectedResult = 'Awesome';

    const result = getRatingName(10);

    expect(result).toBe(expectedResult);
  });

  it('should return rating name is "Very good" when rating 9', () => {
    const expectedResult = 'Very good';

    const result = getRatingName(9);

    expect(result).toBe(expectedResult);
  });

  it('should return rating name is "Good" when rating 7', () => {
    const expectedResult = 'Good';

    const result = getRatingName(7);

    expect(result).toBe(expectedResult);
  });

  it('should return rating name is "Normal" when rating 3', () => {
    const expectedResult = 'Normal';

    const result = getRatingName(3);

    expect(result).toBe(expectedResult);
  });

  it('should return rating name is "Bad" when rating 1', () => {
    const expectedResult = 'Bad';

    const result = getRatingName(1);

    expect(result).toBe(expectedResult);
  });
});
