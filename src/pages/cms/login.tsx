import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Animated from 'react-mount-animation';

import useLoggedUserContext from '@/contexts/LoggedUser';
import { testEmail } from '@/helpers/regexTests';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsLogin.module.scss';

const CmsLogin: React.FC = () => {
  const router = useRouter();
  const { setLoggedUser } = useLoggedUserContext();
  const { checkUserAlreadyLogged } = useCheckAuthentication();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [recaptchaLoginChecked, setRecaptchaLoginChecked] = useState(true);

  const [forgotEmail, setForgotEmail] = useState('');
  const [recaptchaLostPasswordChecked, setRecaptchaLostPasswordChecked] =
    useState(false);

  const recaptchaLogin = useRef<ReCAPTCHA>(null);
  const recaptchaLostPassword = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    checkUserAlreadyLogged();
  }, []);

  const {
    axiosPost: loginAxiosPost,
    data: loginData,
    error: loginError,
    isPending: loginPending,
  } = useAxios('http://localhost:3000/api/auth');

  const {
    axiosPost: lostPassAxiosPost,
    data: lostPassFinished,
    setData: setLostPassFinished,
    error: lostPassError,
    isPending: lostPassPending,
  } = useAxios('http://localhost:3000/api/password/lost');

  const [loginFormErrors, setLoginFormErrors] = useState<{
    validEmail: boolean;
    emptyRequiredFields: boolean;
    validPassword: boolean;
    checkedCaptcha: boolean;
  }>({
    validEmail: true,
    emptyRequiredFields: false,
    validPassword: true,
    checkedCaptcha: true,
  });

  const [lostPasswordFormErrors, setLostPasswordFormErrors] = useState<{
    validEmail: boolean;
    checkedCaptcha: boolean;
  }>({
    validEmail: true,
    checkedCaptcha: true,
  });

  const onCaptchaChange = (type: 'Login' | 'LostPassword') => {
    if (eval(`recaptcha${type}`).current.getValue()) {
      eval(`setRecaptcha${type}Checked`)(true);
    }
  };

  useEffect(() => {
    // Login success
    if (loginData) {
      setLoggedUser(loginData.data.user);
      router.push('/cms');
    }
  }, [loginData]);

  //*
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginPending) {
      let validEmail = true;
      let validPassword = true;

      if (loginEmail === '' || password === '') {
        setLoginFormErrors({
          validEmail,
          emptyRequiredFields: true,
          validPassword,
          checkedCaptcha: recaptchaLoginChecked,
        });
      }

      validEmail = testEmail(loginEmail);

      validPassword = password.length >= 8;

      if (validEmail && validPassword && recaptchaLoginChecked) {
        loginAxiosPost({
          data: {
            email: loginEmail,
            password,
            stayLoggedIn,
          },
        });
      }

      setLoginFormErrors({
        emptyRequiredFields: false,
        validEmail,
        validPassword,
        checkedCaptcha: recaptchaLoginChecked,
      });
    }
  };

  //*
  const handleLostPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lostPassPending) {
      let validEmail = true;

      setLostPassFinished(null);

      validEmail = testEmail(forgotEmail);

      if (validEmail && recaptchaLostPasswordChecked) {
        lostPassAxiosPost({
          data: {
            inputEmail: forgotEmail,
          },
        });
      }

      setLostPasswordFormErrors({
        validEmail,
        checkedCaptcha: recaptchaLostPasswordChecked,
      });
    }
  };

  //*
  return (
    <div className={styles.bgcolor}>
      <div className={styles.page_wrapper}>
        {!forgotPassword ? (
          <>
            <h1 className={styles.cms_header}>Pulse Clan&apos;s CMS</h1>
            <h2 className={styles.cms_subheader}>Please log in</h2>
            <form
              className={styles.form}
              onSubmit={e => {
                handleLogin(e);
              }}
            >
              <label className={styles.form_label} htmlFor='email'>
                Email
              </label>
              <input
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                maxLength={75}
                className={styles.form_input}
                type='text'
                name='email'
              />

              <label className={styles.form_label} htmlFor='password'>
                Password
              </label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                maxLength={75}
                className={styles.form_input}
                type='password'
                name='password'
              />

              <div className={styles.form_terms_container}>
                <input
                  className={styles.form_terms_checkbox}
                  type='checkbox'
                  name='terms'
                  checked={stayLoggedIn}
                  onChange={() => setStayLoggedIn(state => !state)}
                />
                <label className={styles.form_terms_label} htmlFor='terms'>
                  Stay logged in
                </label>
              </div>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={loginFormErrors.emptyRequiredFields}
                time={0.15}
                className={styles.form_errormsg}
              >
                Please fill out all required fields!
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={!loginFormErrors.validEmail}
                time={0.15}
                className={styles.form_errormsg}
              >
                Please enter a valid email!
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={!loginFormErrors.validPassword}
                time={0.15}
                className={styles.form_errormsg}
              >
                Please enter a valid password!
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={!loginFormErrors.checkedCaptcha}
                time={0.15}
                className={styles.form_errormsg}
              >
                Please verify you&apos;re not a robot!
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={loginError && loginError.response}
                time={0.15}
                className={styles.form_errormsg}
              >
                {loginError?.response?.data?.error}
              </Animated.h4>

              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_CAPTCHASITEKEY}
                onChange={() => onCaptchaChange('Login')}
                ref={recaptchaLogin}
              />

              {loginPending && (
                <svg className={styles.spinner} viewBox='0 0 50 50'>
                  <circle
                    className={styles.path}
                    cx='25'
                    cy='25'
                    r='20'
                    fill='none'
                    strokeWidth='4'
                  ></circle>
                </svg>
              )}

              <button className={styles.submit_btn}>LOGIN &nbsp; &nbsp;</button>
            </form>

            <button
              className={styles.forgot_password_btn}
              onClick={() => setForgotPassword(true)}
            >
              Forgot password?
            </button>
          </>
        ) : (
          <>
            <form
              className={styles.form}
              onSubmit={e => {
                handleLostPassword(e);
              }}
            >
              <label className={styles.form_label} htmlFor='password'>
                Please input your email
              </label>
              <input
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                maxLength={100}
                className={`${styles.form_input} ${
                  lostPasswordFormErrors.checkedCaptcha &&
                  lostPasswordFormErrors.validEmail &&
                  styles.lost_password_input
                }`}
                type='text'
                name='password'
              />

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={!lostPasswordFormErrors.validEmail}
                time={0.15}
                className={styles.form_errormsg}
              >
                Please enter a valid email!
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={!lostPasswordFormErrors.checkedCaptcha}
                time={0.15}
                className={styles.form_errormsg}
              >
                Please verify you&apos;re not a robot!
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={lostPassError && lostPassError.response}
                time={0.15}
                className={styles.form_errormsg}
              >
                {lostPassError?.response.data.error}
              </Animated.h4>

              <Animated.h4
                mountAnim={` 
                  0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                  }
                  100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                  }`}
                show={lostPassFinished}
                time={0.15}
                className={styles.form_successmsg}
              >
                If the email belongs to a registered user, further steps will be
                sent there.
              </Animated.h4>

              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_CAPTCHASITEKEY}
                onChange={() => onCaptchaChange('LostPassword')}
                ref={recaptchaLostPassword}
              />

              {lostPassPending && (
                <svg className={styles.spinner} viewBox='0 0 50 50'>
                  <circle
                    className={styles.path}
                    cx='25'
                    cy='25'
                    r='20'
                    fill='none'
                    strokeWidth='4'
                  ></circle>
                </svg>
              )}

              <button className={styles.submit_btn}>SEND &nbsp; &nbsp;</button>
            </form>

            <button
              className={styles.forgot_password_btn}
              onClick={() => setForgotPassword(false)}
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CmsLogin;
