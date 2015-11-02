import React from 'react';
import Firebase from 'firebase';
import MStore from './services/mapmaker-datastore';


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

    handleOpenMap() {
        var value = this.refs.mapSelectBox.getDOMNode().value;
        var selectedMap = this.props.maps.filter(function(map) {
            return map.id == value;
        })[0];

        MStore.set('currentMap', selectedMap);
    },

    handleCreateNewMap() {
        var self = this;
        var mapName = self.refs.newMapName.getDOMNode().value;
        if (mapName.length > 0) {
            var fb = new Firebase("https://dangerstudio.firebaseio.com/maps");
            var uniqueId = 'map_' + Math.floor((Math.random() * 999999) + 1);

            var newMap = {
                id: uniqueId, /* copy of FB key */
                name: mapName
            }

            fb.child(uniqueId).set(newMap, function () {
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
                <select ref="mapSelectBox" onChange={this.handleOpenMap}>
                    <option disabled selected>Choose Map</option>
                    {this.renderMapOptions()}
                </select>
                {createNewMapForm}
            </div>
        );
    }
});

export default MapOpener;