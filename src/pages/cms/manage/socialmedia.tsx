import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsManageSocialMedia.module.scss';
import { SocialMediaNumbers } from '@/types/types';

const CmsManageSocialMedia: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkManagementCredentials, fetchSensitiveData } =
    useCheckAuthentication();
  const dataFetched = useRef(false);

  const [youtube, setYoutube] = useState<string | number>('');
  const [instagram, setInstagram] = useState<string | number>('');
  const [twitch, setTwitch] = useState<string | number>('');
  const [tiktok, setTiktok] = useState<string | number>('');
  const [twitter, setTwitter] = useState<string | number>('');

  const [updateProfileFormErrors, setUpdateProfileFormErrors] = useState({
    requiredFields: false,
    nanFields: false,
  });

  const {
    AxiosGet: getSocialMediaData,
    data: socialMediaData,
    error: socialMediaResponseError,
    isPending: socialMediaDataPending,
  } = useAxios('http://localhost:3000/api/socialmedia/');

  const {
    axiosPost: updateSocialMediaNumbers,
    data: socialNumbersResponse,
    error: socialNumbersError,
    isPending: socialNumbersResponsePending,
  } = useAxios('http://localhost:3000/api/socialmedia/manage');

  interface SocialMediaInitialData {
    numbers: SocialMediaNumbers;
  }

  // console.log(socialMediaData);
  useEffect(() => {
    checkManagementCredentials('owner', 'general');
  }, []);

  useEffect(() => {
    if (socialNumbersResponse) router.reload();
  }, [socialNumbersResponse]);

  useEffect(() => {
    if (loggedUser && fetchSensitiveData && !dataFetched.current) {
      getSocialMediaData();

      dataFetched.current = true;
    }
  }, [fetchSensitiveData, loggedUser]);

  useEffect(() => {
    if (socialMediaData) {
      (
        socialMediaData as unknown as SocialMediaInitialData
      ).numbers.socialMedia.forEach(socialMedia => {
        if (socialMedia.type === 'youtube') setYoutube(socialMedia.ammount);
        if (socialMedia.type === 'instagram') setInstagram(socialMedia.ammount);
        if (socialMedia.type === 'tiktok') setTiktok(socialMedia.ammount);
        if (socialMedia.type === 'twitter') setTwitter(socialMedia.ammount);
        if (socialMedia.type === 'twitch') setTwitch(socialMedia.ammount);
      });
    }
  }, [socialMediaData]);

  const handleUpdateSocialMedia = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!socialMediaDataPending) {
      let requiredFields = false;
      let nanFields = false;

      if (
        youtube === '' ||
        instagram === '' ||
        tiktok === '' ||
        twitch === '' ||
        twitter === ''
      ) {
        requiredFields = true;
      }

      if (
        isNaN(Number(youtube)) ||
        isNaN(Number(instagram)) ||
        isNaN(Number(tiktok)) ||
        isNaN(Number(twitch)) ||
        isNaN(Number(twitter))
      ) {
        nanFields = true;
      }

      if (!requiredFields && !nanFields) {
        updateSocialMediaNumbers({
          data: {
            socialMedia: [
              {
                type: 'twitter',
                ammount: twitter,
              },
              {
                type: 'instagram',
                ammount: instagram,
              },
              {
                type: 'tiktok',
                ammount: tiktok,
              },
              {
                type: 'twitch',
                ammount: twitch,
              },
              {
                type: 'youtube',
                ammount: youtube,
              },
            ],
          },
        });
      }

      setUpdateProfileFormErrors({ requiredFields, nanFields });
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
            <h1 className={styles.cms_header}>Update social media numbers</h1>

            <form
              className={styles.form}
              onSubmit={e => handleUpdateSocialMedia(e)}
            >
              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='youtube'
              >
                Youtube
              </label>
              <input
                value={youtube}
                onChange={e => setYoutube(e.target.value)}
                maxLength={8}
                className={styles.form_input}
                type='text'
                name='youtube'
              />

              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='instagram'
              >
                Instagram
              </label>
              <input
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                maxLength={8}
                className={styles.form_input}
                type='text'
                name='instagram'
              />

              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='twitch'
              >
                Twitch
              </label>
              <input
                value={twitch}
                onChange={e => setTwitch(e.target.value)}
                maxLength={8}
                className={styles.form_input}
                type='text'
                name='twitch'
              />

              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='tiktok'
              >
                Tiktok
              </label>
              <input
                value={tiktok}
                onChange={e => setTiktok(e.target.value)}
                maxLength={8}
                className={styles.form_input}
                type='text'
                name='tiktok'
              />

              <label
                className={`${styles.form_label} ${styles.required_input_label}`}
                htmlFor='twitter'
              >
                Twitter
              </label>
              <input
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
                maxLength={8}
                className={styles.form_input}
                type='text'
                name='twitter'
              />

              <Animated.h4
                mountAnim={` 
                0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                }
                100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }`}
                show={updateProfileFormErrors.requiredFields}
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
                show={updateProfileFormErrors.nanFields}
                time={0.15}
                className={styles.form_errormsg}
              >
                All fields must contain numbers only!
              </Animated.h4>

              {(socialMediaDataPending || socialNumbersResponsePending) && (
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
                show={
                  socialMediaResponseError && socialMediaResponseError.response
                }
                time={0.15}
                className={styles.form_errormsg}
              >
                {socialMediaResponseError?.response?.data?.error}
              </Animated.h4>

              <button className={styles.submit_btn}>SEND &nbsp; &nbsp;</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CmsManageSocialMedia;
