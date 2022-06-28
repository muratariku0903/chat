import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebaseApi } from "../../repositories/firebase/api";
import { getAuth } from "firebase/auth";
import { app } from "../../repositories/firebase/db";
import { Inquiry } from "../contact";
import styles from '../../styles/Inquiry.module.css';
import { Message } from '../../repositories/firebase/api';
import { useUser } from "../../hooks/user";
import { db } from "../../repositories/firebase/db";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import BuyerLayout from "../../components/layout/buyer";
import BaseLayout from "../../components/layout/base";

type PageProps = {
    inquiry: Inquiry;
}

// 購入者もこのページに入って、firestoreにアクセスするから、つまり、認証しなくてはならない。
// この場合、購入者のuidでパスワードとメールアドレスを発行してで新規登録して、buyersというコレクションでに保存するか。
// あるいは、毎回、データをポストするごとに匿名ログインさせるか
// queryをもとに、チャットを取得する
// messages uid(query)  messageId field
const InquiryPage: NextPageWithLayout<PageProps> = ({ inquiry }) => {
    const router = useRouter();
    const isReady = router.isReady;
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useUser();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const loginUser = getAuth(app).currentUser;

    let senderId = 'buyer';
    if (loginUser) {
        senderId = loginUser.uid;
    }

    const inquiryId = router.query.inquiry_id as string;

    useEffect(() => {
        if (isReady) {
            setIsLoading(true);
            const colRef = collection(db, 'messages', inquiryId, 'inquiryMessages');
            const sortConf = orderBy('createdAt', 'asc');
            const q = query(colRef, sortConf);
            onSnapshot(q, (qs) => {
                const messages: Message[] = [];
                qs.forEach(doc => {
                    messages.push(doc.data() as Message);
                });
                setMessages(messages);
            });
        }
    }, [isReady, inquiryId]);

    if (!isLoading) return <div>loading..</div>;

    console.log(loginUser);

    const send = async (): Promise<void> => {
        try {
            const createdAt = new Date().getTime();
            await firebaseApi.addMessage(inquiryId as string, input, senderId, createdAt);
            setMessages([...messages, { inquiryId, message: input, from: senderId, createdAt }]);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2>お問い合わせID:{router.query.inquiry_id}のページです</h2>
            <div className={styles.input_wrapper}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={send}>送信</button>
            </div>
            <div className={styles.message_wrapper}>
                {messages.map((message, idx) => (
                    <div key={idx} className={styles.message}>
                        <p>{message.message}</p>
                        <p>送信者:{message.from}</p>
                        <p>日付:{new Date(message.createdAt).toString()}</p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={logout}>logout</button>
                <button onClick={() => router.push('/')}>top</button>
            </div>
        </div >
    );
}

const isStaff = getAuth().currentUser && !getAuth().currentUser?.isAnonymous;
console.log(isStaff);
InquiryPage.getLayout = (page) => isStaff ? <BaseLayout>{page}</BaseLayout> : <BuyerLayout>{page}</BuyerLayout>;

export default InquiryPage;
