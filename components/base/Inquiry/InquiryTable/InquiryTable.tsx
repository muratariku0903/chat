import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../store';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Inquiry } from '../../../../repositories/firebase/types/inquiry';
import { roundStr, isEmptyObj, formatDate } from '../../../../utils';


const InquiryTableRow = styled(TableRow)({
    cursor: 'pointer',
});


type OutterProps = {
    inquiries: Inquiry[];
}

type InquiryTableProps = OutterProps;

const InquiryTable: React.FC<InquiryTableProps> = ({ inquiries }) => {
    const router = useRouter();
    const statusTypes = useSelector((state: RootState) => state.statusTypes.statusTypes);
    const productTypes = useSelector((state: RootState) => state.productTypes.productTypes);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const goToInquiryDetailPage = (inquiryId: Inquiry['id']) => {
        router.push({
            pathname: '/inquiries/show/[inquiryId]',
            query: { inquiryId },
        });
    }

    if (isEmptyObj(statusTypes) || isEmptyObj(productTypes)) return <p>loading...</p>;

    return (
        <Fragment>
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
                            <TableCell>createdAt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inquiries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inquiry, idx) => (
                            <InquiryTableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => goToInquiryDetailPage(inquiry.id)}
                            >
                                <TableCell component="th" scope="row">{inquiry.title}</TableCell>
                                <TableCell>{inquiry.customerName}</TableCell>
                                <TableCell>{inquiry.customerTel}</TableCell>
                                <TableCell>{productTypes[inquiry.productTypeId].name}</TableCell>
                                <TableCell>{statusTypes[inquiry.statusTypeId].name}</TableCell>
                                <TableCell>{roundStr(inquiry.content)}</TableCell>
                                <TableCell>{formatDate(new Date(inquiry.createdAt))}</TableCell>
                            </InquiryTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={inquiries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Fragment>
    );
}

export default InquiryTable;
