import React from 'react';
import MStore from './services/mapmaker-datastore';

var PlayerParameters = React.createClass({

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
                    X: <input onChange={this.updatePlayerParameters} defaultValue={1} ref="playerXInput" type="number" min="1" />
                    Y: <input onChange={this.updatePlayerParameters} defaultValue={1} ref="playerYInput" type="number" min="1" />
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