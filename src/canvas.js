import React from 'react';
import Cell from './cell';
import ObjectService from './services/object-service';

var Canvas = React.createClass({

    renderCells() {
        var cells = [];
        var self = this;
        for (var i=0; i<self.props.mapHeight; i++) {
            for (var ii=0; ii<self.props.mapLength; ii++) {
                var key = ii + "-" + i;
                cells.push(
                    <Cell key={key} y={i} x={ii} />
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