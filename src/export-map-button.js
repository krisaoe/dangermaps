import React from 'react';
import FirebaseService from './services/firebase-service';

var ExportMapButton = React.createClass({

    exportMap() {
        window.open( FirebaseService.getCurrentMapJsonLink() ,'_blank');
    },

    render() {
        return (
            <button className="btn" onClick={this.exportMap}>Export</button>
        );
    }
});

export default ExportMapButton;