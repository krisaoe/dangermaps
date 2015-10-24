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
        var style = {
            width:16,
            height:16,
            position: 'absolute',
            border: '1px solid #ddd',
            left: (this.props.x * 16),
            top: (this.props.y * 16),
            background: (this.state.isFree) ? "#FFF" : "#333"
        }

        return (
            <div onClick={this.handleObjectEdit} style={style}>
            </div>
        );
    }
});

module.exports = Cell;