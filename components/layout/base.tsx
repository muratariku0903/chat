import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';


type LayoutProps = Required<{ readonly children: ReactElement }>;

const BaseLayout = ({ children }: LayoutProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}


export default BaseLayout;
