import React from 'react';

class Cell extends React.Component {



    render() {

        var style = {
            width:16,
            height:16,
            position: 'absolute',
            border: '1px solid #ddd',
            left: (this.props.x * 16),
            top: (this.props.y * 16)
        }

        return (
            <div style={style}>
            </div>
        );
    }
}

module.exports = Cell;