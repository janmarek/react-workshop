import React from 'react';
import {connect} from 'react-redux';
import Name from './Name';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

    render() {
        return <div className="container">
            <h1>
                Hello
                {' '}
                <Name name="Honza" repeat={3} />
            !</h1>
        </div>;
    }

}

export default App;
