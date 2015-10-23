import React from 'react';
import './style/interface.styl';
import MenuBar from './menu-bar';
import Cell from './menu-bar';

class RootComponent extends React.Component {

    getInitialState() {
        return {
            mapLength: 50, /* in cells */
            mapHeight: 20 /* in cells */
        }
    }

    renderCells() {

    }

    render() {
        return (
            <div>
                <MenuBar />
                {renderCells()}
            </div>
        );
    }
}

React.render(<RootComponent />, document.body);