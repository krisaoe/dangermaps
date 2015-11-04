import React from 'react';
import Firebase from 'firebase';
import MStore from './services/mapmaker-datastore';
import Map from './models/map';

var MapOpener = React.createClass({

    getDefaultProps() {
        return {
            maps: []
        }
    },

    getInitialState() {
        return {
            isCreatingNew: false
        }
    },

    componentDidMount() {

        /* RELOAD LAST KNOWN MAP */
        var lastOpenedMap = localStorage.getItem('lastOpenedMap');
        if (lastOpenedMap) {
            this.openMap(lastOpenedMap);
        }
    },

    openMap(mapId) {
        var selectedMap = this.props.maps.filter(function(map) {
            return map.id == mapId;
        })[0];

        MStore.set('currentMap', selectedMap);
        localStorage.setItem('lastOpenedMap', mapId);
    },


    handleOpenMapSelectbox() {
        var value = this.refs.mapSelectBox.getDOMNode().value;
        this.openMap(value);
    },

    handleCreateNewMap() {
        var self = this;
        var mapName = self.refs.newMapName.getDOMNode().value;
        if (mapName.length > 0) {
            var fb = new Firebase("https://dangerstudio.firebaseio.com/maps");
            var newMap = new Map({name: mapName});

            fb.child(newMap.id).set(newMap, function () {
                self.refs.newMapName.getDOMNode().value = ""; /* This thing would probably go away anyway */
                MStore.set('currentMap', newMap); //send local copy to the editor
            });

        } else {
            console.log('cant be empty')
        }
    },

    handleToggleIsCreatingNew() {
      this.setState({
          isCreatingNew: !this.state.isCreatingNew
      })
    },

    renderCreateNewForm() {
        return (
            <div >
                <a href="#" onClick={this.handleToggleIsCreatingNew} >Close</a>
                <form onSubmit={this.handleCreateNewMap}>
                    <label>Map Name</label>
                    <input ref="newMapName" placeholder="Map Name" />
                    <input type="submit" value="Create New Map"/>
                </form>
            </div>
        )
    },

    renderMapOptions() {
      return this.props.maps.map(function(d, i) {
          return (
              <option key={i} value={d.id}>{d.name}</option>
          )
      });
    },
    render() {
        var createNewMapForm = (this.state.isCreatingNew)
            ? this.renderCreateNewForm()
            : (<div><a href="#" onClick={this.handleToggleIsCreatingNew} >...or Create New Map</a></div>);

        return (
            <div>
                Open a map:
                <select ref="mapSelectBox" onChange={this.handleOpenMapSelectbox}>
                    <option disabled selected>Choose Map</option>
                    {this.renderMapOptions()}
                </select>
                {createNewMapForm}
            </div>
        );
    }
});

export default MapOpener;