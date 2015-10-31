export default (initialState, handlers) => {
    return (state = initialState, action = null) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
};
