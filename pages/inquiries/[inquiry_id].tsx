import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { firebaseApi } from "../../firebase/api";
import { app } from "../../firebase/db";
import { Inquiry } from "../contact";
import styles from '../../styles/Inquiry.module.css';
import { getAuth } from "firebase/auth";
import { Message } from '../../firebase/api';
import { useUser } from "../../hooks/user";


type PageProps = {
    inquiry: Inquiry;
}

// 購入者もこのページに入って、firestoreにアクセスするから、つまり、認証しなくてはならない。
// この場合、購入者のuidでパスワードとメールアドレスを発行してで新規登録して、buyersというコレクションでに保存するか。
// あるいは、毎回、データをポストするごとに匿名ログインさせるか
// queryをもとに、チャットを取得する
// messages uid(query)  messageId field
const InquiryPage: NextPage<PageProps> = ({ inquiry }) => {
    const router = useRouter();
    const isReady = router.isReady;
    const [isLoading, setIsLoading] = useState(false);
    const { logout, loginAnonymously } = useUser();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const loginUser = getAuth(app).currentUser;

    // 匿名認証のユーザとログインユーザの違いはなんだろうか？
    // メッセージ送信だけは、ルールをカスタマイズして認証していなくても誰でも送信できるようにしておく
    // ただ、他の従業員がリンクにアクセスして勝手にメッセージを打てないように、お問い合わせの担当者が正しいかどうかのチェックはしておく
    let senderId = 'buyer';
    if (loginUser) {
        senderId = loginUser.uid;
    }

    const inquiryId = router.query.inquiry_id as string;

    useEffect(() => {
        if (isReady) {
            setIsLoading(true);
            console.log('fetch messages', inquiryId);
            firebaseApi.fetchMessages(inquiryId)
                .then(messages => {
                    setMessages(messages);
                })
                .catch(e => {
                    console.error(e);
                })
        }
    }, [isReady, inquiryId]);

    if (!isLoading) {
        return <div>loading..</div>;
    }


    console.log(loginUser);
    // 認証してないなら、つまり購入者ならば匿名ログインさせておく
    // if (!loginUser) {
    //     (async function () {
    //         // await loginAnonymously();
    //         firebaseApi.fetchMessages(inquiryId)
    //             .then(messages => {
    //                 setMessages(messages);
    //             })
    //             .catch(e => {
    //                 console.error(e);
    //             });
    //     })();
    // }

    // useEffect(() => {

    // }, []);

    const send = async (): Promise<void> => {
        try {
            await firebaseApi.addMessage(inquiryId as string, input, senderId);
            setMessages([...messages, { inquiryId, message: input, from: senderId }]);
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
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={logout}>logout</button>
            </div>
        </div >
    );
}

export default InquiryPage;
