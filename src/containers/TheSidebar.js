import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Switch } from "react-router-dom";
import { useHistory } from "react-router";

import _custom from "../scss/style.scss";
// sidebar nav config
import navigation from "./_nav";
import logo from "../assets/images/logo.svg";
import dashboard from "../assets/icons/dashboard.svg";
import users from "../assets/icons/users.svg";
import CompanyIcon from "../assets/icons/company-icon.svg";
import supporttc from "../assets/icons/supporttc.svg";
import employee from "../assets/icons/employee.svg";
import budget from "../assets/icons/budget.svg";

const TheSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  const [flag, setFlag] = useState(true);
  const [isCompanySubMenu, setIsCompanySubMenu] = useState(false);
  const [companyAdmin, setCompanyAdmin] = useState(false);
  // const dispatch = useDispatch();
  // const show = useSelector((state) => state.sidebarShow);

  let handleClick = (e, url) => {
    e.preventDefault();
    history.push(url);
  };

  useEffect(() => {
    setActiveTab(history.location.pathname);
    let role = localStorage.getItem("role");
    if (role == "ROLE_SUPER_ADMIN") {
      setSuperAdmin(true);
    }
  }, [history.pathname]);

  useEffect(() => {
    setFlag(false);
    setTimeout(function () {
      setFlag(true);
    }, 0.000000000001);
  }, [location]);

  const unlisten = history.listen((location) => {
    setActiveTab(location.pathname);
  });
  let handleCompanyClick = () => {
    setIsCompanySubMenu(!isCompanySubMenu);
  };

  let getRole = localStorage.getItem("role");
  return (
    <>
      {flag ? (
        <div className="leftasside">
          <asside className="asside-menu">
            <div className="logoBrand">
              <img src={logo} />
            </div>
            <div className="leftMenubar">
              <ul className="menuItem">
                {getRole == "admin"? (
                  <li
                    onClick={(e) =>
                      handleClick(e, "/admin/dashboard", "Dashboard")
                    }
                    className={`ItemmenuList ${
                      activeTab == "/admin/dashboard" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={dashboard} />
                      </span>
                      Dashboard
                    </a>
                  </li>
                ) : null}
                {getRole == "admin" ? (
                  <li
                    className={`ItemmenuList ${
                      activeTab == "/superadmin/companies" ||
                      activeTab == "/superadmin/company/create"
                        ? "active"
                        : null
                    } `}
                  >
                    <a
                      onClick={(e) =>
                        handleClick(e, "/superadmin/companies", "Company")
                      }
                      href=""
                      className="LinkItems"
                    >
                      <span className="icon-menu">
                        <img src={CompanyIcon} />
                      </span>
                      Company
                      <span
                        onClick={handleCompanyClick}
                        class="arrow-right-icon "
                      >
                        <i
                          class={`fa ${
                            isCompanySubMenu ? "fa-angle-up" : "fa-angle-down"
                          } `}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <ul
                      className={`sidesub--menuac ${
                        isCompanySubMenu ? "showmenu" : ""
                      }`}
                    >
                      <li
                        onClick={(e) =>
                          handleClick(e, "/superadmin/companies", "Company")
                        }
                        className="Linksub--txtlink"
                      >
                        <a href="#">Manage Company</a>
                      </li>
                      <li
                        onClick={(e) =>
                          handleClick(
                            e,
                            "/superadmin/company/create",
                            "Company"
                          )
                        }
                        className="Linksub--txtlink"
                      >
                        <a href="#">Add Company</a>
                      </li>
                    </ul>
                  </li>
                ) : null}
                {getRole == "admin" ? (
                  <li
                    onClick={(e) => handleClick(e, "/admin/tickets", "Tickets")}
                    className={`ItemmenuList ${
                      activeTab == "/admin/tickets" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={supporttc} />
                      </span>
                      Support Tickets
                    </a>
                  </li>
                ) : null}
                <li
                  onClick={(e) =>
                    handleClick(e, "/admin/employees", "Employees")
                  }
                  className={`ItemmenuList ${
                    activeTab == "/admin/employees" ? "active" : null
                  } `}
                >
                  {getRole == "admin" ? (
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={employee} />
                      </span>
                      Employees
                    </a>
                  ) : (
                    <></>
                  )}
                </li>
                {getRole == "admin"  ? (
                  <li
                    onClick={(e) => handleClick(e, "/admin/budget", "Budget")}
                    className={`ItemmenuList ${
                      activeTab == "/admin/budget" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={budget} />
                      </span>
                      Budget
                    </a>
                  </li>
                ) : null}
                {getRole == "admin" ? (
                  <li
                    onClick={(e) => handleClick(e, "/admin/profile", "Profile")}
                    className={`ItemmenuList ${
                      activeTab == "/admin/profile" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={employee} />
                      </span>
                      Profile
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </asside>
        </div>
      ) : (
        <div className="leftasside">
          <asside className="asside-menu">
            <div className="logoBrand">
              <img src={logo} />
            </div>
            <div className="leftMenubar">
              <ul className="menuItem">
                {getRole == "admin"? (
                  <li
                    onClick={(e) =>
                      handleClick(e, "/admin/dashboard", "Dashboard")
                    }
                    className={`ItemmenuList ${
                      activeTab == "/admin/dashboard" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={dashboard} />
                      </span>
                      Dashboard
                    </a>
                  </li>
                ) : null}
                {getRole == "admin" ? (
                  <li
                    className={`ItemmenuList ${
                      activeTab == "/superadmin/companies" ||
                      activeTab == "/superadmin/company/create"
                        ? "active"
                        : null
                    } `}
                  >
                    <a
                      onClick={(e) =>
                        handleClick(e, "/superadmin/companies", "Company")
                      }
                      href=""
                      className="LinkItems"
                    >
                      <span className="icon-menu">
                        <img src={CompanyIcon} />
                      </span>
                      Company
                      <span
                        onClick={handleCompanyClick}
                        class="arrow-right-icon "
                      >
                        <i
                          class={`fa ${
                            isCompanySubMenu ? "fa-angle-up" : "fa-angle-down"
                          } `}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                    <ul
                      className={`sidesub--menuac ${
                        isCompanySubMenu ? "showmenu" : ""
                      }`}
                    >
                      <li
                        onClick={(e) =>
                          handleClick(e, "/superadmin/companies", "Company")
                        }
                        className="Linksub--txtlink"
                      >
                        <a href="#">Manage Company</a>
                      </li>
                      <li
                        onClick={(e) =>
                          handleClick(
                            e,
                            "/superadmin/company/create",
                            "Company"
                          )
                        }
                        className="Linksub--txtlink"
                      >
                        <a href="#">Add Company</a>
                      </li>
                    </ul>
                  </li>
                ) : null}
              
                <li
                  onClick={(e) =>
                    handleClick(e, "/admin/employees", "Employees")
                  }
                  className={`ItemmenuList ${
                    activeTab == "/admin/employees" ? "active" : null
                  } `}
                >
                  {getRole == "ROLE_COMPANY_ADMIN" ||
                  getRole == "ROLE_ADMIN" ||
                  getRole == "SUPER_ADMIN_AS_COMPANY_ADMIN" ? (
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={employee} />
                      </span>
                      Employees
                    </a>
                  ) : (
                    <></>
                  )}
                </li>
                {getRole == "admin"? (
                  <li
                    onClick={(e) => handleClick(e, "/admin/budget", "Budget")}
                    className={`ItemmenuList ${
                      activeTab == "/admin/budget" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={budget} />
                      </span>
                      Budget
                    </a>
                  </li>
                ) : null}
                {getRole == "admin" ? (
                  <li
                    onClick={(e) => handleClick(e, "/admin/profile", "Profile")}
                    className={`ItemmenuList ${
                      activeTab == "/admin/profile" ? "active" : null
                    } `}
                  >
                    <a href="" className="LinkItems">
                      <span className="icon-menu">
                        <img src={employee} />
                      </span>
                      Profile
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </asside>
        </div>
      )}
    </>
  );
};

export default React.memo(TheSidebar);
