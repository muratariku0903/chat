import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { db, app } from '../firebase/db';
import { RootState } from '../store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { userSlice } from '../store/user';
import { useUser } from '../hooks/user';


type LoginForm = {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const { login } = useUser();


    return (
        <Fragment>
            <form action="">
                <input type="text" name='email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /> <br />
                <input type="text" name='password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </form>
            <button onClick={() => login(form)}>ログイン</button>
        </Fragment>
    );
}

export default Login;
