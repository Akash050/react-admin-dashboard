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
import SaveBlue from "../../../assets/icons/save-blue-icon.svg";
import upload from "../../../assets/icons/upload.svg";
import CompanyIcon from "../../../assets/icons/company-icon.svg";
import WebsiteIcon from "../../../assets/icons/website-icon.svg";
import MoneyIcon from "../../../assets/icons/money-icon.svg";

import DollarIcon from "../../../assets/icons/dollar-icon.svg";
import UserIcon from "../../../assets/icons/user-icon.svg";
import CalendarIcon from "../../../assets/icons/calender-icon.svg";
import YearIcon from "../../../assets/icons/year-icon.svg";

import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";

import FacebookIcon from "../../../assets/icons/facebook.svg";
import LinkIcon from "../../../assets/icons/linkedin.svg";
import TwitterIcon from "../../../assets/icons/twitter.svg";

import CheckActive from "../../../assets/icons/check-active-icon.png";
import CheckInactive from "../../../assets/icons/check-inactive-icon.svg";

const CreateContact = () => {
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
      <div className="create-employee-header align-items-center">
        <h3 className="titleheader--card">Create Contact - Company</h3>
        <CButton className="save-btn-white btn">
          <img class="m-0 mr-2" src={SaveBlue} />
          Save
        </CButton>
      </div>
      <CForm className="login-form mb-5">
        <div className="create-employee-wrapper">
          <div className="create-employee-left row flex-1">
            <div className="create-employee-body1 col-12 col-md-3">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Company Image</div>
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
                  <span class="uploadprofile">
                    <img src={upload} />
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
                  <CImg src={CompanyIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Company</div>
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
                  <CImg src={officeIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Office</div>
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
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={emailIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Email</div>
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
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={tagIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Tags</div>
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
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={WebsiteIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Website</div>
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
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Select Level</div>
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
            <div className="create-employee-body2 col-12 col-md-3">
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
              </div>
              <div className="form-group">
                <h4 className="titleUser-head text-left">Bank Account</h4>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Account Name</div>
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
                  <div className="employee-field-label">Bank Name</div>
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
                  <div className="employee-field-label">Account number</div>
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
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Routing number</div>
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
            <div className="create-employee-body2 col-12 col-md-3">
              <div className="form-group mb-0">
                <h4 className="titleUser-head text-left">
                  <CImg src={MoneyIcon} fluid className="field-icon m-0 mr-2" />
                  Monthly Package
                </h4>
              </div>
              <div className="border userCreat--card mb-4">
                <div className="form-group">
                  <div className="employee-field-label-wrapper">
                    <CImg src={DollarIcon} fluid className="field-icon" />
                    <div className="employee-field-label">Amount</div>
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
                    <CImg src={UserIcon} fluid className="field-icon" />
                    <div className="employee-field-label"># Of Users</div>
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
                  <div className="row employee-field-label-wrapper">
                    <div className="col-12">
                      <h4 className="titleUser-head text-left">Re-Occuring</h4>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <CImg
                            src={CalendarIcon}
                            fluid
                            className="field-icon"
                          />
                          <div className="employee-field-label">Monthly</div>
                        </div>
                        <span className="Iconoccr--ic">
                          <img src={CheckActive} />
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <CImg src={YearIcon} fluid className="field-icon" />
                          <div className="employee-field-label">Annual</div>
                        </div>
                        <span className="Iconoccr--ic">
                          <img src={CheckInactive} />
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">Custom</div>
                        </div>
                        <span className="customertagINput">
                          <input
                            type=""
                            className="form-control input-field-control"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">N/A</div>
                        </div>
                        <span className="Iconoccr--ic">
                          <img src={CheckInactive} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h4 className="titleUser-head text-left cardtl-txt-black">
                  Card Details
                </h4>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Name on Card</div>
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
                  <div className="employee-field-label">Expiration DAte</div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6 pr-1">
                    <div className="employee-field-label-wrapper">
                      <div className="employee-field-label">Month</div>
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
                  <div className="col-12 col-lg-6 pl-1">
                    <div className="employee-field-label-wrapper">
                      <div className="employee-field-label">Year</div>
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
              </div>
            </div>
            <div className="create-employee-body3 col-12 col-md-3">
              <div className="form-group">
                <h4 className="addTitle text-left">
                  Auto Fill this section once user starts to type
                </h4>
                <div className="border userCreat--card mb-4">
                  <div className="form-group">
                    <div className="employee-field-label-wrapper">
                      <CImg src={AddresIcon} fluid className="field-icon" />
                      <div className="employee-field-label titleUser-head">
                        Address
                      </div>
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
                      <CImg src={CityIcon} fluid className="field-icon" />
                      <div className="employee-field-label titleUser-head">
                        City
                      </div>
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
                      <CImg src={CountryIcon} fluid className="field-icon" />
                      <div className="employee-field-label titleUser-head">
                        Country
                      </div>
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
                      <CImg src={StateIcon} fluid className="field-icon" />
                      <div className="employee-field-label titleUser-head">
                        State
                      </div>
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
                      <CImg src={ZipIcon} fluid className="field-icon" />
                      <div className="employee-field-label titleUser-head">
                        Zip Code
                      </div>
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
                </div>
              </div>
              <div className="form-group">
                <h4 className="addTitle text-left">
                  Add Social Media Accounts
                </h4>
                <ul className="">
                  <li className="buttonSocial">
                    <a href="#" className="btn btnSocial-Link fIcon">
                      <span className="IconScl">
                        <img src={FacebookIcon} className="m-0" />
                      </span>
                      Connect to Facebook
                    </a>
                  </li>
                  <li className="buttonSocial">
                    <a href="#" className="btn btnSocial-Link LinIcon">
                      <span className="IconScl">
                        <img src={LinkIcon} className="m-0" />
                      </span>
                      Connect to Linkedin
                    </a>
                  </li>
                  <li className="buttonSocial">
                    <a href="#" className="btn btnSocial-Link TwitIcon">
                      <span className="IconScl">
                        <img src={TwitterIcon} className="m-0" />
                      </span>
                      Connect to Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CForm>
    </>
  );
};

export default CreateContact;
