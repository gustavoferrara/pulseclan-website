import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsManageFaq.module.scss';
import { FaqType } from '@/types/types';

const CmsManageFaq: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkManagementCredentials } = useCheckAuthentication();
  const dataFetched = useRef(false);

  useEffect(() => {
    checkManagementCredentials('owner', 'general');
  }, []);

  //* New wallpaper form

  const [showAddNewFaqForm, setShowAddNewFaqForm] = useState(false);

  const [newFaqTitle, setNewFaqTitle] = useState('');
  const [newFaqBody, setNewFaqBody] = useState('');

  const newFaqFormScrollElem = useRef<HTMLAnchorElement>(null);

  const [newFaqFormErrors, setNewFaqFormErrors] = useState({
    requiredFields: false,
  });

  //* Modify wallpaper form

  const [showModifyFaqForm, setShowModifyFaqForm] = useState(false);

  const [selectedFaqTitle, setSelectedFaqTitle] = useState('');
  const [selectedFaqBody, setSelectedFaqBody] = useState('');
  const [selectedFaqOrder, setSelectedFaqOrder] = useState<string | number>('');
  const [selectedFaqId, setSelectedFaqId] = useState('');

  const [showDeleteFaqPopup, setShowDeleteFaqPopup] = useState(false);

  const manageFaqFormScrollElem = useRef<HTMLHeadingElement>(null);

  const [manageFaqFormErrors, setManageFaqFormErrors] = useState({
    requiredFields: false,
  });

  const {
    AxiosGet: getFaqInfo,
    data: faqData,
    error: getFaqsError,
    isPending: getFaqsPending,
  } = useAxios('http://localhost:3000/api/faq/');

  useEffect(() => {
    if (loggedUser && !dataFetched.current) {
      getFaqInfo();

      dataFetched.current = true;
    }
  }, [loggedUser]);

  interface FaqsData {
    faqs: FaqType[];
  }

  const {
    axiosPost: newFaqPost,
    data: newFaqData,
    error: newFaqError,
    isPending: newFaqPending,
  } = useAxios('http://localhost:3000/api/faq/');

  const {
    axiosPost: manageFaqPost,
    data: manageFaqData,
    error: manageFaqError,
    isPending: manageFaqPending,
  } = useAxios('http://localhost:3000/api/faq/manage');

  const {
    axiosDelete: deleteFaq,
    data: deleteFaqData,
    error: deleteFaqError,
    isPending: deleteFaqPending,
  } = useAxios('http://localhost:3000/api/faq/manage/:id');

  const handleDeleteFaq = () => {
    if (!deleteFaqPending) {
      deleteFaq(`http://localhost:3000/api/faq/manage/${selectedFaqId}`);
    }
  };

  useEffect(() => {
    if (newFaqData || manageFaqData || deleteFaqData || getFaqsError) {
      router.reload();
    }
  }, [newFaqData, manageFaqData, deleteFaqData, getFaqsError]);

  useEffect(() => {
    if (deleteFaqError) setShowDeleteFaqPopup(false);
  }, [deleteFaqError]);

  //*
  const handleNewFaqSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newFaqPending) {
      let requiredFields = false;

      if (newFaqTitle === '' || newFaqBody === '') {
        requiredFields = true;
      }

      if (!requiredFields) {
        newFaqPost({
          data: {
            title: newFaqTitle,
            body: newFaqBody,
          },
        });
      }

      setNewFaqFormErrors({ requiredFields });
    }
  };

  const handleFaqClick = (faq: FaqType) => {
    setSelectedFaqTitle(faq.title);
    setSelectedFaqBody(faq.body);
    setSelectedFaqOrder(faq.order);
    setSelectedFaqId(faq._id);

    if (showModifyFaqForm) {
      manageFaqFormScrollElem.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      setShowModifyFaqForm(true);

      setTimeout(() => {
        manageFaqFormScrollElem.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 150);
    }
  };

  const handleManageFaqSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!manageFaqPending) {
      let requiredFields = false;

      if (
        selectedFaqTitle === '' ||
        selectedFaqBody === '' ||
        selectedFaqOrder === ''
      ) {
        requiredFields = true;
      }

      if (!requiredFields) {
        manageFaqPost({
          data: {
            _id: selectedFaqId,
            title: selectedFaqTitle,
            body: selectedFaqBody,
            order: selectedFaqOrder,
          },
        });
      }

      setManageFaqFormErrors({ requiredFields });
    }
  };

  const handleDeleteBtnClick = () => {
    setShowDeleteFaqPopup(true);
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
            show={showDeleteFaqPopup}
            time={0.2}
            className={styles.delete_faq_popup_bg}
          >
            <div className={styles.delete_faq_popup_container}>
              <div className={styles.delete_faq_popup_innercontainer}>
                <div className={styles.delete_faq_popup_text_container}>
                  <h3>WARNING</h3>
                  <p>
                    Are you sure you want to delete this faq item? This action
                    can&apos;t be undone.
                  </p>
                </div>
                <div className={styles.delete_faq_popup_buttons_container}>
                  <button
                    onClick={() => setShowDeleteFaqPopup(false)}
                    className={styles.delete_faq_cancel}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDeleteFaq}
                    className={styles.delete_faq_confirm}
                  >
                    DELETE
                  </button>
                </div>
                {deleteFaqPending && (
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
              {(showAddNewFaqForm || showModifyFaqForm) && (
                <div className={styles.header_container}>
                  <Link href={'/cms'}>
                    <a
                      ref={newFaqFormScrollElem}
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
                show={showAddNewFaqForm}
                time={0.15}
              >
                <form
                  className={styles.form}
                  onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    handleNewFaqSubmit(e)
                  }
                >
                  <h2 className={styles.cms_header}>Add new faq</h2>
                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='title'
                  >
                    Title
                  </label>
                  <input
                    value={newFaqTitle}
                    onChange={e => setNewFaqTitle(e.target.value)}
                    maxLength={50}
                    className={styles.form_input}
                    type='text'
                    name='title'
                  />

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='body'
                  >
                    Body
                  </label>
                  <input
                    value={newFaqBody}
                    onChange={e => setNewFaqBody(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='body'
                  />

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={newFaqFormErrors.requiredFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    Please fill out all required fields!
                  </Animated.h4>

                  {newFaqPending && (
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
                    show={newFaqError && newFaqError.response}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    {newFaqError?.response?.data?.error}
                  </Animated.h4>

                  <button className={styles.submit_btn}>
                    SEND &nbsp; &nbsp;
                  </button>
                </form>
              </Animated.div>

              {/* separator */}
              {showModifyFaqForm && showAddNewFaqForm && (
                <div style={{ margin: '40px 0' }}></div>
              )}

              {/* -MANAGE WALLPAPERS FORM  */}

              <Animated.div
                mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
                show={showModifyFaqForm}
                time={0.15}
              >
                <form
                  className={styles.form}
                  onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    handleManageFaqSubmit(e)
                  }
                >
                  <h2
                    ref={manageFaqFormScrollElem}
                    className={styles.cms_header}
                  >
                    Manage faq
                  </h2>
                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='title'
                  >
                    Title
                  </label>
                  <input
                    value={selectedFaqTitle}
                    onChange={e => setSelectedFaqTitle(e.target.value)}
                    maxLength={50}
                    className={styles.form_input}
                    type='text'
                    name='title'
                  />

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='body'
                  >
                    Body
                  </label>
                  <textarea
                    value={selectedFaqBody}
                    onChange={e => setSelectedFaqBody(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    name='body'
                  />

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='body'
                  >
                    Order
                  </label>
                  <input
                    value={selectedFaqOrder}
                    onChange={e => setSelectedFaqOrder(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='body'
                  />

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={manageFaqFormErrors.requiredFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    Please fill out all required fields!
                  </Animated.h4>

                  {manageFaqPending && (
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
                    show={manageFaqError && manageFaqError.response}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    {manageFaqError?.response?.data?.error}
                  </Animated.h4>

                  <button className={styles.submit_btn}>
                    SEND &nbsp; &nbsp;
                  </button>

                  <button
                    onClick={handleDeleteBtnClick}
                    type='button'
                    className={styles.delete_faq_btn}
                  >
                    DELETE FAQ
                  </button>
                </form>
              </Animated.div>

              {/* ------ Faqs ------ */}

              <div className={styles.roster_wrapper}>
                <div className={styles.new_wallpaper_btn_container}>
                  {!showAddNewFaqForm && !showModifyFaqForm && (
                    <Link href={'/cms'}>
                      <a
                        ref={newFaqFormScrollElem}
                        className={styles.back_to_dashboard_wallpaper}
                      >
                        Back to dashboard
                      </a>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setShowAddNewFaqForm(true);

                      setTimeout(() => {
                        newFaqFormScrollElem.current!.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'nearest',
                        });
                      }, 150);
                    }}
                    className={styles.new_wallpaper_btn}
                  >
                    Add new faq
                  </button>
                </div>

                {faqData ? (
                  <>
                    <div className={styles.faq_wrapper}>
                      {(faqData as unknown as FaqsData).faqs.map(faq => (
                        <div
                          className={styles.faq_container}
                          key={faq._id}
                          onClick={() => handleFaqClick(faq)}
                          onKeyDown={() => handleFaqClick(faq)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <h3>{faq.title}</h3>
                          <p>{faq.body}</p>
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

export default CmsManageFaq;
