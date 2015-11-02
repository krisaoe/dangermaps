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

            mapWidth: ObjectService.get().width,
            mapHeight: ObjectService.get().height,

            currentMap: null /* The map you are currently working on */
        }
    },

    componentWillMount() {
        var self = this;
        var fb = new Firebase("https://dangerstudio.firebaseio.com/");

        /* LOAD THE DATA */
        fb.child("maps").on("value", function(data) { /* Should prob just use "once" but we'll see */
            var dataArray = [];
            data.forEach(function(snap) {
                var obj = snap.val();
                obj.id = snap.key();

                dataArray.push( obj );
            })

            console.log("dataArray", dataArray);

            self.setState({
                isDataLoaded: true,
                mapData: dataArray
            })
        });


        MStore.listen('currentMap', function(newValue) {
            self.loadMap(newValue)
        });
    },

    loadMap(map) {
        this.setState({
            currentMap: map
        })
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
                    {/* This title + id thing will be a component */}
                    <div>
                        <MapName name={this.state.currentMap.name} />
                        <p>{this.state.currentMap.id}</p>
                        <button onClick={this.closeMap}>Close Map</button>
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
                        wallOpacity={this.state.wallOpacity}
                        showGridLines={this.state.showGridLines}
                        useBackgroundImage={this.state.useBackgroundImage}
                        backgroundImage={this.state.currentMap.backgroundImage}
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