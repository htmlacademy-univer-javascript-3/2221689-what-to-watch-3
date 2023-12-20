import checkValidatePassword from './check-validate-password';

describe('Function: checkValidatePassword', () => {
  it('should return "true" when password is valid', () => {
    const mockPassword = '123wqsaaq1';

    const result = checkValidatePassword(mockPassword);

    expect(result).toBe(true);
  });

  it('should return "false" when password is not valid', () => {
    const mockPassword = '12';

    const result = checkValidatePassword(mockPassword);

    expect(result).toBe(false);
  });
});
