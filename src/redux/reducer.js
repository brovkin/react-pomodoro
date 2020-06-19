const initialState = {
    workMinutes: 15,
    restMinutes: 5,
    settings: {
        work: 0,
        rest: 0,
    },
    seconds: 0,
    isWork: false,
    isPause: false,
    isRest: false,
    saveSettings: false
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SAVE_SETTINGS':
            console.log(action.payload);
            return {
                ...state,
                isWork: true,
                saveSettings: true,
                settings: action.payload
            };
        case 'START':
            return {
                ...state,
                isPause: false,
                workMinutes: state.workMinutes,
                seconds: state.seconds - 1
            };
        case 'CONTINUE':

            console.log('CONTINUE', state, action);
            return {
                ...state,
                isWork: true,
                isPause: false,
            };

        case 'PAUSE':
            console.log('PAYLOAD', action.payload);
            return {
                ...state,
                settings: action.payload,
                isWork: false,
                isPause: true,
            };
        case 'STOP':
            return {
                ...initialState
            };
        case 'SUB_MINUTE':
            return {
                ...state,
                workMinutes: state.workMinutes - 1,
                seconds: 59
            };

        case 'ADD_WORK_MINUTE':
            return {
                ...state,
                workMinutes: state.workMinutes + 1,
            };
        case 'SUB_WORK_MINUTE':
            return {
                ...state,
                workMinutes: state.workMinutes - 1,
            };

        case 'ADD_REST_MINUTE':
            return {
                ...state,
                restMinutes: state.restMinutes + 1,
            };
        case 'SUB_REST_MINUTE':
            return {
                ...state,
                restMinutes: state.restMinutes - 1,
            };
        default:
            return state;

    }
    return state;
}

export default reducer;
