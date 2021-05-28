import React, { useState } from 'react';
import { Helpers } from '../../../utils/Utils';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Paper, TablePagination, TableSortLabel } from '@material-ui/core';
import { makeStyles, Chip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: { width: '100%' },
    container: { maxHeight: 440, minHeight: 440 },
    paper: { width: '100%', marginBottom: theme.spacing(2) },
    table: { minWidth: 750 },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20
    }
}));

const headCells = [
    { id: 'type', align: 'center', numeric: false, disablePadding: false, label: 'Type', style: { width: '15%' } },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description', style: { width: '30%' } },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date', style: { width: '30%' } },
    { id: 'amount', align: 'right', numeric: false, disablePadding: false, label: 'Amount', style: { width: '15%' } }
];

function descendingComparator (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) { return -1; }
    if (b[orderBy] > a[orderBy]) { return 1; }
    return 0;
}

function getComparator (order, orderBy) {
    return order === 'desc' ? (a, b) =>
        descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort (array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function GenericTableHead (props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => { onRequestSort(event, property); };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align ? headCell.align : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={headCell.style}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden} style={{ width: '10%' }} >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell id="actions" align="center">Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

function GenericTableContainer ({ data, actions }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(headCells[0].id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const formatDate = Helpers.FormatDate;
    const classes = useStyles();
    const dataArray = Array.isArray(data) ? data : [];
    const coloredChip = (type) => {
        let color = "";
        switch (type) {
            case 'income': color = "primary"; break;
            case 'expense': color = "secondary"; break;
            default: break;
        }
        return color;
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataArray.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} size="small" aria-label="a dense table" stickyHeader >
                        <GenericTableHead classes={classes}
                            order={order} orderBy={orderBy}
                            onRequestSort={handleRequestSort} rowCount={dataArray.length}
                        />
                        <TableBody>
                            {stableSort(dataArray, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow key={row.type + index}>
                                            <TableCell align="center">
                                                <Chip
                                                    label={row.type}
                                                    color={coloredChip(row.type)}
                                                    variant="outlined" />
                                            </TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{formatDate(row.date)}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="delete" onClick={() => actions.remove(row)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} component="div"
                    count={dataArray.length} rowsPerPage={rowsPerPage} page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default GenericTableContainer;
