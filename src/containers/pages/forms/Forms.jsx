import React, { useState, useEffect } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { Formaters } from '../../../components/common/Common';
import { Helpers, Constants } from '../../../utils/Utils';
import { TextField, MenuItem, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: theme.spacing(3)
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    margin: { margin: theme.spacing(1) },
    textField: { flex: '45' }
}));

function Forms ({ model }) {
    const classes = useStyles();
    const expenseTypes = Constants.ExpenseTypes;
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState(expenseTypes[0]);
    const [item, setItem] = useState(model || null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const expenses = Helpers.LocalStorageHandler.getItem('expenses');
        if (expenses != null) { setData(expenses); }
    }, []);

    useEffect(() => {
        if (item != null) {
            Helpers.LocalStorageHandler.setItem('expenses', (data.concat(item)));
        }
    });

    const clearData = () => {
        setDescription('');
        setAmount('');
        setDate(new Date());
        setType(expenseTypes[0]);
        setItem(null);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let newItem = { description: description, amount: amount, date: moment(date).format(), type: type };
        setItem(newItem);
        setDescription('');
        setAmount('');
        setDate(new Date());
        setType(expenseTypes[0]);
    };
    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <div style={{ display: 'flex', margin: '2% 0', alignItems: 'center' }}>
                <span style={{ fontSize: 'x-large' }}>Insert Expenses</span>
            </div>
            <div className={classes.row}>
                <TextField className={classes.margin} variant="outlined"
                    id="description-input" label="Description"
                    placeholder="Expense description" fullWidth
                    InputLabelProps={{ shrink: true }}
                    required value={description} onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className={classes.row}>
                <TextField className={clsx(classes.margin, classes.textField)}
                    id="amount-input" label="Amount" variant="outlined" name="numberformat"
                    required value={amount}
                    InputProps={{ inputComponent: Formaters.CurrencyFormatCustom }}
                    onChange={e => { setAmount(e.target.value); }}
                />
                <TextField className={clsx(classes.margin, classes.textField)}
                    id="exp-type-input" label="ExpenseType" variant="outlined" select
                    required value={type} default={expenseTypes[0]} onChange={(e) => setType(e.target.value)}
                >
                    {expenseTypes.map((option) => (
                        <MenuItem key={"key-" + option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className={classes.row}>
                <TextField className={clsx(classes.margin, classes.textField)}
                    id="datetime-local" label="Expense date" type="datetime-local"
                    required
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    value={moment(date).format("YYYY-MM-DDTHH:mm")}
                />
            </div>
            <div className={clsx(classes.actions, classes.margin)} style={{ alignContent: 'flex-end' }}>
                <Button id="clearFormButton" variant="contained" color="secondary" onClick={clearData}>Clear</Button>
                <Button id="submitFormButton" variant="contained" color="primary" type="submit">Save</Button>
            </div>
        </form>
    );
}

export default Forms;
