const initialState = {
    workMinutes: 15,
    restMinutes: 5,
    settings: {
        work: 0,
        rest: 0,
    },
    seconds: 0,
    tomato: 0,
    isWork: false,
    isPause: false,
    isRest: false,
    saveSettings: false
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SAVE_SETTINGS':
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
                restMinutes: state.restMinutes,
                seconds: state.seconds - 1
            };
        case 'CONTINUE':
            return {
                ...state,
                settings: state.settings,
                isWork: true,
                isPause: false,
            };

        case 'PAUSE':
            return {
                ...state,
                settings: action.payload.settings,
                isRest: action.payload.status,
                isWork: false,
                isPause: true,
            };
        case 'STOP':
            return {
                ...initialState,
            };
        case 'CHANGE_REST':
            return {
                ...state,
                settings: state.settings,
                workMinutes: state.settings.work,
                isRest: true,
            };
        case 'CHANGE_WORK':
            return {
                ...state,
                settings: state.settings,
                restMinutes: state.settings.rest,
                isRest: false,
                isWork: false,
            };

        case 'SUB_MINUTE':
            return {
                ...state,
                workMinutes: state.workMinutes - 1,
                seconds: 59
            };
        case 'SUB_MINUTE_REST':
            return {
                ...state,
                restMinutes: state.restMinutes - 1,
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
        case 'ADD_TOMATO':
            return {
                ...state,
                tomato: state.tomato + 1
            };
        default:
            return state;

    }
}

export default reducer;
