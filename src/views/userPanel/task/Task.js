import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CButton, CForm, CInput, CModal, CImg } from "@coreui/react";
import taskIcon from "../../../assets/icons/taskIcon.svg";
import pastTaskIcon from "../../../assets/icons/pastTask.svg";
import addTask from "../../../assets/icons/addTaskbtn.svg";
import task from "../../../assets/icons/task.svg";
import titleIcon from "../../../assets/icons/title.svg";
import descriptionIcon from "../../../assets/icons/description.svg";
import taskI from "../../../assets/icons/taskIcon-only.svg";
import checkIcon from "../../../assets/icons/check-icon.svg";
import Dotline from "../../../assets/icons/dotline.svg";
import WatchIcon from "../../../assets/icons/watch-icon.svg";
import playIcon from "../../../assets/icons/play-icon.svg";
import stopIcon from "../../../assets/icons/stop-icon.svg";
import Radio from "@material-ui/core/Radio";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../../redux/actions/taskAction";
import "antd/dist/antd.css";
import * as moment from "moment";
import { DatePicker } from "antd";
import prevpage from "../../../assets/icons/prev-arrow.svg";
import nextpage from "../../../assets/icons/next-arrow.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as bubbleTimerActionTypes from "../../../redux/actionsType/bubbleTimerActionType";
import BubbleTimer from "../bubbleTimer/BubbleTimer";
import { changeTaskStatus } from "../../../redux/actions/bubbleTimer";

const Task = () => {
  const dispatch = useDispatch();
  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskId, setTaskId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const { allTasks } = useSelector((state) => ({
    allTasks: state.tasks,
  }));

  const { isBubbleTimer } = useSelector((state) => ({
    isBubbleTimer: state.bubbleTimer.timerData ? state.bubbleTimer.timerData.taskStatus : '',
  }));

  const handleChange = (event) => {
    console.log('value', event.target.value)
    setSelectedValue(event.target.value);
  };

  const openToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEditModal = (val) => {
    setIsEditModal(true);
    setTaskId(val.id);
    setTitle(val.title);
    setDescription(val.description);
    console.log("priority", val.priority);
    setSelectedValue(val.priority);
    let date = val.startTime;
    let date2 = val.endTime;
    // let startD = date.substring(0, 10) + " " + date.substring(12, 19);
    // let dueD = date2.substring(0, 10) + " " + date2.substring(12, 19);
    let startD = new Date(date).toISOString();
    let dueD = new Date(date2).toISOString();
    setStartDate(startD);
    setDueDate(dueD);
    const sTime = new Date(val.startTime);
    console.log("startttttttt", sTime);
    console.log("dueeeeeee", dueD);
    // setStartDate(val.startTime_d);
    // setDueDate(val.endTime_d);
  };


  const closeEditModal = (val) => {
    setIsEditModal(false);
    setDescription("");
    setTitle("");
    setSelectedValue("a");
    setDueDate("");
    setStartDate("");
  };


  const changeToIso = (start) => {
    let newDate = new Date(
      start.getTime() - start.getTimezoneOffset() * 60000
    ).toISOString();
    return newDate;
  };


  const handleSubmit = async () => {
    const params = {
      title: title,
      description: description,
      startTime: changeToIso(startDate._d),
      endTime: changeToIso(dueDate._d),
      // startTime: "2021-02-17T11:41:24.533+00:00",
      // endTime: "2021-02-20T11:41:24.533+00:00",
      priority: selectedValue,
    };
    console.log("createtask params", params);
    const data = await dispatch(createTask(params));
    setDescription("");
    setTitle("");
    setSelectedValue("");
    setStartDate(null, null)
    setDueDate(null, null)
    console.log("created task", data);
    if (data.success === true) {
      setIsAddModal(false);
      console.log('startdateafetrsubmit', startDate)
      console.log('duedateafetrsubmit', dueDate)
      console.log("created task success", data);
    } else {
      console.log("err");
    }
  };

  const handleEditSubmit = async () => {

    const params = {
      id: taskId,
      title: title,
      description: description,
      startTime: changeToIso(startDate._d),
      endTime: changeToIso(dueDate._d),

      // startTime: "2021-02-17T11:41:24.533+00:00",
      // endTime: "2021-02-20T11:41:24.533+00:00",
      priority: selectedValue,
    };
    console.log("createtask params", params);
    const data = await dispatch(updateTask(params));

    if (data.success === true) {
      setIsEditModal(false);
      setDescription("");
      setTitle("");
      setSelectedValue("");
      setDueDate(null);
      setStartDate(null);
      openToast("Task Created Succesfully");
      console.log("created task success", data);
    } else {
      console.log("err");
    }
  };


  function setStartdate(time, timeString) {
    setStartDate(time);
  }


  function setStartEnd(time, timeString) {
    let dateTime1 = new Date(startDate).getTime(),
      dateTime2 = new Date(time).getTime();
    let diff = dateTime2 - dateTime1;
    if (diff < 0) {
      console.log('start', dateTime1)
      console.log('end', dateTime2)
      console.log('diff', diff)
      alert("endDate is greater than startDate");
      return true;
      // alert(endDate.getTime() >= startDate.getTime());
      // setDueDate(time);
    }
    else {
      setDueDate(time);
    }
  }
  const getTaskTime = (val) => {
    const d = new Date(val).toDateString();
    let temp = d.substr(4, 6) + "," + d.substr(11);
    // let temp = d.substr(4);
    return temp;
  };

  useEffect(() => {
    async function getTasks() {
      dispatch(getAllTasks());
    }
    getTasks();
  }, [isAddModal]);

  useEffect(() => {
    async function getTasks() {
      dispatch(getAllTasks());
    }
    getTasks();
  }, [isEditModal]);


  //delete function
  const handleClick = async (e, type) => {
    e.preventDefault();
    if (type === "delete") {
      const data = await dispatch(deleteTask(taskId));
      if (data.success === true) {
        console.log('deleted')
        setIsEditModal(false);
        openToast("Task Deleted Succesfully");
      } else {
        console.log("err");
      }
    }
  };
  const handleStart = async (val) => {
    let date = new Date();
    date.toISOString();
    console.log('id', val)
    const params = {
      "taskTime": date,
      "taskStatus": "resume",
      "task": {
        "id": val.id
      }
    }
    const data = await dispatch(changeTaskStatus(params, val.id));
    if (data.success === true) {
      console.log('success')
    } else {
      console.log("err");
    }
  };

  function endAfterStart(time, timestring) {
    var startDate = new Date(startDate);
    var endDate = new Date(time);
    // setStartEnd(time, timeString)
    alert(endDate.getTime() >= startDate.getTime());
  }
  return (
    <>
      <div className="card border-0 card-heightbody">
        <div className="card-header border-0 d-flex justify-content-between">
          <div className="task-header-left">
            <CImg src={taskIcon} fluid className="task-logo" />
          </div>
          <div className="task-header-right">
            <div className="btn-view-past-task">
              <CImg src={pastTaskIcon} fluid className="task-logo" />
            </div>
            <div className="btn-add-task" onClick={() => setIsAddModal(true)}>
              <CImg src={addTask} fluid className="task-logo" />
            </div>
          </div>
        </div>
        <div className="taskday--heading">
          <h3 className="taskday-title">
            <span>Today</span>
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            {allTasks
              ? allTasks.map((val) => {
                console.log("val -->>", val)
                return (
                  <div key={val.id} className="col-12 col-lg-4">
                    <div className={`tasklist-column ${val.priority == "Low" ? 'border-color-low' :
                      val.priority == "Medium" ? 'border-color-medium' : 'border-color-high'}  `}>
                      <div className="dot-line text-right">
                        <div
                          className="btn p-0"
                          onClick={() => handleEditModal(val)}
                        >
                          <img src={Dotline} />
                        </div>
                      </div>
                      <h3 className="taskTitle-head">{val.title}</h3>
                      <div className="below-task">
                        <div className="lefttask--type">
                          <div></div>
                          <h6
                            className={`typecase--task ${val.priority == "Low"
                              ? "text-low"
                              : val.priority == "Medium"
                                ? "text-medium"
                                : "text-high"
                              }`}
                          >
                            {val.priority}
                          </h6>
                          {/* <span className="status"> {val.priority}</span> */}
                          {/* <span className="date-task">
                             
                            </span> */}
                          <time className="date" dateTime="2020-12-12">
                            {getTaskTime(val.endTime)}
                          </time>
                        </div>
                        {/* <div className="rightside--button">
                            <button className="btn btn-commntask btn-success">
                              <img src={checkIcon} className="mr-2" />
                              Completed
                            </button>
                          </div> */}
                        <div className="rightside--button">
                          <button className="btn btn-commntask btn-outline-primary" onClick={() => handleStart(val)}>
                            <img src={playIcon} className="mr-2" />
                              Start
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              : ""}
          </div>

          <div className="taskday--heading">
            <h3 className="taskday-title mb-3">
              <span>Tommorow</span>
            </h3>
          </div>
          {/* <div className="row">
            <div className="col-12 col-lg-4">
              <div className="tasklist-column border-color-1">
                <div className="dot-line text-right">
                  <button className="btn p-0">
                    <img src={Dotline} />
                  </button>
                </div>
                <h3 className="taskTitle-head">Client Proposal Ready</h3>
                <div className="below-task">
                  <div className="lefttask--type">
                    <h6 className="typecase--task">Medium</h6>
                    <span className="date-task">Dec 12, 2020</span>
                  </div>
                  <div className="rightside--button">
                    <button className="btn btn-commntask btn-success">
                      <img src={checkIcon} className="mr-2" />
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <CModal
          show={isAddModal}
          centered={true}
          onClose={() => setIsAddModal(false)}
          className="modalTask--body"
        >
          <CForm className="login-form">
            <div className="modal-header">
              <CImg src={task} fluid className="task-logo" />
              <div
                style={{
                  alignSelf: "center",
                  fontWeight: "600",
                  marginLeft: "10px",
                }}
              >
                {" "}
                Add New Task
              </div>
            </div>

            <div className="modal-body">
              <div className="col-12 px-0">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="form-group tasklabel--fill">
                      <div className="field-label">
                        <CImg src={titleIcon} fluid />
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "700",
                            marginLeft: "10px",
                          }}
                        >
                          Title
                        </div>
                      </div>
                      <CInput
                        type="text"
                        name="username"
                        className="input-addtaskcontrol"
                        value={title}
                        placeholder="Add task title here.."
                        autoComplete=""
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group tasklabel--fill">
                      <div className="field-label">
                        <CImg src={descriptionIcon} fluid />
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "700",
                            marginLeft: "10px",
                          }}
                        >
                          Description
                        </div>
                      </div>
                      <textarea
                        value={description}
                        className="input--desc-task"
                        placeholder="Add task description here.."
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="tasklabel--fill-import">
                      <div className="field-label">
                        <CImg src={taskI} fluid />
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "700",
                            marginLeft: "10px",
                          }}
                        >
                          Task_Importance
                        </div>
                      </div>
                    </div>
                    <div
                      className={`priority-field taskadd--priority ${selectedValue === "Low" ? "active" : null
                        }`}
                    >
                      <div
                        style={{
                          width: "60px",
                          color: "rgb(187, 161, 14)",
                        }}
                      >
                        Low
                      </div>
                      <Radio
                        checked={selectedValue === "Low"}
                        onChange={handleChange}
                        value="Low"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </div>
                    <div
                      className={`priority-field taskadd--priority ${selectedValue === "Medium" ? "active" : null
                        }`}
                    >
                      <div
                        style={{
                          width: "60px",
                          color: "orange",
                        }}
                      >
                        Medium
                      </div>
                      <Radio
                        checked={selectedValue === "Medium"}
                        onChange={handleChange}
                        value="Medium"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "C" }}
                      />
                    </div>

                    <div
                      className={`priority-field taskadd--priority ${selectedValue === "High" ? "active" : null
                        }`}
                    >
                      <div
                        style={{
                          width: "60px",
                          color: "red",
                        }}
                      >
                        High
                      </div>
                      <Radio
                        checked={selectedValue === "High"}
                        onChange={handleChange}
                        value="High"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "E" }}
                        size="small"
                      />
                    </div>
                    <div className="start-time form-group tasklabel--fill">
                      <label className="field-label">
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          Start Time :{" "}
                        </div>
                      </label>
                      <DatePicker
                        showTime
                        onChange={(time, timeString) =>
                          setStartdate(time, timeString)
                        }
                      />
                    </div>
                    <div className="end-time form-group tasklabel--fill">
                      <label className="field-label">
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          End Time:
                        </div>
                      </label>
                      <DatePicker
                        showTime
                        onChange={(time, timeString) =>
                          setStartEnd(time, timeString)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <CButton
                color="primary"
                className="login-btn px-5"
                style={{
                  float: 'right',
                  margin: "10px",
                }}
                onClick={handleSubmit}
              >
                Submit
              </CButton>
            </div>
          </CForm>
        </CModal>

        <CModal
          show={isEditModal}
          centered={true}
          onClose={() => setIsEditModal(false)}
          className="modalTask--body"
        >
          <CForm className="login-form">
            <div className="modal-header" style={{
              justifyContent: "space-between"

            }}>

              <div
                style={{
                  alignSelf: "center",
                  fontWeight: "600",
                  marginLeft: "10px",
                }}
              >
                <CImg src={task} fluid className="task-logo" />
                {" "}
                Edit Task
              </div>
              <button
                style={{
                  alignSelf: "center",
                  backgroundColor: "white",
                  color: 'black'
                }}
                onClick={(e) => handleClick(e, "delete")}
              >
                Delete
                            </button>
            </div>

            <div className="modal-body">
              <div className="col-12 px-0">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="form-group tasklabel--fill">
                      <div className="field-label">
                        <CImg src={titleIcon} fluid />
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          Title
                        </div>
                      </div>
                      <CInput
                        type="text"
                        name="username"
                        className="input-addtaskcontrol"
                        value={title}
                        placeholder="Add task title here.."
                        autoComplete=""
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group tasklabel--fill">
                      <div className="field-label">
                        <CImg src={titleIcon} fluid />
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          Description
                        </div>
                      </div>
                      <textarea
                        value={description}
                        className="input--desc-task"
                        placeholder="Add task description here.."
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="tasklabel--fill-import">
                      <div className="field-label">
                        <CImg src={taskI} fluid />
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          Task_Importance
                        </div>
                      </div>
                    </div>
                    <div
                      className={`priority-field taskadd--priority ${selectedValue === "low" ? "active" : null
                        }`}
                    >
                      <div
                        style={{
                          width: "60px",
                          color: "rgb(187, 161, 14)",
                        }}
                      >
                        Low
                      </div>
                      <Radio
                        checked={selectedValue === "Low"}
                        onChange={handleChange}
                        value="Low"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </div>
                    <div
                      className={`priority-field taskadd--priority ${selectedValue === "medium" ? "active" : null
                        }`}
                    >
                      <div
                        style={{
                          width: "60px",
                          color: "orange",
                        }}
                      >
                        Medium
                      </div>
                      <Radio
                        checked={selectedValue === "Medium"}
                        onChange={handleChange}
                        value="Medium"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "C" }}
                      />
                    </div>

                    <div
                      className={`priority-field taskadd--priority ${selectedValue === "high" ? "active" : null
                        }`}
                    >
                      <div
                        style={{
                          width: "60px",
                          color: "red",
                        }}
                      >
                        High
                      </div>
                      <Radio
                        checked={selectedValue === "High"}
                        onChange={handleChange}
                        value="High"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "E" }}
                        size="small"
                      />
                    </div>
                    <div className="start-time form-group tasklabel--fill">
                      <label className="field-label">
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          Start Time :{" "}
                        </div>
                      </label>
                      <DatePicker
                        showTime
                        value={moment(startDate)}
                        disabled={true}
                        onChange={(time, timeString) =>
                          setStartdate(time, timeString)
                        }
                      />
                    </div>
                    <div className="end-time form-group tasklabel--fill">
                      <label className="field-label">
                        <div
                          style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            marginLeft: "10px",
                          }}
                        >
                          End Time:
                        </div>
                      </label>
                      <DatePicker
                        showTime
                        value={moment(dueDate)}
                        selected={dueDate}
                        disabled={true}
                        onChange={(time, timeString) =>
                          setStartEnd(time, timeString)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <CButton
                color="primary"
                className="login-btn px-5"
                onClick={handleEditSubmit}
              >
                Submit
              </CButton>
            </div>
          </CForm>
        </CModal>
        <div>
          {
            isBubbleTimer ? <BubbleTimer /> : ''
          }
        </div>
        <div className="pagination--bar py-2">
          <ul className="pagination">
            <li className="page-item-link">
              <a className="linkpage page-prev" href="!#">
                <img src={prevpage} className="m-0" />
              </a>
            </li>
            <li className="page-item-link">
              <a className="linkpage active" href="!#">
                1
              </a>
            </li>
            <li className="page-item-link">
              <a className="linkpage" href="!#">
                2
              </a>
            </li>
            <li className="page-item-link">
              <a className="linkpage" href="!#">
                3
              </a>
            </li>
            <li className="page-item-link">
              <a className="linkpage" href="!#">
                4
              </a>
            </li>
            <li className="page-item-link">
              <a className="linkpage" href="!#">
                5
              </a>
            </li>
            <li className="page-item-link">
              <a className="linkpage next-prev" href="!#">
                <img src={nextpage} className="m-0" />
              </a>
            </li>
          </ul>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </div>
    </>
  );
};

export default Task;
