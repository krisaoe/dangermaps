import React from 'react';

var Tool = React.createClass({
    render() {

        var icon = (this.props.icon) ? (<img src={'/images/ui/'+this.props.icon} />) : null;

        if (this.props.label == "Walls" /* TEMPORARY */ ) {
            style.background = "#3498db";
            style.color = "#fff";
        } else {
            style.background = "#fff";
            style.color = "#333"
        }

        return (
            <a href="#" style={style}>
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