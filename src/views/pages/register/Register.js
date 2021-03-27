import React, { useState } from "react";
import { CButton, CForm, CImg, CInput } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../../redux/actions/adminAction";
import { useHistory, useLocation } from "react-router";
import _custom from "../../../scss/_custom.scss";
import logo from "../../../logo.svg";
import registerImage from "../../../assets/login-img.svg";
import companyLogo from "../../../assets/company.svg";
import emailLogo from "../../../assets/email.svg";
import cellLogo from "../../../assets/cell.svg";
import locationLogo from "../../../assets/location.svg";
import companyTitle from "../../../assets/company-title.svg";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const onSubmit = async () => {
    const params = {
      email,
      password,
      userName,
      mobile,
      role,
    };
    const data = dispatch(createAdmin(params));
    if (data.responseCode === 200) {
      alert(data.message);
      history.push("/dashboard");
    } else {
      alert(data.message);
    }
  };
  return (
    <div className="register-wrapper">
      <div className="register-card-wrapper">
        <div className="register-form-header">
          <CImg src={logo} fluid className="logo" />

          <CImg src={companyTitle} fluid className="company-title" />
        </div>
        <div className="register-card">
          <CForm className="register-form">
            <div className="register-body">
              <div className="input-card">
                <CImg src={companyLogo} fluid className="input-field-logo" />
                <p> Company </p>
                <CInput
                  type="text"
                  placeholder=""
                  autoComplete="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-card">
                <CImg src={emailLogo} fluid className="input-field-logo" />
                <p> Email </p>
                <CInput
                  type="text"
                  placeholder=""
                  autoComplete="email"
                  value={userName}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-card">
                <CImg src={cellLogo} fluid className="input-field-logo" />
                <p> Cell </p>
                <CInput
                  type="text"
                  placeholder=""
                  autoComplete="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-card">
                <CImg src={locationLogo} fluid className="input-field-logo" />
                <p> Location </p>
                <CInput
                  type="text"
                  placeholder=""
                  autoComplete="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <CButton
                color="primary"
                className="register-btn"
                onClick={onSubmit}
              >
                Sign up
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
      <div>
        <div className="register-image">
          <CImg src={registerImage} fluid className="register-image" />
        </div>
      </div>
    </div>
    // <div className="c-app c-default-layout flex-row align-items-center">
    //   <CContainer>
    //     <CRow className="justify-content-center">
    //       <CCol md="9" lg="7" xl="6">
    //         <CCard className="mx-4">
    //           <CCardBody className="p-4">
    //             <CForm>
    //               <h1>Register</h1>
    //               <p className="text-muted">Create your account</p>
    //               <CInputGroup className="mb-3">
    //                 <CInputGroupPrepend>
    //                   <CInputGroupText>
    //                     <CIcon name="cil-user" />
    //                   </CInputGroupText>
    //                 </CInputGroupPrepend>
    //                 <CInput
    //                   type="text"
    //                   placeholder="Username"
    //                   autoComplete="username"
    //                   value={userName}
    //                   onChange={(e) => setUserName(e.target.value)}
    //                 />
    //               </CInputGroup>
    //               <CInputGroup className="mb-3">
    //                 <CInputGroupPrepend>
    //                   <CInputGroupText>@</CInputGroupText>
    //                 </CInputGroupPrepend>
    //                 <CInput
    //                   type="text"
    //                   placeholder="Email"
    //                   autoComplete="email"
    //                   value={email}
    //                   onChange={(e) => setEmail(e.target.value)}
    //                 />
    //               </CInputGroup>
    //               <CInputGroup className="mb-3">
    //                 <CInputGroupPrepend>
    //                   <CInputGroupText>@</CInputGroupText>
    //                 </CInputGroupPrepend>
    //                 <CInput
    //                   type="text"
    //                   placeholder="Mobile"
    //                   autoComplete="mobile"
    //                   value={mobile}
    //                   onChange={(e) => setMobile(e.target.value)}
    //                 />
    //               </CInputGroup>
    //               <CInputGroup className="mb-3">
    //                 <CInputGroupPrepend>
    //                   <CInputGroupText>
    //                     <CIcon name="cil-lock-locked" />
    //                   </CInputGroupText>
    //                 </CInputGroupPrepend>
    //                 <CInput
    //                   type="text"
    //                   placeholder="Role"
    //                   autoComplete="role"
    //                   value={role}
    //                   onChange={(e) => setRole(e.target.value)}
    //                 />
    //               </CInputGroup>
    //               <CInputGroup className="mb-4">
    //                 <CInputGroupPrepend>
    //                   <CInputGroupText>
    //                     <CIcon name="cil-lock-locked" />
    //                   </CInputGroupText>
    //                 </CInputGroupPrepend>
    //                 <CInput
    //                   type="password"
    //                   placeholder="Password"
    //                   autoComplete="new-password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                 />
    //               </CInputGroup>
    //               <CButton color="success" block onClick={onSubmit}>
    //                 Create Account
    //               </CButton>
    //             </CForm>
    //           </CCardBody>
    //           <CCardFooter className="p-4">
    //             <CRow>
    //               <CCol xs="12" sm="6">
    //                 <CButton className="btn-facebook mb-1" block>
    //                   <span>facebook</span>
    //                 </CButton>
    //               </CCol>
    //               <CCol xs="12" sm="6">
    //                 <CButton className="btn-twitter mb-1" block>
    //                   <span>twitter</span>
    //                 </CButton>
    //               </CCol>
    //             </CRow>
    //           </CCardFooter>
    //         </CCard>
    //       </CCol>
    //     </CRow>
    //   </CContainer>
    // </div>
  );
};

export default Register;
