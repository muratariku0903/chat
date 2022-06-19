import { NextPage } from "next";
import { useState } from "react";
import { signInAnonymously, getAuth } from "firebase/auth";
import { app } from '../firebase/db';
import { firebaseApi } from "../firebase/api";


export type Inquiry = {
    id: string;
    name: string;
    title: string;
    content: string;
}

const initialInput: Inquiry = {
    id: '',
    name: '',
    title: '',
    content: ''
}


const ContactPage: NextPage = () => {
    const [input, setInput] = useState<Inquiry>(initialInput);

    const postInquiry = async (input: Inquiry): Promise<void> => {
        const auth = getAuth(app);
        try {
            // 匿名でログインする
            await signInAnonymously(auth)
                .then(res => {
                    const uid = res.user.uid;
                    firebaseApi.addInquiry(uid, { ...input, id: uid });
                    console.log('add inquiry');
                })
                .catch(e => {
                    console.log(e);
                })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h2> お問い合わせ</ h2>
            <form action="">
                <input type="text" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} /><br />
                <input type="text" value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })} /><br />
                <textarea value={input.content} onChange={(e) => setInput({ ...input, content: e.target.value })}></textarea>
            </form>
            <button onClick={() => postInquiry(input)}>send</button>
        </div>
    );
}

export default ContactPage;