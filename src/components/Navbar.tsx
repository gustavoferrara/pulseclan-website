/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import gsap, { Power2 } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';

import useDropdown from '@/hooks/useDropdown';
import styles from '@/styles/Navbar.module.scss';

const Navbar: React.FC = () => {
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(true);

  const [navbarOffset, setNavbarOffset] = useState(0);
  const [mobileNavbar, setMobileNavbar] = useState<boolean | null>(false);

  const navbar = useRef<HTMLElement>(null);
  const prevScrollDistance = useRef(0);
  const observedElements = useRef(0);

  const studioDropdownLi = useRef<HTMLLIElement>(null);
  const studioDropdownActivator = useRef<HTMLSpanElement>(null);
  const studioDropdown = useRef<HTMLElement>(null);

  const aboutusDropdownLi = useRef<HTMLLIElement>(null);
  const aboutusDropdownActivator = useRef<HTMLSpanElement>(null);
  const aboutusDropdown = useRef<HTMLElement>(null);

  const mobileAboutUsDropdown = useRef<HTMLLIElement>(null);
  const mobileCreativeStudioDropdown = useRef<HTMLLIElement>(null);

  const hamburgerBtn = useRef<HTMLButtonElement>(null);
  const mobileNavContainer = useRef<HTMLDivElement>(null);

  useDropdown(
    studioDropdown,
    studioDropdownActivator,
    studioDropdownLi,
    'studio',
  );

  useDropdown(
    aboutusDropdown,
    aboutusDropdownActivator,
    aboutusDropdownLi,
    'aboutus',
  );

  useEffect(() => {
    if (router.pathname.includes('cms')) {
      setShowNavbar(false);
    }

    // const checkMobileNavbar = () => {
    //   if (window.innerWidth < 1000) setMobileNavbar(true);
    //   else setMobileNavbar(false);
    // };

    // checkMobileNavbar();

    // window.addEventListener('resize', checkMobileNavbar);

    // return () => {
    //   window.removeEventListener('resize', checkMobileNavbar);
    // };
  }, []);

  const handleHamburgerBtnClick = () => {
    // gsap.to(mobileNavContainer.current, {
    //   display: 'block',
    // });

    mobileNavContainer.current!.style.display = 'block';

    setTimeout(() => {
      mobileNavContainer.current!.style.opacity = '1';
    }, 10);
  };

  const handleMobileNavDropdown = (type: 'aboutUs' | 'creativeStudio') => {
    let dropdown: RefObject<HTMLLIElement>;

    if (type === 'aboutUs') dropdown = mobileAboutUsDropdown;
    else dropdown = mobileCreativeStudioDropdown;

    console.log(dropdown.current);

    const dropdownStyles = getComputedStyle(dropdown.current!);

    if (dropdownStyles.height === '0px') {
      dropdown.current!.style.display = 'block';

      gsap.to(dropdown.current, {
        height: 'auto',
        duration: 0.3,
        ease: Power2.easeOut,
      });
    } else {
      gsap.to(dropdown.current, {
        height: '0px',
        duration: 0.3,
        ease: Power2.easeOut,
      });

      setTimeout(() => {
        dropdown.current!.style.display = 'block';
      }, 300);
    }
  };

  //*
  return (
    <>
      {showNavbar && (
        <>
          {/* get rid of this conditional rendering and change it to media queries */}

          {true && (
            <div ref={mobileNavContainer} className={styles.mobile_nav_bg}>
              <nav className={styles.mobile_nav}>
                <ul className={styles.mobile_nav_ul}>
                  <li
                    className={`${styles.mobile_nav_li} ${styles.mobile_nav_li_dropdown}`}
                  >
                    ABOUT US
                  </li>

                  {/* ABOUT US DROPDOWN */}

                  <li
                    ref={mobileAboutUsDropdown}
                    onClick={() => {
                      handleMobileNavDropdown('aboutUs');
                      console.log('click');
                    }}
                    onKeyDown={() => {
                      handleMobileNavDropdown('aboutUs');
                      console.log('click');
                    }}
                    className={styles.mobile_nav_dropdown}
                  >
                    <ul>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>F.A.Q</a>
                        </Link>
                      </li>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>HISTORY</a>
                        </Link>
                      </li>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>MEET THE TEAM!</a>
                        </Link>
                      </li>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>OUR PARTNERS</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* CREATIVE STUDIO */}

                  <li
                    className={`${styles.mobile_nav_li} ${styles.mobile_nav_li_dropdown}`}
                  >
                    CREATIVE STUDIO
                  </li>

                  {/* CREATIVE STUDIO DROPDOWN */}

                  <li
                    ref={mobileCreativeStudioDropdown}
                    className={styles.mobile_nav_dropdown}
                  >
                    <ul>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>About Pulse Studios</a>
                        </Link>
                      </li>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>Meet the creative team</a>
                        </Link>
                      </li>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>Wallpapers</a>
                        </Link>
                      </li>
                      <li className={styles.mobile_nav_dropwdown_element}>
                        <Link href={'/'}>
                          <a>Branding resources</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className={styles.mobile_nav_li}>
                    <Link href={'/'}>
                      <a>
                        <span className={styles.mobile_nav_li}>
                          APPLICATIONS
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li className={styles.mobile_nav_li}>
                    <Link href={'/'}>
                      <a>
                        <span className={styles.mobile_nav_li}>CONTACT US</span>
                      </a>
                    </Link>
                  </li>
                  <li className={styles.mobile_nav_li}>
                    <Link href={'/'}>
                      <a>
                        <span className={styles.mobile_nav_li}>SHOP</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}

          <div className={styles.nav_bg}></div>
          <nav
            ref={navbar}
            className={styles.navbar}
            // style={{
            //   top: mobileNavbar ? `${navbarOffset}px` : '0',
            // }}
          >
            <div className={styles.mobile_nav_items}>
              <a className={styles.pulse_logo}>
                <Image
                  src='/navbar/pulsenavbarlogo.svg'
                  alt='Pulse logo'
                  layout='fill'
                  objectFit='contain'
                />
              </a>
              <button
                ref={hamburgerBtn}
                onClick={() => handleHamburgerBtnClick()}
                className={styles.mobilemenu}
              >
                <Image
                  src='/navbar/mobilemenu.svg'
                  alt='Mobile menu'
                  layout='fill'
                  objectFit='contain'
                />
              </button>
            </div>

            {/* asdasd                      */}

            <div className={styles.desktop_nav_items}>
              <ul className={styles.routes_container}>
                <li className={styles.route}>
                  <Link href={'/'}>
                    <a className={styles.pulse_logo_container}>
                      <img
                        src='/navbar/pulsenavbarlogo.svg'
                        alt='Pulse logo'
                        className={styles.pulse_logoimg}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/'}>
                    <a>
                      <span className={styles.route} id={styles.home_li}>
                        Home
                      </span>
                    </a>
                  </Link>
                </li>
                <li ref={aboutusDropdownLi} className={styles.route}>
                  <span
                    className={styles.dropdown_activation}
                    ref={aboutusDropdownActivator}
                  ></span>
                  About us
                </li>
                <li ref={studioDropdownLi} className={styles.route}>
                  <span
                    className={styles.dropdown_activation}
                    ref={studioDropdownActivator}
                  ></span>
                  Creative Studio
                </li>
                <li>
                  <Link href={'/applications'}>
                    <a>
                      <span className={styles.route}>Applications</span>
                    </a>
                  </Link>
                </li>
              </ul>

              {/* Rightside menu */}

              <ul className={styles.contact_shop_container}>
                <li>
                  <Link href={'/contact'}>
                    <a>
                      <span className={styles.contact_li}>Contact us!</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/shop'}>
                    <a>
                      <span className={styles.contact_li} id={styles.shop_li}>
                        &nbsp; &nbsp; &nbsp; &nbsp; SHOP NOW
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Studio Dropdown menu */}

          <nav ref={studioDropdown} className={styles.dropdown_wrapper}>
            <ul className={styles.dropdown_container}>
              <Link href={'/studios'}>
                <a>
                  <li className={styles.dropdown_element} id={styles.studios}>
                    <h2 className={styles.dropdown_title}>
                      About Pulse Studios
                    </h2>
                    <p className={styles.dropdown_paragraph}>
                      Take a dive into the world of Pulse Clan&apos;s creative
                      divison; learn their creative process.
                    </p>
                    <img
                      src='/arrow.svg'
                      alt=''
                      className={styles.dropdown_arrow}
                      aria-hidden
                    />
                  </li>
                </a>
              </Link>
              <Link href={'/creativeroster'}>
                <a>
                  <li
                    className={styles.dropdown_element}
                    id={styles.creativeroster}
                  >
                    <h2 className={styles.dropdown_title}>
                      Meet the Creative Team!
                    </h2>
                    <p className={styles.dropdown_paragraph}>
                      Meet the minds behind our creative division Pulse Studios.
                    </p>
                    <img
                      src='/arrow.svg'
                      alt=''
                      className={styles.dropdown_arrow}
                      aria-hidden
                    />
                  </li>
                </a>
              </Link>
              <li>
                <Link href={'/wallpapers'}>
                  <a>
                    <div
                      className={styles.dropdown_element}
                      id={styles.wallpapers}
                    >
                      <h2 className={styles.dropdown_title}>
                        Desktop and Mobile Wallpapers
                      </h2>
                      <p className={styles.dropdown_paragraph}>
                        Customize your device just as Pulse!
                      </p>
                      <img
                        src='/arrow.svg'
                        alt=''
                        className={styles.dropdown_arrow}
                        aria-hidden
                      />
                    </div>
                  </a>
                </Link>
              </li>

              <li
                className={styles.dropdown_element}
                id={styles.branding_resources}
              >
                <h2 className={styles.dropdown_title}>Branding Resources</h2>
                <p className={styles.dropdown_paragraph}>
                  Interested in our branding guidelines? This is the perfect
                  place for you!
                </p>
                <img
                  src='/arrow.svg'
                  alt=''
                  className={styles.dropdown_arrow}
                  aria-hidden
                />
              </li>
            </ul>
          </nav>

          {/* About us dropdown menu */}

          <nav ref={aboutusDropdown} className={styles.dropdown_wrapper}>
            <ul className={styles.dropdown_container}>
              <Link href={'/faq'}>
                <a>
                  <li className={styles.dropdown_element} id={styles.faq}>
                    <h2 className={styles.dropdown_title}>F.A.Q</h2>
                    <p className={styles.dropdown_paragraph}>
                      You asked, we answered! Here are our most frequently asked
                      questions!
                    </p>
                    <img
                      src='/arrow.svg'
                      alt=''
                      className={styles.dropdown_arrow}
                      aria-hidden
                    />
                  </li>
                </a>
              </Link>
              <Link href={'/ourhistory'}>
                <a>
                  <li className={styles.dropdown_element} id={styles.history}>
                    <h2 className={styles.dropdown_title}>History</h2>
                    <p className={styles.dropdown_paragraph}>
                      Have you ever asked yourself where did we start from?
                      Check out our journey&apos;s timeline!
                    </p>
                    <img
                      src='/arrow.svg'
                      alt=''
                      className={styles.dropdown_arrow}
                      aria-hidden
                    />
                  </li>
                </a>
              </Link>
              <li>
                <Link href={'/roster'}>
                  <a>
                    <div className={styles.dropdown_element} id={styles.roster}>
                      <h2 className={styles.dropdown_title}>Meet the team!</h2>
                      <p className={styles.dropdown_paragraph}>
                        Meet the minds behind the creation, development and
                        up-keep of Pulse Clan.
                      </p>
                      <img
                        src='/arrow.svg'
                        alt=''
                        className={styles.dropdown_arrow}
                        aria-hidden
                      />
                    </div>
                  </a>
                </Link>
              </li>

              <li className={styles.dropdown_element} id={styles.sponsors}>
                <Link href={'/sponsors'}>
                  <a>
                    <h2 className={styles.dropdown_title}>
                      Partners & Sponsors
                    </h2>
                    <p className={styles.dropdown_paragraph}>
                      Learn about the companies who keep Pulse Clan alive and
                      striving for greatness!
                    </p>
                    <img
                      src='/arrow.svg'
                      alt=''
                      className={styles.dropdown_arrow}
                      aria-hidden
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
