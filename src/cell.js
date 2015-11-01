import React from 'react';
import ObjectService from './services/object-service';


var Cell = React.createClass({

    getInitialState() {
        return {
            isFree: true
        }
    },

    handleObjectEdit() {
        this.setState({
            isFree: !this.state.isFree
        })
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
            background: (this.state.isFree) ? "rgba(255,255,255,0)" : "rgba(0,0,0,"+wallOpacity+")"
        }

        return (
            <div onClick={this.handleObjectEdit} style={style}>
            </div>
        );
    }
});

export default Cell;