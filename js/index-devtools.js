import React from 'react';
import {render} from 'react-dom';
import App from './component/App';
import {Provider} from 'react-redux';
import reducer from './model/reducer';

// Redux utility functions
import {compose, createStore, applyMiddleware} from 'redux';
// Redux DevTools store enhancers
import {devTools, persistState} from 'redux-devtools';
// React components for Redux DevTools
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

render(<div>
    <Provider store={store}>
        <App />
    </Provider>
    <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
</div>, document.getElementById('app'));
