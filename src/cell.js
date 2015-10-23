import React from 'react';

class Cell extends React.Component {


    render() {
        return (
            <div style={style}>
            </div>
        );
    }
}

var style = {
    width:16,
    height:16,
    borderRight: '1px solid #ccc',
    borderBottom: '1px solid #ccc'
    float: left
}

module.exports = Cell;