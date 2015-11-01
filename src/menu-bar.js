import React from 'react';

var MenuBar = React.createClass({

    handleDimensionsChange(e) {
        var newWidth = this.refs.widthInput.getDOMNode().value;
        var newHeight = this.refs.heightInput.getDOMNode().value;
        this.props.adjustMapDimensions(newWidth, newHeight )
    },

    handleOpacityChange(e) {
        var newOpacity = this.refs.wallOpacityInput.getDOMNode().value;
        this.props.adjustWallOpacity(newOpacity);
    },

    handleToggleShowBorders() {
        this.props.toggleShowBorders();

    },

    handleToggleUseBackgroundImage() {
        this.props.toggleUseBackgroundImage()
    },

    render() {
        return (
            <div style={style}>
                <div className="ibm">
                    <form onChange={this.handleDimensionsChange}>
                        <input style={dimInputStyle} ref="widthInput" type="number" min="0" defaultValue={this.props.defaultMapWidth} />
                        <span style={dimXStyle}>&times;</span>
                        <input style={dimInputStyle} ref="heightInput" type="number" min="0" defaultValue={this.props.defaultMapHeight}  />
                    </form>
                    <form>
                        <label>Show Grid Lines</label>
                        <input type="checkbox" checked={this.props.showGridLines} onChange={this.handleToggleShowBorders} />
                    </form>
                    <form>
                        <label>Use Map Image</label>
                        <input type="checkbox" checked={this.props.useBackgroundImage} onChange={this.handleToggleUseBackgroundImage} />
                    </form>
                    <form>
                        <label>Wall Opacity</label>
                        <input ref="wallOpacityInput" onChange={this.handleOpacityChange} type="range" min="0.1" max="1" step="0.05" defaultValue={0.7} />
                    </form>
                </div>
                {/*
                <div className="ibm right">
                    <button>EXPORT</button>
                </div>
                */}
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

export default MenuBar;