import React from 'react';
import {render} from 'react-dom';
import App from './component/App';
import {Provider} from 'react-redux';
import reducer from './model/reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducer);

render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('app'));
