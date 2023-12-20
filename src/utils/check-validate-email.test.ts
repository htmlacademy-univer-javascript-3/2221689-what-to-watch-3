import checkValidateEmail from './check-validate-email';

describe('Function: checkValidateEmail', () => {
  it('should return "true" when email is valid', () => {
    const mockEmail = 'alexander@mail.ru';

    const result = checkValidateEmail(mockEmail);

    expect(result).toBe(true);
  });

  it('should return "false" when email is not valid', () => {
    const mockEmail = 'alexandermail.ru';

    const result = checkValidateEmail(mockEmail);

    expect(result).toBe(false);
  });
});
