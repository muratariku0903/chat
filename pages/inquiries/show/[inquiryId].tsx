import { NextPage } from "next";
import { Box } from '@mui/material';
import Navigation from '../../../components/base/Navigation/Navigation';

type InquiryDetailPageProps = {

}


const InquiryDetailPage: NextPage<InquiryDetailPageProps> = ({ }) => {
    return (
        <Box>
            <Navigation />
            <Box style={{ display: 'flex' }} m={10}>

            </Box>
        </Box>
    );
}

export default InquiryDetailPage;
