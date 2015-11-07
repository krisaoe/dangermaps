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
        MStore.when('wallsChanged', function() {
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
        var dirtyBadge = (this.state.isDirty) ? (<span style={style.badge}>!</span>) : null;
        return (
            <a style={style.btn} href="#" onClick={this.handleClick}>
                Save
                {dirtyBadge}
            </a>
        );
    }
});

var style = {
    btn: {
        display: 'inline-block',
        padding: '0.4em 1em',
        border: '1px solid #444',
        borderRadius: 3,
        textDecoration: 'none',
        color: '#444',
        position: 'relative'
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