import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '@/styles/Footer.module.scss';

const Footer: React.FC = () => {
  const router = useRouter();

  const [showFooter, setShowFooter] = useState(true);

  const today = new Date();

  useEffect(() => {
    if (router.pathname.includes('cms')) {
      setShowFooter(false);
    }
  }, []);

  return (
    <>
      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footer_copyright_section}>
            <img
              src='/pulselogo.svg'
              alt='Pulse logo'
              className={styles.pulse_logo}
            />
            <p className={styles.copyright_text}>
              Copyright &copy; {today.getFullYear()} Pulse Clan. <br />
              All rights reserved.
            </p>
          </div>
          <div className={styles.footer_links_section}>
            <div className={styles.footer_links_container}>
              <h5 className={styles.footer_links_title}>About</h5>
              <a className={styles.footer_link}>About Pulse Clan</a>
              <a className={styles.footer_link}>Meet the team</a>
              <a className={styles.footer_link}>Partners & sponsors</a>
              <a className={styles.footer_link}>Applications</a>
            </div>
            <div className={styles.footer_links_container}>
              <h5 className={styles.footer_links_title}>Contact</h5>
              <a className={styles.footer_link}>Support Pulse Clan</a>
              <a className={styles.footer_link}>Frequently asked questions</a>
              <a className={styles.footer_link}>Apparel</a>
              <Link href={'/contact'}>
                <a className={styles.footer_link}>Contact us</a>
              </Link>
            </div>
            <div className={styles.footer_links_container}>
              <h5 className={styles.footer_links_title}>Creative studio</h5>
              <a className={styles.footer_link}>About Pulse Studios</a>
              <a className={styles.footer_link}>Meet the creative team</a>
              <a className={styles.footer_link}>Branding resources</a>
              <a className={styles.footer_link}>Wallpapers</a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
