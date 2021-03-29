import React, { useState } from "react";
import { CButton, CForm, CImg, CInput } from "@coreui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import _custom from "../../../scss/_custom.scss";
import swal from "sweetalert";
import * as Validator from "validatorjs";
import Loading from "react-fullscreen-loading";
import "react-toastify/dist/ReactToastify.css";


const Login = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgUser, setErrorMsgUser] = useState("");
  const [errorMsgPass, setErrorMsgPass] = useState("");
  const [forgetPass, setForgetPass] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [token, setToken] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoding, setIsLoading] = useState(false);
  const dispatch = useDispatch();;
  const history = useHistory();
  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMsgUser("");
    setErrorMsgPass("");
    setErrorMsg("");
    const params = {
      username: username,
      password: password,
    };
    const rules = {
      username: "required",
      password: "required",
    };
    let validation = new Validator(params, rules, {
      required: ":attribute required",
    });
    if (validation.fails()) {
      setIsLoading(false);
      if (validation.errors.first("username")) {
        setErrorMsgUser(validation.errors.first("username"));
      }
      if (validation.errors.first("password")) {
        setErrorMsgPass(validation.errors.get("password"));
      }
    } else if (!validation.fails()) {
      if (username == "admin") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("isLoggedIn", true);
      } else if (username == "user") {
        localStorage.setItem("role", "user");
        localStorage.setItem("isLoggedIn", true);
      }
      setIsLoading(false);
      let role = localStorage.getItem("role");
      if (role === "user") {
        history.push("/user/dashboard");
      }
      else if (role == "admin") {
        history.push("/admin/dashboard");
      }
    }
  }

  let forgetPassword = () => {
    setForgetPass(true);
  };
  let onSubmitForget = async () => {
    setErrorMsgUser("");
    setErrorMsg("");
    const params = {
      username: username,
    };
    const rules = {
      username: "required",
    };
    let validation = new Validator(params, rules, {
      required: ":attribute required",
    });
    if (validation.fails()) {
      setIsLoading(false);
      if (validation.errors.first("username")) {
        setErrorMsgUser(validation.errors.first("username"));
      }
      return;
    }
    setIsLoading(true);
    setResetPass(true);
    setIsLoading(false);
  };

  let onPassReset = async () => {
    setErrorMsg("");
    if (token == "") {
      setErrorMsg("Token required");
      setIsLoading(false);
      return
    }
    if (newPass == "") {
      setErrorMsg("Password required");
      setIsLoading(false);
      return
    }
    if (confirmPass == "") {
      setErrorMsg("Confirm password required");
      setIsLoading(false);
      return
    }
    if (newPass !== confirmPass) {
      setErrorMsg("Password do not match");
      setIsLoading(false);
      return
    }
    setIsLoading(true)
    swal("Password Updated Succesfully", {
      icon: "success",
    });
    setIsLoading(false);
    setForgetPass(false);
    setResetPass(false);
  };
  let onLoginBack = () => {
    setForgetPass(false);
    setResetPass(false);
  };

  return (
    <div className="login-wrapper-container container-fluid">
      {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
      <div className="row rowheight-login">
        <div className="loginbox-wraper col-12 col-md-6">
          <div className="LOginbox--gridview">
            <div class="lognflex-w">
              <div className="register-form-header mb-3 d-flex align-item-center justify-content-center">
                {/* <CImg src={logo} fluid className="login-logo" />

                  <CImg src={companyTitle} fluid className="company-title" /> */}
                <div>
                  <div>
                    <h3>Admin Dashboard  </h3>
                    <p>User - admin</p>
                    <p>password - admin</p>
                  </div>

                  <div>
                    <h3>User Dashboard  </h3>
                    <p>User - user</p>
                    <p>password - user</p>
                  </div>
                </div>

              </div>
              <div className="login-card">
                {!forgetPass ? (
                  <CForm className="login-form">
                    <div className="login-body">
                      <div className="form-group">
                        <div className="login-field-label"> Username </div>
                        <CInput
                          type="text"
                          name="username"
                          value={username}
                          placeholder=""
                          autoComplete="username"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <div className="error">
                          {errorMsgUser ? errorMsgUser : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="login-field-label"> Password </div>
                        <CInput
                          type="password"
                          name="password"
                          value={password}
                          placeholder=""
                          autoComplete="current-password"
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyPress={event => {
                            if (event.key === 'Enter') {
                              onSubmit()
                            }
                          }}
                        />
                        <span className="error">
                          {errorMsgPass ? errorMsgPass : null}
                        </span>
                      </div>
                      <div className="form-group">
                        <CButton
                          color="primary"
                          className="login-btn w-100"
                          onClick={onSubmit}
                        >
                          Login
                      </CButton>
                      </div>
                      <div className="error">{errorMsg ? errorMsg : null}</div>
                      <CButton
                        onClick={forgetPassword}
                        color="link"
                        className="forget-password"
                      >
                        Forgot password?
                    </CButton>
                    </div>
                  </CForm>
                ) : resetPass ? (
                  <CForm className="login-form">
                    <div className="login-body">
                      <div className="form-group">
                        <div className="login-field-label"> Code </div>
                        <CInput
                          type="text"
                          name="token"
                          value={token}
                          placeholder=""
                          autoComplete="token"
                          onChange={(e) => setToken(e.target.value)}
                        />
                        <div className="error">
                          {errorMsgUser ? errorMsgUser : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="login-field-label"> Password </div>
                        <CInput
                          type="password"
                          name="password"
                          value={newPass}
                          placeholder=""
                          autoComplete="password"
                          onChange={(e) => setNewPass(e.target.value)}
                        />
                        <div className="error">
                          {errorMsgUser ? errorMsgUser : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="login-field-label"> Confirm Password </div>
                        <CInput
                          type="password"
                          name="confirmPassword"
                          value={confirmPass}
                          placeholder=""
                          autoComplete="confirmPass"
                          onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <div className="error">
                          {errorMsgUser ? errorMsgUser : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <CButton
                          color="primary"
                          className="login-btn w-100"
                          onClick={onPassReset}
                        >
                          Submit
                      </CButton>
                        <div className="error">{errorMsg ? errorMsg : null}</div>
                      </div>
                      <div className="form-group mb-0">
                        <CButton
                          onClick={onLoginBack}
                          color="link"
                          className="forget-password w-100"
                        >
                          Back to login
                      </CButton>
                      </div>
                    </div>
                  </CForm>
                ) : (
                  <CForm className="login-form">
                    <div className="login-body">
                      <div className="form-group">
                        <div className="login-field-label"> Email </div>
                        <CInput
                          type="text"
                          name="username"
                          value={username}
                          placeholder=""
                          autoComplete="username"
                          onChange={(e) => setUserName(e.target.value)}
                          onKeyPress={event => {
                            if (event.key === 'Enter') {

                            }
                          }}
                        />
                        <div className="error">
                          {errorMsgUser ? errorMsgUser : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <CButton
                          color="primary"
                          className="login-btn w-100"
                          onClick={(e) => onSubmitForget(e)}
                        >
                          Submit
                      </CButton>
                        <div className="error">{errorMsg ? errorMsg : null}</div>
                      </div>
                      <div className="form-group mb-0">
                        <CButton
                          onClick={onLoginBack}
                          color="link"
                          className="forget-password w-100"
                        >
                          Back to login
                      </CButton>
                      </div>
                    </div>
                  </CForm>
                )}
              </div>
            </div>
          </div>
          <div className="copywrite-txt">
            <p>© 2021 , Akash Kumar Verma  </p>
          </div>
        </div>
        <div className="Imagebox--rightwrap col-12 col-md-6">
          <div className="rightside--loginImg" style={{ backgroundColor: '#0070D2' }}>
          </div>
          {/* <div className="rightside--loginImg" style={{ backgroundImage: `url(${loginImage})` }}>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
