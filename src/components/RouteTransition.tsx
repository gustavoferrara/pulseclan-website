import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import styles from '@/styles/RouteTransition.module.scss';

const RouteTransition: React.FC = () => {
  const router = useRouter();

  const transitionContainer = useRef<HTMLDivElement>(null);

  // const pulseLogo = useRef<HTMLImageElement>(null);

  const aniStart = () => {
    console.log('Animation Start');
    transitionContainer.current!.style.display = 'flex';
    transitionContainer.current!.style.clipPath =
      'polygon(0 100%, 100% 100%, 100% 0, 0 0)';
  };

  const aniEnd = () => {
    console.log('Animation End');
    transitionContainer.current!.style.clipPath =
      'polygon(0 100%, 100% 100%, 100% 99%, 0 99%)';

    setTimeout(() => {
      transitionContainer.current!.style.display = 'none';

      // transitionContainer.current!.style.clipPath =
      //   'polygon(0 100%, 100% 100%, 100% 0, 0 0)';
      transitionContainer.current!.style.clipPath =
        'polygon(0 0, 100% 0%, 100% 1%, 0 1%)';
    }, 450);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', aniStart);
    router.events.on('routeChangeComplete', aniEnd);
    router.events.on('routeChangeError', aniStart);

    return () => {
      router.events.off('routeChangeStart', aniStart);
      router.events.off('routeChangeComplete', aniEnd);
      router.events.off('routeChangeError', aniStart);
    };
  }, [router]);

  return (
    <div
      ref={transitionContainer}
      aria-hidden
      className={styles.transition_container}
    >
      {/* <img
        ref={pulseLogo}
        src='/pulselogo.svg'
        alt=''
        className={styles.pulse_logo}
      /> */}
      <svg
        className={styles.pulse_logo}
        width='36'
        height='100'
        viewBox='0 0 36 29'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.198 13.237L9.89798 16.027L5.60502 9.25098H8.67301L11.198 13.237Z'
          fill='black'
        />
        <path
          d='M23.327 15.53H26.398L17.998 28.81L12.952 20.846L14.252 18.056L17.998 23.969L23.327 15.53Z'
          fill='black'
        />
        <path
          d='M30.851 9.99199C30.8533 11.2887 30.3511 12.5355 29.4506 13.4687C28.5501 14.4018 27.322 14.9481 26.026 14.992L15.084 15.017L12.615 20.317L10.235 16.561L13.635 9.25298H17.741L16.818 11.199H26.024C26.3215 11.1558 26.5935 11.0068 26.7902 10.7795C26.9868 10.5522 27.0951 10.2616 27.0951 9.96098C27.0951 9.66036 26.9868 9.36981 26.7902 9.14247C26.5935 8.91513 26.3215 8.7662 26.024 8.72298H5.26501L2.92101 5.00798L26.021 4.99599C27.3172 5.03858 28.546 5.58375 29.4474 6.51616C30.3489 7.44857 30.8522 8.69508 30.851 9.99199Z'
          fill='black'
        />
        <path
          d='M35.999 0.406982C35.642 0.981982 31.07 8.06699 31.07 8.06699C30.7825 7.14413 30.2337 6.32439 29.49 5.70699L31.29 2.97498H4.70302L5.66103 4.47498H2.58498C2.58498 4.47498 0.358015 0.981982 1.52588e-05 0.406982H35.999Z'
          fill='black'
        />
      </svg>

      {/* <svg className={styles.spinner} viewBox='0 0 50 50'>
        <circle
          className={styles.path}
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='4'
        ></circle>
      </svg> */}
    </div>
  );
};

export default RouteTransition;

// const aniStart = () => {
//   console.log('Animation Start');
//   transitionContainer.current!.style.display = 'flex';
//   transitionContainer.current!.style.clipPath =
//     'polygon(0 100%, 100% 100%, 100% 0, 0 0)';
// };

// const aniEnd = () => {
//   // transitionContainer.current!.style.display = 'flex';
//   // transitionContainer.current!.style.clipPath =
//   //   'polygon(0 100%, 100% 100%, 100% 0, 0 0)';
//   transitionContainer.current!.style.clipPath =
//     'polygon(0 100%, 100% 100%, 100% 99%, 0 99%)';

//   setTimeout(() => {
//     transitionContainer.current!.style.display = 'none';

//     transitionContainer.current!.style.clipPath =
//       'polygon(0 100%, 100% 100%, 100% 0, 0 0)';
//     // transitionContainer.current!.style.display = 'none';
//     // setTimeout(() => {
//     //   transitionContainer.current!.style.clipPath =
//     //     'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
//     // }, 250);
//   }, 450);
// };

// useEffect(() => {
//   router.events.on('routeChangeStart', aniStart);
//   router.events.on('routeChangeComplete', aniEnd);
//   router.events.on('routeChangeError', aniStart);

//   return () => {
//     router.events.off('routeChangeStart', aniStart);
//     router.events.off('routeChangeComplete', aniEnd);
//     router.events.off('routeChangeError', aniStart);
//   };
// }, [router]);
