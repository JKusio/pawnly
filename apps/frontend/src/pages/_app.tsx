import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pawnly</title>
      </Head>
      <div
        id="main"
        className="overflow-hidden bg-dark min-w-screen min-h-screen"
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
