import React from 'react';
import ObjectService from './services/object-service';
import MStore from './services/mapmaker-datastore';
import UniqueId from './services/unique-id';

var Cell = React.createClass({

    handleObjectEdit() {

        var me = {
            x: this.props.x,
            y: this.props.y
        };

        if (this.props.isWall) {
            //console.log('onDeac')
            this.props.onDeactivation(me);
        } else {

            me.id = UniqueId('wall');
            me.type = "wall";
            this.props.onActivation(me);
        }
    },

    render() {
        var wallOpacity = this.props.wallOpacity;
        var style = {
            width:16,
            height:16,
            position: 'absolute',
            border: (this.props.showBorders && !this.props.isWall) ? '1px solid rgba(0,0,0,0.3)' : 0,
            left: (this.props.x * 16),
            top: (this.props.y * 16),
            background: (this.props.isWall) ? "url(/images/ui/wall.png)" : "rgba(255,255,255,0)",
            opacity: this.props.wallOpacity
        }

        return (
            <div className="canvas-cell" onClick={this.handleObjectEdit} style={style}>
            </div>
        );
    }
});

export default Cell;