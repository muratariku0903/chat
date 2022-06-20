import { getAuth, signInWithEmailAndPassword, signOut, signInAnonymously } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { userSlice } from '../store/user';
import { db, app } from '../firebase/db';


type LoginForm = {
    email: string;
    password: string;
}

export const useUser = () => {
    const dispatch = useDispatch();


    const login = async (form: LoginForm): Promise<void> => {
        const auth = getAuth(app);
        const { email, password } = form;
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(userSlice.actions.setUser({ name: 'tanaka', email, password }));
                console.log('login');
            }).catch(e => {
                console.error(e);
            });
    }

    const logout = async (): Promise<void> => {
        const auth = getAuth(app);
        await signOut(auth)
            .then(() => {
                console.log('logout');
            }).catch(e => {
                console.error(e);
            })
    }

    const loginAnonymously = async (): Promise<void> => {
        const auth = getAuth(app);
        await signInAnonymously(auth)
            .then(userCredential => {
                console.log('login anonymously');
            }).catch(e => {
                console.error(e);
            });
    }

    return { login, logout, loginAnonymously };
}
