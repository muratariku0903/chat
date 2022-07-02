import React from 'react';
import { useRouter } from 'next/router';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Inquiry } from '../../../../repositories/firebase/types/inquiry';
import { roundStr } from '../../../../utils';


const InquiryTableRow = styled(TableRow)({
    cursor: 'pointer',
});


type OutterProps = {
    inquiries: Inquiry[];
}

type InquiryTableProps = OutterProps;

const InquiryTable: React.FC<InquiryTableProps> = ({ inquiries }) => {
    const router = useRouter();

    const goToInquiryDetailPage = (inquiryId: Inquiry['id']) => {
        router.push({
            pathname: '/inquiries/show/[inquiryId]',
            query: { inquiryId },
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>title</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>tel</TableCell>
                        <TableCell>productType</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>content</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries.map((inquiry, idx) => (
                        <InquiryTableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => goToInquiryDetailPage(inquiry.id)}
                        >
                            <TableCell component="th" scope="row">{inquiry.title}</TableCell>
                            <TableCell>{inquiry.customerName}</TableCell>
                            <TableCell>{inquiry.customerTel}</TableCell>
                            <TableCell>{inquiry.productTypeId}</TableCell>
                            <TableCell>{inquiry.statusTypeId}</TableCell>
                            <TableCell>{roundStr(inquiry.content)}</TableCell>
                        </InquiryTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default InquiryTable;
