import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from './Footer';
import Navbar from './Navbar';
import RouteTransition from './RouteTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const currentUrl = `https://pulse-clan.com/${router.asPath}`;

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0'
        />
        <meta property='og:url' content={currentUrl} key='ogurl' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <div id='wrapper'>
        <RouteTransition />
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
