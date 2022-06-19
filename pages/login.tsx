import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

import Login from '../components/login';


const LoginPage: NextPage = () => {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    console.log(user,'loginPage');

    if (user.isLogin) router.push('/');


    return (
        <div>
            <h1>login</h1>
            <Login />
        </div>
    )
}

export default LoginPage
