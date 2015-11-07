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

    getDirectionSpritePosition() {
        if (this.state.dir == "left") { return 32; }
        if (this.state.dir == "right") { return 0; }
        if (this.state.dir == "up") { return 16; }
        if (this.state.dir == "down") { return 48; }
    },

    getStyle() {
        return {
            backgroundPositionX: this.getDirectionSpritePosition(),
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