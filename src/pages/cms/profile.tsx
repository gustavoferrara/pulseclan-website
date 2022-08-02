import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsProfile.module.scss';

const CmsProfile: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkMemberCredentials } = useCheckAuthentication();

  const hydrateUserInputs = useRef(true);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [twitch, setTwitch] = useState('');
  const [youtube, setYoutube] = useState('');
  const [camSettings, setCamSettings] = useState('');
  const [behance, setBehance] = useState('');
  const [twitter, setTwitter] = useState('');
  const [steam, setSteam] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');

  const [updateProfileFormErrors, setUpdateProfileFormErrors] = useState({
    requiredFields: false,
  });

  const changePasswordInput = useRef<HTMLInputElement>(null);
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passResetSuccess, setPassResetSuccess] = useState(false);

  const [passResetFormErrors, setPassResetFormErrors] = useState({
    requiredFields: false,
    passwordLength: false,
  });

  const {
    axiosPost: updateProfileAxiosPost,
    data: updateProfileData,
    error: updateProfileError,
    isPending: updateProfilePending,
  } = useAxios('http://localhost:3000/api/users/profile');
  // change ip

  const {
    axiosPost: resetPassAxiosPost,
    data: resetPassData,
    error: resetPassError,
    isPending: resetPassPending,
  } = useAxios('http://localhost:3000/api/password/reset');
  // change ip

  useEffect(() => {
    checkMemberCredentials();
  }, []);

  useEffect(() => {
    if (resetPassData) {
      setPassResetSuccess(true);
    }
  }, [resetPassData]);

  useEffect(() => {
    if (loggedUser && hydrateUserInputs.current) {
      setName(loggedUser.name);
      setProfilePicture(loggedUser.profilePicture);

      loggedUser.socialMedia?.forEach(socialMedia => {
        if (socialMedia.type === 'twitch') {
          setTwitch(socialMedia.link);
        }
        if (socialMedia.type === 'youtube') {
          setYoutube(socialMedia.link);
        }
        if (socialMedia.type === 'camSettings') {
          setCamSettings(socialMedia.link);
        }
        if (socialMedia.type === 'behance') {
          setBehance(socialMedia.link);
        }
        if (socialMedia.type === 'twitter') {
          setTwitter(socialMedia.link);
        }
        if (socialMedia.type === 'steam') {
          setSteam(socialMedia.link);
        }
        if (socialMedia.type === 'instagram') {
          setInstagram(socialMedia.link);
        }
        if (socialMedia.type === 'tiktok') {
          setTiktok(socialMedia.link);
        }
      });

      hydrateUserInputs.current = false;
    }
  }, [loggedUser]);

  const handleDisplayChangePasswordForm = () => {
    setDisplayChangePassword(true);

    setTimeout(() => {
      changePasswordInput.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 150);
  };

  // const handleSuccess = (type: 'updateProfile' | 'resetPassword') => {
  //   if (type === 'updateProfile') router.reload();
  //   // else {
  //   //   if (!resetPassError) {
  //   //     setPassResetSuccess(true);
  //   //   }
  //   // }
  // };

  useEffect(() => {
    if (updateProfileData) router.reload();
  }, [updateProfileData]);

  const handleUpdateProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!updateProfilePending) {
      let requiredFields = false;

      if (name === '' || profilePicture === '') requiredFields = true;

      if (!requiredFields) {
        updateProfileAxiosPost(
          {
            data: {
              name,
              email: loggedUser!.email,
              profilePicture,
              socialMedia: [
                {
                  type: 'twitch',
                  link: twitch,
                },
                {
                  type: 'youtube',
                  link: youtube,
                },
                {
                  type: 'camSettings',
                  link: camSettings,
                },
                {
                  type: 'behance',
                  link: behance,
                },
                {
                  type: 'twitter',
                  link: twitter,
                },
                {
                  type: 'steam',
                  link: steam,
                },
                {
                  type: 'instagram',
                  link: instagram,
                },
                {
                  type: 'tiktok',
                  link: tiktok,
                },
              ],
            },
          },
          // handleSuccess('updateProfile'),
        );
      }

      setUpdateProfileFormErrors({ requiredFields });
    }
  };

  const handleResetPasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resetPassPending) {
      let requiredFields = false;
      let passwordLength = false;

      setPassResetSuccess(false);

      if (newPassword.length < 5) passwordLength = true;

      if (currentPassword === '' || newPassword === '') requiredFields = true;

      if (!requiredFields && !passwordLength) {
        resetPassAxiosPost({
          data: {
            inputCurrentPassword: currentPassword,
            inputNewPassword: newPassword,
          },
        });
      }

      setPassResetFormErrors({ requiredFields, passwordLength });
    }
  };

  return (
    <>
      <CmsLayout />
      {loggedUser && (
        <div className={styles.bgcolor}>
          <div className={styles.page_wrapper}>
            <Link href={'/cms'}>
              <a className={styles.back_to_dashboard}>Back to dashboard</a>
            </Link>
            <h1 className={styles.cms_header}>Update your profile</h1>

            <form
              className={styles.form}
              onSubmit={e => handleUpdateProfileSubmit(e)}
            >
              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='name'
              >
                Username
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={12}
                className={styles.form_input}
                type='text'
                name='name'
              />

              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='profilePicture'
              >
                Profile picture link
              </label>
              <input
                value={profilePicture}
                onChange={e => setProfilePicture(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='profilePicture'
              />

              <p className={styles.image_size_warning}>
                For page performance / SEO purposes it is encouraged that you
                run your image through a compression service like{' '}
                <span>
                  <a
                    href={'https://imagecompressor.com/'}
                    target={'_blank'}
                    rel='noreferrer'
                  >
                    imagecompressor.com
                  </a>
                </span>{' '}
                before providing it to the website.
              </p>

              <label className={styles.form_label} htmlFor='twitch'>
                Twitch
              </label>
              <input
                value={twitch}
                onChange={e => setTwitch(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='twitch'
              />

              <label className={styles.form_label} htmlFor='youtube'>
                Youtube
              </label>
              <input
                value={youtube}
                onChange={e => setYoutube(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='youtube'
              />

              <label className={styles.form_label} htmlFor='camSettings'>
                Camera settings
              </label>
              <input
                value={camSettings}
                onChange={e => setCamSettings(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='camSettings'
              />

              <label className={styles.form_label} htmlFor='behance'>
                Behance
              </label>
              <input
                value={behance}
                onChange={e => setBehance(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='behance'
              />

              <label className={styles.form_label} htmlFor='twitter'>
                Twitter
              </label>
              <input
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='twitter'
              />

              <label className={styles.form_label} htmlFor='steam'>
                Steam
              </label>
              <input
                value={steam}
                onChange={e => setSteam(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='steam'
              />

              <label className={styles.form_label} htmlFor='instagram'>
                Instagram
              </label>
              <input
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='instagram'
              />

              <label className={styles.form_label} htmlFor='tiktok'>
                Tiktok
              </label>
              <input
                value={tiktok}
                onChange={e => setTiktok(e.target.value)}
                maxLength={500}
                className={styles.form_input}
                type='text'
                name='tiktok'
              />

              {updateProfileFormErrors.requiredFields && (
                <h4 className={styles.form_errormsg}>
                  Please fill out all required fields!
                </h4>
              )}

              {updateProfilePending && (
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

              {updateProfileError && updateProfileError.response && (
                <h4 className={styles.form_errormsg}>
                  {updateProfileError?.response?.data?.error}
                </h4>
              )}

              <button className={styles.submit_btn}>SEND &nbsp; &nbsp;</button>
            </form>

            <button
              className={styles.forgot_password_btn}
              onClick={handleDisplayChangePasswordForm}
            >
              Change password
            </button>

            <Animated.div
              mountAnim={` 
                0% {opacity: 0}
                100% {opacity: 1}
            `}
              show={displayChangePassword}
              time={0.15}
            >
              <form
                className={styles.form}
                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                  handleResetPasswordSubmit(e)
                }
                style={{ padding: '20px 0' }}
              >
                <label
                  className={`${styles.form_label} ${styles.required_input_label}`}
                  htmlFor='currentPassword'
                  style={{ marginTop: '0' }}
                >
                  Current password
                </label>
                <input
                  ref={changePasswordInput}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  maxLength={30}
                  className={styles.form_input}
                  type='password'
                  name='currentPassword'
                />
                <p className={styles.input_subtext}>
                  *Forgot password? Please log out and reset it in the login
                  page
                </p>

                <label
                  className={`${styles.form_label} ${styles.required_input_label}`}
                  htmlFor='newPassword'
                >
                  New password
                </label>
                <input
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  maxLength={30}
                  className={styles.form_input}
                  type='password'
                  name='newPassword'
                />
                <p className={styles.input_subtext}>
                  *Password must be at least 8 characters long
                </p>

                {passResetFormErrors.requiredFields && (
                  <h4 className={styles.form_errormsg}>
                    Please fill out all required fields!
                  </h4>
                )}
                {passResetFormErrors.passwordLength && (
                  <h4 className={styles.form_errormsg}>
                    Your password must have at least 8 characters!
                  </h4>
                )}
                {resetPassError && resetPassError.response && (
                  <h4 className={styles.form_errormsg}>
                    {resetPassError?.response?.data?.error}
                  </h4>
                )}

                {resetPassPending && (
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

                <Animated.h4
                  mountAnim={` 
                  0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                  }
                  100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                  }`}
                  show={passResetSuccess}
                  time={0.15}
                  className={styles.form_successmsg}
                >
                  User added successfully!
                </Animated.h4>

                <button className={styles.pass_submit_btn}>SUBMIT</button>
              </form>
            </Animated.div>
          </div>
        </div>
      )}
    </>
  );
};

export default CmsProfile;
