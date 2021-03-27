import * as taskTimerActionType from "../actionsType/taskTimerActionType";

export default (state = [], action) => {
    switch (action.type) {
        case taskTimerActionType.START_TIMER:
            console.log("create reducer", action.payload);
            return action.payload
        case taskTimerActionType.STOP_TIMER:
            return action.payload;
        case taskTimerActionType.PAUSE_TIMER:
            return action.payload;
        case taskTimerActionType.CLEAR_TIMER:
            return action.payload;
        default:
            return state;
    }
};
