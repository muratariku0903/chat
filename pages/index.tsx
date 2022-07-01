import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'next';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Inquiry } from '../repositories/firebase/types/inquiry';
import BaseLayout from '../components/layout/base';
import Navigation from '../components/base/Navigation/Navigation';
import Inquiries from '../components/pages/inquiries';
import Drawer from '../components/base/Drawer/Drawer';

// case SSG ビルド時に一回だけデータを取得したい
// export const getServerSideProps = async () => {
//     const inquiries = await firebaseApi.fetchInquiries();
//     return {
//         props: {
//             inquiries,
//         }
//     }
// }

const InquiriesWrapper = styled(Box)({
    margin: '10% auto'
});

type HomePageProps = {
    inquiries: Inquiry[];
}

// このページってSSGなのかな？あるいはSSRなのかな？
// NextPageWithLayoutという型を指定することでこのページコンポーネントが「getLayout」というメソッドを持つことができる
const HomePage: NextPageWithLayout<HomePageProps> = ({ }) => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);

    return (
        <Box>
            <Navigation />
            <Box style={{ display: 'flex' }}>
                <InquiriesWrapper>
                    <Inquiries />
                </InquiriesWrapper>
                <Box>
                    <Drawer />
                </Box>
            </Box>
        </Box>
    )
}

// 上記で定義したコンポーネントをどのレイアウトでラップするかを決める
HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default HomePage;
