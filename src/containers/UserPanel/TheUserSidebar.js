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

  return (
    <>
      <asside className="asside-menu aside-nav">
        <div className="userBrand userlogo-front">
          <h3>Dashboard</h3>
        </div>
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
  
            <li onClick={(e) => handleClick(e, '/user/contacts')} className={`${activeTab == '/user/contact' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-contacts"></span>
                <span className="text">Contacts</span>
              </a>
            </li>
  
            <li onClick={(e) => handleClick(e, '/user/reports')} className={`${activeTab == '/user/report' ? 'active' : null}`}>
              <a href="">
                <span className="icon icon-report"></span>
                <span className="text">Reports</span>
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
