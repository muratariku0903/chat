import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPosts, Post } from '../lib/posts';
import { firebaseApi } from '../firebase/api';
import { Inquiry } from './contact';
import styles from '../styles/Home.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// case SSG ビルド時に一回だけデータを取得したい
// export const getServerSideProps = async () => {
//     const inquiries = await firebaseApi.fetchInquiries();
//     return {
//         props: {
//             inquiries,
//         }
//     }
// }

type HomePageProps = {
    inquiries: Inquiry[];
}

const Home: NextPage<HomePageProps> = ({ }) => {
    const router = useRouter();
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    const isReady = router.isReady;
    useEffect(() => {
        firebaseApi.fetchInquiries().then(res => {
            setInquiries(res);
        });
    }, []);

    useEffect(() => {
        if (isReady) {
            setIsLoading(true);
        }
    }, [isReady]);

    if (!isLoading) {
        return <div>loading..</div>;
    }

    if (!isLogin) router.push('/login');

    return (
        <div>
            {inquiries.map((inquiry, idx) => (
                <article key={idx} className={styles.article}>
                    <h2>{inquiry.title}</h2>
                    <Link href={`/inquiries/${inquiry.id}`}>
                        <a href={`/inquiries/${inquiry.id}`}>リンク</a>
                    </Link>
                    <p>{inquiry.name}</p>
                </article>
            ))}
            <button><Link href='./contact'>contact</Link></button>
        </div>
    )
}

export default Home;
