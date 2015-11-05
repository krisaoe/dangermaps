import React from 'react';
import Cell from './cell';
import ObjectService from './services/object-service';
import MStore from './services/mapmaker-datastore';

var Canvas = React.createClass({

    getInitialState() { /* Trying to keep this a prop */
        return {
            walls: [
                {id: "wall_0", x:1, y:2},
                {id: "wall_1", x:2, y:3},
                {id: "wall_2", x:3, y:4},
                {id: "wall_3", x:1, y:5}
            ]
        }
    },

    handleAddCell(cell) {
        this.setState({
            walls: this.state.walls.concat([cell])
        })
    },

    handleRemoveCell(cell) {
        var notRemoved = this.state.walls.filter(function(wall) {
           return (cell.x != wall.x && !cell.y != wall.y)
        });

        this.setState({
            walls: notRemoved
        })
    },


    renderCells() {
        var cells = [];
        var self = this;
        var cellCounter = 0;
        for (var i=0; i<self.props.mapHeight; i++) {
            for (var ii=0; ii<self.props.mapLength; ii++) {


                var isWall = self.state.walls.filter(function(wall,index) {
                    return (i == wall.y && ii == wall.x)
                }).length > 0;

                cells.push(
                    <Cell key={cellCounter} y={i} x={ii} isWall={isWall} onActivation={this.handleAddCell} onDeactivation={this.handleRemoveCell} showBorders={this.props.showGridLines} wallOpacity={this.props.wallOpacity} />
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