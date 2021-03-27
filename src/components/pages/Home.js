import React from "react";
import { useHistory, useLocation } from "react-router";
export default () => {
  const history = useHistory();
  history.push("/login");
  return <h1>Login</h1>;
};
