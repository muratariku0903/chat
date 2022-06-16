import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
            }).catch(e => {
                console.error(e);
            });
    }

    return { login };
}
