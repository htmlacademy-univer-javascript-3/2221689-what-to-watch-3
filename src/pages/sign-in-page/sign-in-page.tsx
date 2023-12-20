import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import checkValidateEmail from '../../utils/check-validate-email';
import checkValidatePassword from '../../utils/check-validate-password';
import { Helmet } from 'react-helmet-async';

function SignInPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current && loginRef.current.value.trim() !== ''
      && passwordRef.current.value.trim() !== '') {
      const isCorrectEmail = checkValidateEmail(loginRef.current.value);
      const isCorrectPassword = checkValidatePassword(passwordRef.current.value);
      setEmailError(!isCorrectEmail ? 'Please enter a valid email address' : '');
      setPasswordError(!isCorrectPassword ? 'The password should contain latin letters and numbers' : '');
      if (isCorrectEmail && isCorrectPassword) {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        }));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form data-testid="form" action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
            {(emailError || passwordError) &&
              <div className="sign-in__message">
                <p>{emailError}</p>
                <p>{passwordError}</p>
              </div>}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input data-testid="loginElement" ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input data-testid="passwordElement" ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SignInPage;
