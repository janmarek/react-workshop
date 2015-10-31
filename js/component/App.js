import React from 'react';
import {connect} from 'react-redux';
import Name from './Name';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

    constructor() {
        super();
        this.state = {clicked: 0};
    }

    click() {
        const clicked = this.state.clicked;

        this.setState({
            clicked: clicked + 1,
        });
    }

    render() {
        return <div className="container">
            <h1>
                Hello {/* nazdar */}
                {' '}
                <Name name="Honza" repeat={3} />
            !</h1>
            <p>
                clicked: {this.state.clicked}
                {' '}
                <a onClick={this.click.bind(this)}>Click</a>
            </p>
        </div>;
    }

}

export default App;
