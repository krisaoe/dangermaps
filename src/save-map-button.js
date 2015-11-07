import React from 'react';
import MStore from './services/mapmaker-datastore';

var SaveMapButton = React.createClass({

    getInitialState() {
      return {
          isDirty: false
      }
    },

    componentWillMount() {
        var self = this;

        /* These do the same thing. It would be sweet if .when accepted an array */
        MStore.when('wallsChanged', function() {
            self.setState({
                isDirty: true
            })
        });
        MStore.when('playerParametersChanged', function() {
            self.setState({
                isDirty: true
            })
        });
    },

    handleClick(e) {
        e.preventDefault();
        this.props.onSave();

        this.setState({
            isDirty: false
        })
    },

    render() {
        var disabled = (this.state.isDirty) ? "" : "disabled";
        return (
            <button className="btn" disabled={disabled} onClick={this.handleClick}>Save</button>
        )
    }
});

var style = {
    btn: {
    },
    badge: {
        position:'absolute',
        right:-5,
        top:-5,
        background: '#333',
        color: '#fff',
        width: 20,
        height: 20,
        lineHeight: '18px',
        textAlign: 'center',
        borderRadius: "50%"
    }
}

export default SaveMapButton;