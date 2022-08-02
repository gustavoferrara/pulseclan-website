import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsManageWallpapers.module.scss';
import { WallpaperType } from '@/types/types';

const CmsManageWallpapers: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkManagementCredentials, fetchSensitiveData } =
    useCheckAuthentication();
  const dataFetched = useRef(false);

  useEffect(() => {
    checkManagementCredentials('designer', 'owner', 'general');
  }, []);

  //* New wallpaper form

  const [showAddNewWallpaperForm, setShowAddNewWallpaperForm] = useState(false);

  const [newWallpaperCompressedUrl, setNewWallpaperCompressedUrl] =
    useState('');
  const [newWallpaperHighQualityUrl, setNewWallpaperHighQualityUrl] =
    useState('');
  const [newWallpaperAuthor, setNewWallpaperAuthor] = useState('');
  const [newWallpaperSocialMediaHandle, setNewWallpaperSocialMediaHandle] =
    useState('');
  const [newWallpaperSocialMediaLink, setNewWallpaperSocialMediaLink] =
    useState('');

  const newWallpaperFormScrollElem = useRef<HTMLAnchorElement>(null);

  const [newWallpaperFormErrors, setNewWallpaperFormErrors] = useState({
    requiredFields: false,
  });

  //* Modify wallpaper form

  const [showModifyWallpaperForm, setShowModifyUserForm] = useState(false);

  const [selectedWallpaperCompressedUrl, setSelectedWallpaperCompressedUrl] =
    useState('');
  const [selectedWallpaperHighQualityUrl, setSelectedWallpaperHighQualityUrl] =
    useState('');
  const [selectedWallpaperAuthor, setSelectedWallpaperAuthor] = useState('');
  const [
    selectedWallpaperSocialMediaHandle,
    setSelectedWallpaperSocialMediaHandle,
  ] = useState('');
  const [
    selectedWallpaperSocialMediaLink,
    setSelectedWallpaperSocialMediaLink,
  ] = useState('');
  const [selectedWallpaperOrder, setSelectedWallpaperOrder] = useState<
    string | number
  >('');
  const [selectedWallpaperId, setSelectedWallpaperId] = useState('');

  const [showDeleteWallpaperPopup, setShowDeleteWallpaperPopup] =
    useState(false);

  const manageWallpaperFormScrollElem = useRef<HTMLHeadingElement>(null);

  const [manageWallpaperFormErrors, setManageWallpaperFormErrors] = useState({
    requiredFields: false,
  });

  const {
    AxiosGet: getWallpapersInfo,
    data: wallpaperData,
    error: getWallpapersError,
    isPending: getWallpapersPending,
  } = useAxios('http://localhost:3000/api/wallpapers/manage');

  useEffect(() => {
    if (loggedUser && fetchSensitiveData && !dataFetched.current) {
      getWallpapersInfo();

      dataFetched.current = true;
    }
  }, [fetchSensitiveData, loggedUser]);

  interface WallpapersData {
    wallpapers: WallpaperType[];
  }

  const {
    axiosPost: newWallpaperAxiosPost,
    data: newWallpaperData,
    error: newWallpaperError,
    isPending: newWallpaperPending,
  } = useAxios('http://localhost:3000/api/wallpapers/');

  const {
    axiosPost: manageWallpaperAxiosPost,
    data: manageUserData,
    error: manageUserError,
    isPending: manageWallpaperPending,
  } = useAxios('http://localhost:3000/api/wallpapers/manage');

  const {
    axiosDelete: deleteWallpaperAxiosDelete,
    data: deleteWallpaperData,
    error: deleteWallpaperError,
    isPending: deleteWallpaperPending,
  } = useAxios('http://localhost:3000/api/wallpapers/manage/:id');

  const handleDeleteWallpaper = () => {
    if (!deleteWallpaperPending && fetchSensitiveData) {
      deleteWallpaperAxiosDelete(
        `http://localhost:3000/api/wallpapers/manage/${selectedWallpaperId}`,
      );
    }
  };

  useEffect(() => {
    if (newWallpaperData || manageUserData || deleteWallpaperData) {
      router.reload();
    }
  }, [newWallpaperData, manageUserData, deleteWallpaperData]);

  useEffect(() => {
    if (deleteWallpaperError) setShowDeleteWallpaperPopup(false);
  }, [deleteWallpaperError]);

  //*
  const handleNewWallpaperSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newWallpaperPending) {
      let requiredFields = false;

      if (
        newWallpaperCompressedUrl === '' ||
        newWallpaperHighQualityUrl === '' ||
        newWallpaperAuthor === '' ||
        newWallpaperSocialMediaHandle === '' ||
        newWallpaperSocialMediaLink === ''
      ) {
        requiredFields = true;
      }

      if (!requiredFields) {
        newWallpaperAxiosPost({
          data: {
            compressedImgUrl: newWallpaperCompressedUrl,
            fullImgUrl: newWallpaperHighQualityUrl,
            author: newWallpaperAuthor,
            socialMediaHandle: newWallpaperSocialMediaHandle,
            socialMediaLink: newWallpaperSocialMediaLink,
          },
        });
      }

      setNewWallpaperFormErrors({ requiredFields });
    }
  };

  const handleWallpaperClick = (wallpaper: WallpaperType) => {
    setSelectedWallpaperCompressedUrl(wallpaper.compressedImgUrl);
    setSelectedWallpaperHighQualityUrl(wallpaper.fullImgUrl);
    setSelectedWallpaperAuthor(wallpaper.author);
    setSelectedWallpaperSocialMediaHandle(wallpaper.socialMediaHandle);
    setSelectedWallpaperSocialMediaLink(wallpaper.socialMediaLink);
    setSelectedWallpaperOrder(wallpaper.order);
    setSelectedWallpaperId(wallpaper._id);

    if (showModifyWallpaperForm) {
      manageWallpaperFormScrollElem.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      setShowModifyUserForm(true);

      setTimeout(() => {
        manageWallpaperFormScrollElem.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 150);
    }
  };

  const handleManageWallpaperSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!manageWallpaperPending) {
      let requiredFields = false;

      if (
        selectedWallpaperCompressedUrl === '' ||
        selectedWallpaperHighQualityUrl === '' ||
        selectedWallpaperAuthor === '' ||
        selectedWallpaperSocialMediaHandle === '' ||
        selectedWallpaperSocialMediaLink === '' ||
        selectedWallpaperOrder === ''
      ) {
        requiredFields = true;
      }

      if (!requiredFields) {
        manageWallpaperAxiosPost({
          data: {
            _id: selectedWallpaperId,
            compressedImgUrl: selectedWallpaperCompressedUrl,
            fullImgUrl: selectedWallpaperHighQualityUrl,
            author: selectedWallpaperAuthor,
            socialMediaHandle: selectedWallpaperSocialMediaHandle,
            socialMediaLink: selectedWallpaperSocialMediaLink,
            order: selectedWallpaperOrder,
          },
        });
      }

      setManageWallpaperFormErrors({ requiredFields });
    }
  };

  const handleDeleteBtnClick = () => {
    setShowDeleteWallpaperPopup(true);
  };

  //! -----
  return (
    <>
      <CmsLayout />
      {loggedUser && (
        // Delete wallpaper popup
        <>
          <Animated.div
            mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
            show={showDeleteWallpaperPopup}
            time={0.2}
            className={styles.delete_wallpaper_popup_bg}
          >
            <div className={styles.delete_wallpaper_popup_container}>
              <div className={styles.delete_wallpaper_popup_innercontainer}>
                <div className={styles.delete_wallpaper_popup_text_container}>
                  <h3>WARNING</h3>
                  <p>
                    Are you sure you want to delete this wallpaper? This action
                    can&apos;t be undone.
                  </p>
                </div>
                <div
                  className={styles.delete_wallpaper_popup_buttons_container}
                >
                  <button
                    onClick={() => setShowDeleteWallpaperPopup(false)}
                    className={styles.delete_wallpaper_cancel}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDeleteWallpaper}
                    className={styles.delete_wallpaper_confirm}
                  >
                    DELETE
                  </button>
                </div>
                {deleteWallpaperPending && (
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
              </div>
            </div>
          </Animated.div>

          <div className={styles.bgcolor}>
            <div className={styles.page_wrapper}>
              {(showAddNewWallpaperForm || showModifyWallpaperForm) && (
                <div className={styles.header_container}>
                  <Link href={'/cms'}>
                    <a
                      ref={newWallpaperFormScrollElem}
                      className={styles.back_to_dashboard}
                    >
                      Back to dashboard
                    </a>
                  </Link>
                </div>
              )}

              <Animated.div
                mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
                show={showAddNewWallpaperForm}
                time={0.15}
              >
                <form
                  className={styles.form}
                  onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    handleNewWallpaperSubmit(e)
                  }
                >
                  <h2 className={styles.cms_header}>Add new wallpaper</h2>
                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='compressedUrl'
                  >
                    Compressed image url
                  </label>
                  <input
                    value={newWallpaperCompressedUrl}
                    onChange={e => setNewWallpaperCompressedUrl(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='compressedUrl'
                  />
                  <p className={styles.input_subtext}>
                    Run the wallpaper through{' '}
                    <a
                      href='https://tinypng.com'
                      target={'_blank'}
                      rel='noreferrer'
                    >
                      tinypng.com
                    </a>{' '}
                    or{' '}
                    <a
                      href='https://compressjpeg.com'
                      target={'_blank'}
                      rel='noreferrer'
                    >
                      compressjpeg.com
                    </a>{' '}
                    and paste the link here. This version will be used as a
                    preview on the website.
                  </p>

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='highQualityUrl'
                  >
                    High quality image url
                  </label>
                  <input
                    value={newWallpaperHighQualityUrl}
                    onChange={e =>
                      setNewWallpaperHighQualityUrl(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='highQualityUrl'
                  />

                  <label className={styles.form_label} htmlFor='author'>
                    Author
                  </label>
                  <input
                    value={newWallpaperAuthor}
                    onChange={e => setNewWallpaperAuthor(e.target.value)}
                    maxLength={15}
                    className={styles.form_input}
                    type='text'
                    name='author'
                  />

                  <label
                    className={styles.form_label}
                    htmlFor='socialMediaHandle'
                  >
                    Social media handle
                  </label>
                  <input
                    value={newWallpaperSocialMediaHandle}
                    onChange={e =>
                      setNewWallpaperSocialMediaHandle(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='socialMediaHandle'
                    placeholder='@author_on_twitter'
                  />

                  <label
                    className={styles.form_label}
                    htmlFor='socialMediaLink'
                  >
                    Social media link
                  </label>
                  <input
                    value={newWallpaperSocialMediaLink}
                    onChange={e =>
                      setNewWallpaperSocialMediaLink(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='socialMediaLink'
                    placeholder='https://twitter.com/author'
                  />

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={newWallpaperFormErrors.requiredFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    Please fill out all required fields!
                  </Animated.h4>

                  {newWallpaperPending && (
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
                    show={newWallpaperError && newWallpaperError.response}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    {newWallpaperError?.response?.data?.error}
                  </Animated.h4>

                  <button className={styles.submit_btn}>
                    SEND &nbsp; &nbsp;
                  </button>
                </form>
              </Animated.div>

              {/* separator */}
              {showModifyWallpaperForm && showAddNewWallpaperForm && (
                <div style={{ margin: '40px 0' }}></div>
              )}

              {/* -MANAGE WALLPAPERS FORM  */}

              <Animated.div
                mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
                show={showModifyWallpaperForm}
                time={0.15}
              >
                <form
                  className={styles.form}
                  onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    handleManageWallpaperSubmit(e)
                  }
                >
                  <h2
                    ref={manageWallpaperFormScrollElem}
                    className={styles.cms_header}
                  >
                    Manage Wallpaper
                  </h2>
                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='compressedUrl'
                  >
                    Compressed image url
                  </label>
                  <input
                    value={selectedWallpaperCompressedUrl}
                    onChange={e =>
                      setSelectedWallpaperCompressedUrl(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='compressedUrl'
                  />
                  <p className={styles.input_subtext}>
                    Run the wallpaper through{' '}
                    <a
                      href='https://tinypng.com'
                      target={'_blank'}
                      rel='noreferrer'
                    >
                      tinypng.com
                    </a>{' '}
                    or{' '}
                    <a
                      href='https://compressjpeg.com'
                      target={'_blank'}
                      rel='noreferrer'
                    >
                      compressjpeg.com
                    </a>{' '}
                    and paste the link here. This version will be used as a
                    preview on the website.
                  </p>

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='highQualityUrl'
                  >
                    High quality image url
                  </label>
                  <input
                    value={selectedWallpaperHighQualityUrl}
                    onChange={e =>
                      setSelectedWallpaperHighQualityUrl(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='highQualityUrl'
                  />

                  <label className={styles.form_label} htmlFor='author'>
                    Author
                  </label>
                  <input
                    value={selectedWallpaperAuthor}
                    onChange={e => setSelectedWallpaperAuthor(e.target.value)}
                    maxLength={15}
                    className={styles.form_input}
                    type='text'
                    name='author'
                  />

                  <label
                    className={styles.form_label}
                    htmlFor='socialMediaHandle'
                  >
                    Social media handle
                  </label>
                  <input
                    value={selectedWallpaperSocialMediaHandle}
                    onChange={e =>
                      setSelectedWallpaperSocialMediaHandle(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='socialMediaHandle'
                    placeholder='@author_on_twitter'
                  />

                  <label
                    className={styles.form_label}
                    htmlFor='socialMediaLink'
                  >
                    Social media link
                  </label>
                  <input
                    value={selectedWallpaperSocialMediaLink}
                    onChange={e =>
                      setSelectedWallpaperSocialMediaLink(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='socialMediaLink'
                    placeholder='https://twitter.com/author'
                  />

                  <label className={styles.form_label} htmlFor='wallpaperOrder'>
                    Wallpaper order
                  </label>
                  <input
                    value={selectedWallpaperOrder}
                    onChange={e => setSelectedWallpaperOrder(e.target.value)}
                    maxLength={3}
                    className={styles.form_input}
                    type='text'
                    name='wallpaperOrder'
                  />
                  <p className={styles.input_subtext}>
                    The order in which the wallpaper will be shown in
                  </p>

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={manageWallpaperFormErrors.requiredFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    Please fill out all required fields!
                  </Animated.h4>

                  {manageWallpaperPending && (
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
                    show={manageUserError && manageUserError.response}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    {manageUserError?.response?.data?.error}
                  </Animated.h4>

                  <button className={styles.submit_btn}>
                    SEND &nbsp; &nbsp;
                  </button>

                  <button
                    onClick={handleDeleteBtnClick}
                    type='button'
                    className={styles.delete_wallpaper_btn}
                  >
                    DELETE WALLPAPER
                  </button>
                </form>
              </Animated.div>

              {/* ------ Wallpapers ------ */}

              <div className={styles.roster_wrapper}>
                <div className={styles.new_wallpaper_btn_container}>
                  {!showAddNewWallpaperForm && !showModifyWallpaperForm && (
                    <Link href={'/cms'}>
                      <a
                        ref={newWallpaperFormScrollElem}
                        className={styles.back_to_dashboard_wallpaper}
                      >
                        Back to dashboard
                      </a>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setShowAddNewWallpaperForm(true);

                      setTimeout(() => {
                        newWallpaperFormScrollElem.current!.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'nearest',
                        });
                      }, 150);
                    }}
                    className={styles.new_wallpaper_btn}
                  >
                    Add new wallpaper
                  </button>
                </div>

                {/* -MANAGEMENT ROSTER */}

                {(loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                wallpaperData ? (
                  <>
                    <div className={styles.wallpaper_grid}>
                      {(
                        wallpaperData as unknown as WallpapersData
                      ).wallpapers.map(wallpaper => (
                        <div
                          className={styles.wallpaper_container}
                          key={wallpaper._id}
                          onClick={() => handleWallpaperClick(wallpaper)}
                          onKeyDown={() => handleWallpaperClick(wallpaper)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src={wallpaper.compressedImgUrl}
                            alt=''
                            className={styles.wallpaper_item}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CmsManageWallpapers;
