import type { AppPropsWithLayout } from 'next/app';
import { ReactElement } from 'react';
import '../styles/globals.css';


// MyAppというのは各コンポーネントの雛形のようなもの
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    return getLayout(<Component {...pageProps} />);
}

export default MyApp;
