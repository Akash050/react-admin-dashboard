import React from "react";
import imgMap from "../../../assets/images/img-map.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { connectAdvanced } from "react-redux";

import { getTopThreeTasks } from "../../../redux/actions/taskAction";
const UserPanelDashboard = () => {
  const dispatch = useDispatch();

  const { topThreeTasks } = useSelector((state) => ({
    topThreeTasks: state.tasks,
  }));
  let openToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const getTaskTime = (val) => {
    const d = new Date(val).toDateString();
    console.log("ddd", d);
    let temp = d.substr(4, 6) + "," + d.substr(11);
    return temp;
  };

  useEffect(() => {
    async function getTopThreeTask() {
      dispatch(getTopThreeTasks());
    }
    getTopThreeTask();
  }, []);
  return (
    <div className="main-content">
      <div className="columns-wrapper">
        <div className="row mx-0">
          <div className="col-12 col-lg-3 px-2">
            <div className="box">
              <div className="title-box">
                <span className="icon icon-tasklist"></span>
                <strong className="title">Tasks</strong>
              </div>
              <strong className="subheading">
                <span>Today</span>
              </strong>
              <div className="proposal-holder">
                {topThreeTasks
                  ? topThreeTasks.map((val) => {
                      return (
                        <div
                          className={`proposal-box ${
                            val.priority == "Low"
                              ? "yellow"
                              : val.priority == "Medium"
                              ? "orange"
                              : "red"
                          }`}
                        >
                          <strong className="subtitle">{val.title}</strong>
                          <span className="status">{val.priority}</span>
                          <time className="date" dateTime="2020-12-12">
                            {getTaskTime(val.startTime)}
                          </time>
                          <a href="#" className="btn-play">
                            <span className="icon-play"></span>
                          </a>
                        </div>
                      );
                    })
                  : ""}

                {/* <div className="proposal-footer">
                <div className="btn-view-all-task">View All task</div>
                <div
                  className="btn-add-new-task"
                  onClick={() => setIsAddModal(true)}
                >
                  <span className="icon-plus"></span>
                  <span>Add New Task</span>
                </div>
              </div> */}
              </div>
            </div>
            <div className="box">
              <div className="title-box">
                <span className="icon icon-recent"></span>
                <strong className="title">Recent Activity</strong>
              </div>
              <ul className="recent-activity">
                <li>
                  <div className="textbox">
                    <span className="icon icon-tasklist"></span>
                    <strong className="subtitle">Task updated</strong>
                    <span className="text">Kyle Kelley updated a task</span>
                  </div>
                  <span className="time">32 min ago</span>
                </li>
                <li>
                  <div className="textbox">
                    <span className="icon icon-message"></span>
                    <strong className="subtitle">Email</strong>
                    <span className="text">You have send an email</span>
                  </div>
                  <span className="time">21 min ago</span>
                </li>
                <li>
                  <div className="textbox">
                    <span className="icon icon-message"></span>
                    <strong className="subtitle">Email</strong>
                    <span className="text">You have send an email</span>
                  </div>
                  <span className="time">21 min ago</span>
                </li>
                <li>
                  <div className="textbox">
                    <span className="icon icon-check"></span>
                    <strong className="subtitle">Task completed</strong>
                    <span className="text">Kyle Kelley updated a task</span>
                  </div>
                  <span className="time">12 min ago</span>
                </li>
                <li>
                  <div className="textbox">
                    <span className="icon icon-event"></span>
                    <strong className="subtitle">Join an event</strong>
                    <span className="text">Kyle Kelley updated a task</span>
                  </div>
                  <span className="time">12 min ago</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-9 px-2">
            <div className="subcols">
              <div className="column">
                <div className="box">
                  <div className="head">
                    <div className="title-box">
                      <span className="icon icon-clock"></span>
                      <strong className="title">Recent Visits</strong>
                    </div>
                    <ul className="dots">
                      <li>
                        <a href="#">&nbsp;</a>
                      </li>
                      <li className="active">
                        <a href="#">&nbsp;</a>
                      </li>
                      <li>
                        <a href="#">&nbsp;</a>
                      </li>
                    </ul>
                  </div>
                  <div className="locations-holder">
                    <div className="location-box">
                      <div className="img">
                        <img src={imgMap} alt="img description" />
                      </div>
                      <address className="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                    <div className="location-box">
                      <div className="img">
                        <img src={imgMap} alt="img description" />
                      </div>
                      <address className="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="box">
                  <div className="head">
                    <div className="title-box">
                      <span className="icon icon-quick"></span>
                      <strong className="title">Quick Links</strong>
                    </div>
                    <div className="head-right">
                      <ul className="dots">
                        <li>
                          <a href="#">&nbsp;</a>
                        </li>
                        <li className="active">
                          <a href="#">&nbsp;</a>
                        </li>
                        <li>
                          <a href="#">&nbsp;</a>
                        </li>
                      </ul>
                      <a href="#" className="btn-add">
                        <span className="icon-plus"></span> Add Quick Link
                      </a>
                    </div>
                  </div>
                  <div className="locations-holder">
                    <div className="location-box">
                      <div className="img">
                        <img src={imgMap} alt="img description" />
                      </div>
                      <address className="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                    <div className="location-box">
                      <div className="img">
                        <img src={imgMap} alt="img description" />
                      </div>
                      <address className="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                    <div className="location-box">
                      <div className="img">
                        <img src={imgMap} alt="img description" />
                      </div>
                      <address className="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="title-box">
                <span className="icon icon-calendar"></span>
                <strong className="title">Calendar</strong>
              </div>
              <div className="calendar">
                <div className="head">
                  <ul className="calendar-type">
                    <li>
                      <a href="#">Day</a>
                    </li>
                    <li className="active">
                      <a href="#">Week</a>
                    </li>
                    <li>
                      <a href="#">Month</a>
                    </li>
                  </ul>
                  <div className="current-dates">
                    <a href="#" className="btn-prev">
                      <span className="icon-arrow-left"></span>
                    </a>
                    <strong className="date">Dec 10 - 16, 2020</strong>
                    <a href="#" className="btn-prev">
                      <span className="icon-arrow-right"></span>
                    </a>
                  </div>
                  <div className="add-wrap">
                    <a href="#" className="icon-plus"></a>
                  </div>
                </div>
                <div className="calendar-scroller">
                  <div className="calendar-table">
                    <div className="col">
                      <div className="head">
                        <span className="icon-clock"></span>
                      </div>
                      <div className="time">08:00</div>
                      <div className="time">09:00</div>
                      <div className="time">10:00</div>
                      <div className="time">11:00</div>
                      <div className="time">12:00</div>
                      <div className="time">13:00</div>
                      <div className="time">14:00</div>
                      <div className="duration-bar" style={{ top: "200px" }}>
                        09:23
                      </div>
                    </div>
                    <div className="col">
                      <div className="head">
                        <strong className="date">
                          10 <span>Sat</span>
                        </strong>
                      </div>
                      <div
                        className="calendar-box pink"
                        style={{ top: "322px", height: "196px" }}
                      >
                        <strong className="subtitle">Company Meeting</strong>
                        <p>Global Business event 2019</p>
                        <div className="foot">
                          <span className="hours">11:00-14:00</span>
                          <span className="type">Meeting</span>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="head">
                        <strong className="date">
                          11 <span>Sun</span>
                        </strong>
                      </div>
                      <div
                        className="calendar-box yellow"
                        style={{ top: "120px", height: "130px" }}
                      >
                        <strong className="subtitle">Event</strong>
                        <p>Young designer summit 2019</p>
                        <div className="foot">
                          <span className="hours">8:00-10:00</span>
                          <span className="type">Event</span>
                        </div>
                      </div>
                    </div>
                    <div className="col off">
                      <div className="head">
                        <strong className="date">
                          12 <span>Sun</span>
                        </strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="head">
                        <strong className="date">
                          13 <span>Sun</span>
                        </strong>
                      </div>
                      <div
                        className="calendar-box blue"
                        style={{ top: "275px", height: "203px" }}
                      >
                        <strong className="subtitle">Business Meeting</strong>
                        <p>
                          Business Meeting with CodexCoder group of company{" "}
                        </p>
                        <div className="foot">
                          <span className="hours">12-3:00 pm</span>
                          <span className="type">Workshop</span>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="head">
                        <strong className="date">
                          14 <span>Mon</span>
                        </strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="head">
                        <strong className="date">
                          15 <span>Tues</span>
                        </strong>
                      </div>
                      <div
                        className="calendar-box cyan"
                        style={{ top: "120px", height: "270px" }}
                      >
                        <strong className="subtitle">Business Meeting</strong>
                        <p>
                          Business Meeting with CodexCoder group of company{" "}
                        </p>
                        <div className="foot">
                          <span className="hours">12-3:00 pm</span>
                          <span className="type">Workshop</span>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="head">
                        <strong className="date">
                          16 <span>Thues</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserPanelDashboard);
