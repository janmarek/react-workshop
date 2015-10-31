import * as weatherActions from './weatherActions';

const defaultData = {
    query: null,
    weather: null,
};

export default (state = defaultData, action) => {
    if (action.type === weatherActions.SEARCH) {
        return Object.assign({}, state, {
            query: action.query,
        });
    }

    if (action.type === weatherActions.SAVE_DATA) {
        return Object.assign({}, state, {
            weather: action.data,
        });
    }

    return state;
};
