import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Inquiry } from '../../../../repositories/firebase/api/inquiries';
import { roundStr } from '../../../../utils';


type OutterProps = {
    inquiries: Inquiry[];
}

type InquiryTableProps = OutterProps;

const InquiryTable: React.FC<InquiryTableProps> = ({ inquiries }) => {
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
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{inquiry.title}</TableCell>
                            <TableCell>{inquiry.customerName}</TableCell>
                            <TableCell>{inquiry.customerTel}</TableCell>
                            <TableCell>{inquiry.productTypeId}</TableCell>
                            <TableCell>{inquiry.statusTypeId}</TableCell>
                            <TableCell>{roundStr(inquiry.content)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default InquiryTable;
