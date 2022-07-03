import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'next';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Inquiry } from '../repositories/firebase/types/inquiry';
import BaseLayout from '../components/layout/base';
import Navigation from '../components/base/Navigation/Navigation';
import Inquiries from '../components/pages/inquiries';
import Pagination from '../components/base/Pagination/Pagination';
import Drawer from '../components/base/Drawer/Drawer';


const InquiriesWrapper = styled(Box)({
    margin: '10% auto'
});

const PaginationWrapper = styled(Box)({
    margin: '10% auto'
});

type HomePageProps = {
    inquiries: Inquiry[];
}

// このページってSSGなのかな？あるいはSSRなのかな？
// NextPageWithLayoutという型を指定することでこのページコンポーネントが「getLayout」というメソッドを持つことができる
const HomePage: NextPageWithLayout<HomePageProps> = ({ }) => {
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
