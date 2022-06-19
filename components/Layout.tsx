import React, { Fragment, ReactElement } from 'react';
import Head from 'next/head';

type LayoutProps = Required<{ readonly children: ReactElement }>;

const Layout = ({ children }: LayoutProps) => {
    return (
        <Fragment>
            <Head>
                <title>Chat App</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <header>
                <p>this is header.</p>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>this is footer.</p>
            </footer>
        </Fragment>
    );
}


export default Layout;
