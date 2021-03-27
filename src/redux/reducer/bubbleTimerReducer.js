import * as bubbleTimerActionType from "../actionsType/bubbleTimerActionType";

export default (state = {}, action) => {
    switch (action.type) {
        case bubbleTimerActionType.OPEN_BUBBLE_TIMER:
            console.log('inreducer', action.payload)
            return {
                isOpen: action.payload.taskStatus,
            };
        case bubbleTimerActionType.CLOSE_BUBBLE_TIMER:
            return { isOpen: action.payload };
        case bubbleTimerActionType.SET_BUBBLE_TIMER_DATA:
            return { timerData: action.payload };
        case bubbleTimerActionType.SET_TASK_ID:
            return { taskId: action.payload };
        case bubbleTimerActionType.PAUSE_BUBBLE_TIMER:
            return { isPause: action.payload };
        case bubbleTimerActionType.COMPLETE_BUBBLE_TIMER:
            return { isComplete: action.payload };
        default:
            return state;
    }
};

