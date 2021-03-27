import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// routes config
import routes from "../routes";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import notification from "../assets/icons/notification.svg";
import user from "../assets/profile.png";
import BackIcon from "../assets/icons/back-icon.svg";
import {
  CButton,
} from "@coreui/react";
import search from "../assets/icons/search-icon.svg";
import * as employeeActionTypes from "../redux/actionsType/employeeActionType";
import {
  getAllProfile,
} from "../redux/actions/profileAction";
const TheHeader = () => {
  let history = useHistory()
  let routeName = history.location.pathname
  const [isSettingDrop, setIsSettingDrop] = useState(false);
  const [ProfileUrl, setProfileUrl] = useState("");
  const [ProfileName, setProfileName] = useState("");
  const [ProfileTitle, setProfileTitle] = useState("");
  const dispatch = useDispatch();
  const { allProfiles } = useSelector((state) => ({
    allProfiles: state.profile,
  }));
  let onBack = () => {
    history.push("/superadmin/companies");
  };


  useEffect(() => {
    async function getProfiles() {
      dispatch(getAllProfile());
    }
    getProfiles();
  }, []);

  useEffect(() => {
    if (allProfiles[0] != undefined && allProfiles[0].company != undefined) {
      setProfileName(allProfiles[0].company.name)
      if (allProfiles[0].company.avatar != undefined) {
        setProfileUrl(allProfiles[0].company.avatar)
      }
    }
    else if (allProfiles.length) {
      setProfileName(allProfiles[0].name)
    }
  }, [allProfiles && allProfiles.length > 0]);

  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)

  // const toggleSidebar = () => {
  //   const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
  //   dispatch({type: 'set', sidebarShow: val})
  // }

  // const toggleSidebarMobile = () => {
  //   const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
  //   dispatch({type: 'set', sidebarShow: val})
  // }
  let onSetting = (e) => {
    e.preventDefault()
    setIsSettingDrop(!isSettingDrop);
  };
  let logout = () => {
    // dispatch({
    //   type: employeeActionTypes.RESET_STATE,
    // });
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header>
      <div className="container-fluid px-0">

        <nav className="navbar navbar-light justify-content-between bg-white">
          {/* <form className="searchForm">
            <div className="d-flex align-items-center srcGroupItem">
              <span className="srch--icon pl-3"><img className="m-0" src={search} /></span>
              <input className="form-control srcInput-cont" type="search" placeholder="Search" aria-label="Search" />
            </div>
          </form> */}
          {/* {routeName === '/superadmin/companies' ? "" : <CButton className="save-btn-white-header btn" onClick={onBack}>
            <img src={BackIcon} className="m-0 mr-2" /> Back
        </CButton>} */}
          <ul className="navbar-nav ml-auto flex-row align-items-center">
            <li className="nav-item navlinkTop mr-3">
              <a className="nav-link" href="#">
                <span className="notifi--icon">
                  <img src={notification} />{" "}
                  <span className="baget--icon"></span>
                </span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a onClick={(e) => onSetting(e)} className="nav-link" href="#">
                <button
                  type="button"
                  className="nav-link dropdown-toggle btn profilebtn--menu"
                  id="navbarDropdown"
                  //  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center">
                    <div className="profileImg">
                      <img src={ProfileUrl != '' ? ProfileUrl : user} />
                    </div>
                    <div className="username--fill">
                      <h5 className="prf-title">{ProfileName != '' ? ProfileName : null}</h5>
                      <span className="short--inf">Admin</span>
                    </div>
                  </div>

                </button>
                {/* <button
                  type="button"
                  className="nav-link dropdown-toggle btn profilebtn--menu"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center">
                    <div className="profileImg">
                      <img src={ProfileUrl != '' ? ProfileUrl : user} />
                    </div>
                    <div className="username--fill">
                      <h5 className="prf-title">{ProfileName != '' ? ProfileName : null}</h5>
                      <span className="short--inf">Title In Company</span>
                    </div>
                  </div>
                </button> */}
              </a>
              <div
                className={`dropdown-menu dropdown-menu-right ${isSettingDrop ? "show" : null
                  }`}
                aria-labelledby="navbarDropdown"
              >
                <ul className="listSetting">
                  <li className="dropdown-item">
                    <a className="listsubmenu" href="#">
                      <i className="fas fa-cog mr-2"></i>Settings
                    </a>
                  </li>
                  <li onClick={logout} className="dropdown-item">
                    <a className="listsubmenu" href="#">
                      <i className="fas fa-power-off mr-2"></i>Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TheHeader;
