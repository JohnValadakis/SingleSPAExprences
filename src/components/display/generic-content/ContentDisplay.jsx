import React from 'react';
import GridContainer from './GridContainer';
import GenericTableContainer from './GenericTableContainer';

function ContentDisplay ({ data, actions }) {
    const displayContent = (type) => {
        if (type === 'grid') {
            return <GridContainer data={data} actions={actions} />;
        }
        return <GenericTableContainer data={data} actions={actions} />;
    };

    return (
        displayContent('list')
    );
}

export default ContentDisplay;
