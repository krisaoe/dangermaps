import React from 'react';
import './style/interface.styl';
import MenuBar from './menu-bar';
import Canvas from './canvas';

var RootComponent = React.createClass({


    getInitialState() {
        return {
            mapWidth: 10,
            mapHeight: 6
        }
    },

    adjustMapDimensions(width, height) {
        this.setState({
            mapWidth: width,
            mapHeight: height
        })
    },

    render() {
        return (
            <div>
                <MenuBar adjustMapDimensions={this.adjustMapDimensions} />
                <Canvas mapLength={this.state.mapWidth} mapHeight={this.state.mapHeight} />
            </div>
        );
    }
});

React.render(<RootComponent />, document.body);