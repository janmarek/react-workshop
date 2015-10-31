import React from 'react';

class Name extends React.Component {

    render() {
        const count = this.props.repeat;

        const els = [];

        for (var i = 0; i < count; i++) {
            els.push('"' + this.props.name + '"');
        }

        return <span>{els.join(', ')}</span>;
    }

}

export default Name;
