import React, { useState, useEffect } from 'react';
import { ContentDisplay } from '../../../components/display/Display';
import { Helpers } from '../../../utils/Utils';
import Expenses from '../../../files/expenses';
import { Button } from '@material-ui/core';

const History = () => {
    const [data, setData] = useState([]);
    const [click, setClick] = useState(null);

    useEffect(() => {
        const fetchedData = Helpers.LocalStorageHandler.getItem('expenses');
        setData(fetchedData);
    }, []);

    useEffect(() => { Helpers.LocalStorageHandler.setItem('expenses', data); });

    const loadData = () => {
        setData(Expenses);
        Helpers.LocalStorageHandler.setItem('expenses', data);
    };

    const onRemove = item => {
        setClick(item.description);
        let filtered = data.filter(x => { return x !== item; });
        setData(filtered);
        Helpers.LocalStorageHandler.setItem('expenses', filtered);
    };

    const dataActions = {
        remove: onRemove
    };

    return (
        <div>
            <div style={{ display: 'flex', margin: '2% 0', alignItems: 'center' }}>
                <span style={{ fontSize: 'x-large' }}>Expenses History</span>
                <Button data-testid="loadInitialDataId" variant="outlined" style={{ marginLeft: 'auto' }}
                    onClick={loadData}>
                    Load Initial
                </Button>
            </div>
            <ContentDisplay data={data} actions={dataActions} />
            {click && <p>{click} is clicked.</p>}
        </div>
    );
};

export default History;
