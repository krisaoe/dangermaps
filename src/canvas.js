import React from 'react';
import Cell from './cell';
import PlayerMarker from './player-marker';
import ObjectService from './services/object-service';
import MStore from './services/mapmaker-datastore';

var Canvas = React.createClass({

    getInitialState() {
        return {
            walls: this.props.initialWalls || []
        }
    },

    componentWillMount() {
        var self = this;
        MStore.listen("currentMap", function(newValue) {
            var newWalls = (newValue) ? newValue.walls : [];
            console.log('new Map Loaded!', newWalls);
            self.setState({walls: newWalls })
        }, "canvas");
    },

    componentWillUnmount() {
        MStore.stopListening("currentMap", "canvas")
    },

    handleAddWall(cell) {
        this.setState({
            walls: this.state.walls.concat([cell])
        }, this.updateCurrentMapWalls)
    },

    handleRemoveWall(cell) {
        var notRemoved = this.state.walls.filter(function(wall) {
           return (cell.x != wall.x || cell.y != wall.y)
        });

        this.setState({
            walls: notRemoved
        }, this.updateCurrentMapWalls)
    },

    updateCurrentMapWalls() {
        MStore.set('currentMapWalls', this.state.walls);
        MStore.eventHappened('wallsChanged');
    },


    renderCells() {
        var cells = [];
        var self = this;
        var cellCounter = 0;
        for (var i=0; i<self.props.mapHeight; i++) {
            for (var ii=0; ii<self.props.mapLength; ii++) {

                var walls = self.state.walls || [];

                var isWall = walls.filter(function(wall,index) {
                    return (i == wall.y && ii == wall.x)
                }).length > 0;

                cells.push(
                    <Cell key={cellCounter} y={i} x={ii} isWall={isWall} onActivation={this.handleAddWall} onDeactivation={this.handleRemoveWall} showBorders={this.props.showGridLines} wallOpacity={this.props.wallOpacity} />
                )
                cellCounter++;
            }
        }
        return cells;
    },

    render() {

        var backgroundImagePath = (this.props.backgroundImage);

        var dynamicStyles = {
            backgroundImage: (this.props.useBackgroundImage) ? "url("+backgroundImagePath+")" : "none",
            width: (this.props.mapLength * 16),
            height: (this.props.mapHeight * 16)
        };

        return (
            <div style={dynamicStyles} className="canvas">
                {this.renderCells()}
                <PlayerMarker />
            </div>
        );
    }
});

export default Canvas;