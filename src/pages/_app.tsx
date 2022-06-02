import '@/styles/globals.scss';
import '@/modules/wdyr';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import LayoutWrapper from '@/components/LayoutWrapper';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const routeChange = () => {
      // Temporary fix to avoid flash of unstyled content
      // during route transitions.
      // Issue:
      // https://github.com/vercel/next.js/issues/17464

      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach(elem => {
        elem.removeAttribute('media');
      });
    };

    router.push(router.pathname);
    router.events.on('beforeHistoryChange', routeChange);
    router.events.on('routeChangeComplete', routeChange);
    router.events.on('routeChangeStart', routeChange);
  }, []);

  return (
    <LayoutWrapper>
      <Component {...pageProps} key={router.route} />
    </LayoutWrapper>
  );
};

export default MyApp;
