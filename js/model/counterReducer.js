export default (state = 0, action) => {
    if (action.type === 'ADD') {
        return state + action.amount;
    }

    return state;
};
