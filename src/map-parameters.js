import React from 'react';

var MapParameters = React.createClass({

    handleDimensionsChange(e) {
        var newWidth = this.refs.widthInput.getDOMNode().value;
        var newHeight = this.refs.heightInput.getDOMNode().value;
        this.props.adjustMapDimensions(newWidth, newHeight )
    },

    render() {
        return (
            <div style={style}>
                <div className="ibm">
                    <div>
                        <input style={dimInputStyle} ref="widthInput" type="number" min="0" onChange={this.handleDimensionsChange} value={this.props.defaultMapWidth} />
                        <span style={dimXStyle}>&times;</span>
                        <input style={dimInputStyle} ref="heightInput" type="number" min="0" onChange={this.handleDimensionsChange} value={this.props.defaultMapHeight}  />
                    </div>
                </div>
            </div>
        );
    }
})

var style = {
    //background: '#fff',
     //padding: '1em',
    //boxShadow:'0px 2px 4px 0px #CCCCCC'
}
var dimInputStyle = {
    display: "inline-block",
    width: 40,
    textAlign: "center",
}
var dimXStyle = {
    display: "inline-block",
    margin: "0 0.3em"
}

export default MapParameters;