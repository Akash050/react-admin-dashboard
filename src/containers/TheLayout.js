import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  TheContent,
  TheUserContent,
  TheSidebar,
  TheFooter,
  TheHeader,
  TheUserHeader,
  TheUserSidebar,
  UserPanelDashboard,
} from "./index";

const grantPermission = () => {
  const requestedRoles = localStorage.getItem("role");
  if (requestedRoles === "user") {
    return "user";
  } else if (requestedRoles === "admin") {
    return "admin";
  } 
  else {
    return false;
  }
};
const grantPermissionAdmin = () => {
  const requestedRoles = localStorage.getItem("role");
  const permittedRoles = "admin";
  if (requestedRoles === permittedRoles) {
    return true;
  } else {
    return false;
  }
};
const TheLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <>
      {localStorage.getItem("role") === "user" ? (
        <div className="c-app c-default-layout">
          <TheUserSidebar />
          <div className="c-wrapper">
            <TheUserHeader />
            <div className="c-body">
              <TheContent />
            </div>
          </div>
        </div>
      ) : localStorage.getItem("role") == "admin" ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
          </div>
        </div>
      ) : (
            <Route
              render={() => (
                <>
                  {localStorage.clear()}
                  <Redirect to={{ pathname: "/login" }} />
                </>
              )}
            />
          )}
    </>
  );
};

export default TheLayout;
