import React from 'react';

function GridContainer (props) {
    const data = props.data;
    return (
        <div>
            {data.map((d, i) => {
                return (
                    <div key={"grig-content" + i}>A grid element {i}</div>
                );
            })}
        </div>
    );
}

export default GridContainer;
