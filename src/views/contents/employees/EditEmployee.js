import React, { useEffect, useState, createRef } from "react";
import { CInput, CForm, CButton, CImg } from "@coreui/react";
import Loading from "react-fullscreen-loading";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  updateEmployee,
  updated,
  created,
  uploadProfile
} from "../../../redux/actions/employeeActions";
import * as Validator from "validatorjs";
import userIcon from "../../../assets/user-icon.svg";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import BackIcon from "../../../assets/icons/back-icon.svg";
import tagIcon from "../../../assets/tags.svg";
import create from "../../../assets/icons/create.svg";
import save from "../../../assets/icons/save.svg";
import upload from "../../../assets/icons/upload.svg";

const EditEmployee = (props) => {
  let history = useHistory();
  const { userData } = props.location.state;
  const profileImage = createRef();
  const [profileUrl, setProfileUrl] = useState(userData.profileImage);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const nameArr = userData.name.split(" ");
  const [firstName, setFirstName] = useState(nameArr[0]);
  const [lastName, setLastName] = useState(nameArr[1] ? nameArr[1] : "");
  const [cell, setCell] = useState(userData.phoneNumber);
  const [office, setOffice] = useState(userData.office);
  const [email, setEmail] = useState(userData.email);
  const [tags, setTags] = useState(userData.designation);
  const [role, setRole] = useState(userData.authority.name);
  const [annualSalary, setAnnualSalary] = useState(userData.monthlyPayment);
  const [notes, setNotes] = useState(userData.note);
  const [toastMsg, setToastMsg] = useState("");
  const [isToast, setIsToast] = useState(false);
  const [isRoleEditable, setIsRoleEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgCell, setErrorMsgCell] = useState("");
  const [errorMsgOffice, setErrorMsgOffice] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgRole, setErrorMsgRole] = useState("");
  let roleOptions = [
    { title: "User", value: "ROLE_USER" },
    { title: "Admin", value: "ROLE_ADMIN" }
  ];
  const dispatch = useDispatch();
  const onImageChange = (event) => {
    setProfileUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0])
    setProfilePreviewUrl(url)
  };
  const normalizeInput = (value, previousValue) => {
    console.log(value, previousValue)
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  const onCellChange = (val) => {
    if (val < 0) {
      return;
    }
    setCell(val);
  };
  const onOfficeChange = (val) => {
    if (val < 0) {
      return;
    }
    setOffice(val);
  };
  const onSalaryChange = (val) => {
    if (val < 0) {
      return;
    }
    setAnnualSalary(val);
  };
  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMsgCell("");
    setErrorMsgEmail("");
    setErrorMsgName("");
    setErrorMsgRole("");
    const params = {
      id: userData.id,
      name: firstName + " " + lastName,
      phoneNumber: cell,
      email: email,
      office: office,
      designation: tags,
      authority: {
        name: role.value,
      },
      team: [],
      address: {
        address: "",
        state: "",
        city: "",
      },
      monthlyPayment: annualSalary,
      note: notes,
    };
    const rules = {
      name: "required",
      phoneNumber: "required|min:14|max:14",
      office: "required|min:14|max:14",
      email: "required|email",
      authority: {
        name: "required",
      },
    };
    let validation = new Validator(params, rules, {
      required: " :attribute is required",
    });
    let nameValidation = new Validator(params, rules, {
      required: "Name is required",
    });
    let emailValidation = new Validator(params, rules, {
      required: "Email is required",
    });
    let phoneValidation = new Validator(params, rules, {
      required: { string: 'Phone number is required' },
      max: {
        string: 'Phone number is invalid'
      },
      min: {
        string: 'Phone number is invalid'
      }
    });
    let roleValidation = new Validator(params, rules, {
      required: "Role is required",
    });
    if (emailValidation.fails()) {
      setIsLoading(false);
      if (emailValidation.errors.first("email")) {
        setErrorMsgEmail(emailValidation.errors.first("email"));
      }
    }
    if (nameValidation.fails()) {
      setIsLoading(false);
      if (nameValidation.errors.first("name")) {
        console.log("name", nameValidation.errors.first("name"));
        setErrorMsgName(nameValidation.errors.first("name"));
      }
    }
    if (phoneValidation.fails()) {
      setIsLoading(false);
      if (phoneValidation.errors.first("phoneNumber")) {
        setErrorMsgCell(phoneValidation.errors.first("phoneNumber"));
      }
      if (phoneValidation.errors.first("office")) {
        setErrorMsgOffice(phoneValidation.errors.first("office"));
      }
    }
    if (roleValidation.fails()) {
      setIsLoading(false);
      if (roleValidation.errors.first("authority.name")) {
        setErrorMsgRole(roleValidation.errors.first("authority.name"));
      }
    }

    if (
      !validation.fails() &&
      !phoneValidation.fails() &&
      !roleValidation.fails()
    ) {
      setIsLoading(false);
      console.log("params", params);
      const data = await dispatch(updateEmployee(params));
      if (profileUrl != '' && profilePreviewUrl != '') {
        let formData = new FormData();
        formData.append('profile', profileUrl)
        if (data.body != null) {
          const uploadData = await dispatch(uploadProfile(data.body.id, formData));
        }
      }
      if (data.success === true) {
        setIsLoading(false);
        dispatch(updated(true));
        history.push("/admin/employees");
      } else {
        setIsLoading(false);
        dispatch(updated(false));
        console.log("err");
      }
    }
  };
  useEffect(() => {
    async function getOffers() {
      // dispatch(offerList());
    }
    getOffers();

  }, []);

  let handleRoleChange = (e, val) => {
    if (val != null) {
      setRole(val);
    }

  };
  let goToOrignal = () => {
    localStorage.setItem("role", "ROLE_SUPER_ADMIN");
    history.push("/superadmin/companies");
  };
  let onBack = () => {
    history.push("/admin/employees");
  };
  console.log("userData ->", userData);
  console.log("cell ->", cell);
  console.log("office ->", office);
  // console.log("role ->", role);
  return (
    <>
      {/* <div className="create-employee-back-btn align-items-center mb-3">
        <CButton className="save-btn-white btn" onClick={onBack}>
          <img src={BackIcon} className="m-0 mr-2" /> Back
        </CButton>
      </div> */}
      {isLoading ? <Loading loading loaderColor="#3498db" /> : null}
      {localStorage.getItem("role") == "SUPER_ADMIN_AS_COMPANY_ADMIN" ? (
        <div onClick={goToOrignal} className="snackbar">
          Go Back To Super Admin Panel
        </div>
      ) : null}
      <div className="create-employee-header">
        <h3 className="titleheader--card d-flex align-items-center">
          <span className="mr-2">
            <img src={create} class="m-0" />
          </span>
          Edit Employee
        </h3>
      </div>
      <CForm className="login-form mb-5">
        <div className="create-employee-wrapper">
          <div className="create-employee-left pr-5 mr-5 row flex-1">
            <div className="create-employee-body1 col-12 col-md-4">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">
                    Profile Image{" "}
                    {profileUrl == undefined || profileUrl == '' ? (
                      null
                    ) :
                      <CImg
                        src={
                          profilePreviewUrl != '' ? profilePreviewUrl : profileUrl
                        }
                        fluid
                        className="imgPrf--empl"
                      />
                    }{" "}
                  </div>
                </div>
                <div className="form-file">
                  <input
                    type="file"
                    className="form-file-input"
                    id="customFile"
                    ref={profileImage}
                    onChange={onImageChange}
                  />
                  <span class="uploadprofile">
                    <img src={upload} class="m-0 mr-2" />
                    Upload
                  </span>
                  {/* <label class="form-file-label" for="customFile"> */}
                  {/* <span class="form-file-text">Choose file...</span> */}
                  {/* <span class="form-file-button">Browse</span> */}
                  {/* </label> */}
                </div>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={userIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> First Name</div>
                </div>
                <CInput
                  type="text"
                  value={firstName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label className={`error ${errorMsgName ? null : 'errorFill'} `}>
                  {errorMsgName ? errorMsgName : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={userIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Last Name</div>
                </div>
                <CInput
                  type="text"
                  value={lastName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="create-employee-body2 col-12 col-md-4">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={cellIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Cell</div>
                </div>
                <CInput
                  type="text"
                  value={cell}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onCellChange((prevState) => normalizeInput(e.target.value, prevState))}
                // onChange={(e) => onCellChange(e.target.value)}
                />
                <label className={`error ${errorMsgCell ? null : 'errorFill'} `}>
                  {errorMsgCell ? errorMsgCell : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={officeIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Office</div>
                </div>
                <CInput
                  type="text"
                  value={office}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onOfficeChange((prevState) => normalizeInput(e.target.value, prevState))}
                // onChange={(e) => onOfficeChange(e.target.value)}
                />
                <label className={`error ${errorMsgOffice ? null : 'errorFill'} `}>
                  {errorMsgOffice ? errorMsgOffice : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={emailIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Email</div>
                </div>
                <CInput
                  type="email"
                  disabled={true}
                  value={email}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className={`error ${errorMsgEmail ? null : 'errorFill'} `}>
                  {errorMsgEmail ? errorMsgEmail : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={tagIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Tags</div>
                </div>
                <CInput
                  type="text"
                  value={tags}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
            <div className="create-employee-body3 col-12 col-md-4">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label"> Role</div>
                </div>
                <Autocomplete
                  options={roleOptions}
                  onChange={(e, v) => handleRoleChange(e, v)}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  value={roleOptions.find(v => v.value === role) || {}}
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      className="input-field-control-role"
                    >
                      <input
                        style={{
                          width: "100%",
                          height: 45,
                          border: "1px solid #ced4da",
                          borderRadius: ".25rem",
                          paddingLeft: "10px",
                        }}
                        {...params}
                        label=""
                        variant="outlined"
                        type="text"
                        {...params.inputProps}
                      />
                    </div>
                  )}
                />
                <label className="error errorFill">
                  {errorMsgRole ? errorMsgRole : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label"> Salary </div>
                </div>
                <CInput
                  type="number"
                  value={annualSalary}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onSalaryChange(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label"> Notes</div>
                </div>
                <textarea
                  id="message"
                  rows="8"
                  cols="50"
                  value={notes}
                  className="input-txtarea-control"
                  placeholder="&#xf15c; Add Notes"
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                {/* <CInput
                type="text"
                
                value={notes}
                placeholder="&#xf15c; Search Contact or Company"
                className="input-field-notes"
                className="fa"
                autoComplete="current-password"
                //   onChange={(e) => setPassword(e.target.value)}
              /> */}
              </div>
            </div>
          </div>
          <div className="create-employee-right" onClick={onSubmit}>
            <CButton class="btn btn-act--comp"
              style={{ backgroundColor: '#0046fe', color: 'white' }} >
              <img src={save} class="m-0  mr-2" />
              Save
            </CButton>
          </div>
        </div>
      </CForm>
    </>
  );
};

export default EditEmployee;
