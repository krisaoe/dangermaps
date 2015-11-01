import React from 'react';
import Tool from './tool-option';
import './style/toolmenu.styl';
import MStore from './services/mapmaker-datastore';

var toolGroups = [
    [
        { label: 'Selector', icon:'default.png' }
    ],
    [
        { label: 'Hank', icon:'hank.png' },
        { label: 'Walls', icon:'wall.png' },
        { label: 'Battle Zones', icon:'battlezone.png' }
    ],
    [
        { label: 'Signs', icon:'sign.png' },
        { label: 'NPCs', icon:'npc.png' },
        { label: 'Exits', icon:'default.png' }
    ]
]

var ToolMenu = React.createClass({

    getInitialState() {
      return {
          currentTool: MStore.get('currentTool')
      }
    },

    componentWillMount() {
        var self = this;
        MStore.listen('currentTool', function(newValue) {
            self.setState({
                currentTool: newValue
            })
        });
    },

    renderToolsInGroup(group) {
        var self = this;
        return group.map(function(d,i) {
            var isActive = (d.label == self.state.currentTool )
            return (
                <Tool key={i} label={d.label} icon={d.icon} isActive={isActive} />
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