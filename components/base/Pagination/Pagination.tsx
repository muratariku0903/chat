import React from 'react';
import { TablePagination } from '@mui/material';
import { Inquiry } from '../../../repositories/firebase/types/inquiry';


type OutterProps = {
    inquiries: Inquiry[];
}

type PaginationProps = OutterProps;


const Pagination: React.FC<PaginationProps> = ({ inquiries }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={10}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default Pagination;
