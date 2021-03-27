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
import Loading from "react-fullscreen-loading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import profile from "../../../assets/profile.svg";
import tagIcon from "../../../assets/tags.svg";
import SaveBlue from "../../../assets/icons/save-blue-icon.svg";
import Save from "../../../assets/icons/save.svg";
import BackIcon from "../../../assets/icons/back-icon.svg";
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
import * as Validator from "validatorjs";
import CheckActive from "../../../assets/icons/check-active-icon.png";
import CheckInactive from "../../../assets/icons/check-inactive-icon.svg";
import {
  created,
  createCompany,
  uploadProfile,
} from "../../../redux/actions/companyAction";

const CreateCompany = () => {
  const profileImage = createRef();
  let history = useHistory();
  const [isLoding, setIsLoading] = useState(false);
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyPreviewUrl, setCompanyPreviewUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebSite] = useState("");
  const [cell, setCell] = useState("");
  const [office, setOffice] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [country, setCountry] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgOffice, setErrorMsgOffice] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgTags, setErrorMsgTags] = useState("");
  const [errorMsgWebsite, setErrorMsgWebsite] = useState("");
  const [errorMsgLevel, setErrorMsgLevel] = useState("");
  const [errorMsgCell, setErrorMsgCell] = useState("");
  const [errorMsgAcname, setErrorMsgAcname] = useState("");
  const [errorMsgBnkname, setErrorMsgBnkname] = useState("");
  const [errorMsgAcnumber, setErrorMsgAcnumber] = useState("");
  const [errorMsgRoutingnum, setErrorMsgRoutingnum] = useState("");
  const [errorMsgAmount, setErrorMsgAmount] = useState("");
  const [errorMsgNoofuser, setErrorMsgNoofuser] = useState("");
  const [errorMsgCardname, setErrorMsgCardname] = useState("");
  const [errorMsgCardmexpiry, setErrorMsgCardmexpiry] = useState("");
  const [errorMsgCardyexpiry, setErrorMsgCardyexpiry] = useState("");
  const [errorMsgAddress, setErrorMsgAddress] = useState("");
  const [errorMsgCity, setErrorMsgCity] = useState("");
  const [errorMsgCountry, setErrorMsgCountry] = useState("");
  const [errorMsgState, setErrorMsgState] = useState("");
  const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
  const dispatch = useDispatch();

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
  const onImageChange = (event) => {
    setCompanyUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0])
    setCompanyPreviewUrl(url)
  };
  const sendPassToMail = (val) => {
    // setCompanyUrl(event.target.files[0]);
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
  const onPackageAmountChange = (val) => {
    if (val < 0) {
      return;
    }
    setPackageAmount(val);
  };
  const onAccountNoChange = (val) => {
    if (val < 0) {
      return;
    }
    setAccountNum(val);
  };
  const onRoutingNoChange = (val) => {
    if (val < 0) {
      return;
    }
    setRoutingNumber(val);
  };
  const resetFields = () => {
    setErrorMsgCell("");
    setErrorMsgName("");
    setErrorMsgEmail("");
    setErrorMsgTags("");
    setErrorMsgWebsite("");
    setErrorMsgOffice("");
    setErrorMsgLevel("");
    setErrorMsgAmount("");
    setErrorMsgAcname("");
    setErrorMsgBnkname("");
    setErrorMsgAcnumber("");
    setErrorMsgRoutingnum("");
    setErrorMsgAddress("");
    setErrorMsgCity("");
    setErrorMsgCountry("");
    setErrorMsgState("");
    setErrorMsgZipcode("");
  };
  const onSubmit = async () => {
    setIsLoading(true)
    resetFields();
    const params = {
      phoneNo: cell,
      name: companyName,
      monthlyAmountSubscription: packageAmount,
      email: email,
      amountToRecieve: "12345",
      office: office,
      website: website,
      note: notes,
      companyBankAccount: {
        accountName: accountName,
        bankName: bankName,
        accountNumber: accountNum,
        routingNumber: routingNumber,
      },
      divisionAddress: {
        address: address,
        state: state,
        city: city,
        country: country,
        zipcode: zipCode,
        longitude: "",
        latitude: "",
      },
    };
    const rules = {
      name: "required",
      phoneNo: "required|min:14|max:14",
      email: "required|email",
      website: "required|url",
      office: "required|min:14|max:14",
      monthlyAmountSubscription: "required",
      companyBankAccount: {
        accountName: "required",
        bankName: "required",
        accountNumber: "required|min:10|max:17",
        routingNumber: "required",
      },
      divisionAddress: {
        address: "required",
        state: "required",
        city: "required",
        country: "required",
        zipcode: "required",
      },
    };
    let nameValidation = new Validator(params, rules, {
      required: "Name is required",
    });
    let emailValidation = new Validator(params, rules, {
      required: "Email is required",
    });
    let websiteValidation = new Validator(params, rules, {
      required: "Website is required",
    });
    let validation = new Validator(params, rules, {
      required: ":attribute required",
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
    let amountValidation = new Validator(params, rules, {
      required: "Amount is required",
    });
    let accountNameValidation = new Validator(params, rules, {
      required: "Account name is required",

    });
    let bankNameValidation = new Validator(params, rules, {
      required: "Bank name is required",
    });
    let accountNumberValidation = new Validator(params, rules, {
      required: "Account number is required",
      max: {
        string: 'Account number is invalid'
      },
      min: {
        string: 'Account number is invalid'
      }
    });
    let routingNumberValidation = new Validator(params, rules, {
      required: "Routing number is required",
    });
    let addressValidation = new Validator(params, rules, {
      required: "Address is required",
    });
    let cityValidation = new Validator(params, rules, {
      required: "City is required",
    });
    let countryValidation = new Validator(params, rules, {
      required: "Country is required",
    });
    let stateValidation = new Validator(params, rules, {
      required: "State is required",
    });
    let zipcodeValidation = new Validator(params, rules, {
      required: "Zipcode is required",
    });
    if (nameValidation.fails()) {
      if (nameValidation.errors.first("name")) {
        setErrorMsgName(nameValidation.errors.first("name"));
      }
    }
    if (emailValidation.fails()) {
      if (emailValidation.errors.first("email")) {
        console.log(emailValidation.errors.first("email"));
        setErrorMsgEmail(emailValidation.errors.first("email"));
      }
    }
    if (websiteValidation.fails()) {
      if (websiteValidation.errors.first("website")) {
        setErrorMsgWebsite(websiteValidation.errors.first("website"));
      }
    }

    if (phoneValidation.fails()) {
      setIsLoading(false)
      if (phoneValidation.errors.first("phoneNo")) {
        setErrorMsgCell(phoneValidation.errors.first("phoneNo"));
      }
      if (phoneValidation.errors.first("office")) {
        setErrorMsgOffice(phoneValidation.errors.first("office"));
      }
    }
    if (accountNameValidation.fails()) {
      setIsLoading(false)
      if (
        accountNameValidation.errors.first("companyBankAccount.accountName")
      ) {
        setErrorMsgAcname(
          accountNameValidation.errors.first("companyBankAccount.accountName")
        );
      }
    }
    if (bankNameValidation.fails()) {
      setIsLoading(false)
      if (bankNameValidation.errors.first("companyBankAccount.bankName")) {
        setErrorMsgBnkname(
          bankNameValidation.errors.first("companyBankAccount.bankName")
        );
      }
    }
    if (accountNumberValidation.fails()) {
      setIsLoading(false)
      if (
        accountNumberValidation.errors.first("companyBankAccount.accountNumber")
      ) {
        setErrorMsgAcnumber(
          accountNumberValidation.errors.first(
            "companyBankAccount.accountNumber"
          )
        );
      }
    }
    if (routingNumberValidation.fails()) {
      setIsLoading(false)
      if (
        routingNumberValidation.errors.first("companyBankAccount.routingNumber")
      ) {
        setErrorMsgRoutingnum(
          routingNumberValidation.errors.first(
            "companyBankAccount.routingNumber"
          )
        );
      }
    }
    if (amountValidation.fails()) {
      setIsLoading(false)
      if (amountValidation.errors.first("monthlyAmountSubscription")) {
        setErrorMsgAmount(amountValidation.errors.first("monthlyAmountSubscription"));
      }
    }
    if (addressValidation.fails()) {
      setIsLoading(false)
      if (addressValidation.errors.first("divisionAddress.address")) {
        setErrorMsgAddress(addressValidation.errors.first("divisionAddress.address"));
      }
    }
    if (cityValidation.fails()) {
      setIsLoading(false)
      if (cityValidation.errors.first("divisionAddress.city")) {
        setErrorMsgCity(cityValidation.errors.first("divisionAddress.city"));
      }
    }
    if (countryValidation.fails()) {
      setIsLoading(false)
      if (countryValidation.errors.first("divisionAddress.country")) {
        setErrorMsgCountry(countryValidation.errors.first("divisionAddress.country"));
      }
    }
    if (stateValidation.fails()) {
      setIsLoading(false)
      if (stateValidation.errors.first("divisionAddress.state")) {
        setErrorMsgState(stateValidation.errors.first("divisionAddress.state"));
      }
    }
    if (zipcodeValidation.fails()) {
      setIsLoading(false)
      if (zipcodeValidation.errors.first("divisionAddress.zipcode")) {
        setErrorMsgZipcode(zipcodeValidation.errors.first("divisionAddress.zipcode"));
      }
    }
    if (!validation.fails()) {
      const data = await dispatch(createCompany(params));
      if (companyUrl != "") {
        let formData = new FormData();
        formData.append("avatar", companyUrl);
        if (data != undefined && data.body != null) {
          const uploadData = await dispatch(
            uploadProfile(data.body.id, formData)
          );
        }
      }
      if (data.success === true) {
        setIsLoading(false)
        dispatch(created(true));
        history.push("/superadmin/companies");
      } else {
        setIsLoading(false)
        setErrorMsgEmail(data.message);
        console.log("err");
      }
    }
  };
  let handleRoleChange = (e, val) => {
    setRole(val);
    console.log("e v->", val);
  };
  let onBack = () => {
    history.push("/superadmin/companies");
  };

  return (
    <>
      {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
      <div className="create-employee-header align-items-center">
        <h3 className="titleheader--card">Create Contact - Company</h3>
        <CButton className="save-btn-white btn" onClick={onSubmit}>
          <img class="m-0 mr-2" src={SaveBlue} />
          Save
        </CButton>
      </div>
      <CForm className="login-form mb-5">
        <div className="create-employee-wrapper">
          <div className="create-employee-left row flex-1">
            <div className="create-employee-body1 col-12 col-md-4">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">
                    Company Image{" "}
                    {companyUrl != "" ? (
                      <CImg
                        src={
                          companyPreviewUrl
                        }
                        fluid
                        className="imgPrf--empl"
                      />
                    ) : null}{" "}
                  </div>
                </div>
                <div class="form-file">
                  <input
                    type="file"
                    class="form-file-input"
                    id="customFile"
                    onChange={onImageChange}
                  />
                  <span class="uploadprofile">
                    <img src={upload} class="m-0 mr-2" />
                    Upload
                  </span>
                </div>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Company Name</div>
                </div>
                <CInput
                  type="text"
                  value={companyName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <label className={`error ${errorMsgName ? null : 'errorFill'}`}>
                  {errorMsgName ? errorMsgName : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={cellIcon} fluid className="field-icon" />
                  <div className="employee-field-label"> Cell</div>
                </div>
                <CInput
                  type="text"
                  value={cell}
                  placeholder="(xxx) xxx-xxxx"
                  className="input-field-control"
                  onChange={(e) => onCellChange((prevState) => normalizeInput(e.target.value, prevState))}
                />
                <label className={`error ${errorMsgCell ? null : 'errorFill'}`}>
                  {errorMsgCell ? errorMsgCell : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={officeIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Office</div>
                </div>
                <CInput
                  type="text"
                  value={office}
                  placeholder="(xxx) xxx-xxxx"
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onOfficeChange((prevState) => normalizeInput(e.target.value, prevState))}
                // onChange={(e) => onOfficeChange(e.target.value)}
                />
                <label className={`error ${errorMsgOffice ? null : 'errorFill'}`}>
                  {errorMsgOffice ? errorMsgOffice : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={emailIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Email</div>
                </div>
                <CInput
                  type="text"
                  value={email}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className={`error ${errorMsgEmail ? null : 'errorFill'}`}>
                  {errorMsgEmail ? errorMsgEmail : null}
                </label>
              </div>
              {/* <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={tagIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Tags</div>
                </div>
                <CInput
                  type="text"
                  value={tags}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div> */}
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={WebsiteIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Website</div>
                </div>
                <CInput
                  type="text"
                  value={website}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setWebSite(e.target.value)}
                />
                <label className={`error ${errorMsgWebsite ? null : 'errorFill'}`}>
                  {errorMsgWebsite ? errorMsgWebsite : null}
                </label>
              </div>
              {/* <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Select Level</div>
                </div>
                <CInput
                  type="text"
                  value={level}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setLevel(e.target.value)}
                />
              </div> */}
            </div>
            <div className="create-employee-body2 col-12 col-md-4">
              {/* <div className="form-group">
                <h4 className="titleUser-head text-left">Bank Account</h4>
              </div> */}
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={DollarIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Package Amount</div>
                </div>
                <CInput
                  type="number"
                  value={packageAmount}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onPackageAmountChange(e.target.value)}
                />
                <label className={`error ${errorMsgAmount ? null : 'errorFill'}`}>
                  {errorMsgAmount ? errorMsgAmount : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Bank account Name</div>
                </div>
                <CInput
                  type="text"
                  value={accountName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setAccountName(e.target.value)}
                />
                <label className={`error ${errorMsgAcname ? null : 'errorFill'}`}>
                  {errorMsgAcname ? errorMsgAcname : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Bank Name</div>
                </div>
                <CInput
                  type="text"
                  value={bankName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setBankName(e.target.value)}
                />
                <label className={`error ${errorMsgBnkname ? null : 'errorFill'}`}>
                  {errorMsgBnkname ? errorMsgBnkname : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Account number</div>
                </div>
                <CInput
                  type="number"
                  value={accountNum}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onAccountNoChange(e.target.value)}
                />
                <label className={`error ${errorMsgAcnumber ? null : 'errorFill'}`}>
                  {errorMsgAcnumber ? errorMsgAcnumber : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Routing number</div>
                </div>
                <CInput
                  type="number"
                  value={routingNumber}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => onRoutingNoChange(e.target.value)}
                />
                <label className={`error ${errorMsgRoutingnum ? null : 'errorFill'}`}>
                  {errorMsgRoutingnum ? errorMsgRoutingnum : null}
                </label>
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
            </div>
            <div className="create-employee-body2 col-12 col-md-4">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={AddresIcon} fluid className="field-icon" />
                  <div className="employee-field-label titleUser-head">
                    Address
                  </div>
                </div>
                <CInput
                  type="text"
                  value={address}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label className={`error ${errorMsgAddress ? null : 'errorFill'}`}>
                  {errorMsgAddress ? errorMsgAddress : null}
                </label>
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
                  value={city}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCity(e.target.value)}
                />
                <label className={`error ${errorMsgCity ? null : 'errorFill'}`}>
                  {errorMsgCity ? errorMsgCity : null}
                </label>
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
                  value={country}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <label className={`error ${errorMsgCountry ? null : 'errorFill'}`}>
                  {errorMsgCountry ? errorMsgCountry : null}
                </label>
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
                  value={state}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setState(e.target.value)}
                />
                <label className={`error ${errorMsgState ? null : 'errorFill'}`}>
                  {errorMsgState ? errorMsgState : null}
                </label>
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
                  value={zipCode}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <label className={`error ${errorMsgZipcode ? null : 'errorFill'}`}>
                  {errorMsgZipcode ? errorMsgZipcode : null}
                </label>
              </div>
              <div class="form-group text-right">

                <CButton class="btn btn-act--comp"
                  style={{ backgroundColor: '#0046fe', color: 'white' }} onClick={onSubmit}>
                  <img class="m-0 mr-2" src={Save} />
                  Save
                </CButton>
              </div>
            </div>

            {/* <div className="create-employee-body2 col-12 col-md-3">
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
                    type="number"
                    value={packageAmount}
                    placeholder=""
                    className="input-field-control"
                    autoComplete="current-password"
                    onChange={(e) => setPackageAmount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="employee-field-label-wrapper">
                    <CImg src={UserIcon} fluid className="field-icon" />
                    <div className="employee-field-label"># Of Users</div>
                  </div>
                  <CInput
                    type="number"
                    value={noOfUsers}
                    placeholder=""
                    className="input-field-control"
                    autoComplete="current-password"
                    onChange={(e) => setNoOfUsers(e.target.value)}
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
                  type="text"
                  value={cardName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Card Number</div>
                </div>
                <CInput
                  type="number"
                  value={cardNumber}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Expiration Date</div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6 pr-1">
                    <div className="employee-field-label-wrapper">
                      <div className="employee-field-label">Month</div>
                    </div>
                    <CInput
                      type="text"
                      value={expiryMonth}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setExpiryMonth(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-lg-6 pl-1">
                    <div className="employee-field-label-wrapper">
                      <div className="employee-field-label">Year</div>
                    </div>
                    <CInput
                      type="text"
                      value={expiryYear}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setExpiryYear(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="create-employee-body3 col-12 col-md-3">
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
                      value={address}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setAddress(e.target.value)}
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
                      value={city}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setCity(e.target.value)}
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
                      value={country}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setCountry(e.target.value)}
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
                      value={state}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setState(e.target.value)}
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
                      value={zipCode}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setZipCode(e.target.value)}
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
            </div> */}
          </div>
          {/* <div class="form-group text-right">
            <CButton className="btn-default-theme btn" onClick={onSubmit}>
              <img class="m-0 mr-2" src={Save} />
              Save
            </CButton>
          </div> */}
        </div>
      </CForm>
    </>
  );
};

export default CreateCompany;
