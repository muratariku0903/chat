import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase/db';
import { userSlice } from '../store/user';


const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const isReady = router.isReady;

    useEffect(() => {
        if (isReady) {
            setIsLoading(true);
        }
    }, [isReady]);

    if (!isLoading) {
        return <div>loading..</div>;
    }


    console.log(user, 'homepage');

    if (!user.isLogin) router.push('/login');

    const logout = async (): Promise<void> => {
        const auth = getAuth(app);
        try {
            auth.signOut().then(res => {
                // console.log('logout');
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.error(e);
        }
        dispatch(userSlice.actions.reset());
    }

    return (
        <div>
            <h1>home</h1>
            <button onClick={logout}>ログアウト</button>
        </div>
    )
}

export default Home
