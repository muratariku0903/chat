import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import store from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    // const store = useStore();
    // const persistor = persistStore(store);

    return (
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <Component {...pageProps} />
            {/* </PersistGate> */}
        </Provider>
    );
}

export default MyApp;
