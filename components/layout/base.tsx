import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import InitApp from '../InitApp/InitApp';


type LayoutProps = Required<{ readonly children: ReactElement }>;

const BaseLayout = ({ children }: LayoutProps) => {
    return (
        <Provider store={store}>
            <InitApp />
            {children}
        </Provider>
    );
}


export default BaseLayout;
