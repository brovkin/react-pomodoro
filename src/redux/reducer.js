const initialState = {
    minutes: 29,
    seconds: 59
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'START':
            return {
                minutes: state.minutes,
                seconds: state.seconds - 1
            };
        case 'STOP':
            return {
                ...initialState
            };
        case 'SUB_MINUTE':
            return {
                seconds: initialState.seconds,
                minutes: state.minutes - 1
            }
        default:
            return state;

    }
    return state;
}

export default reducer;
