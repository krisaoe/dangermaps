import React from 'react';
import './style/interface.styl';
import MenuBar from './menu-bar';
import ToolMenu from './tool-menu';
import Canvas from './canvas';
import ObjectService from './services/object-service';
import MStore from './services/mapmaker-datastore';

var RootComponent = React.createClass({


    getInitialState() {
        return {
            /* Canvas viewing options */
            showGridLines: MStore.get('showGridLines'),
            wallOpacity: MStore.get('wallOpacity'),
            useBackgroundImage: MStore.get('useBackgroundImage'),

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
            showGridLines: !this.state.showGridLines
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
                        <MenuBar useBackgroundImage={this.state.useBackgroundImage} toggleUseBackgroundImage={this.toggleUseBackgroundImage} adjustWallOpacity={this.adjustWallOpacity} showGridLines={this.state.showGridLines} toggleShowBorders={this.toggleShowBorders} adjustMapDimensions={this.adjustMapDimensions} defaultMapWidth={this.state.mapWidth} defaultMapHeight={this.state.mapHeight} />
                        <Canvas wallOpacity={this.state.wallOpacity} showGridLines={this.state.showGridLines} useBackgroundImage={this.state.useBackgroundImage} backgroundImage={ObjectService.get().backgroundImage} mapLength={this.state.mapWidth} mapHeight={this.state.mapHeight} />
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