import React from 'react';
import Cell from './cell';
import ObjectService from './services/object-service';

var Canvas = React.createClass({

    renderCells() {
        var cells = [];
        var self = this;
        var cellCounter = 0;
        for (var i=0; i<self.props.mapHeight; i++) {
            for (var ii=0; ii<self.props.mapLength; ii++) {

                cells.push(
                    <Cell key={cellCounter} y={i} x={ii} showBorders={this.props.showBorders} wallOpacity={this.props.wallOpacity} />
                )
                cellCounter++;
            }
        }
        return cells;
    },

    render() {

        var dynamicStyles = {
            backgroundImage: (this.props.useBackgroundImage) ? "url(/images/"+this.props.backgroundImage+")" : "none",
            width: (this.props.mapLength * 16),
            height: (this.props.mapHeight * 16)
        };

        return (
            <div style={dynamicStyles} className="canvas">
                {this.renderCells()}
            </div>
        );
    }
});

export default Canvas;