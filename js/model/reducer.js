import {combineReducers} from 'redux';
import counterReducer from './counterReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
    counter: counterReducer,
    weather: weatherReducer,
});

// export default (state = {}, action) => {
//     return {
//         counter: counterReducer(state.counter, action),
//         // ...
//     };
// };
