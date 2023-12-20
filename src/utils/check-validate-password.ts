export default function checkValidatePassword(password: string) {
  return /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
}
