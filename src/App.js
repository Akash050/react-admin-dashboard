import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "./assets/css/userpanel.css";
import "./assets/css/client.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const AuthRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedInisLoggedInisLoggedIn --->", isLoggedIn)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} role="user" />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => {
                  console.log("local --login .", localStorage);
                  if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "user"
                  ) {
                    return <Redirect to={{ pathname: "/user/dashboard" }} />;
                  } else if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "ROLE_SUPER_ADMIN"
                  ) {
                    return (
                      <Redirect to={{ pathname: "/superadmin/companies" }} />
                    );
                  } else if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "ROLE_COMPANY_ADMIN"
                  ) {
                    return <Redirect to={{ pathname: "/admin/dashboard" }} />;
                  } else if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "ROLE_ADMIN"
                  ) {
                    return <Redirect to={{ pathname: "/admin/dashboard" }} />;
                  } else {
                    return <Login {...props} />;
                  }
                }}
              />
              <Route
                exact
                path="/login"
                name="Login"
                render={(props) => {
                  if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "user"
                  ) {
                    return <Redirect to={{ pathname: "/user/dashboard" }} />;
                  } else if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "ROLE_SUPER_ADMIN"
                  ) {
                    return (
                      <Redirect to={{ pathname: "/superadmin/companies" }} />
                    );
                  } else if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "ROLE_COMPANY_ADMIN"
                  ) {
                    return <Redirect to={{ pathname: "/admin/dashboard" }} />;
                  } else if (
                    localStorage.isLoggedIn == "true" &&
                    localStorage.role == "ROLE_ADMIN"
                  ) {
                    return <Redirect to={{ pathname: "/admin/dashboard" }} />;
                  } else {
                    return <Login {...props} />;
                  }
                }}
              />
              {/* <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              /> */}
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <AuthRoute
                path="/"
                name="Home"
                component={TheLayout}
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
