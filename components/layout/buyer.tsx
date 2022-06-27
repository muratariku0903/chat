import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import Layout from '../Layout';


type LayoutProps = Required<{ readonly children: ReactElement }>;

const BuyerLayout = ({ children }: LayoutProps) => {
    return (
        <Provider store={store}>
            <header>buyer's header</header>
            <main>
                {children}
            </main>
            <footer>buyer's footer</footer>
        </Provider>
    );
}


export default BuyerLayout;
