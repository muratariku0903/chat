import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPosts, Post } from '../lib/posts';
import { firebaseApi } from '../firebase/api';
import { Inquiry } from './contact';

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
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
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

    return (
        <div>
            {inquiries.map((inquiry, idx) => (
                <article key={idx}>
                    <h2>this is inquiry</h2>
                    <Link href={`/inquiries/${inquiry.id}`}>
                        <a href={`/inquiries/${inquiry.id}`}>リンク</a>
                    </Link>
                    <p>{inquiry.name}</p>
                    <p>{inquiry.title}</p>
                </article>
            ))}
        </div>
    )
}

export default Home;
