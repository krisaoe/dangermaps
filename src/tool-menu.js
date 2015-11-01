import React from 'react';
import Tool from './tool-option';
import './style/toolmenu.styl';

var toolGroups = [
    [
        { label: 'Selector', icon:null }
    ],
    [
        { label: 'Hank', icon:'hank.png' },
        { label: 'Walls', icon:'wall.png' },
        { label: 'Battle Zones', icon:'battlezone.png' }
    ],
    [
        { label: 'Signs', icon:null },
        { label: 'NPCs', icon:'npc.png' },
        { label: 'Exits', icon:null }
    ]
]

var ToolMenu = React.createClass({

    renderToolsInGroup(group) {
        return group.map(function(d,i) {
            return (
                <Tool key={i} label={d.label} icon={d.icon} />
            )
        })
    },

    renderToolGroups() {
        /* I'm separating these into groups because I imagine some will have similar behaviors  */
        /* Ex: showing just the map, or showing map & contextual menu side by side */
        var self = this;
        return toolGroups.map(function(group, i) {
            return (
                <div key={i} className="toolmenu-option-group">
                    {self.renderToolsInGroup(group)}
                </div>
            )
        });
    },

    render() {
        return (
            <div className="toolmenu">
                {this.renderToolGroups()}
            </div>
        );
    }
});

export default ToolMenu;