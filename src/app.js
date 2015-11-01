import React from 'react';
import './style/interface.styl';
import MenuBar from './menu-bar';
import ToolMenu from './tool-menu';
import Canvas from './canvas';
import ObjectService from './services/object-service';

var RootComponent = React.createClass({


    getInitialState() {
        return {
            /* Canvas viewing options */
            showBorders: true,
            wallOpacity: 0.7,
            useBackgroundImage: false,

            mapWidth: ObjectService.get().width,
            mapHeight: ObjectService.get().height
        }
    },

    adjustMapDimensions(width, height) {
        this.setState({
            mapWidth: width,
            mapHeight: height
        })
    },

    adjustWallOpacity(newValue) {
        this.setState({
            wallOpacity: newValue
        })
    },

    toggleShowBorders() {
        this.setState({
            showBorders: !this.state.showBorders
        })
    },

    toggleUseBackgroundImage() {
        this.setState({
            useBackgroundImage: !this.state.useBackgroundImage
        })
    },

    render() {
        return (
                <div className="world">
                    <div className="flexy-workspace">
                        {/* This title + id thing will be a component */}
                        <h2>{ObjectService.get().title}</h2>
                        <p>{ObjectService.get().id}</p>
                        <MenuBar useBackgroundImage={this.state.useBackgroundImage} toggleUseBackgroundImage={this.toggleUseBackgroundImage} adjustWallOpacity={this.adjustWallOpacity} showBorders={this.state.showBorders} toggleShowBorders={this.toggleShowBorders} adjustMapDimensions={this.adjustMapDimensions} defaultMapWidth={this.state.mapWidth} defaultMapHeight={this.state.mapHeight} />
                        <Canvas wallOpacity={this.state.wallOpacity} showBorders={this.state.showBorders} useBackgroundImage={this.state.useBackgroundImage} backgroundImage={ObjectService.get().backgroundImage} mapLength={this.state.mapWidth} mapHeight={this.state.mapHeight} />
                    </div>
                    <div className="flexy-workspace collapsed">

                    </div>
                    <div className="toolbar-column">
                        <ToolMenu />
                    </div>
                </div>
        );
    }
});

React.render(<RootComponent />, document.body);