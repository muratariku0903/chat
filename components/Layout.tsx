import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../store/index';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { inquiriesSlicer } from '../store/Inquiries';
import { firebaseApi } from '../firebase/api';
import { Inquiry } from '../pages/contact';
import { RootState } from '../store/index';


type LayoutProps = Required<{ readonly children: ReactElement }>;

const Layout = ({ children }: LayoutProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const isReady = router.isReady;
    const isLogin = useSelector((state: RootState) => state.user.isLogin);

    // 初期設定
    useEffect(() => {
        console.log('setup process');
        firebaseApi.fetchInquiries().then(res => {
            dispatch(inquiriesSlicer.actions.setInquiries(res));
        }).catch(e => {
            console.error(e);
        })
    }, []);

    // ページごとに決まった処理
    useEffect(() => {
        console.log('routing process');
        if (router.pathname === '/login' || router.pathname === '/inquiries' || router.pathname === '/contact') return;
        if (!isLogin) router.push('/login');
    }, [router.pathname]);

    // routerのセットアップ
    useEffect(() => {
        console.log('setup router');
        if (isReady) setIsLoading(true);
    }, [isReady, router.pathname]);


    if (!isLoading) {
        return <div>loading..</div>;
    }

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
