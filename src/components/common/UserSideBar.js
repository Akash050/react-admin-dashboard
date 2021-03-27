import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import usersData from "../users/UsersData";

const UserSideBar = ({ match }) => {
  const user = usersData.find((user) => user.id.toString() === match.params.id);
  const userDetails = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  return (
    <main id="main">
      <nav class="aside-nav">
        <ul>
          <li class="active">
            <a href="#">
              <span class="icon icon-dashboard"></span>
              <span class="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-tasklist"></span>
              <span class="text">Tasks</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-follow-up"></span>
              <span class="text">Follow Ups</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-properties"></span>
              <span class="text">Properties</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-contacts"></span>
              <span class="text">Contacts</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-pipeline"></span>
              <span class="text">Pipeline</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-pin"></span>
              <span class="text">Map View</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-marketing"></span>
              <span class="text">Marketing</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-report"></span>
              <span class="text">Reports</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-status"></span>
              <span class="text">Status</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon icon-comment"></span>
              <span class="text">Messages</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="main-content">
        <div class="columns-wrapper">
          <div class="column-left">
            <div class="box">
              <div class="title-box">
                <span class="icon icon-tasklist"></span>
                <strong class="title">Tasks</strong>
              </div>
              <strong class="subheading">
                <span>Today</span>
              </strong>
              <div class="proposal-holder">
                <div class="proposal-box">
                  <strong class="subtitle">Client Proposal Ready</strong>
                  <span class="status">Medium</span>
                  <time class="date" datetime="2020-12-12">
                    Dec 12, 2020
                  </time>
                  <a href="#" class="btn-play">
                    <span class="icon-play"></span>
                  </a>
                </div>
                <div class="proposal-box yellow">
                  <strong class="subtitle">Client Proposal Ready</strong>
                  <span class="status">Low</span>
                  <time class="date" datetime="2020-12-12">
                    Dec 12, 2020
                  </time>
                  <a href="#" class="btn-play">
                    <span class="icon-play"></span>
                  </a>
                </div>
                <div class="proposal-box red">
                  <strong class="subtitle">Client Proposal Ready</strong>
                  <span class="status">High</span>
                  <time class="date" datetime="2020-12-12">
                    Dec 12, 2020
                  </time>
                  <a href="#" class="btn-play">
                    <span class="icon-play"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="title-box">
                <span class="icon icon-recent"></span>
                <strong class="title">Recent Activity</strong>
              </div>
              <ul class="recent-activity">
                <li>
                  <div class="textbox">
                    <span class="icon icon-tasklist"></span>
                    <strong class="subtitle">Task updated</strong>
                    <span class="text">Kyle Kelley updated a task</span>
                  </div>
                  <span class="time">32 min ago</span>
                </li>
                <li>
                  <div class="textbox">
                    <span class="icon icon-message"></span>
                    <strong class="subtitle">Email</strong>
                    <span class="text">You have send an email</span>
                  </div>
                  <span class="time">21 min ago</span>
                </li>
                <li>
                  <div class="textbox">
                    <span class="icon icon-message"></span>
                    <strong class="subtitle">Email</strong>
                    <span class="text">You have send an email</span>
                  </div>
                  <span class="time">21 min ago</span>
                </li>
                <li>
                  <div class="textbox">
                    <span class="icon icon-check"></span>
                    <strong class="subtitle">Task completed</strong>
                    <span class="text">Kyle Kelley updated a task</span>
                  </div>
                  <span class="time">12 min ago</span>
                </li>
                <li>
                  <div class="textbox">
                    <span class="icon icon-event"></span>
                    <strong class="subtitle">Join an event</strong>
                    <span class="text">Kyle Kelley updated a task</span>
                  </div>
                  <span class="time">12 min ago</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="column-right">
            <div class="subcols">
              <div class="column">
                <div class="box">
                  <div class="head">
                    <div class="title-box">
                      <span class="icon icon-clock"></span>
                      <strong class="title">Recent Visits</strong>
                    </div>
                    <ul class="dots">
                      <li>
                        <a href="#">&nbsp;</a>
                      </li>
                      <li class="active">
                        <a href="#">&nbsp;</a>
                      </li>
                      <li>
                        <a href="#">&nbsp;</a>
                      </li>
                    </ul>
                  </div>
                  <div class="locations-holder">
                    <div class="location-box">
                      <div class="img">
                        <img src="images/img-map.png" alt="img description" />
                      </div>
                      <address class="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                    <div class="location-box">
                      <div class="img">
                        <img src="images/img-map.png" alt="img description" />
                      </div>
                      <address class="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <div class="head">
                    <div class="title-box">
                      <span class="icon icon-quick"></span>
                      <strong class="title">Quick Links</strong>
                    </div>
                    <div class="head-right">
                      <ul class="dots">
                        <li>
                          <a href="#">&nbsp;</a>
                        </li>
                        <li class="active">
                          <a href="#">&nbsp;</a>
                        </li>
                        <li>
                          <a href="#">&nbsp;</a>
                        </li>
                      </ul>
                      <a href="#" class="btn-add">
                        <span class="icon-plus"></span> Add Quick Link
                      </a>
                    </div>
                  </div>
                  <div class="locations-holder">
                    <div class="location-box">
                      <div class="img">
                        <img src="images/img-map.png" alt="img description" />
                      </div>
                      <address class="address">
                        223 32nd Street<br></br>Newport Beach, CA 92663
                      </address>
                    </div>
                    <div class="location-box">
                      <div class="img">
                        <img src="images/img-map.png" alt="img description" />
                      </div>
                      <address class="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                    <div class="location-box">
                      <div class="img">
                        <img src="images/img-map.png" alt="img description" />
                      </div>
                      <address class="address">
                        223 32nd Street<br></br> Newport Beach, CA 92663
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="title-box">
                <span class="icon icon-calendar"></span>
                <strong class="title">Calendar</strong>
              </div>
              <div class="calendar">
                <div class="head">
                  <ul class="calendar-type">
                    <li>
                      <a href="#">Day</a>
                    </li>
                    <li class="active">
                      <a href="#">Week</a>
                    </li>
                    <li>
                      <a href="#">Month</a>
                    </li>
                  </ul>
                  <div class="current-dates">
                    <a href="#" class="btn-prev">
                      <span class="icon-arrow-left"></span>
                    </a>
                    <strong class="date">Dec 10 - 16, 2020</strong>
                    <a href="#" class="btn-prev">
                      <span class="icon-arrow-right"></span>
                    </a>
                  </div>
                  <div class="add-wrap">
                    <a href="#" class="icon-plus"></a>
                  </div>
                </div>
                <div class="calendar-scroller">
                  <div class="calendar-table">
                    <div class="col">
                      <div class="head">
                        <span class="icon-clock"></span>
                      </div>
                      <div class="time">08:00</div>
                      <div class="time">09:00</div>
                      <div class="time">10:00</div>
                      <div class="time">11:00</div>
                      <div class="time">12:00</div>
                      <div class="time">13:00</div>
                      <div class="time">14:00</div>
                      <div class="duration-bar" style="top: 200px;">
                        09:23
                      </div>
                    </div>
                    <div class="col">
                      <div class="head">
                        <strong class="date">
                          10 <span>Sat</span>
                        </strong>
                      </div>
                      <div
                        class="calendar-box pink"
                        style="top: 322px; height: 196px;"
                      >
                        <strong class="subtitle">Company Meeting</strong>
                        <p>Global Business event 2019</p>
                        <div class="foot">
                          <span class="hours">11:00-14:00</span>
                          <span class="type">Meeting</span>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="head">
                        <strong class="date">
                          11 <span>Sun</span>
                        </strong>
                      </div>
                      <div
                        class="calendar-box yellow"
                        style="top: 120px; height: 130px;"
                      >
                        <strong class="subtitle">Event</strong>
                        <p>Young designer summit 2019</p>
                        <div class="foot">
                          <span class="hours">8:00-10:00</span>
                          <span class="type">Event</span>
                        </div>
                      </div>
                    </div>
                    <div class="col off">
                      <div class="head">
                        <strong class="date">
                          12 <span>Sun</span>
                        </strong>
                      </div>
                    </div>
                    <div class="col">
                      <div class="head">
                        <strong class="date">
                          13 <span>Sun</span>
                        </strong>
                      </div>
                      <div
                        class="calendar-box blue"
                        style="top: 275px; height: 203px;"
                      >
                        <strong class="subtitle">Business Meeting</strong>
                        <p>
                          Business Meeting with CodexCoder group of company{" "}
                        </p>
                        <div class="foot">
                          <span class="hours">12-3:00 pm</span>
                          <span class="type">Workshop</span>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="head">
                        <strong class="date">
                          14 <span>Mon</span>
                        </strong>
                      </div>
                    </div>
                    <div class="col">
                      <div class="head">
                        <strong class="date">
                          15 <span>Tues</span>
                        </strong>
                      </div>
                      <div
                        class="calendar-box cyan"
                        style="top: 120px; height: 270px;"
                      >
                        <strong class="subtitle">Business Meeting</strong>
                        <p>
                          Business Meeting with CodexCoder group of company{" "}
                        </p>
                        <div class="foot">
                          <span class="hours">12-3:00 pm</span>
                          <span class="type">Workshop</span>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="head">
                        <strong class="date">
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
    </main>
  );
};

export default UserSideBar;
