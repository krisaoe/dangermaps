import React from 'react';
import MStore from './services/mapmaker-datastore';

var PlayerParameters = React.createClass({


    getInitialState() {
      return {
          shouldRecieveInputValues: true, /* We need to load the new map in */
          defaultXValue: 0,
          defaultYValue: 0
      }
    },

    componentWillMount() {
        var self = this;
        /* Kinda wonky pattern here. Set the DOM values when we know the initial Player Params, then stop doing it. */
        /* This should really live as a prop */



        MStore.listen('currentMapPlayerParams', function(newValue) {

            if (self.state.shouldRecieveInputValues) {
                console.log('update inputs', newValue)
                self.refs.playerXInput.getDOMNode().value = newValue.initialX;
                self.refs.playerYInput.getDOMNode().value = newValue.initialY;
                self.refs.playerDirSelect.getDOMNode().value = newValue.initialDir;
            }


            self.setState({
                shouldRecieveInputValues: false
            });
        })
    },

    updatePlayerParameters() {
      console.log('update them');

        MStore.eventHappened('playerParametersChanged');

        MStore.set('currentMapPlayerParams', {
            initialX: parseInt( this.refs.playerXInput.getDOMNode().value ),
            initialY: parseInt( this.refs.playerYInput.getDOMNode().value ),
            initialDir: this.refs.playerDirSelect.getDOMNode().value
        });

    },

    render() {
        return (
            <div>
                <div>
                    X: <input onChange={this.updatePlayerParameters} defaultValue={this.state.defaultXValue} ref="playerXInput" type="number" min="1" />
                    Y: <input onChange={this.updatePlayerParameters} defaultValue={this.state.defaultYValue} ref="playerYInput" type="number" min="1" />
                </div>
                <div>
                    Direction:
                    <select defaultValue="down" ref="playerDirSelect" onChange={this.updatePlayerParameters} >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="up">Up</option>
                        <option value="down">Down</option>
                    </select>
                </div>
            </div>
        );
    }
});

export default PlayerParameters;