import getDate from './get-date';

describe('Function: getDate', () => {
  it('should return day, month, year, when current date', () => {
    const date = '2023-12-15T13:43:57.065Z';
    const expectedDay = 15;
    const expectedMonth = 12;
    const expectedYear = 2023;

    const result = getDate(date);

    expect(result.day).toBe(expectedDay);
    expect(result.month).toBe(expectedMonth);
    expect(result.year).toBe(expectedYear);
  });
});
