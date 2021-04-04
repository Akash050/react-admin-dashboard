import React, { useEffect, useState, createRef } from "react";
import {
  CInput,
  CForm,
  CButton,
  CImg,
} from "@coreui/react";
import swal from 'sweetalert';
import Loading from "react-fullscreen-loading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import SaveBlue from "../../../assets/icons/save-blue-icon.svg";
import upload from "../../../assets/icons/upload.svg";
import WebsiteIcon from "../../../assets/icons/website-icon.svg";
import MoneyIcon from "../../../assets/icons/money-icon.svg";
import Save from "../../../assets/icons/save.svg";
import DollarIcon from "../../../assets/icons/dollar-icon.svg";
import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";
import * as Validator from "validatorjs";

import {
  uploadProfile,
} from "../../../redux/actions/companyAction";
import {
  getAllProfile,
  updateProfile,
} from "../../../redux/actions/profileAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateProfile = () => {
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cid, setCid] = useState("");
  const [aid, setAid] = useState("");
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
  const [bankId, setBankId] = useState("");
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
  const [errorMsgCardnum, setErrorMsgCardnum] = useState("");
  const [errorMsgCardmexpiry, setErrorMsgCardmexpiry] = useState("");
  const [errorMsgCardyexpiry, setErrorMsgCardyexpiry] = useState("");
  const [errorMsgAddress, setErrorMsgAddress] = useState("");
  const [errorMsgCity, setErrorMsgCity] = useState("");
  const [errorMsgCountry, setErrorMsgCountry] = useState("");
  const [errorMsgState, setErrorMsgState] = useState("");
  const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
  const dispatch = useDispatch();
  const { allProfiles } = useSelector((state) => ({
    allProfiles: state.profile,
  }));

  const onImageChange = (event) => {
    setCompanyUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0])
    setCompanyPreviewUrl(url)
  };
  let openToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const normalizeInput = (value, previousValue) => {
    console.log(value, 'previous value', previousValue)
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    console.log('currentValue', currentValue, 'cvLength', cvLength)
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  const handleCellChange = (e) => {
    setCell((prevState) => {
      let r =
        normalizeInput(e.target.value, prevState)
      console.log('rrrrr', r)
    })
    // setCell(e.target.value)
  }
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
  //   {
  //     "id": "29d759d7-39df-4c35-b21c-956c8ed1f099",
  //     "name": "Tisana124567",
  //     "phoneNo": "7684567346",
  //     "email": "verma.akash04989+89@gmail.com",
  //     "office": "7684567341",
  //     "website": "test11",
  //     "note": "",
  //     "createdAt": "2021-03-03T06:05:29.811+00:00",
  //     "updatedAt": "2021-03-03T08:46:48.166+00:00",
  //     "monthlyAmountSubscription": 0.0,
  //     "companyBankAccount": {
  //         "id": "714479f0-f84b-4af0-abed-e942b77d47e0",
  //         "accountName": "test1244",
  //         "bankName": "test23",
  //         "accountNumber": "6785674567",
  //         "routingNumber": "54433"
  //     },
  //     "divisionAddress": {
  //         "id": "7fb12f90-1b5f-427f-bae3-cfe286bbff38",
  //         "address": "phase",
  //         "state": "punjab",
  //         "city": "phase 1",
  //         "zipcode": "12335",
  //         "longitude": "211.7",
  //         "latitude": "312.3"
  //     }
  // }
  const onSubmit = async () => {
    setIsLoading(true)
    resetFields();
    const params = {
      id: cid,
      name: companyName,
      phoneNo: cell,
      email: email,
      office: office,
      website: website,
      note: notes,
      monthlyAmountSubscription: packageAmount,
      companyBankAccount: {
        id: bankId,
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
    console.log("params=-->", params)
    //return
    const rules = {
      name: "required",
      phoneNo: "required|min:14|max:14",
      email: "required|email",
      website: "required|url",
      office: "required|min:14|max:14",
      // monthlyAmountSubscription: "required",
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

    let validation = new Validator(params, rules, {
      required: " :attribute is required",
    });
    let nameValidation = new Validator(params, rules, {
      required: "Name is required",
    });
    let emailValidation = new Validator(params, rules, {
      required: "Email is required",
    });
    let websiteValidation = new Validator(params, rules, {
      required: "Website is required",
    });

    let phoneValidation = new Validator(params, rules, {
      required: { string: 'Phone number is required' },
      max: {
        string: 'Phone number is Invalid'
      },
      min: {
        string: 'Phone number is Invalid'
      }
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
    let amountValidation = new Validator(params, rules, {
      required: "Amount is required",
    });
    if (nameValidation.fails()) {
      setIsLoading(false)
      if (nameValidation.errors.first("name")) {
        setErrorMsgName(nameValidation.errors.first("name"));
      }
    }
    if (emailValidation.fails()) {
      setIsLoading(false)
      if (emailValidation.errors.first("email")) {
        console.log(emailValidation.errors.first("email"));
        setErrorMsgEmail(emailValidation.errors.first("email"));
      }
    }
    if (websiteValidation.fails()) {
      setIsLoading(false)
      if (websiteValidation.errors.first("website")) {
        setErrorMsgWebsite(websiteValidation.errors.first("website"));
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
      console.log(addressValidation)
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
    if (phoneValidation.fails()) {
      console.log(cell)
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

    console.log("validation", validation.fails());
    if (!validation.fails()) {
      console.log("---> inside params", params);
      const data = await dispatch(updateProfile(params));
      console.log("updated company", data);
      if (data.success === true) {
        if (companyUrl != "" && companyPreviewUrl != "") {
          let formData = new FormData();
          formData.append("avatar", companyUrl);
          if (data.body != null) {
            const uploadData = await dispatch(
              uploadProfile('', formData)
            );
          }
        }
        setIsLoading(false)
        swal("Company Updated Succesfully!", {
          icon: "success",
        })
        // dispatch(updated(true));
        // history.push("/admin/companies");
      } else {
        setIsLoading(false)
        console.log("err");
      }
    }
  };
  // let handleRoleChange = (e, val) => {
  //   setRole(val);
  //   console.log("e v->", val);
  // };
  const assignValues = () => {

    if (allProfiles[0]) {
      setCell("")
      setOffice("")
      setCompanyUrl(allProfiles[0].company.avatar);
      setUid(allProfiles[0].id);
      setCid(allProfiles[0].company.id);
      setAid(allProfiles[0].company.divisionAddress.id);
      setCompanyName(allProfiles[0].company.name);
      setEmail(allProfiles[0].company.email);
      setTags(allProfiles[0].tags);
      setWebSite(allProfiles[0].company.website);
      setBankId(allProfiles[0].company.companyBankAccount.id);
      setAccountName(allProfiles[0].company.companyBankAccount.accountName);
      setBankName(allProfiles[0].company.companyBankAccount.bankName);
      setAccountNum(allProfiles[0].company.companyBankAccount.accountNumber);
      setRoutingNumber(allProfiles[0].company.companyBankAccount.routingNumber);
      setCell((prevState) => normalizeInput(allProfiles[0].company.phoneNo, prevState));
      setOffice((prevState) => normalizeInput(allProfiles[0].company.office, prevState));
      setNotes(allProfiles[0].company.note);
      setAmount(allProfiles[0].company.monthlyAmountSubscription);
      setAddress(allProfiles[0].company.divisionAddress.address);
      setCity(allProfiles[0].company.divisionAddress.city);
      setCountry(allProfiles[0].company.divisionAddress.country);
      setState(allProfiles[0].company.divisionAddress.state);
      setZipCode(allProfiles[0].company.divisionAddress.zipcode);
      setPackageAmount(allProfiles[0].company.monthlyAmountSubscription);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    async function getProfiles() {
      await dispatch(getAllProfile());
      setIsLoading(false)
      assignValues();
    }
    getProfiles();
  }, []);

  useEffect(() => {
    assignValues();
  }, [allProfiles]);

  console.log("compa countallProfiles-->", routingNumber)

  return (
    <>
      {isLoading ? <Loading loading loaderColor="#3498db" /> : null}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="create-employee-header align-items-center">
        <h3 className="titleheader--card">Create Profile - Company</h3>
        <CButton className="save-btn-white btn" onClick={onSubmit}>
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
                    <img src={upload} className="m-0 mr-2" />
                    Upload
                  </span>
                </div>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Company</div>
                </div>
                <CInput
                  type="text"
                  value={companyName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <label className={`error ${errorMsgName ? null : 'errorFill'} `}>
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
                  onChange={(e) => handleCellChange(e)}
                />
                <label className={`error ${errorMsgCell ? null : 'errorFill'} `}>
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
                  onChange={(e) => setOffice((prevState) => normalizeInput(e.target.value, prevState))}
                />
                <label className={`error ${errorMsgOffice ? null : 'errorFill'} `}>
                  {errorMsgOffice ? errorMsgOffice : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={emailIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Email</div>
                </div>
                <CInput
                  disabled
                  type="text"
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
                <label className="error errorFill">
                  {errorMsgTags ? errorMsgTags : null}
                </label>
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
                  onChange={(e) => setWebSite(e.target.value)}
                />
                <label className={`error ${errorMsgWebsite ? null : 'errorFill'} `}>
                  {errorMsgWebsite ? errorMsgWebsite : null}
                </label>
              </div>
            </div>
            <div className="create-employee-body2 col-12 col-md-3">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Account Name</div>
                </div>
                <CInput
                  type="text"
                  value={accountName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setAccountName(e.target.value)}
                />
                <label className={`error ${errorMsgAcname ? null : 'errorFill'} `}>
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
                <label className={`error ${errorMsgBnkname ? null : 'errorFill'} `}>
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
                  onChange={(e) => setAccountNum(e.target.value)}
                />
                <label className={`error ${errorMsgAcnumber ? null : 'errorFill'} `}>
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
                  onChange={(e) => setRoutingNumber(e.target.value)}
                />
                <label className={`error ${errorMsgRoutingnum ? null : 'errorFill'} `}>
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
                    disabled
                    type="number"
                    value={packageAmount}
                    placeholder=""
                    disabled="true"
                    className="input-field-control"
                    autoComplete="current-password"
                    onChange={(e) => setPackageAmount(e.target.value)}
                  />
                  <label className={`error ${errorMsgAmount ? null : 'errorFill'} `}>
                    {errorMsgAmount ? errorMsgAmount : null}
                  </label>
                </div>
                {/* <div className="form-group">
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
                  <label className="error errorFill">
                    {errorMsgNoofuser ? errorMsgNoofuser : null}
                  </label>
                </div> */}
                {/* <div className="form-group">
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
                </div> */}
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
                  disabled
                  type="text"
                  value={cardName}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCardName(e.target.value)}
                />
                <label className={`error ${errorMsgCardname ? null : 'errorFill'} `}>
                  {errorMsgCardname ? errorMsgCardname : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">Card Number</div>
                </div>
                <CInput
                  disabled
                  type="number"
                  value={cardNumber}
                  placeholder=""
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <label className={`error ${errorMsgCardnum ? null : 'errorFill'} `}>
                  {errorMsgCardnum ? errorMsgCardnum : null}
                </label>
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
                      disabled
                      type="text"
                      value={expiryMonth}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setExpiryMonth(e.target.value)}
                    />
                    <label className={`error ${errorMsgCardmexpiry ? null : 'errorFill'} `}>
                      {errorMsgCardmexpiry ? errorMsgCardmexpiry : null}
                    </label>
                  </div>
                  <div className="col-12 col-lg-6 pl-1">
                    <div className="employee-field-label-wrapper">
                      <div className="employee-field-label">Year</div>
                    </div>
                    <CInput
                      disabled
                      type="text"
                      value={expiryYear}
                      placeholder=""
                      className="input-field-control"
                      autoComplete="current-password"
                      onChange={(e) => setExpiryYear(e.target.value)}
                    />
                    <label className={`error ${errorMsgCardyexpiry ? null : 'errorFill'} `}>
                      {errorMsgCardyexpiry ? errorMsgCardyexpiry : null}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-employee-body3 col-12 col-md-3">
              <div className="form-group">
                {/* <h4 className="addTitle text-left">
                  Auto Fill this section once user starts to type
                </h4> */}
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
                    <label className={`error ${errorMsgAddress ? null : 'errorFill'} `}>
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
                    <label className={`error ${errorMsgCity ? null : 'errorFill'} `}>
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
                    <label className={`error ${errorMsgCountry ? null : 'errorFill'} `}>
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
                    <label className={`error ${errorMsgState ? null : 'errorFill'} `}>
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
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                    <label className={`error ${errorMsgZipcode ? null : 'errorFill'} `}>
                      {errorMsgZipcode ? errorMsgZipcode : null}
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group text-right">
                <CButton class="btn btn-act--comp"
                  style={{ backgroundColor: '#0046fe', color: 'white' }} onClick={onSubmit}>
                  <img class="m-0 mr-2" src={Save} />
                  Save
                </CButton>
              </div>
              {/* <div className="form-group">
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
            </div> */}
            </div>
          </div>
        </div>
      </CForm>
    </>
  );
};

export default CreateProfile;
