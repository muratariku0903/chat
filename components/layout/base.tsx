import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import Layout from '../Layout';


type LayoutProps = Required<{ readonly children: ReactElement }>;

const BaseLayout = ({ children }: LayoutProps) => {
    return (
        <Provider store={store}>
            <Layout>
                {children}
            </Layout>
        </Provider>
    );
}


export default BaseLayout;
