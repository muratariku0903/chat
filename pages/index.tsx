import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { NextPageWithLayout } from 'next';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RootState } from '../store';
import type { Inquiry } from '../repositories/firebase/types/inquiry';
import BaseLayout from '../components/layout/base';
import Navigation from '../components/base/Navigation/Navigation';
import Inquiries from '../components/pages/inquiries';
import InquiryTable from '../components/base/Inquiry/InquiryTable/InquiryTable';
import Pagination from '../components/base/Pagination/Pagination';
import Drawer from '../components/base/Drawer/Drawer';
import { useInquiry } from '../hooks/inquiry';
import { IIFE } from '../utils';


type HomePageProps = {
    inquiries: Inquiry[];
}

// このページってSSGなのかな？あるいはSSRなのかな？
// NextPageWithLayoutという型を指定することでこのページコンポーネントが「getLayout」というメソッドを持つことができる
// 結局このページコンポーネントでデータをすべて取得した方がいい気がする
// Controller的な役割を果たす
const HomePage: NextPageWithLayout<HomePageProps> = ({ }) => {
    const { fetchInquiries } = useInquiry();
    const { inquiries, clauses } = useSelector((state: RootState) => state.inquiries);

    useEffect(() => {
        fetchInquiries({
            whereClauses: [
                { fieldName: 'statusTypeId', operator: 'in', fieldValue: [100, 200, 300] }
            ],
            orderByClauses: [
                { fieldName: 'createdAt', direValue: 'asc' },
            ],
            limitClause: {
                limitCnt: 10
            }
        });
        console.log('fetch and set inquiries');
    }, []);

    return (
        <Box>
            <Navigation />
            <Box style={{ display: 'flex' }}>
                <Box style={{ margin: '10% auto' }}>
                    <InquiryTable inquiries={inquiries} />
                </Box>
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
