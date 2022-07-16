import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AppRouter } from 'pawnly-server';
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

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = 'http://localhost:3000/trpc';

    return {
      url
    };
  }
})(App);
