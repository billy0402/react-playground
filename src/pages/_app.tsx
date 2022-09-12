import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>React Playground</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
