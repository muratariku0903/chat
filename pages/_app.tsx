import { NextPage } from 'next';
import type { AppProps, AppPropsWithLayout } from 'next/app';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';


// MyAppというのは各コンポーネントの雛形のようなもの
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    return getLayout(<Component {...pageProps} />);
}

export default MyApp;
