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
import BackIcon from "../../../assets/icons/back-icon.svg";
import tagIcon from "../../../assets/tags.svg";
import SaveBlue from "../../../assets/icons/save-blue-icon.svg";
import Save from "../../../assets/icons/save.svg";
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
  updateCompany,
  uploadProfile,
  getCompanyById,
  updated,
} from "../../../redux/actions/companyAction";
import { COMPANY_BY_ID } from "../../../redux/actionsType/companyActionType";
import { updateProfile } from "../../../redux/actions/profileAction";

const EditCompany = () => {
  const profileImage = createRef();
  let history = useHistory();
  const [isLoding, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState("");
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
  const [errorMsgCell, setErrorMsgCell] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgOffice, setErrorMsgOffice] = useState("");
  const [errorMsgTags, setErrorMsgTags] = useState("");
  const [errorMsgWebsite, setErrorMsgWebsite] = useState("");
  const [errorMsgLevel, setErrorMsgLevel] = useState("");
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
  const [user, setUser] = useState("");
  const [errorMsgRole, setErrorMsgRole] = useState("");
  const [cid, setCid] = useState("");
  const [aid, setAid] = useState("");
  const dispatch = useDispatch();
  const { company } = useSelector((state) => ({
    company: state.company,
  }));
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
  useEffect(() => {
    setIsLoading(true)
    setTimeout(function () {
      setIsLoading(false)
    }, 400);
    async function getCompany() {
      await dispatch(getCompanyById(history.location.state.userData.id));
    }
    getCompany();
  }, []);

  useEffect(() => {
    if (company[0] == undefined) {
      return;
    }
    console.log("[company ->", company[0]);
    setCell("")
    setPackageAmount(company[0].monthlyAmountSubscription);
    setCompanyId(company[0].id);
    setCompanyUrl(company[0].avatar);
    setCompanyName(company[0].name);
    setCell((prevState) => normalizeInput(company[0].phoneNo, prevState));
    setOffice(company[0].office);
    setEmail(company[0].email);
    setWebSite(company[0].website);
    setCid(company[0].companyBankAccount.id);
    setAccountName(company[0].companyBankAccount.accountName);
    setBankName(company[0].companyBankAccount.bankName);
    setAccountNum(company[0].companyBankAccount.accountNumber);
    setRoutingNumber(company[0].companyBankAccount.routingNumber);
    setNotes(company[0].note);
    setAid(company[0].divisionAddress.id);
    setAddress(company[0].divisionAddress.address);
    setCity(company[0].divisionAddress.city);
    setCountry(company[0].divisionAddress.country);
    setState(company[0].divisionAddress.state);
    setZipCode(company[0].divisionAddress.zipcode);
  }, [company]);

  const onImageChange = (event) => {
    setCompanyUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0])
    setCompanyPreviewUrl(url)
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
    resetFields();
    const params = {
      id: companyId,
      phoneNo: cell,
      name: companyName,
      monthlyAmountSubscription: packageAmount,
      email: email,
      amountToRecieve: "12345",
      office: office,
      website: website,
      note: notes,
      companyBankAccount: {
        id: cid,
        accountName: accountName,
        bankName: bankName,
        accountNumber: accountNum,
        routingNumber: routingNumber,
      },
      divisionAddress: {
        id: aid,
        address: address,
        state: state,
        city: city,
        country: country,
        zipcode: zipCode,
        longitude: "211.7",
        latitude: "312.3",
      },
    };
    const rules = {
      name: "required",
      phoneNo: "required|min:14|max:14",
      email: "required|email",
      website: "required",
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
    let amountValidation = new Validator(params, rules, {
      required: "Amount is required",
    });
    let phoneValidation = new Validator(params, rules, {
      required: { string: 'Phone number is required' }
      ,
      max: {
        string: 'Phone number is invalid'
      },
      min: {
        string: 'Phone number is invalid'
      }
    })
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
    if (amountValidation.fails()) {
      if (amountValidation.errors.first("monthlyAmountSubscription")) {
        setErrorMsgAmount(amountValidation.errors.first("monthlyAmountSubscription"));
      }
    }
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
    if (addressValidation.fails()) {
      setIsLoading(false)
      console.log("addressValidation", addressValidation.errors);
      if (addressValidation.errors.first("divisionAddress.address")) {
        setErrorMsgAddress(addressValidation.errors.first("divisionAddress.address"));
      }
    }
    if (cityValidation.fails()) {
      setIsLoading(false)
      console.log("cityValidation", cityValidation.errors);
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
      const data = await dispatch(updateProfile(params));
      if (companyUrl != "" && companyPreviewUrl != "") {
        let formData = new FormData();
        formData.append("avatar", companyUrl);
        if (data.body != null) {
          const uploadData = await dispatch(
            uploadProfile(data.body.id, formData)
          );
        }
      }
      if (data.success === true) {
        setIsLoading(false)
        dispatch(updated(true));
        history.push("/superadmin/companies");
      } else {
        setIsLoading(false)
        //setErrorMsgEmail(data.message);
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
        <h3 className="titleheader--card">Edit Contact - Company</h3>
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
                    {companyUrl == undefined || companyUrl == '' ? (
                      null
                    ) :
                      <CImg
                        src={
                          companyPreviewUrl != '' ? companyPreviewUrl : companyUrl
                        }
                        fluid
                        className="imgPrf--empl"
                      />
                    }{" "}
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
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
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
                  placeholder=""
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
                  disabled={true}
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
          </div>
        </div>
      </CForm>
    </>
  );
};

export default EditCompany;
