import Link from 'next/link';
import { useEffect } from 'react';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsDashboard.module.scss';

const Cms: React.FC = () => {
  const { loggedUser } = useLoggedUserContext();
  const { checkMemberCredentials } = useCheckAuthentication();

  useEffect(() => {
    checkMemberCredentials();
  }, []);

  return (
    <>
      <CmsLayout />
      {loggedUser && (
        <div className={styles.bgcolor}>
          <div className={styles.page_wrapper}>
            <h1 className={styles.cms_header}>Welcome, {loggedUser.name}!</h1>

            <div className={styles.route_box_grid}>
              <Link href={'/cms/profile'}>
                <a className={styles.route_box}>
                  <h2>Update your profile</h2>
                </a>
              </Link>

              {loggedUser.managementType && (
                <>
                  <Link href={'/cms/manage/members'}>
                    <a className={styles.route_box}>
                      <h2>Manage members</h2>
                    </a>
                  </Link>
                  <Link href={'/cms/applications'}>
                    <a className={styles.route_box}>
                      <h2>View applications</h2>
                    </a>
                  </Link>
                </>
              )}

              {(loggedUser.managementType === 'designer' ||
                loggedUser.managementType === 'general' ||
                loggedUser.managementType === 'owner') && (
                <Link href={'/cms/manage/wallpapers'}>
                  <a className={styles.route_box}>
                    <h2>Manage wallpapers</h2>
                  </a>
                </Link>
              )}

              {(loggedUser.managementType === 'general' ||
                loggedUser.managementType === 'owner') && (
                <>
                  <Link href={'/cms/contactsubmissions'}>
                    <a className={styles.route_box}>
                      <h2>View contact submissions</h2>
                    </a>
                  </Link>
                  <Link href={'/cms/manage/socialmedia'}>
                    <a className={styles.route_box}>
                      <h2>Update social media numbers</h2>
                    </a>
                  </Link>
                  <Link href={'/cms/manage/faq'}>
                    <a className={styles.route_box}>
                      <h2>Update F.A.Q</h2>
                    </a>
                  </Link>
                  <Link href={'/cms/manage/news'}>
                    <a className={styles.route_box}>
                      <h2>Update news</h2>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cms;
