import React from 'react';
import './style/toolmenu.styl';

var ToolMenu = React.createClass({

    renderItem() {

    },

    render() {
        return (
            <div className="toolmenu">
                <div className="toolmenu-option-group">
                    <a href="#" className="toolmenu-option toolmenu-option-hank">Selector</a>
                </div>
                <div className="toolmenu-option-group">
                    <a href="#" className="toolmenu-option toolmenu-option-hank">Hank</a>
                    <a href="#" className="toolmenu-option toolmenu-option-hank">Walls</a>
                    <a href="#" className="toolmenu-option toolmenu-option-hank">Battle Zones</a>
                </div>
                <div className="toolmenu-option-group">
                    <a href="#" className="toolmenu-option toolmenu-option-hank">Signs</a>
                    <a href="#" className="toolmenu-option toolmenu-option-hank">NPCs</a>
                    <a href="#" className="toolmenu-option toolmenu-option-hank">Exits</a>
                </div>
            </div>
        );
    }
});

export default ToolMenu;