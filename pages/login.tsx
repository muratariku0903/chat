import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import Login from '../components/login';
import BaseLayout from '../components/layout/base';


const LoginPage: NextPageWithLayout = () => {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    if (user.isLogin) router.push('/');

    return (
        <div>
            <h1>login</h1>
            <Login />
        </div>
    )
}

LoginPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default LoginPage
