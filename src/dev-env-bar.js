import React from 'react';
import ENV from './env';

var DevEnvBar = React.createClass({
    render() {
        if (ENV.isDev) {
            return (
                <div style={style}>
                    YOU ARE IN DEV MODE
                </div>
            );
        }

        return null;
    }
});

var style = {
    backgroundColor: '#fcf8e3',
    color: '#8a6d3b',
    borderBottom: '1px solid #faebcc',
    padding: '0.5em',
    fontSize: 14,
    textAlign: 'center'
}


export default DevEnvBar;