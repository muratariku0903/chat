import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import { firebaseApi } from '../firebase/api';
import { Inquiry } from './contact';
import styles from '../styles/Home.module.css';
import BaseLayout from '../components/layout/base';

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


// このページってSSGなのかな？あるいはSSRなのかな？
// NextPageWithLayoutという型を指定することでこのページコンポーネントが「getLayout」というメソッドを持つことができる
const Home: NextPageWithLayout<HomePageProps> = ({ }) => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    useEffect(() => {
        firebaseApi.fetchInquiries().then(res => { setInquiries(res) });
    }, []);

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

// 上記で定義したコンポーネントをどのレイアウトでラップするかを決める
Home.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Home;
