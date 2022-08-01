import 'chart.js/auto';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import Animated from 'react-mount-animation';
import VanillaTilt from 'vanilla-tilt';

import useHandleResize from '@/hooks/useHandleResize';
import styles from '@/styles/Home.module.scss';

const Home: React.FC = () => {
  const touchScreenDiv = useRef<HTMLDivElement>(null);
  const [isTouchScreen, setIsTouchScreen] = useState(true);
  const [chartCircumference, setChartCircumference] = useState(0);
  const [chartRotation, setchartRotation] = useState(0);
  const chartWrapper = useRef<HTMLDivElement>(null);
  const newsSection = useRef<HTMLElement>(null);

  const videoBtn = useRef<HTMLButtonElement>(null);

  const modalContainer = useRef<HTMLDivElement>(null);

  const iframeVideo = useRef<HTMLIFrameElement>(null);

  const [counter, setCounter] = useState('241.000');

  const { chartCutout } = useHandleResize(videoBtn);

  useEffect(() => {
    setIsTouchScreen(
      getComputedStyle(touchScreenDiv.current!).display === 'block',
    );

    VanillaTilt.init(videoBtn.current!);

    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.svg1a', {
      x: '30',
      y: '-30',
      duration: 2,
      repeat: -1,
      yoyo: true,
    });

    gsap.to('.svg1b', {
      x: '-30',
      y: '30',
      duration: 2,
      repeat: -1,
      yoyo: true,
    });

    gsap.fromTo(
      newsSection.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: newsSection.current,
          start: 'top center',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
    );

    const chartObserver = new IntersectionObserver(
      entries => {
        const [entry] = entries;

        if (entry.intersectionRatio >= 0.6) {
          setChartCircumference(360);
          setchartRotation(150);

          chartObserver.unobserve(chartWrapper.current!);
        }
      },
      {
        threshold: [0.6],
      },
    );

    chartObserver.observe(chartWrapper.current!);

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => trigger.kill(true, false));
    };
  }, []);

  return (
    <div className={styles.home_wrapper}>
      {/* Video modal */}

      <div
        className={styles.modal_container}
        ref={modalContainer}
        onClick={() => {
          iframeVideo.current!.setAttribute(
            'src',
            'https://www.youtube-nocookie.com/embed/7LQAknDHz0E',
          );

          modalContainer.current!.style.opacity = '0';
          setTimeout(() => {
            modalContainer.current!.style.display = 'none';
          }, 200);
        }}
        onKeyDown={() => {
          iframeVideo.current!.setAttribute(
            'src',
            'https://www.youtube-nocookie.com/embed/7LQAknDHz0E',
          );

          modalContainer.current!.style.opacity = '0';
          setTimeout(() => {
            modalContainer.current!.style.display = 'none';
          }, 200);
        }}
        role='button'
        tabIndex={0}
      >
        <button className={styles.modal_closebtn}>X</button>
        <iframe
          ref={iframeVideo}
          className={styles.modal_video}
          src='https://www.youtube-nocookie.com/embed/7LQAknDHz0E'
          title='Pulse Clan channel trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </div>

      {/* Background shapes */}

      <img
        aria-hidden
        src='/home/1/triangle.svg'
        alt=''
        className={styles.bg_triangleimg}
      />
      <div className={styles.hero_wrapper}>
        <svg
          width='2426'
          height='1164'
          viewBox='0 0 2426 1164'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.bg_squaresimg}
        >
          <g>
            <path
              d='M1163.2 553.778L746.415 970.565H1003.46L1418.42 555.614L1163.2 553.778Z'
              fill='url(#paint0_linear_341_4)'
              className='svg1a'
            />
            <path
              d='M865.03 490.674L677.243 678.461H793.059L980.019 491.501L865.03 490.674Z'
              fill='url(#paint1_linear_341_4)'
              className='svg1b'
            />
            <path
              d='M1649.09 534.778L1408.72 775.149H1556.97L1796.28 535.837L1649.09 534.778Z'
              fill='url(#paint2_linear_341_4)'
              className='svg1b'
            />
            <path
              d='M101.039 413.556H665.249L980.019 78H400.961L101.039 413.556Z'
              fill='url(#paint3_linear_341_4)'
              className='svg1b'
            />
            <path
              d='M1468.65 1085.56H2032.86L2347.63 750H1768.57L1468.65 1085.56Z'
              fill='url(#paint4_linear_341_4)'
              className='svg1a'
            />
            <path
              d='M1578.56 170.317L1250.64 498.24H1452.88L1779.36 171.762L1578.56 170.317Z'
              fill='#FFE200'
              // filter='url(#filter0_d_341_4)'
              className='Home_svgglow__vcVs9 svg1b'
            />
            <path
              d='M1746.96 358.822C1748.32 360.174 1534.76 571.032 1534.76 571.032H1546.92L1759.13 358.822C1759.13 358.822 1745.61 357.47 1746.96 358.822Z'
              fill='white'
              className='svg1a'
            />
            <path
              d='M649.622 513.474C650.357 514.209 534.181 628.916 534.181 628.916H540.801L656.238 513.474C656.238 513.474 648.883 512.739 649.622 513.474Z'
              fill='white'
              className='svg1b'
            />
            <path
              d='M305 534.778L78 761.778H218L444 535.778L305 534.778Z'
              fill='#FFE200'
              // filter='url(#filter0_d_341_4)'
              className='Home_svgglow__vcVs9 svg1a'
            />
            <path
              d='M833.336 446.57H943.106L855.178 534.778H745.128L833.336 446.57Z'
              fill='#FFE200'
              // filter='url(#filter0_d_341_4)'
              className='Home_svgglow__vcVs9 svg1a'
            />
          </g>
          <defs>
            <filter
              id='filter0_d_341_4'
              x='0'
              y='0'
              width='2425.63'
              height='1163.56'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset />
              <feGaussianBlur stdDeviation='39' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 1 0 0 0 0 0.886275 0 0 0 0 0 0 0 0 0.4 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_341_4'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_341_4'
                result='shape'
              />
            </filter>
            <linearGradient
              id='paint0_linear_341_4'
              x1='475.185'
              y1='969.687'
              x2='975.721'
              y2='-258.153'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3E4656' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_341_4'
              x1='475.185'
              y1='969.687'
              x2='975.721'
              y2='-258.153'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3E4656' />
            </linearGradient>
            <linearGradient
              id='paint2_linear_341_4'
              x1='475.185'
              y1='969.687'
              x2='975.721'
              y2='-258.153'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3E4656' />
            </linearGradient>
            <linearGradient
              id='paint3_linear_341_4'
              x1='1212.82'
              y1='787.319'
              x2='486.381'
              y2='1915.09'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3D4554' />
            </linearGradient>
            <linearGradient
              id='paint4_linear_341_4'
              x1='1212.82'
              y1='787.319'
              x2='486.381'
              y2='1915.09'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3D4554' />
            </linearGradient>
          </defs>
        </svg>

        <main className={styles.hero_container}>
          <div className={styles.hero}>
            <button
              ref={videoBtn}
              className={styles.videobtn_container}
              onClick={() => {
                modalContainer.current!.style.display = 'block';

                setTimeout(() => {
                  modalContainer.current!.style.opacity = '1';
                }, 1);

                gsap.fromTo(
                  iframeVideo.current,
                  {
                    scale: 0,
                    opacity: 0,
                  },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                  },
                );
              }}
              // style={{ height: btnContainerHeight }}
              // onMouseEnter={() => {
              //   videoBtn.current!.style.scale = '1.1';
              //   // videoBtn.current!.style.webkitTransform = 'scale(1.1)';
              // }}
              // onMouseLeave={() => {
              //   videoBtn.current!.style.scale = '1';
              // }}
            >
              {/* <img
                src='/playbutton.svg'
                alt='play button'
                className={styles.video_play}
              /> */}
              <img
                src='/home/1/playimg.png'
                alt='video background'
                // className={styles.video_btn}
                className={styles.video_bg}
              />
            </button>

            <div className={styles.herotext_container}>
              <h1 className={styles.hero_header}>
                <span>Pulse Clan</span> isn&apos;t just a{' '}
                <span> group of friends.</span>
                {/* 3091 */}
              </h1>
              <p className={styles.hero_paragraph}>
                At its heart, <span>Pulse</span> is an international,
                multi-disciplinary team that combines the best Rocket League and
                creative talent from around the world for the benefit of the
                community.
              </p>
              <a className={`${styles.cta_btn} ${styles.hero_cta}`}>
                READ MORE &nbsp;
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Social media section */}

      <div className={styles.socialmedia_bgcolor}>
        <section className={styles.socialmedia_wrapper}>
          <img
            src='/home/2/chartshapes2.svg'
            alt=''
            className={styles.socialmedia_bgimg}
          />

          <img
            src='/home/2/squareshape3.svg'
            alt=''
            className={styles.socialmedia_bgimg2}
          />
          <div className={styles.socialmedia_container}>
            <div
              ref={chartWrapper}
              data-donut-chart='1'
              className={styles.chartwrapper}
            >
              <Chart
                type='doughnut'
                data={{
                  labels: [''],
                  datasets: [
                    {
                      label: '',
                      data: [120000, 50000, 42000, 19000, 10000],
                      backgroundColor: [
                        '#E20000',
                        '#6C00D8',
                        '#FF3EF2',
                        '#13B6FF',
                        '#010101',
                      ],
                      hoverOffset: 0,
                      borderWidth: 0,
                      // rotation: 150,
                      rotation: chartRotation,
                      borderRadius: 100,
                      spacing: 15,
                      circumference: chartCircumference,
                      //@ts-ignore
                      cutout: chartCutout,
                      // cutout: 104,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    tooltip: {
                      enabled: false,
                    },
                  },
                  // transitions: {
                  //   show: {
                  //     animations: {
                  //       x: {
                  //         from: 100,
                  //       },
                  //       y: {
                  //         from: 0,
                  //       },
                  //     },
                  //   },
                  //   hide: {
                  //     animations: {
                  //       x: {
                  //         to: 100,
                  //       },
                  //       y: {
                  //         to: 0,
                  //       },
                  //     },
                  //   },
                  // },
                }}
              />
              <p className={styles.chart_text}>
                WE ARE OVER <span>{counter}</span>
              </p>
            </div>
            <div className={styles.socialmedia_block}>
              <div className={styles.socialmedia_uppersection}>
                <div className={styles.socialmedia_element}>
                  <a
                    href='https://www.youtube.com/c/PulseClanRL'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div className={styles.socialmedia_img}>
                      <Image
                        src='/socialmediaicons/youtube.svg'
                        alt='Youtube icon'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </a>
                  <p className={styles.socialmedia_number}>120.000</p>
                </div>
                <div className={styles.socialmedia_element}>
                  <a
                    href='https://www.twitch.tv/pulserl'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div className={styles.socialmedia_img}>
                      <Image
                        src='/socialmediaicons/twitch.svg'
                        alt='twitch icon'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </a>
                  <p className={styles.socialmedia_number}>50.000</p>
                </div>
                <div className={styles.socialmedia_element}>
                  <a
                    href='https://www.instagram.com/pulseclanrl/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div className={styles.socialmedia_img}>
                      <Image
                        src='/socialmediaicons/instagram.svg'
                        alt='instagram icon'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </a>
                  <p className={styles.socialmedia_number}>42.000</p>
                </div>
              </div>
              <div className={styles.socialmedia_lowersection}>
                <div className={styles.socialmedia_element}>
                  <a
                    href='https://twitter.com/The_Pulse_Clan'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div className={styles.socialmedia_img}>
                      <Image
                        src='/socialmediaicons/twitter.svg'
                        alt='Twitter icon'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </a>
                  <p className={styles.socialmedia_number}>19.000</p>
                </div>
                <div className={styles.socialmedia_element}>
                  <a
                    href='https://www.tiktok.com/@pulserl'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div className={styles.socialmedia_img}>
                      <Image
                        src='/socialmediaicons/tiktok.svg'
                        alt='tiktok icon'
                        layout='fill'
                        objectFit='contain'
                      />
                    </div>
                  </a>
                  <p className={styles.socialmedia_number}>10.000</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Latest news section */}

      <div className={styles.news_bgcolor}>
        <section ref={newsSection} className={styles.news_section}>
          <div className={styles.news_container}>
            <div className={styles.news_text_section}>
              <h2 className={styles.subheading}>LATEST NEWS</h2>
              <h3 className={styles.news_title}>
                New member arrives to
                <span>Pulse Clan!</span>
              </h3>
              <p className={styles.news_body}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At sed
                laboriosam nam quis officiis quidem eum animi et...
              </p>
              <a className={styles.cta_btn}>READ MORE &nbsp;</a>
            </div>

            <div className={styles.news_imgs_container}>
              <img
                className={styles.news_bg}
                src='/home/3/announcementbg.png'
                alt=''
              />
              <img
                className={styles.news_logo}
                src='/home/3/pulseavi.png'
                alt='pulse logo'
              />
            </div>
          </div>
          <a className={styles.news_cta_roster}>TAKE A LOOK AT OUR ROSTER!</a>
        </section>
      </div>

      {/* Store section */}

      <div className={styles.store_sponsor_bgcolor}>
        <div className={styles.store_sponsor_wrapper}>
          <img
            className={styles.store_bgimg}
            src='/home/4/storeshapesleft.svg'
            alt='squares'
          />
          <img
            className={styles.store_bgimg2}
            src='/home/4/storeshapesright.svg'
            alt='squares'
          />

          <section className={styles.store_section}>
            <h2 className={styles.subheading}>PULSE STORE</h2>
            <h3 className={styles.store_title}>
              Your <span>style</span> is <span>free.</span>
            </h3>
            <a className={`${styles.cta_btn} ${styles.store_cta}`}>
              LET&apos;S SHOP! &nbsp;
            </a>
            <div className={styles.store_imgs_container}>
              <img
                className={styles.store_img1}
                src='/home/4/storeimg1.png'
                alt='pulse clan clothing'
              />

              <img
                className={styles.store_img2}
                src='/home/4/storeimg2.png'
                alt='pulse clan clothing'
              />
            </div>
          </section>

          {/* Sponsors section */}

          <section className={styles.sponsor_section}>
            <h2 className={styles.subheading}>PARTNERS</h2>
            <h3 className={styles.sponsor_title}>
              We don&apos;t just <span>work</span> alone
            </h3>
            <div className={styles.sponsors}>
              <img
                className={styles.sponsor_logo}
                src='/sponsors/ggmerchrelative.svg'
                alt='ggmerch logo'
              />
              <a
                href='https://www.thrustmaster.com/'
                target='_blank'
                className={styles.sponsor_logo}
                rel='noreferrer'
              >
                <img src='/sponsors/thrustmaster.svg' alt='thrustmaster logo' />
              </a>
              <img
                className={styles.sponsor_logo}
                src='/sponsors/suprmoderelative.svg'
                alt='suprmode logo'
              />
            </div>
          </section>
        </div>
      </div>
      <div ref={touchScreenDiv} className={styles.istouchscreen}></div>
    </div>
  );
};

export default Home;

// regla de 3 con container width y height: si 18.75rem > 100% then 9.375rem > ?
//https://www.youtube.com/watch?v=6f1R26gWngI
//values that tell in which pixel the mouse hovered over: event.layerX/Y
//calculate which percentage of the container that mouse position equals to with the rule of 3
// if it's under 50%, then use that percentage to offset the div in a negative value, else substract 50 on the percentage and use that positive number to offset
