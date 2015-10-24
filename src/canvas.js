import React from 'react';
import Cell from './cell';

var Canvas = React.createClass({

    renderCells() {
        var cells = [];
        var self = this;
        for (var i=0; i<self.props.mapHeight; i++) {
            for (var ii=0; ii<self.props.mapLength; ii++) {
                cells.push(
                    <Cell y={i} x={ii} />
                )
            }
        }
        return cells;
    },

    render() {

        var dynamicStyles = {
            width: (this.props.mapLength * 16)
        };

        return (
            <div style={dynamicStyles} className="canvas">
                {this.renderCells()}
            </div>
        );
    }
});

module.exports = Canvas;