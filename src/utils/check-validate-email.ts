export default function checkValidateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}
