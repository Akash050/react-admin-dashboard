import React from "react";
import imgMap from "../../../assets/images/img-map.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CImg } from "@coreui/react";
import pausebtn from "../../../assets/icons/pause.svg"
import completebtn from "../../../assets/icons/complete.svg"
import { getTopThreeTasks } from "../../../redux/actions/taskAction";
import * as bubbleTimerActionTypes from "../../../redux/actionsType/bubbleTimerActionType";
import { changeTaskStatus } from "../../../redux/actions/bubbleTimer";
const BubbleTimer = () => {
    const dispatch = useDispatch();
    const { taskId } = useSelector((state) => ({
        taskId: state.bubbleTimer.taskId,
    }));
    const getTaskTime = (val) => {
        const d = new Date(val).toDateString();
        console.log("ddd", d);
        let temp = d.substr(4, 6) + "," + d.substr(11);
        return temp;
    };

    const handlePause = async () => {
        let date = new Date();
        date.toISOString();
        const params = {
            "taskTime": date,
            "taskStatus": "pause",
            "task": {
                "id": taskId
            }
        }
        const data = await dispatch(changeTaskStatus(params));
        if (data.success === true) {
            console.log('success')
        } else {
            console.log("err");
        }

    };
    const handleComplete = async (e, val) => {
        e.preventDefault();
        // dispatch({
        //     type: bubbleTimerActionTypes.PAUSE_BUBBLE_TIMER,
        //     payload: true,
        // });
    };
    useEffect(() => {
        async function getTopThreeTask() {
            dispatch(getTopThreeTasks());
        }
        getTopThreeTask();
    }, []);

    return (
        <div className="bubble-container">
            <div className="bubble-title">
                Client Proposal Ready
            </div>
            <div className="bubble-timer">
                <div className="bubble-timer-hour">
                    4
                   <div className="bubble-timer-subtitle">
                        HOURS
                    </div>
                </div>
                <div className="bubble-timer-min">
                    3
                    <div className="bubble-timer-subtitle">
                        MIN
                    </div>
                </div>
                <div className="bubble-timer-sec">
                    45
                    <div className="bubble-timer-subtitle">
                        SEC
                    </div>
                </div>
            </div>
            <div className="bubble-pause" onClick={() => handlePause()}>
                <CImg src={pausebtn} fluid />
            </div>
            <div className="bubble-complete" onClick={(e, val) => handleComplete(e, val)}>
                <CImg src={completebtn} fluid />
            </div>
        </div>
    );
};

export default React.memo(BubbleTimer);
