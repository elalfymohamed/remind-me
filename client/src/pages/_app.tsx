import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.scss";

import { BlogLayout } from "./blog/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="../../public/tasks_icon-home.svg" />
        <meta name="theme-color" content="#fff" />
        <title>todo</title>
      </Head>
      <BlogLayout>
        <Component {...pageProps} />
      </BlogLayout>
    </>
  );
}

export default MyApp;
