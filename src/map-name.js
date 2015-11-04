import React from 'react';
import FirebaseService from './services/firebase-service';
import MStore from './services/mapmaker-datastore';

var MapName = React.createClass({
    getInitialState() {
      return {
          isEditing: false
      }
    },

    toggleEditing() {
        var self = this;
      this.setState({
          isEditing: !this.state.isEditing
      }, function() {
         /* Focus if now editing */
          if (self.state.isEditing) {
              self.refs.editNameInput.getDOMNode().focus();
          }
      });
    },

    handleUpdateName() {
        var self = this;
        var userInputValue = this.refs.editNameInput.getDOMNode().value
        var fs = new FirebaseService();

            fs.updateCurrentMap({
                "name": userInputValue
            });

            /* This is a pattern of making local updates */
            /* Does not wait on Firebase */

            var alteredMapData = MStore.get('currentMap');
            alteredMapData.name = userInputValue

            MStore.set('currentMap', alteredMapData);

            self.setState({
                isEditing: false
            });
    },

    renderEditingState() {
      return (
          <div>
              <form onSubmit={this.handleUpdateName}>
                <input ref="editNameInput" defaultValue={this.props.name} placeholder="Change the name..." />
              </form>
              <button onClick={this.toggleEditing}>Cancel</button>
          </div>
      )
    },

    render() {
        if (this.state.isEditing) {
            return this.renderEditingState();
        }

        return (
            <div>
                <div>
                    <span style={style.title}>{this.props.name}</span>
                    <span>
                        <button onClick={this.toggleEditing}>Edit</button>
                    </span>
                </div>
                <div>
                    <span>{this.props.id}</span>
                </div>
            </div>
        );
    }
});

var style = {
    title: {
        fontWeight: 'bold',
        fontSize: '1.8em',
    }
}

export default MapName;