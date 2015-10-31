import React from 'react';
import {render} from 'react-dom';
import App from './component/App';
import {Provider} from 'react-redux';
import reducer from './model/reducer';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(reducer);

render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('app'));
