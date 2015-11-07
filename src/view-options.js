import React from 'react';

var ViewOptions = React.createClass({
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
            <div>
                <form>
                    <label>Show Grid Lines</label>
                    <input type="checkbox" checked={this.props.showGridLines} onChange={this.handleToggleShowBorders} />
                </form>
                <form>
                    <label>Show Map Image</label>
                    <input type="checkbox" checked={this.props.useBackgroundImage} onChange={this.handleToggleUseBackgroundImage} />
                </form>
                <form>
                    <label>Wall Opacity</label>
                    <input ref="wallOpacityInput" onChange={this.handleOpacityChange} type="range" min="0" max="1" step="0.05" defaultValue={0.9} />
                </form>
            </div>
        );
    }
});

export default ViewOptions;