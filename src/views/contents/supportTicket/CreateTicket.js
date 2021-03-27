import React, { useEffect, useState, createRef } from "react";
import Modal from "../../../components/common/Modal";
import {
  CRow,
  CCol,
  CLabel,
  CInput,
  CForm,
  CFormGroup,
  CFormText,
  CButton,
  CImg,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { offerList, addOffer } from "../../../redux/actions/offerAction";
import userIcon from "../../../assets/user-icon.svg";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import tagIcon from "../../../assets/tags.svg";
import create from "../../../assets/icons/create.svg";
import save from "../../../assets/icons/save.svg";
import upload from "../../../assets/icons/upload.svg";
const CreateTicket = () => {
  const profileImage = createRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cell, setCell] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");
  const [role, setRole] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const { offerslist } = useSelector((state) => state.offers);
  const onSubmit = async () => {
    const params = {
      profileImage: profileImage.current.files[0].name,
      firstName: firstName,
      lastName: lastName,
      cell: cell,
      office: office,
      email: email,
      tags: tags,
      role: role,
      annualSalary: annualSalary,
      notes: notes,
    };
    // const data = await dispatch(loginAdmin(params));
    // if (data.success === true) {
    //   localStorage.setItem("token", data.body.token);
    //   history.push("/dashboard");
    // } else {
    //   console.log("err");
    // }
    console.log("values", params);
  };
  useEffect(() => {
    async function getOffers() {
      // dispatch(offerList());
    }
    getOffers();
  }, []);
  return (
    <>
      <div className="create-employee-header"><h3 className="titleheader--card"><span className="mr-2"><img src={create} /></span>Create Ticket</h3></div>
      <CForm className="login-form mb-5">
        <div className="create-employee-wrapper">
          <div className="create-employee-left pr-5 mr-5 row flex-1">
            <div className="create-employee-body1 col-12 col-md-4">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label"> Profile Image</div>
                </div>
                <div class="form-file">
                  <input
                    type="file"
                    class="form-file-input"
                    id="customFile"
                    ref={profileImage}
                    onChange={(e) => {
                      // console.log("---");
                      // console.log("okay", profileImage.current.files[0].name);
                    }}
                  />
                  <span class="uploadprofile"><img src={upload} />Upload</span>
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
                  onChange={(e) => setCell(e.target.value)}
                />
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
                  onChange={(e) => setOffice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={emailIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Email</div>
                </div>
                <CInput
                  type="email"
                  value={email}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <CInput
                  type="text"
                  value={role}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label"> Salary - Annually </div>
                </div>
                <CInput
                  type="number"
                  value={annualSalary}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setAnnualSalary(e.target.value)}
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
            <CButton color="primary" className="save-btn save-btncom"><img src={save} />Save</CButton>
          </div>
        </div>
      </CForm>
    </>
  );
};

export default CreateTicket;
