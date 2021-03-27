import * as bubbleTimerApis from "../../services/bubbleTimer";
import * as bubbleTimerActionTypes from "../actionsType/bubbleTimerActionType";

export const changeTaskStatus = (params, id) => async (dispatch) => {
    console.log("in action", params);
    const resp = await bubbleTimerApis.changeTaskStatus(params);
    console.log("resp ->> crea", resp);
    if (resp) {
        dispatch({
            type: bubbleTimerActionTypes.SET_TASK_ID,
            payload: id,
        });
        dispatch({
            type: bubbleTimerActionTypes.SET_BUBBLE_TIMER_DATA,
            payload: resp.data.body,
        });
        return resp.data;
    }
};

// export const updateTask = (params) => async (dispatch) => {
//     const resp = await taskApis.updateTask(params);
//     console.log("update resp ->>", resp);
//     dispatch({
//         type: taskActionTypes.UPDATE_TASK,
//         payload: resp.data.body,
//     });
//     return resp.data;
// };

// export const deleteTask = (params) => async (dispatch) => {
//     console.log("params", params);
//     const resp = await taskApis.deleteTask(params);
//     console.log("data", resp.data);
//     dispatch({
//         type: taskActionTypes.DELETE_TASK,
//         payload: params,
//     });
//     return resp.data;
// };

// export const getAllTasks = () => async (dispatch) => {
//     const resp = await taskApis.getTasks();
//     console.log("resp task -->", resp);
//     if (resp) {
//         console.log("resp task -->", resp.data.body.content);
//         dispatch({
//             type: taskActionTypes.ALL_TASKS,
//             payload: resp.data.body.content,
//         });
//     }
// };
// export const getTopThreeTasks = () => async (dispatch) => {
//     const resp = await taskApis.getTopThreeTasks();
//     console.log("resp task -->", resp);
//     if (resp) {
//         console.log("resp task -->", resp.data.body);
//         dispatch({
//             type: taskActionTypes.GET_TOP_THREE_TASKS,
//             payload: resp.data.body,
//         });
//     }
// };

// export const updated = (params) => async (dispatch) => {
//     dispatch({
//         type: taskActionTypes.UPDATED,
//         payload: params,
//     });
//     return;
// };

// export const created = (params) => async (dispatch) => {
//     dispatch({
//         type: taskActionTypes.CREATED,
//         payload: params,
//     });
//     return;
// };
