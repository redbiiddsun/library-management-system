import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableComponentBorrowStat(prop) {
    const { data = [] } = prop;

    return (
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">BookID</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Language</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Publisher</TableCell>
                        <TableCell align="right">BorrowingStat</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.staff_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="right">{row.book_id}</TableCell>
                            <TableCell align="right">{row.book_title}</TableCell>
                            <TableCell align="right">{row.language}</TableCell>
                            <TableCell align="right">{row.Author}</TableCell>
                            <TableCell align="right">{row.publisher}</TableCell>
                            <TableCell align="right">{row.BorrowingStatistic}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}