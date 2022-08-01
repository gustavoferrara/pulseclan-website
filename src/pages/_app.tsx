import '@/styles/globals.scss';
import '@/styles/codepenChart/chart.scss';
import '@splidejs/splide/css/core';
import '@/styles/splide/splide.scss';

// import '@/modules/wdyr';
import { AppProps } from 'next/app';
import { useEffect } from 'react';

import Layout from '@/components/Layout';
import { LoggedUserProvider } from '@/contexts/LoggedUser';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  // const router = useRouter();

  // useEffect(() => {
  //   const routeChange = () => {
  //     // Temporary fix to avoid flash of unstyled content
  //     // during route transitions.
  //     // Issue:
  //     // https://github.com/vercel/next.js/issues/17464

  //     const allStyleElems = document.querySelectorAll('style[media="x"]');
  //     allStyleElems.forEach(elem => {
  //       elem.removeAttribute('media');
  //     });
  //   };

  //   router.push(router.pathname);
  //   router.events.on('beforeHistoryChange', routeChange);
  //   router.events.on('routeChangeComplete', routeChange);
  //   router.events.on('routeChangeStart', routeChange);
  // }, []);

  return (
    <LoggedUserProvider>
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </LoggedUserProvider>
  );
};

export default MyApp;
