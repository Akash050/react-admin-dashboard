import React, { useState, useEffect } from "react";
import { CInput, CForm, CButton, CImg, CModal } from "@coreui/react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loading from "react-fullscreen-loading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import addicon from "../../../assets/icons/addicon.svg";
import blueBtn from "../../../assets/icons/save-full-blue.svg";
import SaveBlue from "../../../assets/icons/save-blue-icon.svg";
import upload from "../../../assets/icons/upload.svg";
import NameIcon from "../../../assets/icons/name-icon.svg";
import profile from "../../../assets/profile.png";
import Status from "../../../assets/icons/status.svg";
import SellerIcon from "../../../assets/icons/seller.svg";
import BuyerIcon from "../../../assets/icons/buyer.svg";
import PlainSellerIcon from "../../../assets/icons/plain-seller.svg";
import BlueBuyerIcon from "../../../assets/icons/blue-buyer.svg";
import socialIcon from "../../../assets/icons/socialIcon.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";
import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";
import Department from "../../../assets/icons/department.svg";
import Jobtitle from "../../../assets/icons/jobtitle.svg";
import CrossItem from "../../../assets/icons/cross-Item.svg";
import CompanyblackIcon from "../../../assets/icons/company-black-icon.svg";
import * as Validator from "validatorjs";
import { updated } from "../../../redux/actions/companyAction";
import {
  createContact,
  uploadProfile,
  updateContact,
} from "../../../redux/actions/userContactAction";
import { getAllContactCompanies } from "../../../redux/actions/contactCompanyAction";
import AddNewCompany from "./AddNewCompany";
const EditContacts = (props) => {
  let data = props.location.state.userData;
  console.log(props.location.state.isSecondaryAdd);
  const history = useHistory();
  const dispatch = useDispatch();
  const [profileUrl, setProfileUrl] = useState(data.profileImage);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const nameArr = data.name.split(" ");
  const [id, setId] = useState(data.id);
  const [isLoading, setIsLoading] = useState(false);
  const [companyDivisionId, setcompanyDivisionId] = useState(
    data.companyDivision
  );
  // const [contactCompanyId, setContactCompanyId] = useState(data.contactCompanyId);
  const [firstName, setFirstName] = useState(nameArr[0]);
  const [lastName, setLastName] = useState(nameArr[1] ? nameArr[1] : "");
  const [salutationField, setSalutation] = useState("");
  const [department, setDepartment] = useState(data.department);
  const [jobTitle, setJobTitle] = useState(data.jobTitle);
  const [cell, setCell] = useState(data.phoneNumber);
  const [office, setOffice] = useState(data.office);
  const [email, setEmail] = useState(data.email);
  const [notes, setNotes] = useState(data.note);
  const [companyDivision, setCompanyDivision] = useState(data.companyDivision);
  const [selectedConnection, setSelectedConnection] = useState(
    data.contactType.id
  );
  const [selectedConnectionStatus, setSelectedConnectionStatus] = useState(
    data.connectionStatus.id
  );
  const [customLabelList, setCustomLabelList] = useState(
    JSON.parse(props.location.state.userData.customFieldsJsonValue)
  );
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgOffice, setErrorMsgOffice] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgCell, setErrorMsgCell] = useState("");
  const [errorMsgDepartment, setErrorMsgDepartment] = useState("");
  const [errorMsgSalutation, setErrorMsgSalutation] = useState("");
  const [errorMsgJobTitle, setErrorMsgJobTitle] = useState("");
  const [errorMsgAddress, setErrorMsgAddress] = useState("");
  const [errorMsgCity, setErrorMsgCity] = useState("");
  const [errorMsgCountry, setErrorMsgCountry] = useState("");
  const [errorMsgState, setErrorMsgState] = useState("");
  const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
  const [errorMsgFacebook, setErrorMsgFacebook] = useState("");

  const [isSecondaryAddress, setIsSecondaryAddress] = useState(false);
  const [isSocialMedia, setIsSocialMedia] = useState(false);
  const [isAddCompany, setIsAddCompany] = useState(false);
  const [listItems, setListItems] = useState([
    { id: 1, name: "item #1", value: "", selected: true },
    { id: 2, name: "item #2", value: "", selected: false },
  ]);
  const [addresses, setAddresses] = useState(data.contactAddresses);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(
    data.contactCompany ? data.contactCompany : ""
  );
  const [socialMedia, setSocialMedia] = useState(data.socialLinksContact);
  const [newSocialMediaName, setNewSocialMediaName] = useState("");
  const [newSocialMediaValue, setNewSocialMediaValue] = useState("");
  const [selectedSaluation, setSelectedSaluation] = useState(data.salutation);
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    data.contactCompany ? data.contactCompany.id : ""
  );
  const [selectedCompany, setSelectedCompany] = useState(
    data.contactCompany ? data.contactCompany : ""
  );
  const [final, setFinal] = useState("");
  const salutationOptions = ["Mr", "Mrs"];
  const [contactcompanyoption, setcontactcompanyoption] = useState([]);
  const [errorMsgCompany, setErrorMsgCompany] = useState("");
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isSecondaryAdd, setIsSecondaryAdd] = useState(
    props.location.state.isSecondaryAdd
  );
  const { contactCompany } = useSelector((state) => ({
    contactCompany: state.contactCompany,
  }));
  const normalizeInput = (value, previousValue) => {
    console.log(value, "previous value", previousValue);
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
    console.log("currentValue", currentValue, "cvLength", cvLength);
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    }
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(function () {
      setIsLoading(false);
    }, 400);
  }, []);
  useEffect(() => {
    async function getCompanyContact() {
      dispatch(getAllContactCompanies(0, 100, ""));
    }
    getCompanyContact();
    setCell("");
    setOffice("");
    setCell((prevState) => normalizeInput(data.phoneNumber, prevState));
    setOffice((prevState) => normalizeInput(data.office, prevState));
    setcontactcompanyoption(contactCompany);
  }, [contactCompany.length]);

  const onImageChange = (event) => {
    setProfileUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0]);
    setProfilePreviewUrl(url);
  };
  const handleSaluationChange = (e, v) => {
    setSelectedSaluation(v);
  };
  const handleCompanyChange = (e, v) => {
    setSelectedCompany(v);
    setSelectedCompanyDetails(v);
    setIsCompanySelected(true);
  };
  let getAddressValue = (val, key) => {
    console.log("adressssssssssssssss =?", addresses);
    console.log("vakl =>", val, key);
    let value = addresses.filter((add, i) =>
      add.key == key ? add[val] : null
    );
    console.log("return add -->", value[0][val]);
    return value[0][val];
  };

  const onPrimaryAddressChange = (e, key) => {
    let { name, value } = e.target;
    let temp = [...addresses];
    let objIndex = addresses.findIndex((obj) => obj.key == key);
    temp[objIndex][name] = value;
    setAddresses(temp);
    //   setAddresses({
    //   ...addresses,
    //   primaryAddress: {
    //     ...addresses.primaryAddress,
    //     [name]: value
    //   }
    // })
  };
  const onSecondaryChange = (e, key) => {
    let { name, value } = e.target;
    let temp = [...addresses];
    let objIndex = addresses.findIndex((obj) => obj.key == key);
    temp[objIndex][name] = value;
    setAddresses(temp);
  };

  const onAddAddress = () => {
    setIsSecondaryAddress(true);
  };
  const onRemoveAddress = () => {
    setIsSecondaryAddress(false);
  };
  const changeConnectionType = (value, id) => {
    setSelectedConnection(id);
  };
  const changeConnectionStatus = (id) => {
    setSelectedConnectionStatus(id);
  };
  const resetFields = () => {
    setErrorMsgCell("");
    setErrorMsgName("");
    setErrorMsgEmail("");
    setErrorMsgOffice("");
    setErrorMsgSalutation("");
    setErrorMsgDepartment("");
    setErrorMsgJobTitle("");
    setErrorMsgAddress("");
    setErrorMsgCity("");
    setErrorMsgCountry("");
    setErrorMsgState("");
    setErrorMsgZipcode("");
    setErrorMsgFacebook("");
    setErrorMsgCompany("");
  };

  const onSubmit = async () => {
    resetFields();

    const params = {
      id: id,
      name: firstName + " " + lastName,
      jobTitle: jobTitle,
      salutation: selectedSaluation,
      email: email,
      phoneNumber: cell,
      office: office,
      department: department,
      tags: "ab",
      note: notes,
      connectionStatus: {
        id: selectedConnectionStatus,
      },
      contactType: {
        id: selectedConnection,
      },
      companyDivision: {
        id: companyDivision,
      },
      contactCompany: {
        id: selectedCompanyDetails ? selectedCompanyDetails.id : null,
      },
      // companyDivision: {
      //     id: selectedCompanyDetails.id
      //     // id: '51fc51c5-4657-4f6f-a7d9-7b4b7aa4d7a9'
      // },
      contactAddresses: addresses,
      customFields: customLabelList,
      socialLinksContact: props.location.state.userData.socialLinksContact,
    };
    console.log("params ->>", params);
    //return
    const rules = {
      name: "required",
      phoneNumber: "required|min:14|max:14",
      salutation: "required",
      email: "required|email",
      jobTitle: "required",
      office: "required|min:14|max:14",
      department: "required",
      contactCompany: {
        id: "required"
      }
    };

    const addressRule = {
      "contactAddresses.0.address": "required",
      "contactAddresses.0.state": "required",
      "contactAddresses.0.city": "required",
      "contactAddresses.0.country": "required",
      "contactAddresses.0.zipCode": "required",
    };
    const socialMediaRule = {
      "socialLinksContact.0.link": "url",
      "socialLinksContact.1.link": "url",
      "socialLinksContact.2.link": "url",
    };
    let facebookValidation = new Validator(params, socialMediaRule, {
      url: {
        string: "Link is Invalid",
      },
    });
    if (facebookValidation.fails()) {
      setIsLoading(false);
      if (facebookValidation.errors.first("socialLinksContact.0.link")) {
        setErrorMsgFacebook(
          facebookValidation.errors.first("socialLinksContact.0.link")
        );
      }
    }
    if (facebookValidation.fails()) {
      setIsLoading(false);
      if (facebookValidation.errors.first("socialLinksContact.2.link")) {
        setErrorMsgFacebook(
          facebookValidation.errors.first("socialLinksContact.2.link")
        );
      }
    }
    if (facebookValidation.fails()) {
      setIsLoading(false);
      if (facebookValidation.errors.first("socialLinksContact.1.link")) {
        setErrorMsgFacebook(
          facebookValidation.errors.first("socialLinksContact.1.link")
        );
      }
    }
    let validation = new Validator(params, rules, {
      required: " :attribute is required",
    });
    let salutationValidation = new Validator(params, rules, {
      required: "Salutation is required",
    });
    let nameValidation = new Validator(params, rules, {
      required: "Name is required",
    });
    let emailValidation = new Validator(params, rules, {
      required: "Email is required",
    });
    let jobTitleValidation = new Validator(params, rules, {
      required: "Jobtitle is required",
    });
    let phoneValidation = new Validator(params, rules, {
      required: { string: "Phone number is required" },
      max: {
        string: "Phone number is Invalid",
      },
      min: {
        string: "Phone number is Invalid",
      },
    });
    let departmentValidation = new Validator(params, rules, {
      required: "Department is required",
    });
    let addressValidation = new Validator(params, addressRule, {
      required: "Address is required",
    });
    let cityValidation = new Validator(params, addressRule, {
      required: "City is required",
    });
    let countryValidation = new Validator(params, addressRule, {
      required: "Country is required",
    });
    let stateValidation = new Validator(params, addressRule, {
      required: "State is required",
    });
    let zipcodeValidation = new Validator(params, addressRule, {
      required: "Zipcode is required",
    });
    let companyValidation = new Validator(params, rules, {
      required: "Company is required",
    });
    if (companyValidation.fails()) {
      setIsLoading(false);
      if (companyValidation.errors.first("contactCompany.id")) {
        setErrorMsgCompany(companyValidation.errors.first("contactCompany.id"));
      }
    }
    if (nameValidation.fails()) {
      setIsLoading(false);
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
    if (jobTitleValidation.fails()) {
      if (jobTitleValidation.errors.first("jobTitle")) {
        console.log(jobTitleValidation.errors.first("jobTitle"));
        setErrorMsgJobTitle(jobTitleValidation.errors.first("jobTitle"));
      }
    }
    if (salutationValidation.fails()) {
      if (salutationValidation.errors.first("salutation")) {
        console.log(
          salutationValidation.errors.first("salutation"),
          salutationField
        );
        setErrorMsgSalutation(salutationValidation.errors.first("salutation"));
      }
    }
    if (departmentValidation.fails()) {
      if (departmentValidation.errors.first("department")) {
        console.log(departmentValidation.errors.first("department"));
        setErrorMsgDepartment(departmentValidation.errors.first("department"));
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
    if (addressValidation.fails()) {
      console.log("addressValidation", addressValidation);
      setIsLoading(false);
      console.log(addressValidation);
      if (addressValidation.errors.first("contactAddresses.0.address")) {
        setErrorMsgAddress(
          addressValidation.errors.first("contactAddresses.0.address")
        );
      }
    }
    if (cityValidation.fails()) {
      setIsLoading(false);
      if (cityValidation.errors.first("contactAddresses.0.city")) {
        setErrorMsgCity(cityValidation.errors.first("contactAddresses.0.city"));
      }
    }
    if (countryValidation.fails()) {
      setIsLoading(false);
      if (countryValidation.errors.first("contactAddresses.0.country")) {
        setErrorMsgCountry(
          countryValidation.errors.first("contactAddresses.0.country")
        );
      }
    }
    if (stateValidation.fails()) {
      setIsLoading(false);
      if (stateValidation.errors.first("contactAddresses.0.state")) {
        setErrorMsgState(
          stateValidation.errors.first("contactAddresses.0.state")
        );
      }
    }
    if (zipcodeValidation.fails()) {
      setIsLoading(false);
      if (zipcodeValidation.errors.first("contactAddresses.0.zipCode")) {
        setErrorMsgZipcode(
          zipcodeValidation.errors.first("contactAddresses.0.zipCode")
        );
      }
    }
    console.log("update", params);
    if (
      !validation.fails() &&
      !addressValidation.fails() &&
      !facebookValidation.fails()
    ) {
      const data = await dispatch(updateContact(params));
      if (data.success === true) {
        if (profileUrl != "" && profilePreviewUrl != "") {
          let formData = new FormData();
          formData.append("profile", profileUrl);
          if (data.body != null) {
            const uploadData = await dispatch(
              uploadProfile(data.body.id, formData)
            );
          }
        }
        dispatch(updated(true));
        history.push("/user/contacts");
      } else {
        console.log("err");
      }
    }
  };

  const updateSocialField = (index) => (e) => {
    let newArr = [...socialMedia];
    newArr[index].link = e.target.value;
    setSocialMedia(newArr);
  };
  const addNewFields = () => {
    const temp = {
      linkType: newSocialMediaName,
      link: newSocialMediaValue,
    };

    let newArr = [...socialMedia, temp];
    setSocialMedia(newArr);
    setNewSocialMediaName("");
    setNewSocialMediaValue("");
    setIsSocialMedia(false);
  };

  let onCustomListValueChange = (value, id, type) => {
    if (type == "text") {
      let temp = [...customLabelList];
      let objIndex = temp.findIndex((obj) => obj.object.id == id);
      console.log("objIndex", objIndex, temp);
      temp[objIndex].object.value = value;
      setCustomLabelList(temp);
      //setTableHeading(temp)
    }
  };

  let removeItem = (val, id) => {
    let temp = customLabelList.filter((ele) => {
      return ele.object.id != id;
    });
    setCustomLabelList(temp);
    console.log("list ->", listItems, id);
  };
  let onCustomListClick = (id, item_id, type) => {
    if (type == "checkbox") {
      let temp = [...customLabelList];
      let objIndex = temp.findIndex((obj) => obj.object.id == id);
      let listIndex = temp[objIndex].object.options.findIndex(
        (obj) => obj.id == item_id
      );
      console.log("objIndex", temp[objIndex].object.options[listIndex]);
      temp[objIndex].object.options[listIndex].selected = !temp[objIndex].object
        .options[listIndex].selected;
      setCustomLabelList(temp);
    } else if (type == "radio") {
      let temp = [...customLabelList];
      let objIndex = temp.findIndex((obj) => obj.object.id == id);
      let listIndex = temp[objIndex].object.options.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object.options.map((item, i) => {
        if (i == listIndex) {
          temp[objIndex].object.options[listIndex].selected = true;
        } else {
          temp[objIndex].object.options[i].selected = false;
        }
      });
      setCustomLabelList(temp);
    }
  };
  let getcustomItems = (val, type) => {
    if (val.type.value == "radio") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper flex-column">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
            {/* <span onClick={() => removeItem(type, val.id)} class="crossItem--link"><img className="m-0 ml-2" src={CrossItem} /></span> */}
            <div className="ul-Listmore">
              <ul className="mb-0">
                {val.options.map((item) => {
                  return (
                    <li className="multilist--items">
                      <span>
                        <input
                          checked={item.selected ? true : false}
                          onChange={(e) =>
                            onCustomListClick(val.id, item.id, "radio")
                          }
                          type={val.type.value}
                        ></input>
                      </span>
                      {item.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (val.type.value == "checkbox") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper flex-column">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
            {/* <span onClick={() => removeItem(type, val.id)} class="crossItem--link"><img className="m-0 ml-2" src={CrossItem} /></span> */}
            <div className="ul-Listmore">
              <ul className="mb-0">
                {val.options.map((item) => {
                  return (
                    <li className="multilist--items">
                      <span>
                        <input
                          checked={item.selected}
                          onChange={(e) =>
                            onCustomListClick(val.id, item.id, "checkbox")
                          }
                          type={val.type.value}
                        ></input>
                      </span>
                      {item.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (val.type.value == "list") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper flex-column">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
            {/* <span onClick={() => removeItem(type, val.id)} class="crossItem--link"><img className="m-0 ml-2" src={CrossItem} /></span> */}
            <div className="ul-Listmore">
              <ul className="mb-0">
                {val.options.map((item) => {
                  return (
                    <li className="multilist--items">
                      <span></span>
                      {item.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (
      val.type.value == "String" ||
      val.type.value == "int" ||
      val.type.value == "Date"
    ) {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
          </div>
          <input
            onChange={(e) =>
              onCustomListValueChange(e.target.value, val.id, "text")
            }
            class="form-control input-field-control"
            type={`${val.type.value == "Date"
              ? "date"
              : val.type.value == "int"
                ? "number"
                : "text"
              }`}
            placeholder={val.placeHolder}
            autocomplete=""
            value={val.value}
          />
          {/* <span onClick={() => removeItem(type, val.id)} class="crossItem--link"><img className="m-0 ml-2" src={CrossItem} /></span> */}
        </div>
      );
    }
  };

  console.log("selected company options-->>", selectedCompany);

  return (
    <>
      {isLoading ? <Loading loading loaderColor="#3498db" /> : null}
      <div className="create-contact-header align-items-center">
        <h3 className="titleheader--card create-contact-title">
          Edit Contact - Company
        </h3>
        <CButton className="save-btn-white btn" onClick={onSubmit}>
          <img class="m-0 mr-2" src={SaveBlue} />
          Save
        </CButton>
      </div>
      <CForm className="login-form mb-5">
        <div className="create-employee-wrapper p-3">
          <div className="create-employee-left row flex-1">
            <div className="create-employee-body1 col-12 col-md-3">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">
                    Profile Image{" "}
                    {profileUrl == undefined || profileUrl == "" ? null : (
                      <CImg
                        src={
                          profilePreviewUrl != ""
                            ? profilePreviewUrl
                            : profileUrl
                        }
                        fluid
                        className="imgPrf--empl"
                      />
                    )}{" "}
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
                  <div className="employee-field-label">Salutation</div>
                </div>
                <Autocomplete
                  options={salutationOptions}
                  onChange={(e, v) => handleSaluationChange(e, v)}
                  getIconLabel={(option) => option}
                  value={
                    salutationOptions.find((v) => v == selectedSaluation) || {}
                  }
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      className="input-field-control-role mr-0"
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
                        className="mr-0"
                        {...params.inputProps}
                      />
                    </div>
                  )}
                />
                <label
                  className={`error ${errorMsgSalutation ? null : "errorFill"
                    } `}
                >
                  {errorMsgSalutation ? errorMsgSalutation : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={NameIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Name</div>
                </div>
                <CInput
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <CInput
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="input-field-control mt-3"
                  autoComplete="current-password"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label
                  className={`error ${errorMsgName ? null : "errorFill"} `}
                >
                  {errorMsgName ? errorMsgName : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={CompanyblackIcon} fluid className="field-icon" />
                  <div className="employee-field-label">Company</div>
                </div>
                <Autocomplete
                  options={contactcompanyoption}
                  onChange={(e, v) => handleCompanyChange(e, v)}
                  getOptionLabel={(option) => option.name}
                  value={
                    contactcompanyoption.find(
                      (v) =>
                        v.name ==
                        `${selectedCompany ? selectedCompany.name : ""}`
                    ) || {}
                  }
                  style={{ width: 300 }}
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
                        placeholder="Search Company"
                        {...params.inputProps}
                      />
                    </div>
                  )}
                />
                <label
                  className={`error ${errorMsgCompany ? null : "errorFill"} `}
                >
                  {errorMsgCompany ? errorMsgCompany : null}
                </label>
                {true ? (
                  <div className="mt-4 col-12 text-left px-0 company-details-container">
                    <div className="company-details">
                      <CImg
                        src={
                          selectedCompanyDetails
                            ? selectedCompanyDetails.avatar
                              ? selectedCompanyDetails.avatar
                              : profile
                            : null
                        }
                        fluid
                        alt="No preview"
                        className="imgPrf--empl"
                      />
                      <div className="company-details-wrapper">
                        <div className="company-details-name">
                          {selectedCompanyDetails
                            ? selectedCompanyDetails.name
                            : null}
                        </div>
                        <div className="company-details-website">
                          {selectedCompanyDetails
                            ? selectedCompanyDetails.email
                            : null}
                        </div>
                        {/* <span className="titlefill-tb superth-tbl">
                      <button
                        type="button"
                        className="btn btn-act--comp company-preview-btn"
                        onClick={() => setIsEditCompany(true)}
                      >
                        <i class="far fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-act--comp"
                        onClick={() => handleClick("delete", selectedCompanyDetails)}
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </span> */}
                      </div>
                      {/* <CModal
                      show={isEditCompany}
                      centered={true}
                      onClose={() => setIsEditCompany(false)}
                      className="modalCreateCompany--body"
                    >
                      <EditNewCompany data={selectedCompanyDetails} close={() => setIsEditCompany()} onChange={() => setSelectedCompany()} />
                    </CModal> */}
                    </div>
                  </div>
                ) : (
                    ""
                  )}
                {/* <div className="mt-4 col-12 text-left px-0">
                                    <div className="btn-value btnadd-btn-custom-property create-btn-btn create-btn-btn" onClick={() => setIsAddCompany(true)}>
                                        <img src={addicon} className="m-0" /> Add Company
                                    </div>
                                </div> */}
              </div>
              {/* <CModal
                                show={isAddCompany}
                                centered={true}
                                onClose={() => setIsAddCompany(false)}
                                className="modalCreateCompany--body"
                            >
                                <AddNewCompany />
                            </CModal> */}
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={Department} fluid className="field-icon" />
                  <div className="employee-field-label">Department</div>
                </div>
                <CInput
                  type="text"
                  value={department}
                  placeholder="Department"
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <label
                  className={`error ${errorMsgDepartment ? null : "errorFill"
                    } `}
                >
                  {errorMsgDepartment ? errorMsgDepartment : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={Jobtitle} fluid className="field-icon" />
                  <div className="employee-field-label">Job Title</div>
                </div>
                <CInput
                  type="text"
                  value={jobTitle}
                  placeholder="Job Title"
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <label
                  className={`error ${errorMsgJobTitle ? null : "errorFill"} `}
                >
                  {errorMsgJobTitle ? errorMsgJobTitle : null}
                </label>
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
                  placeholder="(xxx) xxx-xxxx"
                  className="input-field-control"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setCell((prevState) =>
                      normalizeInput(e.target.value, prevState)
                    )
                  }
                />
                <label
                  className={`error ${errorMsgCell ? null : "errorFill"} `}
                >
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
                  onChange={(e) => setOffice(e.target.value)}
                />
                <label
                  className={`error ${errorMsgOffice ? null : "errorFill"} `}
                >
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
                <label
                  className={`error ${errorMsgEmail ? null : "errorFill"} `}
                >
                  {errorMsgEmail ? errorMsgEmail : null}
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
                  <CImg src={Status} fluid className="field-icon m-0 mr-2" />
                  Status
                </h4>
              </div>
              <div className="border userCreat--card mb-4">
                <div className="form-group">
                  <div className="row employee-field-label-wrapper">
                    <div className="col-12">
                      <h4 className="titleUser-head text-left">
                        Select Status
                      </h4>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          {selectedConnection == "2" ? (
                            <CImg
                              src={SellerIcon}
                              fluid
                              className="field-icon"
                            />
                          ) : (
                              <CImg
                                src={PlainSellerIcon}
                                fluid
                                className="field-icon"
                              />
                            )}
                          <div className="employee-field-label">Seller</div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionType("seller", 2)}
                          name="seller"
                          checked={selectedConnection == "2" ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          {selectedConnection == "1" ? (
                            <CImg
                              src={BlueBuyerIcon}
                              fluid
                              className="field-icon"
                            />
                          ) : (
                              <CImg
                                src={BuyerIcon}
                                fluid
                                className="field-icon"
                              />
                            )}
                          <div className="employee-field-label">Buyer</div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionType("buyer", 1)}
                          name="buyer"
                          checked={selectedConnection == "1" ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">Both</div>
                        </div>
                        {/* <span className="customertagINput">
                          <input
                            type=""
                            className="form-control input-field-control"
                          />
                          <img src={CheckInactive} />
                        </span> */}
                        <input
                          type="radio"
                          onClick={() => changeConnectionType("both", 3)}
                          name="both"
                          checked={selectedConnection == "3" ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">N/A</div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionType("n/a", 4)}
                          name="n/a"
                          checked={selectedConnection == "4" ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12 mt-4">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">
                            No Connection Made
                          </div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionStatus(6)}
                          checked={
                            selectedConnectionStatus == "6" ? true : false
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">
                            Building Relationship
                          </div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionStatus(8)}
                          checked={
                            selectedConnectionStatus == "8" ? true : false
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">
                            Connection Made
                          </div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionStatus(7)}
                          checked={
                            selectedConnectionStatus == "7" ? true : false
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">
                            Listing Oportunity
                          </div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionStatus(9)}
                          checked={
                            selectedConnectionStatus == "9" ? true : false
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-12">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">Listing</div>
                        </div>
                        <input
                          type="radio"
                          onClick={() => changeConnectionStatus(10)}
                          checked={
                            selectedConnectionStatus == "10" ? true : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {socialMedia.length ? (
                <div className="border userCreat--card mb-4">
                  <div class="form-group">
                    <h4 class="titleUser-head text-left">
                      {" "}
                      <CImg
                        src={socialIcon}
                        fluid
                        className="field-icon m-0 mr-2"
                      />
                      Social Media Accounts
                    </h4>
                  </div>
                  {socialMedia.map((val, index) => {
                    return (
                      <div className="form-group">
                        <div className="employee-field-label-wrapper">
                          <div className="social-field-wrapper">
                            <div
                              className={`${val.icon} fa-2x`}
                              style={{
                                width: "20px",
                                fontSize: "22px",
                                marginTop: "5px",
                              }}
                            ></div>
                            <div className="employee-field-label titleUser-head social-media-label">
                              {val.linkType}
                            </div>
                          </div>
                        </div>
                        <CInput
                          type="text"
                          value={val.link}
                          placeholder=""
                          className="input-field-control"
                          onChange={updateSocialField(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <label
                className={`error ${errorMsgFacebook ? null : "errorFill"} `}
              >
                {errorMsgFacebook ? errorMsgFacebook : null}
              </label>
              <CModal
                show={isSocialMedia}
                centered={true}
                onClose={() => setIsSocialMedia(false)}
                className="modalContact--body"
              >
                <div className="modal-header">
                  {<CImg src={addicon} fluid className="task-logo" />}
                  <div
                    style={{
                      alignSelf: "center",
                      fontWeight: "600",
                      marginLeft: "10px",
                    }}
                  >
                    {" "}
                    Add Social Media
                  </div>
                </div>
                <div className="userCreat--card mb-4">
                  <div className="form-group">
                    <div className="social-media-modal">
                      <div className="employee-field-label titleUser-head">
                        <div className="create-contact-label">Label Name</div>
                        <CInput
                          type="text"
                          value={newSocialMediaName}
                          placeholder=""
                          className="input-field-control"
                          onChange={(e) =>
                            setNewSocialMediaName(e.target.value)
                          }
                        />
                      </div>
                      <div className="employee-field-label titleUser-head">
                        <div className="create-contact-label">Link</div>
                        <CInput
                          type="text"
                          value={newSocialMediaValue}
                          placeholder=""
                          className="input-field-control"
                          onChange={(e) =>
                            setNewSocialMediaValue(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <CImg
                      src={blueBtn}
                      fluid
                      className="field-icon"
                      onClick={addNewFields}
                    />
                  </div>
                </div>
              </CModal>
              {/* {isSocialMedia ? ""
                                : <div className="popup-btn" onClick={() => setIsSocialMedia(true)}>
                                    <div className="btn-value btnadd-btn-custom-property ">
                                        <img src={addicon} className="m-0" /> Social Media
                    </div>
                                </div>} */}
            </div>

            <div className="create-employee-body3 col-12 col-md-3">
              {/* <div className="form-group text-left">
                                <div className="btn-value btnadd-btn-custom-property create-btn-btn">
                                    <img src={addicon} className="m-0" /> Add Custom Field
                                </div>
                            </div> */}
              <div className="form-group">
                {/* <div className="popup-btn" >
                  <div className="btn-value btnadd-btn-custom-property create-btn-btn">
                    <img src={addicon} className="m-0" /> Add Custom Field
                    </div>
                </div> */}
                {customLabelList.length ?
                  <div className="form-group">
                    {customLabelList.length &&
                      customLabelList.map((val) =>
                        getcustomItems(val.object, "list")
                      )}

                  </div>

                  : null}

                {addresses.length ? (
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
                        value={getAddressValue("address", 1)}
                        name="address"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onPrimaryAddressChange(e, 1)}
                      />
                      <label
                        className={`error ${errorMsgAddress ? null : "errorFill"
                          } `}
                      >
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
                        value={getAddressValue("city", 1)}
                        name="city"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onPrimaryAddressChange(e, 1)}
                      />
                      <label
                        className={`error ${errorMsgCity ? null : "errorFill"
                          } `}
                      >
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
                        value={getAddressValue("country", 1)}
                        name="country"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onPrimaryAddressChange(e, 1)}
                      />
                      <label
                        className={`error ${errorMsgCountry ? null : "errorFill"
                          } `}
                      >
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
                        value={getAddressValue("state", 1)}
                        name="state"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onPrimaryAddressChange(e, 1)}
                      />
                      <label
                        className={`error ${errorMsgState ? null : "errorFill"
                          } `}
                      >
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
                        value={getAddressValue("zipCode", 1)}
                        placeholder=""
                        name="zipCode"
                        className="input-field-control"
                        onChange={(e) => onPrimaryAddressChange(e, 1)}
                      />
                      <label
                        className={`error ${errorMsgZipcode ? null : "errorFill"
                          } `}
                      >
                        {errorMsgZipcode ? errorMsgZipcode : null}
                      </label>
                    </div>
                  </div>
                ) : null}

                {addresses.length > 1 ? (
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
                        value={getAddressValue("address", 0)}
                        name="address"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      {/* <label className={`error ${errorMsgAddress2 ? null : 'errorFill'} `}>
                                                {errorMsgAddress2 ? errorMsgAddress2 : null}
                                            </label> */}
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
                        value={getAddressValue("city", 0)}
                        name="city"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      {/* <label className={`error ${errorMsgCity2 ? null : 'errorFill'} `}>
                                                {errorMsgCity2 ? errorMsgCity2 : null}
                                            </label> */}
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
                        value={getAddressValue("country", 0)}
                        name="country"
                        placeholder=""
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      {/* <label className={`error ${errorMsgCountry2 ? null : 'errorFill'} `}>
                                                {errorMsgCountry2 ? errorMsgCountry2 : null}
                                            </label> */}
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
                        value={getAddressValue("state", 0)}
                        name="state"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      {/* <label className={`error ${errorMsgState2 ? null : 'errorFill'} `}>
                                                    {errorMsgState2 ? errorMsgState2 : null}
                                                </label> */}
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
                        value={getAddressValue("zipCode", 0)}
                        name="zipCode"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      {/* <label className={`error ${errorMsgZipcode2 ? null : 'errorFill'} `}>
                                                {errorMsgZipcode2 ? errorMsgZipcode2 : null}
                                            </label> */}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CForm>
    </>
  );
};

export default EditContacts;
