import React from 'react';

import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {apiUrl, fetcher} from "../../../lib/config";
import useSWR from 'swr'
import {getUserToken} from "../../../lib/user";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddLanguage from "./AddLanguage";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton'


const useStyles = makeStyles((theme) => ({

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'Code', minWidth: 100 },
];

export default function Languages(props) {
    const classes = useStyles();
    const { data, mutate } = useSWR(`${apiUrl}/api/v1/language`, fetcher)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const removelanguage = async (id) => {
        const response = await fetch(`${apiUrl}/api/v1/language/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getUserToken()

            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        mutate();
        console.log(result)
    };

    return (
        <>
            <main className={classes.content}>
                <Toolbar />
                <Typography paragraph>
                    {data && (<Paper>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}

                                    <TableCell
                                    >
                                        Options
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    console.log(row)
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}

                                                <TableCell>
                                                    <IconButton onClick={() => removelanguage(row.id)}>
                                                        <DeleteOutlineIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /></Paper>)}
                </Typography>
                <AddLanguage/>
            </main>
        </>
    );
}