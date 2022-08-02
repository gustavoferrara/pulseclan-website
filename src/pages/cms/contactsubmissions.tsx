import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsContactSubmissions.module.scss';
import { ContactType } from '@/types/types';

const CmsContactSubmissions: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkManagementCredentials, fetchSensitiveData } =
    useCheckAuthentication();
  const dataFetched = useRef(false);

  const [
    showDeleteContactSubmissionPopup,
    setShowDeleteContactSubmissionPopup,
  ] = useState(false);

  const [selectedContactSubmission, setSelectedContactSubmission] =
    useState<ContactType | null>(null);

  useEffect(() => {
    checkManagementCredentials('owner', 'general');
  }, []);

  const {
    AxiosGet: getContactSubmissions,
    data: contactSubmissionsData,
    error: getContactSubmissionsError,
    isPending: getContactSubmissionsPending,
  } = useAxios('http://localhost:3000/api/contact/manage');

  const {
    axiosDelete: deleteApplication,
    data: deleteContactSubmissionData,
    error: deleteContactSubmissionError,
    isPending: deleteContactSubmissionPending,
  } = useAxios('http://localhost:3000/api/contact/manage/:id');

  interface ContactDataResponse {
    contact: ContactType[];
  }

  useEffect(() => {
    if (loggedUser && fetchSensitiveData && !dataFetched.current) {
      getContactSubmissions();

      dataFetched.current = true;
    }
  }, [fetchSensitiveData, loggedUser]);

  const handleDeleteContactSubmissionClick = (
    contactSubmission: ContactType,
  ) => {
    setSelectedContactSubmission(contactSubmission);
    setShowDeleteContactSubmissionPopup(true);
  };

  const handleDeleteContactSubmission = () => {
    if (!deleteContactSubmissionPending) {
      deleteApplication(
        `http://localhost:3000/api/contact/manage/${
          selectedContactSubmission!._id
        }`,
      );
    }
  };

  useEffect(() => {
    if (deleteContactSubmissionData) router.reload();
  }, [deleteContactSubmissionData]);

  useEffect(() => {
    if (deleteContactSubmissionError) {
      setShowDeleteContactSubmissionPopup(false);
    }

    if (getContactSubmissionsError) {
      router.push('/cms');
    }
  }, [deleteContactSubmissionError, getContactSubmissionsError]);

  return (
    <>
      <CmsLayout />
      {loggedUser && (
        // Delete user popup
        <>
          <Animated.div
            mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
            show={showDeleteContactSubmissionPopup}
            time={0.2}
            className={styles.delete_contact_submission_popup_bg}
          >
            <div className={styles.delete_contact_submission_popup_container}>
              <div
                className={
                  styles.delete_contact_submission_popup_innercontainer
                }
              >
                <div
                  className={
                    styles.delete_contact_submission_popup_text_container
                  }
                >
                  <h3>WARNING</h3>
                  <p>
                    Are you sure you want to delete{' '}
                    <span>{selectedContactSubmission?.name}&apos;s</span>{' '}
                    contact submission? This action can&apos;t be undone.
                  </p>
                </div>
                <div
                  className={
                    styles.delete_contact_submission_popup_buttons_container
                  }
                >
                  <button
                    onClick={() => {
                      setShowDeleteContactSubmissionPopup(false);
                    }}
                    className={styles.delete_contact_submission_cancel}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDeleteContactSubmission}
                    className={styles.delete_contact_submission_confirm}
                  >
                    DELETE
                  </button>
                </div>
                {deleteContactSubmissionPending && (
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
              {getContactSubmissionsPending && (
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
              <div className={styles.header_container}>
                <Link href={'/cms'}>
                  <a className={styles.back_to_dashboard}>Back to dashboard</a>
                </Link>
                <h1 className={styles.cms_header}>View applications</h1>
              </div>

              {contactSubmissionsData ? (
                <>
                  {(
                    contactSubmissionsData as unknown as ContactDataResponse
                  ).contact.map(contact => (
                    <div
                      className={styles.application_container}
                      key={`${contact.name} ${contact.dateSubmitted}`}
                    >
                      <h2 className={styles.application_title}>
                        Contact submission
                      </h2>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>Name:</h4>
                        <p className={styles.application_body}>
                          {contact.name}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>Email:</h4>
                        <p className={styles.application_body}>
                          {contact.email}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Country:
                        </h4>
                        <p className={styles.application_body}>
                          {contact.country}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Company name:
                        </h4>
                        <p className={styles.application_body}>
                          {contact.companyName}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Message:
                        </h4>
                        <p className={styles.application_body}>
                          {contact.message}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Date submitted:
                        </h4>
                        <p className={styles.application_body}>
                          {contact.dateSubmitted.slice(0, 10)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteContactSubmissionClick(contact)
                        }
                        className={styles.delete_contact_submission_btn}
                      >
                        DELETE SUBMISSION
                      </button>
                    </div>
                  ))}
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
        </>
      )}
    </>
  );
};

export default CmsContactSubmissions;
