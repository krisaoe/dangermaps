import React from 'react';
import Firebase from 'firebase';
import './style/interface.styl';
import MenuBar from './menu-bar';
import ToolMenu from './tool-menu';
import Canvas from './canvas';
import MapOpener from './map-opener';
import MapName from './map-name';
import ObjectService from './services/object-service';
import MStore from './services/mapmaker-datastore';
import FirebaseService from './services/firebase-service';


var RootComponent = React.createClass({

    getInitialState() {
        return {
            /*  */
            isDataLoaded: false,
            mapData: [], /* The maps from Firebase */

            /* Canvas viewing options */
            showGridLines: MStore.get('showGridLines'),
            wallOpacity: MStore.get('wallOpacity'),

            useBackgroundImage: MStore.get('useBackgroundImage'),
            backgroundImage: null,

            mapWidth: 0,//ObjectService.get().width,
            mapHeight: 0,//ObjectService.get().height,

            currentMap: null /* The map you are currently working on */
        }
    },

    componentWillMount() {
        var self = this;

        FirebaseService.getAllMaps(function(mapArray) {
            self.setState({
                isDataLoaded: true,
                mapData: mapArray
            })
        });

        /* Listen for currentMap to change */
        MStore.listen('currentMap', function(newValue) {
            self.loadMap(newValue)
        });
    },

    loadMap(map) {
        console.log('LOADING', map)
        this.setState({
            currentMap: map,
            backgroundImage: map.backgroundImage || ""
        }, function() {

            if (map) {
                //adjust current view with newly loaded Map's values
                this.adjustMapDimensions(map.width, map.height);
                this.refs.backgroundImageInput.getDOMNode().value = this.state.backgroundImage;
                MStore.set('currentMapWalls', map.walls || []);
            }

        })
    },

    saveMap() {
        var newMapState = {
            width: parseInt(this.state.mapWidth),
            height: parseInt(this.state.mapHeight),
            backgroundImage: (this.state.backgroundImage),
            walls: MStore.get('currentMapWalls') || []
        }

        FirebaseService.updateCurrentMap(newMapState, function() {
            console.log('SAVED');
        });
    },

    closeMap() {
        this.setState({
            currentMap: null
        }, function() {
            MStore.set('currentMap', null)
        })
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

    changeBackgroundImage(newValue) {
        this.setState({
            backgroundImage: this.refs.backgroundImageInput.getDOMNode().value
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

    renderEmptyMapState() {
        return (
            <div>
                Open a map to get started!
            </div>
        )
    },

    renderMapInterface() {
        return (
            <div className="world">
                <div className="flexy-workspace">
                    <div>
                        <MapName name={this.state.currentMap.name} id={this.state.currentMap.id} />

                        <button onClick={this.saveMap}>Save Map</button>
                        <button onClick={this.closeMap}>Close Map</button>
                    </div>
                    <div>
                        Background Image
                        <input initialValue={this.state.backgroundImage} ref="backgroundImageInput" onChange={this.changeBackgroundImage} />
                    </div>
                    <MenuBar
                        useBackgroundImage={this.state.useBackgroundImage}
                        toggleUseBackgroundImage={this.toggleUseBackgroundImage}
                        adjustWallOpacity={this.adjustWallOpacity}
                        showGridLines={this.state.showGridLines}
                        toggleShowBorders={this.toggleShowBorders}
                        adjustMapDimensions={this.adjustMapDimensions}
                        defaultMapWidth={this.state.mapWidth}
                        defaultMapHeight={this.state.mapHeight}
                    />
                    <Canvas
                        initialWalls={this.state.currentMap.walls}
                        wallOpacity={this.state.wallOpacity}
                        showGridLines={this.state.showGridLines}
                        useBackgroundImage={this.state.useBackgroundImage}
                        backgroundImage={this.state.backgroundImage}
                        mapLength={this.state.mapWidth}
                        mapHeight={this.state.mapHeight}
                    />
                </div>
                <div className="flexy-workspace collapsed">

                </div>
                <div className="toolbar-column">
                    <ToolMenu />
                </div>
            </div>
        )
    },

    render() {
        if (this.state.isDataLoaded) {

            var mapInterface = (this.state.currentMap) ? this.renderMapInterface() : this.renderEmptyMapState();

            return (
                <div>
                    <MapOpener maps={this.state.mapData} />
                    <hr />
                    {mapInterface}
                </div>
            )
        }
        return (
            <div>LOADING...</div>
        )
    }
});

React.render(<RootComponent />, document.body);