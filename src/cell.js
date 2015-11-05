import React from 'react';
import ObjectService from './services/object-service';
import MStore from './services/mapmaker-datastore';

var Cell = React.createClass({

    handleObjectEdit() {

        var me = {
            x: this.props.x,
            y: this.props.y
        }

        if (this.props.isWall) {
            //console.log('onDeac')
            this.props.onDeactivation(me);
        } else {
            //console.log('onAct')
            this.props.onActivation(me);
        }
    },

    render() {
        var wallOpacity = this.props.wallOpacity;
        var style = {
            width:16,
            height:16,
            position: 'absolute',
            border: (this.props.showBorders) ? '1px solid rgba(0,0,0,0.3)' : 0,
            left: (this.props.x * 16),
            top: (this.props.y * 16),
            background: (this.props.isWall) ? "rgba(0,0,0,"+wallOpacity+")" : "rgba(255,255,255,0)"
        }

        return (
            <div className="canvas-cell" onClick={this.handleObjectEdit} style={style}>
            </div>
        );
    }
});

export default Cell;