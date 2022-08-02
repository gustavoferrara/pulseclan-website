import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsManageApplications.module.scss';
import { ApplicationType } from '@/types/types';

const CmsApplications: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkManagementCredentials, fetchSensitiveData } =
    useCheckAuthentication();
  const dataFetched = useRef(false);

  const [showDeleteApplicationPopup, setShowDeleteApplicationPopup] =
    useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationType | null>(null);

  const [sendEmailToApplicant, setSendEmailToApplicant] = useState(false);

  const [previewRejectionEmail, setPreviewRejectionEmail] = useState(false);

  useEffect(() => {
    checkManagementCredentials(
      'designer',
      'owner',
      'editor',
      'general',
      'player',
    );
  }, []);

  const {
    AxiosGet: getApplications,
    data: applicationsData,
    error: getApplicationsError,
    isPending: getApplicationsPending,
  } = useAxios('http://localhost:3000/api/applications');

  const {
    axiosDelete: deleteApplication,
    data: deleteApplicationData,
    error: deleteApplicationError,
    isPending: deleteApplicationPending,
  } = useAxios('http://localhost:3000/api/applications/:id');

  interface ApplicationDataResponse {
    applications: ApplicationType[];
  }

  useEffect(() => {
    if (loggedUser && fetchSensitiveData && !dataFetched.current) {
      getApplications();

      dataFetched.current = true;
    }
  }, [fetchSensitiveData, loggedUser]);

  const handleDeleteApplicationClick = (application: ApplicationType) => {
    setSelectedApplication(application);
    setShowDeleteApplicationPopup(true);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDeleteApplication = () => {
    if (!deleteApplicationPending) {
      deleteApplication(
        `http://localhost:3000/api/applications/${
          selectedApplication!._id
        }/${sendEmailToApplicant}`,
      );
    }
  };

  useEffect(() => {
    if (deleteApplicationData) router.reload();
  }, [deleteApplicationData]);

  useEffect(() => {
    if (deleteApplicationError) {
      setShowDeleteApplicationPopup(false);
      setPreviewRejectionEmail(false);
    }

    if (getApplicationsError) {
      router.push('/cms');
    }
  }, [deleteApplicationError, getApplicationsError]);

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
            show={showDeleteApplicationPopup}
            time={0.2}
            className={styles.delete_application_popup_bg}
          >
            <div className={styles.delete_application_popup_container}>
              <div className={styles.delete_application_popup_innercontainer}>
                <div className={styles.delete_application_popup_text_container}>
                  <h3>WARNING</h3>
                  <p>
                    Are you sure you want to delete{' '}
                    <span>{selectedApplication?.username}&apos;s</span>{' '}
                    application? This action can&apos;t be undone.
                  </p>
                  <input
                    type='checkbox'
                    checked={sendEmailToApplicant}
                    onChange={() => setSendEmailToApplicant(state => !state)}
                    name='sendEmail'
                  />
                  <label className={styles.checkbox_label} htmlFor='sendEmail'>
                    Send rejection email to applicant.{' '}
                    <button onClick={() => setPreviewRejectionEmail(true)}>
                      Preview rejection email
                    </button>
                  </label>
                  <Animated.p
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={previewRejectionEmail}
                    time={0.15}
                    className={styles.rejection_email_preview}
                  >
                    Hello {selectedApplication?.username}, we&apos;re sorry to
                    inform you that your {selectedApplication?.applicationType}{' '}
                    application has been rejected. Thank you for applying.
                  </Animated.p>
                </div>
                <div
                  className={styles.delete_application_popup_buttons_container}
                >
                  <button
                    onClick={() => {
                      setShowDeleteApplicationPopup(false);
                      setPreviewRejectionEmail(false);
                      setSendEmailToApplicant(false);
                    }}
                    className={styles.delete_application_cancel}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDeleteApplication}
                    className={styles.delete_application_confirm}
                  >
                    DELETE
                  </button>
                </div>
                {deleteApplicationPending && (
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
              {getApplicationsPending && (
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

              {applicationsData ? (
                <>
                  {(
                    applicationsData as unknown as ApplicationDataResponse
                  ).applications.map(application => (
                    <div
                      className={styles.application_container}
                      key={`${application.username} ${application.dateSubmitted}`}
                    >
                      <h2 className={styles.application_title}>
                        {capitalizeFirstLetter(application.applicationType)}{' '}
                        application
                      </h2>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Username:
                        </h4>
                        <p className={styles.application_body}>
                          {application.username}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>Age:</h4>
                        <p className={styles.application_body}>
                          {application.age}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Discord ID:
                        </h4>
                        <p className={styles.application_body}>
                          {application.discordId}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Portfolio:
                        </h4>
                        <p className={styles.application_body}>
                          {application.portfolio}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          About yourself:
                        </h4>
                        <p className={styles.application_body}>
                          {application.aboutYourself}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Previous experience:
                        </h4>
                        <p className={styles.application_body}>
                          {application.previousExperience}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Remarks:
                        </h4>
                        <p className={styles.application_body}>
                          {application.remarks}
                        </p>
                      </div>

                      <div className={styles.application_field_container}>
                        <h4 className={styles.application_subtitle}>
                          Date submitted:
                        </h4>
                        <p className={styles.application_body}>
                          {application.dateSubmitted.slice(0, 10)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteApplicationClick(application)
                        }
                        className={styles.delete_application_btn}
                      >
                        DELETE APPLICATION
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

export default CmsApplications;
