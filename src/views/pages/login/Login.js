import React, { useState } from "react";
import { CButton, CForm, CImg, CInput } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../../redux/actions/adminAction";
import {
  sendforgetPass,
  getresetPass,
} from "../../../redux/actions/authAction";
import { useHistory, useLocation } from "react-router";
import _custom from "../../../scss/_custom.scss";
import logo from "../../../logo.svg";
import swal from "sweetalert";
import loginImage from "../../../assets/login-img.svg";
import companyTitle from "../../../assets/company-title.svg";
import * as Validator from "validatorjs";
import Loading from "react-fullscreen-loading";
import ReCAPTCHA from "react-google-recaptcha";
import { resetPassword } from "../../../services/auth";
import { ToastContainer, toast } from "react-toastify";
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
  const dispatch = useDispatch();
  const location = useLocation();
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
      username: "required|email",
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
      const data = await dispatch(loginAdmin(params));
      if (data.success === true) {
        if (data.body.role == "ROLE_COMPANY_ADMIN") {
          localStorage.setItem("role", "ROLE_COMPANY_ADMIN");
          //  localStorage.setItem("isCompany", false);
        } else if (data.body.role == "ROLE_SUPER_ADMIN") {
          localStorage.setItem("role", "ROLE_SUPER_ADMIN");
          // localStorage.setItem("isCompany", true);
        } 
        else if(data.body.role == "ROLE_ADMIN"){
          localStorage.setItem("role", "ROLE_ADMIN");
        }
        else {
          localStorage.setItem("role", "user");
          localStorage.setItem("isCompany", false);
        }
        setIsLoading(false);
        let role = localStorage.getItem("role");
        if (role === "user") {
          history.push("/user/dashboard");
        }
        else if (role == "ROLE_SUPER_ADMIN") {
          history.push("/superadmin/companies");
        }
        else if (role == "ROLE_COMPANY_ADMIN") {
          history.push("/admin/dashboard");
        }
        else if (role == "ROLE_ADMIN") {
          history.push("/admin/dashboard");
        }
      }
      else {
        setIsLoading(false);
        setErrorMsg(data.message);
      }
    }
  }

  let onCaptchaChange = (value) => {
    console.log("Captchalue:", value);
  };
  let openToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
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
      username: "required|email",
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
    let payload = {
      email: username,
    };
    const data = await dispatch(sendforgetPass(payload));
    if (data.success) {
      setResetPass(true);
      setIsLoading(false);
    } else {
      setErrorMsg(data.message);
      setIsLoading(false);
    }
  };
  let onPassReset = async () => {
    setErrorMsg("");
    if(token == ""){
      setErrorMsg("Token required");
      setIsLoading(false);
      return
    }
    if(newPass == ""){
      setErrorMsg("Password required");
      setIsLoading(false);
      return
    }
    if(confirmPass == ""){
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
    let payload = {
      token: token,
      password: confirmPass
    }
    const data = await dispatch(getresetPass(payload));
    if (data.success) {
      swal("Password Updated Succesfully", {
        icon: "success",
      });
      setIsLoading(false);
     // openToast("Password Updated Succesfully");
      setForgetPass(false);
      setResetPass(false);
    } else {
      setIsLoading(false);
      setErrorMsg(data.message);
    }
  };
  let onLoginBack = () => {
    setForgetPass(false);
    setResetPass(false);
  };
  console.log("local sst ->>", localStorage)
  return (
    <div className="login-wrapper-container container-fluid">
      {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
        <div className="row rowheight-login">
          <div className="loginbox-wraper col-12 col-md-6">
            <div className="LOginbox--gridview">
              <div class="lognflex-w">
                <div className="register-form-header mb-3 d-flex align-item-center justify-content-center">
                  <CImg src={logo} fluid className="login-logo" />

                  <CImg src={companyTitle} fluid className="company-title" />
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
                    {/* <ReCAPTCHA
                        sitekey="Your client site key"
                        onChange={onCaptchaChange}
                      /> */}
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
                        onClick={(e) =>onSubmitForget(e)}
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
              <p>© 2020 CoProperty, Inc. All rights reserved. |<span className="linkPrivacy ml-4"><a href="">Privacy</a></span></p>
            </div>
          </div>
          <div className="Imagebox--rightwrap col-12 col-md-6">
            <div className="rightside--loginImg" style={{ backgroundImage: `url(${loginImage})` }}>
            </div>
          </div>
        </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
