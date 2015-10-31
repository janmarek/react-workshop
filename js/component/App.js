import React from 'react';
import {connect} from 'react-redux';
import Name from './Name';
import {add} from '../model/counterActions';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

    click() {
        const dispatch = this.props.dispatch;

        dispatch(add(4));
    }

    render() {
        return <div className="container">
            <h1>
                Hello {/* nazdar */}
                {' '}
                <Name name="Honza" repeat={3} />
            !</h1>
            <p>
                clicked: {this.props.count}
                {' '}
                <a onClick={this.click.bind(this)}>Click</a>
            </p>
        </div>;
    }

}

App = connect(function (state) {
    return {
        count: state,
    };
})(App);

export default App;
