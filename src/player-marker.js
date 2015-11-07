import React from 'react';
import MStore from './services/mapmaker-datastore';


var PlayerMarker = React.createClass({

    getInitialState() {
        return {
            x: 2,
            y: 0,
            dir: "down"
        }
    },

    componentWillMount() {
        var self = this;
        MStore.listen('currentMapPlayerParams', function(newValue) {
            self.setState({
                x: newValue.initialX,
                y: newValue.initialY,
                dir: newValue.initialDir
            })
        });
    },

    getStyle() {
        return {
            left: (this.state.x * 16),
            top: (this.state.y * 16)
        }
    },

    render() {
        return (
            <div style={this.getStyle()} className="player-marker">
            </div>
        );
    }
});

export default PlayerMarker;