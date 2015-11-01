import React from 'react';
import MStore from './services/mapmaker-datastore';

var Tool = React.createClass({

    handleClick(e) {
        e.preventDefault();
        MStore.set('currentTool', this.props.label)
    },

    render() {

        if (this.props.isActive) {
            style.background = "#3498db";
            style.color = "#fff";
        } else {
            style.background = "#fff";
            style.color = "#333"
        }

        return (
            <a href="#" style={style} onClick={this.handleClick}>
                <img style={iconStyle} src={'/images/ui/'+this.props.icon} />
                <span style={labelStyle}>{this.props.label}</span>
            </a>
        );
    }
});

var style = {
    display: 'block',
    textDecoration: 'none',
    padding: '0.5em 1em',
    position: 'relative'
},
    iconStyle = {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    labelStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft:'0.5em'
    }

export default Tool;