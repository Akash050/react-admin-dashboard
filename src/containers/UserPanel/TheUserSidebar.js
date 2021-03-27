import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import _custom from "../../scss/style.scss";
import Logo from "../../assets/images/logo-front.svg";

// sidebar nav config

const TheUserSidebar = (props) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("");
  // const dispatch = useDispatch();
  // const show = useSelector((state) => state.sidebarShow);

  let handleClick = (e, url) => {
    e.preventDefault();
    // setActiveTab(tab)
    history.push(url);
  };

  useEffect(() => {
    setActiveTab(history.location.pathname);
  }, [history.pathname]);
  const unlisten = history.listen((location) => {
    setActiveTab(location.pathname);
    console.log(location.pathname);
  });

  console.log("activeTab ->", activeTab);
  return (
    <>
      <asside className="asside-menu aside-nav">
        <div className="logoBrand userlogo-front"><img src={Logo} /></div>
        <nav className="navleft--sidebar">
          <ul>
            <li onClick={(e) => handleClick(e, '/user/dashboard')} className={`${activeTab == '/user/dashboard' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-dashboard"></span>
                <span className="text">Dashboard</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/task')} className={`${activeTab == '/user/task' ? 'active' : null}`} >
              <a href="">
                <span className="icon icon-tasklist"></span>
                <span className="text">Tasks</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/followup')} className={`${activeTab == '/user/follow' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-follow-up"></span>
                <span className="text">Follow Ups</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/properties')} className={`${activeTab == '/user/properties' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-properties"></span>
                <span className="text">Properties</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/contacts')} className={`${activeTab == '/user/contact' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-contacts"></span>
                <span className="text">Contacts</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/pipeline')} className={`${activeTab == '/user/pipeline' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-pipeline"></span>
                <span className="text">Pipeline</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/map')} className={`${activeTab == '/user/map' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-pin"></span>
                <span className="text">Map View</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/marketing')} className={`${activeTab == '/user/marketing' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-marketing"></span>
                <span className="text">Marketing</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/reports')} className={`${activeTab == '/user/report' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-report"></span>
                <span className="text">Reports</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/status')} className={`${activeTab == '/user/status' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-status"></span>
                <span className="text">Status</span>
              </a>
            </li>
            <li onClick={(e) => handleClick(e, '/user/message')} className={`${activeTab == '/user/message' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-comment"></span>
                <span className="text">Messages</span>
              </a>
            </li>
          </ul>
        </nav>
      </asside>
    </>
  );
};

export default React.memo(TheUserSidebar);
