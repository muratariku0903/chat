import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';


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
