import React from 'react';
import Firebase from 'firebase';
import './style/interface.styl';
import MapParameters from './map-parameters';
import PlayerParameters from './player-parameters';
import ToolMenu from './tool-menu';
import Canvas from './canvas';
import ViewOptions from './view-options';
import MapOpener from './map-opener';
import MapName from './map-name';
import SaveMapButton from './save-map-button';
import DevEnvBar from './dev-env-bar';
import ExportMapButton from './export-map-button';
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

            mapOffsetX: 0,
            mapOffsetY: 0,

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
                this.adjustMapDimensions(map.width, map.height, map.offsetX, map.offsetY);
                this.refs.backgroundImageInput.getDOMNode().value = this.state.backgroundImage;
                MStore.set('currentMapWalls', map.walls || []);
                MStore.set('currentMapPlayerParams', map.player || {});
            }

        })
    },

    saveMap() {
        var newMapState = {
            width: parseInt(this.state.mapWidth),
            height: parseInt(this.state.mapHeight),
            offsetX: parseInt(this.state.mapOffsetX),
            offsetY: parseInt(this.state.mapOffsetY),
            backgroundImage: (this.state.backgroundImage),
            walls: MStore.get('currentMapWalls') || [],
            player: MStore.get('currentMapPlayerParams') || {}
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

    adjustMapDimensions(width, height, mapOffsetX, mapOffsetY) {
        this.setState({
            mapWidth: width,
            mapHeight: height,
            mapOffsetX: mapOffsetX,
            mapOffsetY: mapOffsetY
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
                            <h3>Player</h3>
                            <PlayerParameters />

                        <h3>Map Size & Image</h3>

                        <MapParameters
                            adjustMapDimensions={this.adjustMapDimensions}
                            defaultMapWidth={this.state.mapWidth}
                            defaultMapHeight={this.state.mapHeight}
                            defaultMapOffsetX={this.state.mapOffsetX}
                            defaultMapOffsetY={this.state.mapOffsetY}
                        />
                        <div>
                            Background Image
                            <input initialValue={this.state.backgroundImage} ref="backgroundImageInput" onChange={this.changeBackgroundImage} />
                        </div>
                        <Canvas
                            initialWalls={this.state.currentMap.walls}
                            wallOpacity={this.state.wallOpacity}
                            showGridLines={this.state.showGridLines}
                            useBackgroundImage={this.state.useBackgroundImage}
                            backgroundImage={this.state.backgroundImage}
                            mapLength={this.state.mapWidth}
                            mapHeight={this.state.mapHeight}
                            mapOffsetX={this.state.mapOffsetX}
                            mapOffsetY={this.state.mapOffsetY}
                        />
                    </div>
                    <div className="flexy-workspace collapsed">
                    </div>
                    <div className="toolbar-column">
                        <div className="fixed-container">
                            <ToolMenu />
                            <ViewOptions
                                useBackgroundImage={this.state.useBackgroundImage}
                                toggleUseBackgroundImage={this.toggleUseBackgroundImage}
                                adjustWallOpacity={this.adjustWallOpacity}
                                showGridLines={this.state.showGridLines}
                                toggleShowBorders={this.toggleShowBorders}
                            />
                        </div>
                    </div>
            </div>
        )
    },

    renderName() {
        return (this.state.currentMap)
            ? <MapName name={this.state.currentMap.name} id={this.state.currentMap.id} />
            : null;
    },

    renderTopBar() {
        return (
            <div className="topbar">
                <div className="topbar-left">
                    <div className="ibm">
                        {this.renderName()}
                    </div>
                    <div className="ibm">
                        <SaveMapButton onSave={this.saveMap} />
                        <ExportMapButton />
                    </div>
                </div>
                <div className="topbar-right">
                        <MapOpener maps={this.state.mapData} />
                </div>
            </div>
        )
    },

    render() {
        if (this.state.isDataLoaded) {

            var mapInterface = (this.state.currentMap) ? this.renderMapInterface() : this.renderEmptyMapState();

            return (
                <div>
                    <DevEnvBar />
                    {this.renderTopBar()}
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