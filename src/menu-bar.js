import React from 'react';

var MenuBar = React.createClass({

    handleDimensionsChange(e) {
        var newWidth = this.refs.widthInput.getDOMNode().value;
        var newHeight = this.refs.heightInput.getDOMNode().value;
        this.props.adjustMapDimensions(newWidth, newHeight )
    },

    render() {
        return (
            <div style={style}>
                <div>
                    <form onChange={this.handleDimensionsChange}>
                        <input ref="widthInput" type="number" min="0" defaultValue={10} />
                        <input ref="heightInput" type="number" min="0" defaultValue={6}  />
                    </form>
                </div>
            </div>
        );
    }
})

var style = {
    background: '#fff',
    padding: '1em',
    boxShadow:'0px 2px 4px 0px #CCCCCC'
}

module.exports = MenuBar;