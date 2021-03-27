import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config

// import {
//   TheHeaderDropdown,
//   TheHeaderDropdownMssg,
//   TheHeaderDropdownNotif,
//   TheHeaderDropdownTasks,
// } from "./index";
import notification from "../../assets/icons/notification.svg";
import user from "../../assets/profile.png";
import search from "../../assets/icons/search-icon.svg";
import {
  getAllProfile,
} from "../../redux/actions/profileAction";

const TheHeader = () => {
  const [isSettingDrop, setIsSettingDrop] = useState(false);
  const [ProfileUrl, setProfileUrl] = useState("");
  const [ProfileName, setProfileName] = useState("");
  const dispatch = useDispatch();
  const { allProfiles } = useSelector((state) => ({
    allProfiles: state.profile,
  }));
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)

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
  let onSetting = () => {
    setIsSettingDrop(!isSettingDrop)
  }
  let logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <header>
      <div className="container-fluid px-0">
        <nav className="navbar navbar-light justify-content-between bg-white">
          {/* <form className="searchForm">
            <div className="d-flex align-items-center srcGroupItem">
              <span className="srch--icon pl-3">
                <img className="m-0" src={search} />
              </span>
              <input
                className="form-control srcInput-cont"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form> */}
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
              <button type="button"
                className="nav-link dropdown-toggle btn profilebtn--menu"
                id="navbarDropdown"
                // data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <div className="d-flex align-items-center">
                  <div className="profileImg">
                    <img src={ProfileUrl != '' ? ProfileUrl : user} />
                  </div>
                  <div onClick={onSetting} className="username--fill">
                    <h5 className="prf-title">{ProfileName != '' ? ProfileName : null}</h5>
                    <span className="short--inf">Agent</span>
                  </div>
                </div>
              </button>
              <div className={`dropdown-menu dropdown-menu-right ${isSettingDrop ? 'show' : null}`} aria-labelledby="navbarDropdown">
                <ul className="listSetting">
                  <li className="dropdown-item"><a className="listsubmenu" href="#"><i class="fas fa-cog mr-2"></i>Settings</a></li>
                  <li onClick={logout} className="dropdown-item"><a className="listsubmenu" href="#"><i class="fas fa-power-off mr-2"></i>Sign Out</a></li>
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
