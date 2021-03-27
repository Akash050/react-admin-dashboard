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
  } else if (requestedRoles === "ROLE_SUPER_ADMIN") {
    return "ROLE_SUPER_ADMIN";
  } else if (requestedRoles === "ROLE_COMPANY_ADMIN") {
    return "ROLE_COMPANY_ADMIN";
  }
  else {
    return false;
  }
  // console.log("requestedRoles =>", requestedRoles, permittedRoles);
  // console.log("local  ->", localStorage);
  // if (requestedRoles === permittedRoles) {
  //   return true;
  // } else {
  //   return false;
  // }
};
const grantPermissionAdmin = () => {
  const requestedRoles = localStorage.getItem("role");
  const permittedRoles = "ROLE_SUPER_ADMIN";
  if (requestedRoles === permittedRoles) {
    return true;
  } else {
    return false;
  }
};
let getpermission = grantPermission()
const TheLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;
  let perm = grantPermissionAdmin();
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
            {/* <TheFooter /> */}
          </div>
        </div>
      ) : localStorage.getItem("role") == "ROLE_SUPER_ADMIN" 
       || localStorage.getItem("role") == "ROLE_COMPANY_ADMIN" || localStorage.getItem("role") == "SUPER_ADMIN_AS_COMPANY_ADMIN" || localStorage.getItem("role") == "ROLE_ADMIN" ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            {/* <TheFooter /> */}
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
    // <div className="c-app c-default-layout">
    //   <TheUserSidebar />
    //   <div className="c-wrapper">
    //     <TheUserHeader />
    //     <div className="c-body">
    //       <UserPanelDashboard />
    //     </div>
    //     <TheFooter />
    //   </div>
    // </div>
  );
};

export default TheLayout;
