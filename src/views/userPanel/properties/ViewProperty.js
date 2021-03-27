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
  CModal,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { iconData } from "./iconData";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loading from "react-fullscreen-loading";
import Calendar from "react-calendar";
import swal from "sweetalert";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import GoogleMapReact from "google-map-react";
import { v4 as uuidv4 } from "uuid";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import addicon from "../../../assets/icons/addicon.svg";
import arrowLeft from "../../../assets/icons/arrow-left.svg";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import BackIcon from "../../../assets/icons/back-icon.svg";
import tagIcon from "../../../assets/tags.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import upload from "../../../assets/icons/upload.svg";
import notes_title from "../../../assets/icons/notes_title.svg";
import notes_description from "../../../assets/icons/notes_description.svg";
import attachment from "../../../assets/images/attachment.png";
import externalLink from "../../../assets/icons/external-link.svg";
import NameIcon from "../../../assets/icons/name-icon.svg";
import WebsiteIcon from "../../../assets/icons/website-icon.svg";
import Status from "../../../assets/icons/status.svg";
import CrossItem from "../../../assets/icons/cross-Item.svg";
import Dotline from "../../../assets/icons/dotline.svg";

import DollarIcon from "../../../assets/icons/dollar-icon.svg";
import UserIcon from "../../../assets/icons/user-icon.svg";
import CalendarIcon from "../../../assets/icons/calender-icon.svg";
import YearIcon from "../../../assets/icons/year-icon.svg";
import SellerIcon from "../../../assets/icons/seller.svg";
import BuyerIcon from "../../../assets/icons/buyer.svg";
import LoadIcon from "../../../assets/icons/load-icon.svg";
import StatusWhite from "../../../assets/icons/status-icon-white.svg";
import HouseBlue from "../../../assets/icons/house-blue-icon.svg";
import SaleBlue from "../../../assets/icons/sale-blue-icon.svg";
import EscrowBlue from "../../../assets/icons/escrow-blue-icon.svg";
import PersonImage from "../../../assets/images/person-Image.png";
import blueBtn from "../../../assets/icons/save-full-blue.svg";
import ImageFile1 from "../../../assets/images/image1.jpg";
import ImageFile2 from "../../../assets/images/image2.jpg";
import xml from "../../../assets/images/xml.png";
import pdf from "../../../assets/images/pdf.png";
import word from "../../../assets/images/word.png";
import test_image from "../../../assets/images/test-image.png";

import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";
import Department from "../../../assets/icons/department.svg";
import Jobtitle from "../../../assets/icons/jobtitle.svg";
import PropetyName from "../../../assets/icons/propety-name.svg";
import DirectIcon from "../../../assets/icons/directIcon.svg";
import CompanyblackIcon from "../../../assets/icons/company-black-icon.svg";

import FacebookIcon from "../../../assets/icons/facebook.svg";
import LinkIcon from "../../../assets/icons/linkedin.svg";
import TwitterIcon from "../../../assets/icons/twitter.svg";
import * as Validator from "validatorjs";
import CheckActive from "../../../assets/icons/check-active-icon.png";
import CheckInactive from "../../../assets/icons/check-inactive-icon.svg";
import {
  createProperty,
  uploadImage,
  getPropertyTemplates,
} from "../../../redux/actions/propertyTemplateAction";
import {
  getAllContacts,
  deleteContact,
} from "../../../redux/actions/userContactAction";

import realState from "../../../assets/icons/real-estate-icon.svg";
import PropertTYpe from "../../../assets/icons/propert-type.svg";
import parcelNo from "../../../assets/icons/parcel-no.svg";
import FinancialNo from "../../../assets/icons/financial-icon.svg";
import SaleDate from "../../../assets/icons/sale-date.svg";
import Uniform from "../../../assets/icons/uniform.svg";
import profile from "../../../assets/profile.png";
import { Checkbox, InputLabel } from "@material-ui/core";
import { updateProperty } from "../../../redux/actions/propertyAction";
import { createPropertyFollowUp, getFollowUpByProperty } from "../../../redux/actions/propertyFollowUp";

const ViewProperty = (props) => {
  const data = props.location.state.userData;
  console.log(data);
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const profileImage = createRef();
  let history = useHistory();
  const [id, setId] = useState(data.id);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isAddCustom, setIsAddCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNotesModal, setIsAddNotesModal] = useState(false);
  const [isAddFollowUpModal, setIsAddFollowUpModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [calanderValue, onCalanderChange] = useState(new Date());
  const [notesTitle, setNotesTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const [followUpContact, setFollowUpContact] = useState("");
  const [followUpTitle, setFollowUpTitle] = useState("");
  const [followUpDescription, setFollowUpDescription] = useState("");
  const [followUpItem, setFollowUpItem] = useState("");
  const [followUpCalander, setFollowUpCalander] = useState(new Date());
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customTemplateName, setCustomTemplateName] = useState("");
  const [customTemplateUrl, setCustomTemplateUrl] = useState("");
  const [propertyName, setPropertyName] = useState(data.propertyName);
  const [cell, setCell] = useState("");
  const [propertyStatus, setPropertyStatus] = useState(data.propertyStatus.id);
  const [propertyNotes, setPropertyNotes] = useState(
    data ? data.propertyNotes : []
  );
  const [followUps, setFollowUps] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState(data.address);
  const [city, setCity] = useState(data.city);
  const [country, setCountry] = useState(data.country);
  const [state, setState] = useState(data.state);
  const [zipcode, setZipCode] = useState(data.zipCode);
  const [longitude, setLongitude] = useState(data.longtitude);
  const [latitude, setLatitude] = useState(data.latitude);
  const [attachmentList, setAttachmentList] = useState(
    data ? data.propertyAttachments : []
  );
  const [imagesList, setImagesList] = useState([]);
  const [imagesPreviewList, setImagesPreviewList] = useState(
    data ? data.propertyImages : []
  );
  const [errorMsgNotesTitle, setErrorMsgNotesTitle] = useState("");
  const [errorMsgNotesDescription, setErrorMsgNotesDescription] = useState("");
  const [errorMsgIcon, setErrorMsgIcon] = useState("");
  const [errorMsgSelectIcon, setErrorMsgSelectIcon] = useState("");
  const [errorMsgLabelType, setErrorMsgLabelType] = useState("");
  const [errorMsgLabelName, setErrorMsgLabelName] = useState("");
  const [errorMsgListItem, setErrorMsgListItem] = useState("");
  const [errorMsgFollowUpTitle, setErrorMsgFollowUpTitle] = useState("");
  const [errorMsgFollowUpDescription, setErrorMsgFollowUpDescription] = useState("");
  const [errorMsgFollowUpItem, setErrorMsgFollowUpItem] = useState("");
  const [errorMsgFollowUpContact, setErrorMsgFollowUpContact] = useState("");
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgCell, setErrorMsgCell] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [user, setUser] = useState("");
  const [errorMsgRole, setErrorMsgRole] = useState("");
  const [errorMsgTemplateName, setErrorMsgTemplateName] = useState("");
  const [errorMsgTemplateImage, setErrorMsgTemplateImage] = useState("");
  const [selectedStep, setSelectedStep] = useState(0);
  const [labelInput, setLabelInput] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [propertyLabels, setPropertyLabels] = useState(
    JSON.parse(data.propertyInformationJson)
  );
  const [property_labels_col_1, setPropertyLabels_col_1] = useState([]);
  const [property_labels_col_2, setPropertyLabels_col_2] = useState([]);
  const [financialLabels, setFinancialLabels] = useState(
    JSON.parse(data.financialInformationJson)
  );
  const [unitLabels, setUnitLabels] = useState(
    JSON.parse(data.unitInformationJson)
  );
  const [unitLabels_col_1, setUnitLabels_col_1] = useState([]);
  const [unitLabels_col_2, setUnitLabels_col_2] = useState([]);
  const [iconOptions, setIconOptions] = useState(iconData);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [iconToSave, setIconToSave] = useState("");
  const [selectedIconOptions, setSelectedIconOptions] = useState([]);
  const [selectedLabelType, setSelectedLabelType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [contactoptions, setContactoptions] = useState([]);
  const [selectedContact, setSelectedContact] = useState(
    data ? data.contact : ""
  );
  const [customeTemplateName, setCustomeTemplateName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [templateUrl, setTemplateUrl] = useState("");
  const [templateDiv, setTemplateDiv] = useState(false);
  const [radioItems, setRadioItems] = useState([
    { id: 1, name: "item #1", value: "" },
    { id: 2, name: "item #2", value: "" },
  ]);
  const [listItems, setListItems] = useState([
    { id: 1, name: "item #1", value: "", selected: false },
    { id: 2, name: "item #2", value: "", selected: false },
  ]);
  const [checkBoxItems, setCheckBoxItems] = useState([
    { id: 1, name: "item #1", value: "" },
    { id: 2, name: "item #2", value: "" },
  ]);
  const [tableHeading, setTableHeading] = useState([
    { id: 1, name: "heading #1", value: "Description" },
    { id: 2, name: "heading #2", value: "No. Units" },
    { id: 3, name: "heading #2", value: "Avg Rent/Month" },
    { id: 4, name: "heading #2", value: "Sq. Foot" },
  ]);

  const lablelTypeOptions = [
    "Text",
    "Number",
    "Date",
    "Radio",
    "Checkbox",
    "List",
    "Table",
  ];
  const [customTemplate, setCustomTemplate] = useState({
    name: "",
    propertyInformation: [],
    financialInformation: [],
    unitInformation: [],
  });

  const dispatch = useDispatch();
  const { userContacts } = useSelector((state) => ({
    userContacts: state.userContacts,
  }));
  const { propertyFollowUp } = useSelector((state) => ({
    propertyFollowUp: state.propertyFollowUp,
  }));

  useEffect(() => {
    async function getPropertyFollowUp() {
      dispatch(getFollowUpByProperty(id));
    }
    getPropertyFollowUp();
  }, [isAddFollowUpModal]);
  const onTemplateImageChange = (event) => {
    setTemplateUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0]);
    setPreviewUrl(url);
  };
  useEffect(() => {
    async function getContacts() {
      dispatch(getAllContacts(0, 1000, ""));
    }
    getContacts();

    let temp1 = [];
    let temp2 = [];
    propertyLabels.map((label, index) => {
      let check = (index + 1) % 2;
      if (check) {
        temp1.push(label);
        setPropertyLabels_col_1(temp1);
      } else {
        temp2.push(label);
        setPropertyLabels_col_2(temp2);
      }
    });
  }, [propertyLabels.length]);

  useEffect(() => {
    let temp1 = [];
    let temp2 = [];
    unitLabels.map((label, index) => {
      let check = (index + 1) % 2;
      if (check) {
        temp1.push(label);
        setUnitLabels_col_1(temp1);
      } else {
        temp2.push(label);
        setUnitLabels_col_2(temp2);
      }
    });
  }, [unitLabels.length]);

  useEffect(() => {
    setContactoptions(userContacts);
  }, [userContacts]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(function () {
      setIsLoading(false);
    }, 400);
  }, [selectedStep]);

  useEffect(() => {
    setSelectedIcon("");
    setSelectedLabelType("");
    setLabelInput("");
    setPlaceHolder("");
    setErrorMsgIcon("");
    setErrorMsgLabelName("");
    setErrorMsgLabelType("");
    setErrorMsgSelectIcon("");
    setErrorMsgTemplateName("");
    setErrorMsgTemplateImage("");
    setErrorMsgSelectIcon("");

    setErrorMsgListItem("");
    setIconToSave("");
  }, [isAddModal, isAddCustom]);

  // useEffect(() => {
  //   console.log("props ->", history.location.pathname.split('/')[4])
  // }, []);

  const onNext = () => {
    // onSubmit()
    // return
    if (selectedStep >= 3) {
      return;
    }
    setSelectedStep(selectedStep + 1);
  };

  const onPrevious = () => {
    if (selectedStep <= 0) {
      return;
    }
    setSelectedStep(selectedStep - 1);
  };
  let handleContactChange = (e, v) => {
    setSelectedContact(v);
  };
  let onAddContact = () => {
    history.push("/admin/contact/create");
  };
  const onAttachmentChange = (event) => {
    // console.log( "event.target.files", event.target.files)
    let temp = [];
    let { files } = event.target;
    for (let i = 0; i < files.length; i++) {
      temp.push(files[i]);
    }
    setAttachmentList([...attachmentList, ...temp]);
    // setProfileUrl(event.target.files[0])
  };

  const handleTemplateSubmit = () => {
    // console.log("temp name ->", customeTemplateName);
    // console.log("url -->", previewUrl);
    if (customeTemplateName == "") {
      setErrorMsgTemplateName("Template Name Required");
      return;
    }
    if (previewUrl == "") {
      setErrorMsgTemplateImage("Template Image Required");
      return;
    }
    setSelectedStep(1);
    setIsAddCustom(false);
    setTemplateDiv(true);
  };
  const onImageChange = (event) => {
    // console.log( "event.target.files", event.target.files)
    let temp = [];
    let previw = [];
    let { files } = event.target;
    for (let i = 0; i < files.length; i++) {
      temp.push(files[i]);
      var url = URL.createObjectURL(files[i]);
      previw.push(url);
    }
    setImagesList([...imagesList, ...temp]);
    setImagesPreviewList([...imagesPreviewList, ...previw]);
  };
  const getProperty = () => {
    if (property_labels_col_1.length) {
      property_labels_col_1.map((val) => {
        return {
          label: val.label,
          type: val.type.title,
          icon: val.icon,
          object: val.object,
        };
      });
    }
    if (property_labels_col_2.length) {
      property_labels_col_2.map((val) => {
        return {
          label: val.label,
          type: val.type.title,
          icon: val.icon,
          object: val.object,
        };
      });
    }
    // console.log(property_labels_col_2)
  };
  const onSubmit = async (propertyNotesTemp) => {
    setIsLoading(true);

    const params = {
      id: id,
      propertyName: propertyName,
      propertyStatus: {
        id: propertyStatus,
      },
      contact: {
        id: selectedContact.id,
      },
      address: address,
      state: state,
      city: city,
      country: country,
      zipCode: zipcode,
      longtitude: longitude,
      latitude: latitude,
      propertyNotes: propertyNotesTemp,
      propertyInformation: [
        ...property_labels_col_1.map((val) => {
          return {
            tempId: val.tempId,
            value: val.value,
            placeHolder: val.placeHolder,
            label: val.label,
            type: val.type,
            icon: val.icon,
            object: val.object,
          };
        }),
        ...property_labels_col_2.map((val) => {
          return {
            tempId: val.tempId,
            value: val.value,
            placeHolder: val.placeHolder,
            label: val.label,
            type: val.type,
            icon: val.icon,
            object: val.object,
          };
        }),
      ],
      financialInformation: financialLabels.map((val) => {
        return {
          tempId: val.tempId,
          label: val.label,
          value: val.value,
          placeHolder: val.placeHolder,
          type: val.type,
          icon: val.icon,
          object: val.object,
        };
      }),
      unitInformation: [
        ...unitLabels_col_1.map((val) => {
          return {
            tempId: val.tempId,
            label: val.label,
            value: val.value,
            placeHolder: val.placeHolder,
            type: val.type,
            icon: val.icon,
            object: val.object,
          };
        }),
        ...unitLabels_col_2.map((val) => {
          return {
            tempId: val.tempId,
            label: val.label,
            value: val.value,
            placeHolder: val.placeHolder,
            type: val.type,
            icon: val.icon,
            object: val.object,
          };
        }),
      ],
    };
    console.log("parmass -->", params);
    //return
    // const rules = {
    //   name: "required",
    //   phoneNumber: "required|min:10|max:12",
    //   email: "required|email",
    //   authority: {
    //     name: "required",
    //   },
    // };
    // let validation = new Validator(params, rules, {
    //   required: ":attribute required",
    // });
    // let phoneValidation = new Validator(params, rules, {
    //   required: "Phone number is invalid",
    // });
    // let roleValidation = new Validator(params, rules, {
    //   required: "You forgot to give role",
    // });
    // console.log("params", params);
    // //return;
    // if (validation.fails()) {
    //   if (validation.errors.first("name")) {
    //     console.log("name", validation.errors.first("name"));
    //     setErrorMsgName(validation.errors.first("name"));
    //   }
    //   if (validation.errors.first("email")) {
    //     console.log("emai", validation.errors.first("email"));
    //     setErrorMsgEmail(validation.errors.first("email"));
    //   }
    // }
    // if (phoneValidation.fails()) {
    //   if (phoneValidation.errors.first("phoneNumber")) {
    //     console.log("phone", validation.errors.first("phone"));
    //     setErrorMsgCell(phoneValidation.errors.first("phoneNumber"));
    //   }
    // }
    // if (roleValidation.fails()) {
    //   if (roleValidation.errors.first("authority.name")) {
    //     setErrorMsgRole(roleValidation.errors.first("authority.name"));
    //   }
    // }
    // if (
    //   !validation.fails() &&
    //   !phoneValidation.fails() &&
    //   !roleValidation.fails()
    // ) {
    // console.log('create prperty params', params)
    const data = await dispatch(updateProperty(params));
    // console.log("created property", data);
    if (data.success === true) {
      setIsLoading(false);
      setNotesTitle("");
      setNotesDescription("");

      swal("Property Notes Added Successfully", {
        icon: "success",
      });
      if (templateUrl != "") {
        let formData = new FormData();
        formData.append("image", templateUrl);
        if (data.body != null) {
          const uploadData = await dispatch(
            uploadImage(data.body.id, formData)
          );
        }
      }
      //dispatch(created(true));
      // history.push("user/properties");
    } else {
      setIsLoading(false);
      swal(data.message, {
        icon: "error",
      });
    }
    //}
  };
  let addcustomField = (name) => {
    setSelectedColumn(name);
    setIsAddModal(true);
  };
  let handleLabelChange = (e) => {
    setLabelInput(e.target.value);
  };
  let handleIconChange = (e, v) => {
    if (v != null) {
      let temp = [];
      iconData.map((val) => {
        if (val.includes(v.split(" ")[1])) {
          temp.push(val);
        }
      });
      setSelectedIconOptions(temp);
      setSelectedIcon(v);
    }
    setSelectedIcon(v);
  };

  let handleSelectedIcon = (icon) => {
    setIconToSave(icon);
  };

  let handleLabelTypeChange = (e, v) => {
    setSelectedLabelType(v);
  };
  let onAddNote = () => {
    setIsAddNotesModal(true);
  };

  let onCustomListClick = (id, item_id, listType, type) => {
    if (
      listType == "Checkbox" &&
      (type == "property_col_1" || type == "property_col_2")
    ) {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[
        listIndex
      ].selected;
      setPropertyLabels(temp);
    } else if (listType == "Checkbox" && type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[
        listIndex
      ].selected;
      setFinancialLabels(temp);
    } else if (
      listType == "Checkbox" &&
      (type == "unitLabels_col_1" || type == "unitLabels_col_2")
    ) {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[
        listIndex
      ].selected;
      setUnitLabels(temp);
    } else if (
      listType == "Radio" &&
      (type == "property_col_1" || type == "property_col_2")
    ) {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object.map((item, i) => {
        if (i == listIndex) {
          temp[objIndex].object[listIndex].selected = true;
        } else {
          temp[objIndex].object[i].selected = false;
        }
      });
      setPropertyLabels(temp);
    } else if (listType == "Radio" && type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object.map((item, i) => {
        if (i == listIndex) {
          temp[objIndex].object[listIndex].selected = true;
        } else {
          temp[objIndex].object[i].selected = false;
        }
      });
      setFinancialLabels(temp);
    } else if (
      listType == "Radio" &&
      (type == "unitLabels_col_1" || type == "unitLabels_col_2")
    ) {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object.map((item, i) => {
        if (i == listIndex) {
          temp[objIndex].object[listIndex].selected = true;
        } else {
          temp[objIndex].object[i].selected = false;
        }
      });
      setUnitLabels(temp);
    }
  };
  console.log(" lllabbba  -->", propertyLabels);
  let unitInformation = (val, type) => {
    if (val.type == "Radio") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper flex-column">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
          </div>
          {/* <span
            onClick={() => removeItem(type, val.tempId)}
            class="crossItem--link"
          >
            <img className="m-0 ml-2" src={CrossItem} />
          </span> */}
          <div className="ul-Listmore">
            <ul className="mb-0">
              {val.object.map((item) => {
                return (
                  <li className="multilist--items">
                    <span>
                      <input
                        checked={item.selected ? true : false}
                        onChange={(e) =>
                          onCustomListClick(val.id, item.id, "radio", type)
                        }
                        type={val.type.toLowerCase()}
                      ></input>
                    </span>
                    {item.value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else if (val.type == "Checkbox") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper flex-column">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
          </div>
          {/* <span
            onClick={() => removeItem(type, val.tempId)}
            class="crossItem--link"
          >
            <img className="m-0 ml-2" src={CrossItem} />
          </span> */}
          <div className="ul-Listmore">
            <ul className="mb-0">
              {val.object.map((item) => {
                return (
                  <li className="multilist--items">
                    <span>
                      <input
                        checked={item.selected}
                        onChange={(e) =>
                          onCustomListClick(val.id, item.id, "checkbox", type)
                        }
                        type={val.type.toLowerCase()}
                      ></input>
                    </span>
                    {item.value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else if (val.type == "List") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
          </div>
          {/* <span
            onClick={() => removeItem(type, val.tempId)}
            class="crossItem--link"
          >
            <img className="m-0 ml-2" src={CrossItem} />
          </span> */}
          <div className="ul-Listmore">
            <ul className="mb-0 checkList--bulletpoint">
              {val.object.map((item) => {
                return <li className="multilist--items">{item.value}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    } else if (
      val.type == "Text" ||
      val.type == "Number" ||
      val.type == "Date"
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
            disabled={true}
            class="form-control input-field-control propertyTxt--inputcall"
            type={`${val.type == "Date"
              ? "date"
              : val.type == "Number"
                ? "number"
                : "text"
              }`}
            placeholder={val.placeHolder}
            autocomplete=""
            value=""
          />
          {selectedStep != 3 ? (
            // <span
            //     onClick={() => removeItem(type, val.tempId)}
            //     class="crossItem--link"
            // >
            //     <img className="m-0 ml-2" src={CrossItem} />
            // </span>
            <></>
          ) : null}
        </div>
      );
    }
  };
  let handleFollowUpSubmit = async () => {
    setErrorMsgFollowUpContact("")
    setErrorMsgFollowUpTitle("")
    setErrorMsgFollowUpDescription("")
    setErrorMsgFollowUpItem("")
    if (followUpContact == "") {
      setErrorMsgFollowUpContact("Contact Required");
      return;
    }
    if (followUpTitle == "") {
      setErrorMsgFollowUpTitle("Title Required");
      return;
    }

    if (followUpDescription == "") {
      setErrorMsgFollowUpDescription("Description Required");
      return;
    }
    if (followUpItem == "") {
      setErrorMsgFollowUpItem("Item Required");
      return;
    }
    let obj = {
      title: followUpTitle,
      description: followUpDescription,
      followUpType: followUpItem,
      date: followUpCalander,
      property: {
        id: id
      }
    }
    // let obj = {
    //   title: notesTitle,
    //   description: notesDescription,
    //   date: calanderValue,
    // };

    // let arr = Object.assign(
    //   propertyNotes,
    //   propertyNotes.map((item) => {
    //     return item.id === obj.id ? obj : item;
    //   })
    // );
    // console.log('arrrr', arr)
    setPropertyNotes([...followUps, obj]);
    // let temp = [...propertyNotes, obj]
    // // setPropertyNotes(arr);
    // console.log('follow ups', temp)
    const data = await dispatch(createPropertyFollowUp(obj));
    // console.log("created property", data);
    if (data.success === true) {
      setIsLoading(false);
      setNotesTitle("");
      setNotesDescription("");

      swal("Follow Up Added Successfully", {
        icon: "success",
      });
      // if (templateUrl != "") {
      //   let formData = new FormData();
      //   formData.append("image", templateUrl);
      //   if (data.body != null) {
      //     const uploadData = await dispatch(
      //       uploadImage(data.body.id, formData)
      //     );
      //   }
      // }
      //dispatch(created(true));
      // history.push("user/properties");
    } else {
      setIsLoading(false);
      swal(data.message, {
        icon: "error",
      });
    }
    setIsAddFollowUpModal(false)

  };
  let handleNotesSubmit = () => {
    setErrorMsgNotesTitle("")
    setErrorMsgNotesDescription("")
    if (notesTitle == "") {
      setErrorMsgNotesTitle("Title Required");
      return;
    }

    if (notesDescription == "") {
      setErrorMsgNotesDescription("Description Required");
      return;
    }
    let obj = {
      title: notesTitle,
      description: notesDescription,
      date: calanderValue,
    };

    let arr = Object.assign(
      propertyNotes,
      propertyNotes.map((item) => {
        return item.id === obj.id ? obj : item;
      })
    );
    console.log('arrrr', arr)
    setPropertyNotes([...propertyNotes, obj]);
    let temp = [...propertyNotes, obj]
    // setPropertyNotes(arr);
    console.log('property notess', temp)
    onSubmit(temp);
    setIsAddNotesModal(false);

  };

  let handleSubmit = () => {
    setErrorMsgIcon("");
    setErrorMsgLabelName("");
    setErrorMsgLabelType("");
    setErrorMsgSelectIcon("");
    if (selectedIcon == "") {
      setErrorMsgIcon("Icon Required");
      return;
    } else if (selectedLabelType == "") {
      setErrorMsgLabelType("Input Type Required");
      return;
    } else if (labelInput == "") {
      setErrorMsgLabelName("Label Name Required");
      return;
    } else if (iconToSave == "") {
      setErrorMsgSelectIcon("Select icon to save");
      return;
    } else if (
      selectedLabelType == "List" ||
      selectedLabelType == "Checkbox" ||
      selectedLabelType == "Radio"
    ) {
      var foundIndex = listItems.findIndex((x) => x.value == "");
      if (foundIndex != -1) {
        setErrorMsgListItem("Item values required");
        return;
      }
    }
    let obj = {
      tempId: uuidv4(),
      label: labelInput,
      placeHolder: placeHolder,
      type: selectedLabelType,
      icon: iconToSave,
      object: selectedLabelType == "Table" ? tableHeading : listItems,
    };
    if (selectedColumn == "property") {
      setPropertyLabels([...propertyLabels, obj]);
    } else if (selectedColumn == "financial") {
      setFinancialLabels([...financialLabels, obj]);
    } else if (selectedColumn == "unit") {
      setUnitLabels([...unitLabels, obj]);
    }
    setIsAddModal(false);
    setLabelInput("");
    setIconToSave("");
    setSelectedIconOptions([]);
    setListItems([
      { id: 1, name: "item #1", value: "", selected: false },
      { id: 2, name: "item #2", value: "", selected: false },
    ]);
    setTableHeading([
      { id: 1, name: "heading #1", value: "Description" },
      { id: 2, name: "heading #2", value: "No. Units" },
      { id: 3, name: "heading #2", value: "Avg Rent/Month" },
      { id: 4, name: "heading #2", value: "Sq. Foot" },
    ]);
  };
  let addListItem = (type) => {
    // if (type == 'radio') {
    //   let temp = [...radioItems]
    //   let obj = { id: `${temp.length + 1}`, name: `item #${temp.length + 1}`, value: '' }
    //   temp.push(obj)
    //   setRadioItems(temp)
    // }
    // else if (type == 'checkbox') {
    //   let temp = [...checkBoxItems]
    //   let obj = { id: `${temp.length + 1}`, name: `item #${temp.length + 1}`, value: '' }
    //   temp.push(obj)
    //   setCheckBoxItems(temp)
    // }
    let temp = [...listItems];
    let obj = {
      id: `${temp.length + 1}`,
      name: `item #${temp.length + 1}`,
      value: "",
    };
    temp.push(obj);
    setListItems(temp);
  };

  let onListValueChange = (value, id, name) => {
    // if (name == 'radio') {
    //   let temp = [...radioItems]
    //   let objIndex = temp.findIndex((obj => obj.id == id));
    //   temp[objIndex].value = value
    //   setRadioItems(temp)
    // } else if (name == 'checkbox') {
    //   let temp = [...checkBoxItems]
    //   let objIndex = temp.findIndex((obj => obj.id == id));
    //   temp[objIndex].value = value
    //   setCheckBoxItems(temp)
    // }
    if (name == "table") {
      let temp = [...tableHeading];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      temp[objIndex].value = value;
      setTableHeading(temp);
    } else {
      let temp = [...listItems];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      temp[objIndex].value = value;
      setListItems(temp);
    }
  };

  let addTableHeading = () => {
    let temp = [...tableHeading];
    let obj = {
      id: `${temp.length + 1}`,
      name: `heading #${temp.length + 1}`,
      value: "",
    };
    temp.push(obj);
    setTableHeading(temp);
  };

  let removeListItem = (id, type) => {
    // if (type == 'radio') {
    //   let temp = radioItems.filter(ele => {
    //     return ele.id != id;
    //   });
    //   setRadioItems(temp)
    // }
    // else if (type == 'checkbox') {
    //   let temp = checkBoxItems.filter(ele => {
    //     return ele.id != id;
    //   });
    //   setCheckBoxItems(temp)
    // }
    let temp = listItems.filter((ele) => {
      return ele.id != id;
    });
    setListItems(temp);
  };

  let removeTableItem = (id) => {
    let temp = tableHeading.filter((ele) => {
      return ele.id != id;
    });
    setTableHeading(temp);
  };

  let removeItem = (val, id) => {
    if (val == "property_col_1") {
      let temp = propertyLabels.filter((ele) => {
        return ele.tempId != id;
      });
      let tempcol1 = property_labels_col_1.filter((ele) => {
        return ele.tempId != id;
      });
      setPropertyLabels(temp);
      setPropertyLabels_col_1(tempcol1);
    } else if (val == "property_col_2") {
      let temp = propertyLabels.filter((ele) => {
        return ele.tempId != id;
      });
      let tempcol1 = property_labels_col_2.filter((ele) => {
        return ele.tempId != id;
      });
      setPropertyLabels(temp);
      setPropertyLabels_col_2(tempcol1);
    } else if (val == "propertyLabels") {
      let temp = propertyLabels.filter((ele) => {
        return ele.tempId != id;
      });
      setPropertyLabels(temp);
    } else if (val == "financial") {
      let temp = financialLabels.filter((ele) => {
        return ele.tempId != id;
      });
      setFinancialLabels(temp);
    } else if (val == "unitLabels_col_1") {
      let temp = unitLabels.filter((ele) => {
        return ele.tempId != id;
      });
      let tempcol1 = unitLabels_col_1.filter((ele) => {
        return ele.id != id;
      });
      setUnitLabels(temp);
      setUnitLabels_col_1(tempcol1);
    } else if (val == "unitLabels_col_2") {
      let temp = unitLabels.filter((ele) => {
        return ele.tempId != id;
      });
      let tempcol1 = unitLabels_col_2.filter((ele) => {
        return ele.tempId != id;
      });
      setUnitLabels(temp);
      setUnitLabels_col_2(tempcol1);
    } else if (val == "unitLabels") {
      let temp = unitLabels.filter((ele) => {
        return ele.tempId != id;
      });
      setUnitLabels(temp);
    }
  };

  let onBack = () => {
    onSubmit();
    // history.push("/admin/employees");
  };
  const getDate = (val) => {
    const d = new Date(val).toDateString();
    const val1 = new Date(val)
    const t = val1.toLocaleTimeString('en-US')
    let temp = d.substr(4, 6) + " " + "at " + t;
    // let temp = d.substr(4);
    return temp;

  }
  const getSvg = (val) => {
    if (val == 'Follow Ups') {
      return (
        <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.94737 0C8.57961 0 7.46053 1.125 7.46053 2.5C7.46053 3.875 8.57961 5 9.94737 5C11.3151 5 12.4342 3.875 12.4342 2.5C12.4342 1.125 11.3151 0 9.94737 0ZM17.4079 0C16.0401 0 14.9211 1.125 14.9211 2.5C14.9211 3.875 16.0401 5 17.4079 5C18.7757 5 19.8947 3.875 19.8947 2.5C19.8947 1.125 18.7757 0 17.4079 0ZM2.48684 0C1.11908 0 0 1.125 0 2.5C0 3.875 1.11908 5 2.48684 5C3.85461 5 4.97368 3.875 4.97368 2.5C4.97368 1.125 3.85461 0 2.48684 0Z" fill="#0046FE" />
        </svg>
      );
    }
    if (val == 'Text Messages') {
      return (
        <svg width="160" height="41" viewBox="0 0 160 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6C0 2.68629 2.68629 0 6 0H154C157.314 0 160 2.68629 160 6V35C160 38.3137 157.314 41 154 41H6C2.6863 41 0 38.3137 0 35V6Z" fill="#3062FF" />
          <path d="M61.0322 17.127H57.833V26H56.5273V17.127H53.335V16.0469H61.0322V17.127ZM64.6963 26.1367C63.6937 26.1367 62.8779 25.8086 62.249 25.1523C61.6201 24.4915 61.3057 23.6097 61.3057 22.5068V22.2744C61.3057 21.5407 61.4447 20.8867 61.7227 20.3125C62.0052 19.7337 62.3971 19.2826 62.8984 18.959C63.4043 18.6309 63.9512 18.4668 64.5391 18.4668C65.5007 18.4668 66.248 18.7835 66.7812 19.417C67.3145 20.0505 67.5811 20.9574 67.5811 22.1377V22.6641H62.5703C62.5885 23.3932 62.8005 23.9834 63.2061 24.4346C63.6162 24.8812 64.1357 25.1045 64.7646 25.1045C65.2113 25.1045 65.5895 25.0133 65.8994 24.8311C66.2093 24.6488 66.4805 24.4072 66.7129 24.1064L67.4854 24.708C66.8656 25.6605 65.9359 26.1367 64.6963 26.1367ZM64.5391 19.5059C64.0286 19.5059 63.6003 19.6927 63.2539 20.0664C62.9076 20.4355 62.6934 20.9551 62.6113 21.625H66.3164V21.5293C66.2799 20.8867 66.1068 20.39 65.7969 20.0391C65.487 19.6836 65.0677 19.5059 64.5391 19.5059ZM71.5322 21.3037L73.1729 18.6035H74.6494L72.2295 22.2607L74.7246 26H73.2617L71.5527 23.2314L69.8438 26H68.374L70.8691 22.2607L68.4492 18.6035H69.9121L71.5322 21.3037ZM77.7119 16.8125V18.6035H79.0928V19.5811H77.7119V24.168C77.7119 24.4642 77.7734 24.6875 77.8965 24.8379C78.0195 24.9837 78.2292 25.0566 78.5254 25.0566C78.6712 25.0566 78.8717 25.0293 79.127 24.9746V26C78.7943 26.0911 78.4707 26.1367 78.1562 26.1367C77.5911 26.1367 77.165 25.9658 76.8779 25.624C76.5908 25.2822 76.4473 24.7969 76.4473 24.168V19.5811H75.1006V18.6035H76.4473V16.8125H77.7119ZM85.9424 16.0469L89.1963 24.168L92.4502 16.0469H94.1523V26H92.8398V22.124L92.9629 17.9404L89.6953 26H88.6904L85.4297 17.9609L85.5596 22.124V26H84.2471V16.0469H85.9424ZM99.3408 26.1367C98.3382 26.1367 97.5225 25.8086 96.8936 25.1523C96.2646 24.4915 95.9502 23.6097 95.9502 22.5068V22.2744C95.9502 21.5407 96.0892 20.8867 96.3672 20.3125C96.6497 19.7337 97.0417 19.2826 97.543 18.959C98.0488 18.6309 98.5957 18.4668 99.1836 18.4668C100.145 18.4668 100.893 18.7835 101.426 19.417C101.959 20.0505 102.226 20.9574 102.226 22.1377V22.6641H97.2148C97.2331 23.3932 97.445 23.9834 97.8506 24.4346C98.2607 24.8812 98.7803 25.1045 99.4092 25.1045C99.8558 25.1045 100.234 25.0133 100.544 24.8311C100.854 24.6488 101.125 24.4072 101.357 24.1064L102.13 24.708C101.51 25.6605 100.58 26.1367 99.3408 26.1367ZM99.1836 19.5059C98.6732 19.5059 98.2448 19.6927 97.8984 20.0664C97.5521 20.4355 97.3379 20.9551 97.2559 21.625H100.961V21.5293C100.924 20.8867 100.751 20.39 100.441 20.0391C100.132 19.6836 99.7122 19.5059 99.1836 19.5059ZM108.002 24.0381C108.002 23.6963 107.872 23.432 107.612 23.2451C107.357 23.0537 106.908 22.8896 106.266 22.7529C105.628 22.6162 105.119 22.4521 104.741 22.2607C104.368 22.0693 104.09 21.8415 103.907 21.5771C103.729 21.3128 103.641 20.9984 103.641 20.6338C103.641 20.0277 103.896 19.515 104.406 19.0957C104.921 18.6764 105.577 18.4668 106.375 18.4668C107.214 18.4668 107.893 18.6833 108.412 19.1162C108.936 19.5492 109.198 20.1029 109.198 20.7773H107.927C107.927 20.431 107.779 20.1325 107.482 19.8818C107.191 19.6312 106.822 19.5059 106.375 19.5059C105.915 19.5059 105.555 19.6061 105.295 19.8066C105.035 20.0072 104.905 20.2692 104.905 20.5928C104.905 20.8981 105.026 21.1283 105.268 21.2832C105.509 21.4382 105.944 21.5863 106.573 21.7275C107.207 21.8688 107.719 22.0374 108.111 22.2334C108.503 22.4294 108.793 22.6663 108.979 22.9443C109.171 23.2178 109.267 23.5527 109.267 23.9492C109.267 24.61 109.002 25.141 108.474 25.542C107.945 25.9385 107.259 26.1367 106.416 26.1367C105.824 26.1367 105.299 26.0319 104.844 25.8223C104.388 25.6126 104.03 25.321 103.771 24.9473C103.515 24.569 103.388 24.1611 103.388 23.7236H104.652C104.675 24.1475 104.844 24.4847 105.158 24.7354C105.477 24.9814 105.896 25.1045 106.416 25.1045C106.895 25.1045 107.277 25.0088 107.564 24.8174C107.856 24.6214 108.002 24.3617 108.002 24.0381ZM115.221 24.0381C115.221 23.6963 115.091 23.432 114.831 23.2451C114.576 23.0537 114.127 22.8896 113.484 22.7529C112.846 22.6162 112.338 22.4521 111.96 22.2607C111.586 22.0693 111.308 21.8415 111.126 21.5771C110.948 21.3128 110.859 20.9984 110.859 20.6338C110.859 20.0277 111.115 19.515 111.625 19.0957C112.14 18.6764 112.796 18.4668 113.594 18.4668C114.432 18.4668 115.111 18.6833 115.631 19.1162C116.155 19.5492 116.417 20.1029 116.417 20.7773H115.146C115.146 20.431 114.997 20.1325 114.701 19.8818C114.41 19.6312 114.04 19.5059 113.594 19.5059C113.133 19.5059 112.773 19.6061 112.514 19.8066C112.254 20.0072 112.124 20.2692 112.124 20.5928C112.124 20.8981 112.245 21.1283 112.486 21.2832C112.728 21.4382 113.163 21.5863 113.792 21.7275C114.425 21.8688 114.938 22.0374 115.33 22.2334C115.722 22.4294 116.011 22.6663 116.198 22.9443C116.39 23.2178 116.485 23.5527 116.485 23.9492C116.485 24.61 116.221 25.141 115.692 25.542C115.164 25.9385 114.478 26.1367 113.635 26.1367C113.042 26.1367 112.518 26.0319 112.062 25.8223C111.607 25.6126 111.249 25.321 110.989 24.9473C110.734 24.569 110.606 24.1611 110.606 23.7236H111.871C111.894 24.1475 112.062 24.4847 112.377 24.7354C112.696 24.9814 113.115 25.1045 113.635 25.1045C114.113 25.1045 114.496 25.0088 114.783 24.8174C115.075 24.6214 115.221 24.3617 115.221 24.0381ZM122.699 26C122.626 25.8542 122.567 25.5944 122.521 25.2207C121.934 25.8314 121.232 26.1367 120.416 26.1367C119.687 26.1367 119.088 25.9316 118.618 25.5215C118.153 25.1068 117.921 24.5827 117.921 23.9492C117.921 23.179 118.213 22.582 118.796 22.1582C119.384 21.7298 120.209 21.5156 121.271 21.5156H122.501V20.9346C122.501 20.4925 122.369 20.1416 122.104 19.8818C121.84 19.6175 121.451 19.4854 120.936 19.4854C120.484 19.4854 120.106 19.5993 119.801 19.8271C119.495 20.055 119.343 20.3307 119.343 20.6543H118.071C118.071 20.2852 118.201 19.9297 118.461 19.5879C118.725 19.2415 119.081 18.9681 119.527 18.7676C119.979 18.5671 120.473 18.4668 121.011 18.4668C121.863 18.4668 122.531 18.681 123.014 19.1094C123.497 19.5332 123.747 20.1188 123.766 20.8662V24.2705C123.766 24.9495 123.852 25.4896 124.025 25.8906V26H122.699ZM120.601 25.0361C120.997 25.0361 121.373 24.9336 121.729 24.7285C122.084 24.5234 122.341 24.2568 122.501 23.9287V22.4111H121.51C119.96 22.4111 119.186 22.8646 119.186 23.7715C119.186 24.168 119.318 24.4779 119.582 24.7012C119.846 24.9245 120.186 25.0361 120.601 25.0361ZM125.447 22.2402C125.447 21.0872 125.714 20.1712 126.247 19.4922C126.78 18.8086 127.487 18.4668 128.366 18.4668C129.269 18.4668 129.973 18.7858 130.479 19.4238L130.54 18.6035H131.695V25.8223C131.695 26.7793 131.41 27.5335 130.841 28.085C130.276 28.6364 129.515 28.9121 128.558 28.9121C128.024 28.9121 127.503 28.7982 126.992 28.5703C126.482 28.3424 126.092 28.0303 125.823 27.6338L126.479 26.875C127.022 27.5449 127.685 27.8799 128.469 27.8799C129.084 27.8799 129.562 27.7067 129.904 27.3604C130.251 27.014 130.424 26.5264 130.424 25.8975V25.2617C129.918 25.8451 129.228 26.1367 128.353 26.1367C127.487 26.1367 126.785 25.7881 126.247 25.0908C125.714 24.3936 125.447 23.4434 125.447 22.2402ZM126.719 22.3838C126.719 23.2178 126.89 23.874 127.231 24.3525C127.573 24.8265 128.052 25.0635 128.667 25.0635C129.465 25.0635 130.05 24.7012 130.424 23.9766V20.5996C130.036 19.8932 129.455 19.54 128.681 19.54C128.065 19.54 127.585 19.7793 127.238 20.2578C126.892 20.7363 126.719 21.445 126.719 22.3838ZM136.679 26.1367C135.676 26.1367 134.86 25.8086 134.231 25.1523C133.603 24.4915 133.288 23.6097 133.288 22.5068V22.2744C133.288 21.5407 133.427 20.8867 133.705 20.3125C133.988 19.7337 134.38 19.2826 134.881 18.959C135.387 18.6309 135.934 18.4668 136.521 18.4668C137.483 18.4668 138.23 18.7835 138.764 19.417C139.297 20.0505 139.563 20.9574 139.563 22.1377V22.6641H134.553C134.571 23.3932 134.783 23.9834 135.188 24.4346C135.599 24.8812 136.118 25.1045 136.747 25.1045C137.194 25.1045 137.572 25.0133 137.882 24.8311C138.192 24.6488 138.463 24.4072 138.695 24.1064L139.468 24.708C138.848 25.6605 137.918 26.1367 136.679 26.1367ZM136.521 19.5059C136.011 19.5059 135.583 19.6927 135.236 20.0664C134.89 20.4355 134.676 20.9551 134.594 21.625H138.299V21.5293C138.262 20.8867 138.089 20.39 137.779 20.0391C137.469 19.6836 137.05 19.5059 136.521 19.5059Z" fill="white" />
          <path d="M43 20.28C43 21.96 42.464 23.5167 41.3919 24.95C40.3198 26.3833 38.8609 27.5133 37.0153 28.34C35.1696 29.1667 33.1612 29.58 30.9898 29.58C29.3342 29.58 27.7464 29.32 26.2265 28.8L26.2672 28.86L19 31C19.5971 30.2133 20.0755 29.37 20.4351 28.47C20.7947 27.57 21.0085 26.8667 21.0763 26.36L21.1578 25.6C19.7193 24 19 22.2267 19 20.28C19 18.6 19.536 17.0467 20.6081 15.62C21.6802 14.1933 23.1357 13.0667 24.9746 12.24C26.8134 11.4133 28.8185 11 30.9898 11C33.1612 11 35.1696 11.4133 37.0153 12.24C38.8609 13.0667 40.3198 14.1933 41.3919 15.62C42.464 17.0467 43 18.6 43 20.28ZM37.9109 20.28C37.9109 19.8933 37.7684 19.56 37.4835 19.28C37.1985 19 36.8524 18.86 36.4453 18.86C36.0517 18.86 35.7125 19 35.4275 19.28C35.1425 19.56 35 19.8933 35 20.28C35 20.68 35.1425 21.02 35.4275 21.3C35.7125 21.58 36.0517 21.72 36.4453 21.72C36.8524 21.72 37.1985 21.58 37.4835 21.3C37.7684 21.02 37.9109 20.68 37.9109 20.28ZM32.8219 20.28C32.8219 19.8933 32.6794 19.56 32.3944 19.28C32.1094 19 31.7634 18.86 31.3562 18.86C30.9627 18.86 30.6234 19 30.3384 19.28C30.0534 19.56 29.9109 19.8933 29.9109 20.28C29.9109 20.68 30.0534 21.02 30.3384 21.3C30.6234 21.58 30.9627 21.72 31.3562 21.72C31.7634 21.72 32.1094 21.58 32.3944 21.3C32.6794 21.02 32.8219 20.68 32.8219 20.28ZM27.7328 20.28C27.7328 19.8933 27.5903 19.56 27.3053 19.28C27.0204 19 26.6743 18.86 26.2672 18.86C25.8736 18.86 25.5344 19 25.2494 19.28C24.9644 19.56 24.8219 19.8933 24.8219 20.28C24.8219 20.68 24.9644 21.02 25.2494 21.3C25.5344 21.58 25.8736 21.72 26.2672 21.72C26.6743 21.72 27.0204 21.58 27.3053 21.3C27.5903 21.02 27.7328 20.68 27.7328 20.28Z" fill="white" />
        </svg>

      )
    }
    if (val == 'Direct Mail') {
      return (
        <svg width="164" height="41" viewBox="0 0 164 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6C0 2.68629 2.68629 0 6 0H158C161.314 0 164 2.68629 164 6V35C164 38.3137 161.314 41 158 41H6C2.6863 41 0 38.3137 0 35V6Z" fill="#3062FF" />
          <path d="M65.1553 26V16.0469H67.9648C68.8307 16.0469 69.5964 16.2383 70.2617 16.6211C70.9271 17.0039 71.4398 17.5485 71.7998 18.2549C72.1644 18.9613 72.349 19.7725 72.3535 20.6885V21.3242C72.3535 22.263 72.1712 23.0856 71.8066 23.792C71.4466 24.4984 70.9294 25.0407 70.2549 25.4189C69.585 25.7972 68.8034 25.9909 67.9102 26H65.1553ZM66.4678 17.127V24.9268H67.8486C68.8604 24.9268 69.6465 24.6123 70.207 23.9834C70.7721 23.3545 71.0547 22.459 71.0547 21.2969V20.7158C71.0547 19.5856 70.7881 18.7083 70.2549 18.084C69.7262 17.4551 68.9743 17.1361 67.999 17.127H66.4678ZM75.5186 26H74.2539V18.6035H75.5186V26ZM74.1514 16.6416C74.1514 16.4365 74.2129 16.2633 74.3359 16.1221C74.4635 15.9808 74.6504 15.9102 74.8965 15.9102C75.1426 15.9102 75.3294 15.9808 75.457 16.1221C75.5846 16.2633 75.6484 16.4365 75.6484 16.6416C75.6484 16.8467 75.5846 17.0176 75.457 17.1543C75.3294 17.291 75.1426 17.3594 74.8965 17.3594C74.6504 17.3594 74.4635 17.291 74.3359 17.1543C74.2129 17.0176 74.1514 16.8467 74.1514 16.6416ZM81.124 19.7383C80.9326 19.7064 80.7253 19.6904 80.502 19.6904C79.6725 19.6904 79.1097 20.0436 78.8135 20.75V26H77.5488V18.6035H78.7793L78.7998 19.458C79.2145 18.7972 79.8024 18.4668 80.5635 18.4668C80.8096 18.4668 80.9964 18.4987 81.124 18.5625V19.7383ZM85.2256 26.1367C84.223 26.1367 83.4072 25.8086 82.7783 25.1523C82.1494 24.4915 81.835 23.6097 81.835 22.5068V22.2744C81.835 21.5407 81.974 20.8867 82.252 20.3125C82.5345 19.7337 82.9264 19.2826 83.4277 18.959C83.9336 18.6309 84.4805 18.4668 85.0684 18.4668C86.0299 18.4668 86.7773 18.7835 87.3105 19.417C87.8438 20.0505 88.1104 20.9574 88.1104 22.1377V22.6641H83.0996C83.1178 23.3932 83.3298 23.9834 83.7354 24.4346C84.1455 24.8812 84.665 25.1045 85.2939 25.1045C85.7406 25.1045 86.1188 25.0133 86.4287 24.8311C86.7386 24.6488 87.0098 24.4072 87.2422 24.1064L88.0146 24.708C87.3949 25.6605 86.4652 26.1367 85.2256 26.1367ZM85.0684 19.5059C84.5579 19.5059 84.1296 19.6927 83.7832 20.0664C83.4368 20.4355 83.2227 20.9551 83.1406 21.625H86.8457V21.5293C86.8092 20.8867 86.6361 20.39 86.3262 20.0391C86.0163 19.6836 85.597 19.5059 85.0684 19.5059ZM92.5469 25.1045C92.998 25.1045 93.3923 24.9678 93.7295 24.6943C94.0667 24.4209 94.2536 24.0791 94.29 23.6689H95.4863C95.4635 24.0928 95.3177 24.4961 95.0488 24.8789C94.7799 25.2617 94.4199 25.5671 93.9688 25.7949C93.5221 26.0228 93.0482 26.1367 92.5469 26.1367C91.5397 26.1367 90.7376 25.8018 90.1406 25.1318C89.5482 24.4574 89.252 23.5368 89.252 22.3701V22.1582C89.252 21.4382 89.3841 20.7979 89.6484 20.2373C89.9128 19.6768 90.291 19.2415 90.7832 18.9316C91.2799 18.6217 91.8656 18.4668 92.54 18.4668C93.3695 18.4668 94.0576 18.7152 94.6045 19.2119C95.1559 19.7087 95.4499 20.3535 95.4863 21.1465H94.29C94.2536 20.668 94.0713 20.276 93.7432 19.9707C93.4196 19.6608 93.0186 19.5059 92.54 19.5059C91.8975 19.5059 91.3984 19.7383 91.043 20.2031C90.6921 20.6634 90.5166 21.3311 90.5166 22.2061V22.4453C90.5166 23.2975 90.6921 23.9538 91.043 24.4141C91.3939 24.8743 91.8952 25.1045 92.5469 25.1045ZM98.624 16.8125V18.6035H100.005V19.5811H98.624V24.168C98.624 24.4642 98.6855 24.6875 98.8086 24.8379C98.9316 24.9837 99.1413 25.0566 99.4375 25.0566C99.5833 25.0566 99.7839 25.0293 100.039 24.9746V26C99.7064 26.0911 99.3828 26.1367 99.0684 26.1367C98.5033 26.1367 98.0771 25.9658 97.79 25.624C97.5029 25.2822 97.3594 24.7969 97.3594 24.168V19.5811H96.0127V18.6035H97.3594V16.8125H98.624ZM106.854 16.0469L110.108 24.168L113.362 16.0469H115.064V26H113.752V22.124L113.875 17.9404L110.607 26H109.603L106.342 17.9609L106.472 22.124V26H105.159V16.0469H106.854ZM121.75 26C121.677 25.8542 121.618 25.5944 121.572 25.2207C120.984 25.8314 120.283 26.1367 119.467 26.1367C118.738 26.1367 118.138 25.9316 117.669 25.5215C117.204 25.1068 116.972 24.5827 116.972 23.9492C116.972 23.179 117.263 22.582 117.847 22.1582C118.435 21.7298 119.259 21.5156 120.321 21.5156H121.552V20.9346C121.552 20.4925 121.42 20.1416 121.155 19.8818C120.891 19.6175 120.501 19.4854 119.986 19.4854C119.535 19.4854 119.157 19.5993 118.852 19.8271C118.546 20.055 118.394 20.3307 118.394 20.6543H117.122C117.122 20.2852 117.252 19.9297 117.512 19.5879C117.776 19.2415 118.132 18.9681 118.578 18.7676C119.029 18.5671 119.524 18.4668 120.062 18.4668C120.914 18.4668 121.581 18.681 122.064 19.1094C122.548 19.5332 122.798 20.1188 122.816 20.8662V24.2705C122.816 24.9495 122.903 25.4896 123.076 25.8906V26H121.75ZM119.651 25.0361C120.048 25.0361 120.424 24.9336 120.779 24.7285C121.135 24.5234 121.392 24.2568 121.552 23.9287V22.4111H120.561C119.011 22.4111 118.236 22.8646 118.236 23.7715C118.236 24.168 118.368 24.4779 118.633 24.7012C118.897 24.9245 119.237 25.0361 119.651 25.0361ZM126.173 26H124.908V18.6035H126.173V26ZM124.806 16.6416C124.806 16.4365 124.867 16.2633 124.99 16.1221C125.118 15.9808 125.305 15.9102 125.551 15.9102C125.797 15.9102 125.984 15.9808 126.111 16.1221C126.239 16.2633 126.303 16.4365 126.303 16.6416C126.303 16.8467 126.239 17.0176 126.111 17.1543C125.984 17.291 125.797 17.3594 125.551 17.3594C125.305 17.3594 125.118 17.291 124.99 17.1543C124.867 17.0176 124.806 16.8467 124.806 16.6416ZM129.577 26H128.312V15.5H129.577V26Z" fill="white" />
          <path d="M54 20H52.9541C52.7168 17.4401 51.5919 15.0438 49.774 13.226C47.9562 11.4081 45.5599 10.2832 43 10.0459V9H41V10.0459C38.4401 10.2832 36.0438 11.4081 34.226 13.226C32.4081 15.0438 31.2832 17.4401 31.0459 20H30V22H31.0459C31.2832 24.5599 32.4081 26.9562 34.226 28.774C36.0438 30.5919 38.4401 31.7168 41 31.9541V33H43V31.9541C45.5599 31.7168 47.9562 30.5919 49.774 28.774C51.5919 26.9562 52.7168 24.5599 52.9541 22H54V20ZM43 29.9431V28H41V29.9431C38.9725 29.7134 37.0829 28.8027 35.6401 27.3599C34.1973 25.9171 33.2866 24.0275 33.0569 22H35V20H33.0569C33.2866 17.9725 34.1973 16.0829 35.6401 14.6401C37.0829 13.1973 38.9725 12.2866 41 12.0569V14H43V12.0569C45.0275 12.2866 46.9171 13.1973 48.3599 14.6401C49.8027 16.0829 50.7134 17.9725 50.9431 20H49V22H50.9431C50.7134 24.0275 49.8027 25.9171 48.3599 27.3599C46.9171 28.8027 45.0275 29.7134 43 29.9431Z" fill="white" />
          <path d="M42.001 22.999C41.5681 23.0001 41.1467 22.8596 40.801 22.599L37.001 19.749V23.999C37.001 24.2642 37.1063 24.5186 37.2939 24.7061C37.4814 24.8937 37.7358 24.999 38.001 24.999H46.001C46.2662 24.999 46.5205 24.8937 46.7081 24.7061C46.8956 24.5186 47.001 24.2642 47.001 23.999V19.749L43.201 22.599C42.8553 22.8596 42.4339 23.0001 42.001 22.999Z" fill="white" />
          <path d="M46.001 17.001H38.001C37.7911 17.001 37.5865 17.067 37.4163 17.1897C37.246 17.3125 37.1187 17.4856 37.0523 17.6847C36.9859 17.8839 36.9839 18.0988 37.0465 18.2991C37.109 18.4995 37.2331 18.675 37.401 18.801L41.401 21.801C41.5741 21.9308 41.7846 22.001 42.001 22.001C42.2173 22.001 42.4279 21.9308 42.601 21.801L46.601 18.801C46.7689 18.675 46.8929 18.4995 46.9555 18.2991C47.0181 18.0988 47.016 17.8839 46.9497 17.6847C46.8833 17.4856 46.756 17.3125 46.5857 17.1897C46.4154 17.067 46.2109 17.001 46.001 17.001Z" fill="white" />
        </svg>

      )
    }
    if (val == 'Schedule Meeting') {
      return (
        <svg width="160" height="41" viewBox="0 0 160 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6C0 2.68629 2.68629 0 6 0H154C157.314 0 160 2.68629 160 6V35C160 38.3137 157.314 41 154 41H6C2.6863 41 0 38.3137 0 35V6Z" fill="#3062FF" />
          <path d="M47.0879 21.5635C45.9622 21.2399 45.1419 20.8434 44.627 20.374C44.1165 19.9001 43.8613 19.3167 43.8613 18.624C43.8613 17.8402 44.1735 17.193 44.7979 16.6826C45.4268 16.1676 46.2425 15.9102 47.2451 15.9102C47.9287 15.9102 48.5371 16.0423 49.0703 16.3066C49.6081 16.571 50.0228 16.9355 50.3145 17.4004C50.6107 17.8652 50.7588 18.3734 50.7588 18.9248H49.4395C49.4395 18.3232 49.248 17.8516 48.8652 17.5098C48.4824 17.1634 47.9424 16.9902 47.2451 16.9902C46.598 16.9902 46.0921 17.1338 45.7275 17.4209C45.3675 17.7035 45.1875 18.0977 45.1875 18.6035C45.1875 19.0091 45.3584 19.3532 45.7002 19.6357C46.0465 19.9137 46.6322 20.1689 47.457 20.4014C48.2865 20.6338 48.9336 20.8913 49.3984 21.1738C49.8678 21.4518 50.2142 21.7777 50.4375 22.1514C50.6654 22.5251 50.7793 22.9648 50.7793 23.4707C50.7793 24.2773 50.4648 24.9245 49.8359 25.4121C49.207 25.8952 48.3662 26.1367 47.3135 26.1367C46.6299 26.1367 45.9919 26.0068 45.3994 25.7471C44.807 25.4827 44.349 25.1227 44.0254 24.667C43.7064 24.2113 43.5469 23.694 43.5469 23.1152H44.8662C44.8662 23.7168 45.0872 24.193 45.5293 24.5439C45.9759 24.8903 46.5706 25.0635 47.3135 25.0635C48.0062 25.0635 48.5371 24.9222 48.9062 24.6396C49.2754 24.3571 49.46 23.972 49.46 23.4844C49.46 22.9967 49.2891 22.6208 48.9473 22.3564C48.6055 22.0876 47.9857 21.8232 47.0879 21.5635ZM55.2363 25.1045C55.6875 25.1045 56.0817 24.9678 56.4189 24.6943C56.7562 24.4209 56.943 24.0791 56.9795 23.6689H58.1758C58.153 24.0928 58.0072 24.4961 57.7383 24.8789C57.4694 25.2617 57.1094 25.5671 56.6582 25.7949C56.2116 26.0228 55.7376 26.1367 55.2363 26.1367C54.2292 26.1367 53.4271 25.8018 52.8301 25.1318C52.2376 24.4574 51.9414 23.5368 51.9414 22.3701V22.1582C51.9414 21.4382 52.0736 20.7979 52.3379 20.2373C52.6022 19.6768 52.9805 19.2415 53.4727 18.9316C53.9694 18.6217 54.555 18.4668 55.2295 18.4668C56.0589 18.4668 56.7471 18.7152 57.2939 19.2119C57.8454 19.7087 58.1393 20.3535 58.1758 21.1465H56.9795C56.943 20.668 56.7607 20.276 56.4326 19.9707C56.109 19.6608 55.708 19.5059 55.2295 19.5059C54.5869 19.5059 54.0879 19.7383 53.7324 20.2031C53.3815 20.6634 53.2061 21.3311 53.2061 22.2061V22.4453C53.2061 23.2975 53.3815 23.9538 53.7324 24.4141C54.0833 24.8743 54.5846 25.1045 55.2363 25.1045ZM60.8623 19.499C61.4229 18.8109 62.152 18.4668 63.0498 18.4668C64.613 18.4668 65.4014 19.3486 65.415 21.1123V26H64.1504V21.1055C64.1458 20.5723 64.0228 20.1781 63.7812 19.9229C63.5443 19.6676 63.1729 19.54 62.667 19.54C62.2568 19.54 61.8968 19.6494 61.5869 19.8682C61.277 20.0869 61.0355 20.374 60.8623 20.7295V26H59.5977V15.5H60.8623V19.499ZM70.3779 26.1367C69.3753 26.1367 68.5596 25.8086 67.9307 25.1523C67.3018 24.4915 66.9873 23.6097 66.9873 22.5068V22.2744C66.9873 21.5407 67.1263 20.8867 67.4043 20.3125C67.6868 19.7337 68.0788 19.2826 68.5801 18.959C69.0859 18.6309 69.6328 18.4668 70.2207 18.4668C71.1823 18.4668 71.9297 18.7835 72.4629 19.417C72.9961 20.0505 73.2627 20.9574 73.2627 22.1377V22.6641H68.252C68.2702 23.3932 68.4821 23.9834 68.8877 24.4346C69.2979 24.8812 69.8174 25.1045 70.4463 25.1045C70.8929 25.1045 71.2712 25.0133 71.5811 24.8311C71.891 24.6488 72.1621 24.4072 72.3945 24.1064L73.167 24.708C72.5472 25.6605 71.6175 26.1367 70.3779 26.1367ZM70.2207 19.5059C69.7103 19.5059 69.2819 19.6927 68.9355 20.0664C68.5892 20.4355 68.375 20.9551 68.293 21.625H71.998V21.5293C71.9616 20.8867 71.7884 20.39 71.4785 20.0391C71.1686 19.6836 70.7493 19.5059 70.2207 19.5059ZM74.4248 22.2402C74.4248 21.1055 74.6937 20.194 75.2314 19.5059C75.7692 18.8132 76.4733 18.4668 77.3438 18.4668C78.2096 18.4668 78.8955 18.763 79.4014 19.3555V15.5H80.666V26H79.5039L79.4424 25.207C78.9365 25.8268 78.2324 26.1367 77.3301 26.1367C76.4733 26.1367 75.7738 25.7858 75.2314 25.084C74.6937 24.3822 74.4248 23.4661 74.4248 22.3359V22.2402ZM75.6895 22.3838C75.6895 23.2223 75.8626 23.8786 76.209 24.3525C76.5553 24.8265 77.0339 25.0635 77.6445 25.0635C78.4466 25.0635 79.0322 24.7035 79.4014 23.9834V20.5859C79.0231 19.8887 78.4421 19.54 77.6582 19.54C77.0384 19.54 76.5553 19.7793 76.209 20.2578C75.8626 20.7363 75.6895 21.445 75.6895 22.3838ZM87.2012 25.2686C86.709 25.8473 85.9867 26.1367 85.0342 26.1367C84.2458 26.1367 83.6442 25.9089 83.2295 25.4531C82.8193 24.9928 82.612 24.3138 82.6074 23.416V18.6035H83.8721V23.3818C83.8721 24.5029 84.3278 25.0635 85.2393 25.0635C86.2054 25.0635 86.848 24.7035 87.167 23.9834V18.6035H88.4316V26H87.2285L87.2012 25.2686ZM91.7334 26H90.4688V15.5H91.7334V26ZM96.833 26.1367C95.8304 26.1367 95.0146 25.8086 94.3857 25.1523C93.7568 24.4915 93.4424 23.6097 93.4424 22.5068V22.2744C93.4424 21.5407 93.5814 20.8867 93.8594 20.3125C94.1419 19.7337 94.5339 19.2826 95.0352 18.959C95.541 18.6309 96.0879 18.4668 96.6758 18.4668C97.6374 18.4668 98.3848 18.7835 98.918 19.417C99.4512 20.0505 99.7178 20.9574 99.7178 22.1377V22.6641H94.707C94.7253 23.3932 94.9372 23.9834 95.3428 24.4346C95.7529 24.8812 96.2725 25.1045 96.9014 25.1045C97.348 25.1045 97.7262 25.0133 98.0361 24.8311C98.346 24.6488 98.6172 24.4072 98.8496 24.1064L99.6221 24.708C99.0023 25.6605 98.0726 26.1367 96.833 26.1367ZM96.6758 19.5059C96.1654 19.5059 95.737 19.6927 95.3906 20.0664C95.0443 20.4355 94.8301 20.9551 94.748 21.625H98.4531V21.5293C98.4167 20.8867 98.2435 20.39 97.9336 20.0391C97.6237 19.6836 97.2044 19.5059 96.6758 19.5059ZM106.554 16.0469L109.808 24.168L113.062 16.0469H114.764V26H113.451V22.124L113.574 17.9404L110.307 26H109.302L106.041 17.9609L106.171 22.124V26H104.858V16.0469H106.554ZM119.952 26.1367C118.95 26.1367 118.134 25.8086 117.505 25.1523C116.876 24.4915 116.562 23.6097 116.562 22.5068V22.2744C116.562 21.5407 116.701 20.8867 116.979 20.3125C117.261 19.7337 117.653 19.2826 118.154 18.959C118.66 18.6309 119.207 18.4668 119.795 18.4668C120.757 18.4668 121.504 18.7835 122.037 19.417C122.57 20.0505 122.837 20.9574 122.837 22.1377V22.6641H117.826C117.844 23.3932 118.056 23.9834 118.462 24.4346C118.872 24.8812 119.392 25.1045 120.021 25.1045C120.467 25.1045 120.845 25.0133 121.155 24.8311C121.465 24.6488 121.736 24.4072 121.969 24.1064L122.741 24.708C122.121 25.6605 121.192 26.1367 119.952 26.1367ZM119.795 19.5059C119.285 19.5059 118.856 19.6927 118.51 20.0664C118.163 20.4355 117.949 20.9551 117.867 21.625H121.572V21.5293C121.536 20.8867 121.363 20.39 121.053 20.0391C120.743 19.6836 120.324 19.5059 119.795 19.5059ZM127.376 26.1367C126.373 26.1367 125.558 25.8086 124.929 25.1523C124.3 24.4915 123.985 23.6097 123.985 22.5068V22.2744C123.985 21.5407 124.124 20.8867 124.402 20.3125C124.685 19.7337 125.077 19.2826 125.578 18.959C126.084 18.6309 126.631 18.4668 127.219 18.4668C128.18 18.4668 128.928 18.7835 129.461 19.417C129.994 20.0505 130.261 20.9574 130.261 22.1377V22.6641H125.25C125.268 23.3932 125.48 23.9834 125.886 24.4346C126.296 24.8812 126.815 25.1045 127.444 25.1045C127.891 25.1045 128.269 25.0133 128.579 24.8311C128.889 24.6488 129.16 24.4072 129.393 24.1064L130.165 24.708C129.545 25.6605 128.616 26.1367 127.376 26.1367ZM127.219 19.5059C126.708 19.5059 126.28 19.6927 125.934 20.0664C125.587 20.4355 125.373 20.9551 125.291 21.625H128.996V21.5293C128.96 20.8867 128.786 20.39 128.477 20.0391C128.167 19.6836 127.747 19.5059 127.219 19.5059ZM133.446 16.8125V18.6035H134.827V19.5811H133.446V24.168C133.446 24.4642 133.508 24.6875 133.631 24.8379C133.754 24.9837 133.964 25.0566 134.26 25.0566C134.406 25.0566 134.606 25.0293 134.861 24.9746V26C134.529 26.0911 134.205 26.1367 133.891 26.1367C133.326 26.1367 132.899 25.9658 132.612 25.624C132.325 25.2822 132.182 24.7969 132.182 24.168V19.5811H130.835V18.6035H132.182V16.8125H133.446ZM137.685 26H136.42V18.6035H137.685V26ZM136.317 16.6416C136.317 16.4365 136.379 16.2633 136.502 16.1221C136.63 15.9808 136.816 15.9102 137.062 15.9102C137.309 15.9102 137.495 15.9808 137.623 16.1221C137.751 16.2633 137.814 16.4365 137.814 16.6416C137.814 16.8467 137.751 17.0176 137.623 17.1543C137.495 17.291 137.309 17.3594 137.062 17.3594C136.816 17.3594 136.63 17.291 136.502 17.1543C136.379 17.0176 136.317 16.8467 136.317 16.6416ZM140.911 18.6035L140.952 19.5332C141.517 18.8223 142.256 18.4668 143.167 18.4668C144.73 18.4668 145.519 19.3486 145.532 21.1123V26H144.268V21.1055C144.263 20.5723 144.14 20.1781 143.898 19.9229C143.661 19.6676 143.29 19.54 142.784 19.54C142.374 19.54 142.014 19.6494 141.704 19.8682C141.394 20.0869 141.153 20.374 140.979 20.7295V26H139.715V18.6035H140.911ZM147.139 22.2402C147.139 21.0872 147.405 20.1712 147.938 19.4922C148.472 18.8086 149.178 18.4668 150.058 18.4668C150.96 18.4668 151.664 18.7858 152.17 19.4238L152.231 18.6035H153.387V25.8223C153.387 26.7793 153.102 27.5335 152.532 28.085C151.967 28.6364 151.206 28.9121 150.249 28.9121C149.716 28.9121 149.194 28.7982 148.684 28.5703C148.173 28.3424 147.784 28.0303 147.515 27.6338L148.171 26.875C148.713 27.5449 149.376 27.8799 150.16 27.8799C150.775 27.8799 151.254 27.7067 151.596 27.3604C151.942 27.014 152.115 26.5264 152.115 25.8975V25.2617C151.609 25.8451 150.919 26.1367 150.044 26.1367C149.178 26.1367 148.476 25.7881 147.938 25.0908C147.405 24.3936 147.139 23.4434 147.139 22.2402ZM148.41 22.3838C148.41 23.2178 148.581 23.874 148.923 24.3525C149.265 24.8265 149.743 25.0635 150.358 25.0635C151.156 25.0635 151.742 24.7012 152.115 23.9766V20.5996C151.728 19.8932 151.147 19.54 150.372 19.54C149.757 19.54 149.276 19.7793 148.93 20.2578C148.583 20.7363 148.41 21.445 148.41 22.3838Z" fill="white" />
          <path d="M23.0156 19.7812C23.5334 19.7812 23.9531 19.3615 23.9531 18.8437C23.9531 18.326 23.5334 17.9062 23.0156 17.9062C22.4979 17.9062 22.0781 18.326 22.0781 18.8437C22.0781 19.3615 22.4979 19.7812 23.0156 19.7812Z" fill="white" />
          <path d="M23.0156 23.8594C23.5334 23.8594 23.9531 23.4396 23.9531 22.9219C23.9531 22.4041 23.5334 21.9844 23.0156 21.9844C22.4979 21.9844 22.0781 22.4041 22.0781 22.9219C22.0781 23.4396 22.4979 23.8594 23.0156 23.8594Z" fill="white" />
          <path d="M27.0938 19.7812C27.6115 19.7812 28.0313 19.3615 28.0313 18.8437C28.0313 18.326 27.6115 17.9062 27.0938 17.9062C26.576 17.9062 26.1563 18.326 26.1563 18.8437C26.1563 19.3615 26.576 19.7812 27.0938 19.7812Z" fill="white" />
          <path d="M32.0625 20.7188C32.5802 20.7188 33 20.299 33 19.7812V14.625C33 12.5573 31.3177 10.875 29.25 10.875H28.0312V9.9375C28.0312 9.41972 27.6115 9 27.0937 9C26.5759 9 26.1562 9.41972 26.1562 9.9375V10.875H21.8906V9.9375C21.8906 9.41972 21.4709 9 20.9531 9C20.4353 9 20.0156 9.41972 20.0156 9.9375V10.875H15.7969V9.9375C15.7969 9.41972 15.3771 9 14.8594 9C14.3416 9 13.9219 9.41972 13.9219 9.9375V10.875H12.75C10.6822 10.875 9 12.5573 9 14.625V29.25C9 31.3177 10.6822 33 12.75 33H24.5625C24.5944 33 24.6259 32.9984 24.657 32.9952C24.6879 32.9983 24.7189 33 24.7497 33C24.9997 33 25.245 32.9 25.4253 32.7128L32.7377 25.119C32.9986 24.8482 33.0723 24.4478 32.9252 24.1018C32.7781 23.7559 32.4384 23.5312 32.0625 23.5312H27.5625C25.4947 23.5312 23.8125 25.2135 23.8125 27.2812V31.125H12.75C11.7161 31.125 10.875 30.2839 10.875 29.25V14.625C10.875 13.5911 11.7161 12.75 12.75 12.75H13.9219V13.6875C13.9219 14.2053 14.3416 14.625 14.8594 14.625C15.3771 14.625 15.7969 14.2053 15.7969 13.6875V12.75H20.0156V13.6875C20.0156 14.2053 20.4353 14.625 20.9531 14.625C21.4709 14.625 21.8906 14.2053 21.8906 13.6875V12.75H26.1562V13.6875C26.1562 14.2053 26.5759 14.625 27.0937 14.625C27.6115 14.625 28.0312 14.2053 28.0312 13.6875V12.75H29.25C30.2838 12.75 31.125 13.5911 31.125 14.625V19.7812C31.125 20.299 31.5447 20.7188 32.0625 20.7188ZM25.6875 27.2812C25.6875 26.2474 26.5286 25.4062 27.5625 25.4062H29.8582L25.6875 29.7374V27.2812Z" fill="white" />
          <path d="M14.8594 19.7812C15.3771 19.7812 15.7969 19.3615 15.7969 18.8437C15.7969 18.326 15.3771 17.9062 14.8594 17.9062C14.3416 17.9062 13.9219 18.326 13.9219 18.8437C13.9219 19.3615 14.3416 19.7812 14.8594 19.7812Z" fill="white" />
          <path d="M18.9375 23.8594C19.4553 23.8594 19.875 23.4396 19.875 22.9219C19.875 22.4041 19.4553 21.9844 18.9375 21.9844C18.4197 21.9844 18 22.4041 18 22.9219C18 23.4396 18.4197 23.8594 18.9375 23.8594Z" fill="white" />
          <path d="M14.8594 27.9375C15.3771 27.9375 15.7969 27.5178 15.7969 27C15.7969 26.4822 15.3771 26.0625 14.8594 26.0625C14.3416 26.0625 13.9219 26.4822 13.9219 27C13.9219 27.5178 14.3416 27.9375 14.8594 27.9375Z" fill="white" />
          <path d="M14.8594 23.8594C15.3771 23.8594 15.7969 23.4396 15.7969 22.9219C15.7969 22.4041 15.3771 21.9844 14.8594 21.9844C14.3416 21.9844 13.9219 22.4041 13.9219 22.9219C13.9219 23.4396 14.3416 23.8594 14.8594 23.8594Z" fill="white" />
          <path d="M18.9375 27.9375C19.4553 27.9375 19.875 27.5178 19.875 27C19.875 26.4822 19.4553 26.0625 18.9375 26.0625C18.4197 26.0625 18 26.4822 18 27C18 27.5178 18.4197 27.9375 18.9375 27.9375Z" fill="white" />
          <path d="M18.9375 19.7812C19.4553 19.7812 19.875 19.3615 19.875 18.8437C19.875 18.326 19.4553 17.9062 18.9375 17.9062C18.4197 17.9062 18 18.326 18 18.8437C18 19.3615 18.4197 19.7812 18.9375 19.7812Z" fill="white" />
        </svg>

      )
    }
    if (val == 'Phone Call') {
      return (
        <svg width="160" height="41" viewBox="0 0 160 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6C0 2.68629 2.68629 0 6 0H154C157.314 0 160 2.68629 160 6V35C160 38.3137 157.314 41 154 41H6C2.6863 41 0 38.3137 0 35V6Z" fill="#3062FF" />
          <path d="M50.3757 25.8882C49.6123 25.1575 47.7632 24.0911 46.866 23.6613C45.6977 23.1023 45.6016 23.0566 44.6833 23.7047C44.0708 24.1372 43.6636 24.5236 42.9467 24.3784C42.2299 24.2331 40.6721 23.4142 39.3082 22.1227C37.9442 20.8311 37.0322 19.3084 36.8788 18.6297C36.7254 17.9511 37.1389 17.5688 37.5899 16.9856C38.2255 16.1635 38.1774 16.0265 37.6341 14.9167C37.2105 14.0535 36.0552 12.3134 35.2831 11.5918C34.4571 10.8168 34.4571 10.9538 33.9249 11.1639C33.4916 11.3371 33.0759 11.5476 32.683 11.7928C31.9138 12.2783 31.4868 12.6815 31.1883 13.2876C30.8897 13.8936 30.7556 15.3145 32.2974 17.9753C33.8393 20.6361 34.921 21.9966 37.16 24.1176C39.399 26.2385 41.1207 27.379 43.6376 28.7199C46.7511 30.3763 47.9454 30.0535 48.5853 29.7703C49.2252 29.4871 49.6517 29.0852 50.1637 28.3545C50.4225 27.9819 50.6446 27.5875 50.8272 27.1762C51.0488 26.6724 51.1931 26.6724 50.3757 25.8882Z" fill="white" />
          <path d="M63.4678 22.1035V26H62.1553V16.0469H65.8262C66.9154 16.0469 67.7676 16.3249 68.3828 16.8809C69.0026 17.4368 69.3125 18.1729 69.3125 19.0889C69.3125 20.055 69.0094 20.8001 68.4033 21.3242C67.8018 21.8438 66.9382 22.1035 65.8125 22.1035H63.4678ZM63.4678 21.0303H65.8262C66.528 21.0303 67.0658 20.8662 67.4395 20.5381C67.8132 20.2054 68 19.7269 68 19.1025C68 18.5101 67.8132 18.0361 67.4395 17.6807C67.0658 17.3252 66.5531 17.1406 65.9014 17.127H63.4678V21.0303ZM72.0537 19.499C72.6143 18.8109 73.3434 18.4668 74.2412 18.4668C75.8044 18.4668 76.5928 19.3486 76.6064 21.1123V26H75.3418V21.1055C75.3372 20.5723 75.2142 20.1781 74.9727 19.9229C74.7357 19.6676 74.3643 19.54 73.8584 19.54C73.4482 19.54 73.0882 19.6494 72.7783 19.8682C72.4684 20.0869 72.2269 20.374 72.0537 20.7295V26H70.7891V15.5H72.0537V19.499ZM78.165 22.2334C78.165 21.5088 78.3063 20.8571 78.5889 20.2783C78.876 19.6995 79.2725 19.2529 79.7783 18.9385C80.2887 18.624 80.8698 18.4668 81.5215 18.4668C82.5286 18.4668 83.3421 18.8154 83.9619 19.5127C84.5863 20.21 84.8984 21.1374 84.8984 22.2949V22.3838C84.8984 23.1038 84.7594 23.751 84.4814 24.3252C84.208 24.8949 83.8138 25.3392 83.2988 25.6582C82.7884 25.9772 82.2005 26.1367 81.5352 26.1367C80.5326 26.1367 79.7191 25.7881 79.0947 25.0908C78.4749 24.3936 78.165 23.4707 78.165 22.3223V22.2334ZM79.4365 22.3838C79.4365 23.2041 79.6257 23.8626 80.0039 24.3594C80.3867 24.8561 80.8971 25.1045 81.5352 25.1045C82.1777 25.1045 82.6882 24.8538 83.0664 24.3525C83.4447 23.8467 83.6338 23.1403 83.6338 22.2334C83.6338 21.4222 83.4401 20.766 83.0527 20.2646C82.6699 19.7588 82.1595 19.5059 81.5215 19.5059C80.8971 19.5059 80.3936 19.7542 80.0107 20.251C79.6279 20.7477 79.4365 21.4587 79.4365 22.3838ZM87.6807 18.6035L87.7217 19.5332C88.2868 18.8223 89.0251 18.4668 89.9365 18.4668C91.4997 18.4668 92.2881 19.3486 92.3018 21.1123V26H91.0371V21.1055C91.0326 20.5723 90.9095 20.1781 90.668 19.9229C90.431 19.6676 90.0596 19.54 89.5537 19.54C89.1436 19.54 88.7835 19.6494 88.4736 19.8682C88.1637 20.0869 87.9222 20.374 87.749 20.7295V26H86.4844V18.6035H87.6807ZM97.2783 26.1367C96.2757 26.1367 95.46 25.8086 94.8311 25.1523C94.2021 24.4915 93.8877 23.6097 93.8877 22.5068V22.2744C93.8877 21.5407 94.0267 20.8867 94.3047 20.3125C94.5872 19.7337 94.9792 19.2826 95.4805 18.959C95.9863 18.6309 96.5332 18.4668 97.1211 18.4668C98.0827 18.4668 98.8301 18.7835 99.3633 19.417C99.8965 20.0505 100.163 20.9574 100.163 22.1377V22.6641H95.1523C95.1706 23.3932 95.3825 23.9834 95.7881 24.4346C96.1982 24.8812 96.7178 25.1045 97.3467 25.1045C97.7933 25.1045 98.1715 25.0133 98.4814 24.8311C98.7913 24.6488 99.0625 24.4072 99.2949 24.1064L100.067 24.708C99.4476 25.6605 98.5179 26.1367 97.2783 26.1367ZM97.1211 19.5059C96.6107 19.5059 96.1823 19.6927 95.8359 20.0664C95.4896 20.4355 95.2754 20.9551 95.1934 21.625H98.8984V21.5293C98.862 20.8867 98.6888 20.39 98.3789 20.0391C98.069 19.6836 97.6497 19.5059 97.1211 19.5059ZM112.625 22.8418C112.502 23.8945 112.112 24.708 111.456 25.2822C110.804 25.8519 109.936 26.1367 108.852 26.1367C107.676 26.1367 106.732 25.7152 106.021 24.8721C105.315 24.029 104.962 22.901 104.962 21.4883V20.5312C104.962 19.6061 105.126 18.7926 105.454 18.0908C105.787 17.389 106.256 16.8512 106.862 16.4775C107.468 16.0993 108.17 15.9102 108.968 15.9102C110.025 15.9102 110.873 16.2064 111.511 16.7988C112.149 17.3867 112.52 18.2025 112.625 19.2461H111.306C111.192 18.4531 110.943 17.8789 110.561 17.5234C110.182 17.168 109.651 16.9902 108.968 16.9902C108.129 16.9902 107.471 17.3001 106.992 17.9199C106.518 18.5397 106.281 19.4215 106.281 20.5654V21.5293C106.281 22.6094 106.507 23.4684 106.958 24.1064C107.409 24.7445 108.04 25.0635 108.852 25.0635C109.581 25.0635 110.139 24.8994 110.526 24.5713C110.918 24.2386 111.178 23.6621 111.306 22.8418H112.625ZM118.791 26C118.718 25.8542 118.659 25.5944 118.613 25.2207C118.025 25.8314 117.324 26.1367 116.508 26.1367C115.779 26.1367 115.179 25.9316 114.71 25.5215C114.245 25.1068 114.013 24.5827 114.013 23.9492C114.013 23.179 114.304 22.582 114.888 22.1582C115.476 21.7298 116.3 21.5156 117.362 21.5156H118.593V20.9346C118.593 20.4925 118.461 20.1416 118.196 19.8818C117.932 19.6175 117.542 19.4854 117.027 19.4854C116.576 19.4854 116.198 19.5993 115.893 19.8271C115.587 20.055 115.435 20.3307 115.435 20.6543H114.163C114.163 20.2852 114.293 19.9297 114.553 19.5879C114.817 19.2415 115.173 18.9681 115.619 18.7676C116.07 18.5671 116.565 18.4668 117.103 18.4668C117.955 18.4668 118.622 18.681 119.105 19.1094C119.589 19.5332 119.839 20.1188 119.857 20.8662V24.2705C119.857 24.9495 119.944 25.4896 120.117 25.8906V26H118.791ZM116.692 25.0361C117.089 25.0361 117.465 24.9336 117.82 24.7285C118.176 24.5234 118.433 24.2568 118.593 23.9287V22.4111H117.602C116.052 22.4111 115.277 22.8646 115.277 23.7715C115.277 24.168 115.41 24.4779 115.674 24.7012C115.938 24.9245 116.278 25.0361 116.692 25.0361ZM123.214 26H121.949V15.5H123.214V26ZM126.618 26H125.354V15.5H126.618V26Z" fill="white" />
        </svg>

      )
    }
    if (val == 'Email') {
      return (
        <svg width="160" height="41" viewBox="0 0 160 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6C0 2.68629 2.68629 0 6 0H154C157.314 0 160 2.68629 160 6V35C160 38.3137 157.314 41 154 41H6C2.6863 41 0 38.3137 0 35V6Z" fill="#3062FF" />
          <path d="M86.7812 21.3994H82.4678V24.9268H87.4785V26H81.1553V16.0469H87.4102V17.127H82.4678V20.3262H86.7812V21.3994ZM90.1035 18.6035L90.1377 19.4238C90.68 18.7858 91.4115 18.4668 92.332 18.4668C93.3665 18.4668 94.0706 18.8633 94.4443 19.6562C94.6904 19.3008 95.0094 19.0137 95.4014 18.7949C95.7979 18.5762 96.265 18.4668 96.8027 18.4668C98.4251 18.4668 99.25 19.3258 99.2773 21.0439V26H98.0127V21.1191C98.0127 20.5905 97.8919 20.1963 97.6504 19.9365C97.4089 19.6722 97.0033 19.54 96.4336 19.54C95.9642 19.54 95.5745 19.6813 95.2646 19.9639C94.9548 20.2419 94.7747 20.6178 94.7246 21.0918V26H93.4531V21.1533C93.4531 20.0778 92.9268 19.54 91.874 19.54C91.0446 19.54 90.4772 19.8932 90.1719 20.5996V26H88.9072V18.6035H90.1035ZM105.758 26C105.685 25.8542 105.626 25.5944 105.58 25.2207C104.992 25.8314 104.29 26.1367 103.475 26.1367C102.745 26.1367 102.146 25.9316 101.677 25.5215C101.212 25.1068 100.979 24.5827 100.979 23.9492C100.979 23.179 101.271 22.582 101.854 22.1582C102.442 21.7298 103.267 21.5156 104.329 21.5156H105.56V20.9346C105.56 20.4925 105.427 20.1416 105.163 19.8818C104.899 19.6175 104.509 19.4854 103.994 19.4854C103.543 19.4854 103.165 19.5993 102.859 19.8271C102.554 20.055 102.401 20.3307 102.401 20.6543H101.13C101.13 20.2852 101.26 19.9297 101.52 19.5879C101.784 19.2415 102.139 18.9681 102.586 18.7676C103.037 18.5671 103.532 18.4668 104.069 18.4668C104.922 18.4668 105.589 18.681 106.072 19.1094C106.555 19.5332 106.806 20.1188 106.824 20.8662V24.2705C106.824 24.9495 106.911 25.4896 107.084 25.8906V26H105.758ZM103.659 25.0361C104.056 25.0361 104.432 24.9336 104.787 24.7285C105.143 24.5234 105.4 24.2568 105.56 23.9287V22.4111H104.568C103.019 22.4111 102.244 22.8646 102.244 23.7715C102.244 24.168 102.376 24.4779 102.641 24.7012C102.905 24.9245 103.244 25.0361 103.659 25.0361ZM110.181 26H108.916V18.6035H110.181V26ZM108.813 16.6416C108.813 16.4365 108.875 16.2633 108.998 16.1221C109.126 15.9808 109.312 15.9102 109.559 15.9102C109.805 15.9102 109.992 15.9808 110.119 16.1221C110.247 16.2633 110.311 16.4365 110.311 16.6416C110.311 16.8467 110.247 17.0176 110.119 17.1543C109.992 17.291 109.805 17.3594 109.559 17.3594C109.312 17.3594 109.126 17.291 108.998 17.1543C108.875 17.0176 108.813 16.8467 108.813 16.6416ZM113.585 26H112.32V15.5H113.585V26Z" fill="white" />
          <path d="M67.75 12H48.25C47.0073 12 46 13.0073 46 14.25V27.75C46 28.9927 47.0073 30 48.25 30H67.75C68.9927 30 70 28.9927 70 27.75V14.25C70 13.0073 68.9927 12 67.75 12ZM67.75 14.25V16.1627C66.699 17.0186 65.0234 18.3495 61.4412 21.1545C60.6518 21.7754 59.0881 23.2672 58 23.2498C56.9121 23.2674 55.3479 21.7752 54.5588 21.1545C50.9772 18.3499 49.3012 17.0188 48.25 16.1627V14.25H67.75ZM48.25 27.75V19.0499C49.3241 19.9054 50.8473 21.1059 53.169 22.9239C54.1935 23.7304 55.9878 25.5108 58 25.5C60.0024 25.5108 61.7739 23.7563 62.8306 22.9243C65.1522 21.1064 66.6759 19.9055 67.75 19.05V27.75H48.25Z" fill="white" />
        </svg>

      )
    }
  }
  console.log("event.target.files uniit  att-sss>", unitLabels);
  return (
    <>
      <CModal
        show={isAddNotesModal}
        centered={true}
        onClose={() => setIsAddNotesModal(false)}
        className="modalTask--body"
      >
        <CForm className="login-form">
          <div className="modal-header">
            <div
              style={{
                alignSelf: "center",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              <img src={SaveIcon} className="m-0 mr-2" /> Add Note
                                            </div>
          </div>

          <div className="modal-body">
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="form-group tasklabel--fill">
                    <div className="field-label">
                      <div
                        style={{
                          alignSelf: "center",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        <img src={notes_title} className="m-0 mr-2" />{" "}
                                  Title
                                </div>
                    </div>
                    <CInput
                      type="text"
                      name="username"
                      className="input-addtaskcontrol"
                      onChange={(e) => setNotesTitle(e.target.value)}
                      value={notesTitle}
                      placeholder="Input Title"
                    />
                    <label
                      className={`error ${errorMsgNotesTitle ? null : "errorFill"
                        } `}
                    >
                      {errorMsgNotesTitle ? errorMsgNotesTitle : ''}
                    </label>
                  </div>
                  <div className="form-group tasklabel--fill">
                    <div className="field-label">
                      <div
                        style={{
                          alignSelf: "center",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        <img
                          src={notes_description}
                          className="m-0 mr-2"
                        />{" "}
                                  Description
                                </div>
                    </div>
                    <textarea
                      id="message"
                      rows="8"
                      cols="50"
                      className="input-txtarea-control input-addtaskcontrol "
                      onChange={(e) =>
                        setNotesDescription(e.target.value)
                      }
                      value={notesDescription}
                      placeholder=" Input Description"
                    ></textarea>
                    <label
                      className={`error ${errorMsgNotesDescription ? null : "errorFill"
                        } `}
                    >
                      {errorMsgNotesDescription ? errorMsgNotesDescription : ''}
                    </label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group tasklabel--fill">
                    <div className="field-label">
                      <div
                        style={{
                          alignSelf: "center",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        Calander
                                </div>
                    </div>
                    <div>
                      <Calendar
                        onChange={onCalanderChange}
                        value={calanderValue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 text-right pt-0">
            <button
              type="button"
              class="button--cancel"
              onClick={() => setIsAddNotesModal(false)}
            >
              Cancel
                      </button>
            <CImg
              src={blueBtn}
              fluid
              className="field-icon choose_action"
              style={{ float: "right", marginTop: "10px" }}
              onClick={handleNotesSubmit}
            />
          </div>
        </CForm>
      </CModal>



      {/* below is the follow up modal */}
      <CModal
        show={isAddFollowUpModal}
        centered={true}
        onClose={() => setIsAddFollowUpModal(false)}
        className="modalTask--body"
      >
        <CForm className="login-form">
          <div className="modal-header">
            <div
              style={{
                alignSelf: "center",
                fontWeight: "600",
                marginLeft: "10px",
              }}
            >
              <img src={SaveIcon} className="m-0 mr-2" /> Add Follow Up
                      </div>
          </div>

          <div className="modal-body">
            <div className="col-12 px-0">
              <div className="row" >
                <div className="col-12 col-lg-6">
                  <div className="form-group tasklabel--fill">
                    <div className="field-label">
                      {/* <div
                        style={{
                          alignSelf: "center",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        <img src={SaveIcon} className="m-0 mr-2" /> Add Note
                      </div> */}
                    </div>

                    <div className="modal-body">
                      <div className="col-12 px-0">
                        <div className="row followup-row" >
                          <div className="col-12 col-lg-12">
                            <div className="form-group tasklabel--fill">
                              <div className="field-label">
                                <div
                                  style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <img src={notes_title} className="m-0 mr-2" />{" "}
                                  Contact
                                </div>
                              </div>
                              <CInput
                                type="text"
                                name="username"
                                className="input-addtaskcontrol"
                                onChange={(e) => setFollowUpContact(e.target.value)}
                                value={followUpContact}
                                placeholder="Auto Fill Contact Name"
                              />
                              <label
                                className={`error ${errorMsgFollowUpContact ? null : "errorFill"
                                  } `}
                              >
                                {errorMsgFollowUpContact ? errorMsgFollowUpContact : ''}
                              </label>
                            </div>
                            <div className="form-group tasklabel--fill">
                              <div className="field-label">
                                <div
                                  style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <img src={notes_title} className="m-0 mr-2" />{" "}
                                  Title
                                </div>
                              </div>
                              <CInput
                                type="text"
                                name="username"
                                className="input-addtaskcontrol"
                                onChange={(e) => setFollowUpTitle(e.target.value)}
                                value={followUpTitle}
                                placeholder="Input Title"
                              />
                              <label
                                className={`error ${errorMsgFollowUpTitle ? null : "errorFill"
                                  } `}
                              >
                                {errorMsgFollowUpTitle ? errorMsgFollowUpTitle : ''}
                              </label>
                            </div>
                            <div className="form-group tasklabel--fill">
                              <div className="field-label">
                                <div
                                  style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <img
                                    src={notes_description}
                                    className="m-0 mr-2"
                                  />{" "}
                                  Description
                                </div>
                              </div>
                              <textarea
                                id="message"
                                rows="8"
                                cols="50"
                                className="input-txtarea-control input-addtaskcontrol "
                                onChange={(e) =>
                                  setFollowUpDescription(e.target.value)
                                }
                                value={followUpDescription}
                                placeholder=" Input Description"
                              ></textarea>
                              <label
                                className={`error ${errorMsgFollowUpDescription ? null : "errorFill"
                                  } `}
                              >
                                {errorMsgFollowUpDescription ? errorMsgFollowUpDescription : ''}
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-lg-12">
                            <div className="form-group text-left">
                              <span><img src={iconData} className="m-0 mr-2" /> Follow Up Item</span>
                            </div>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between border repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="field-icon fillcomn-color active"><path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z"></path></svg>
                                    <div className="employee-field-label">Phone Call</div>
                                  </div>
                                  <input className="choose_action" type="radio" name="radio" onClick={() => setFollowUpItem('Phone Call')}
                                    checked={followUpItem == 'Phone Call' ? true : false} />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="field-icon fillcomn-color"><path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z"></path></svg>
                                    <div className="employee-field-label">Email</div>
                                  </div>
                                  <input className="choose_action" type="radio" name="radio" onClick={() => setFollowUpItem('Email')}
                                    checked={followUpItem == 'Email' ? true : false} />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="field-icon fillcomn-color"><path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z"></path></svg>
                                    <div className="employee-field-label">Follow Ups</div>
                                  </div>
                                  <input className="choose_action" type="radio" name="radio" onClick={() => setFollowUpItem('Follow Ups')}
                                    checked={followUpItem == 'Follow Ups' ? true : false} />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="field-icon fillcomn-color"><path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z"></path></svg>
                                    <div className="employee-field-label">Text Messages</div>
                                  </div>
                                  <input className="choose_action" type="radio" name="radio" onClick={() => setFollowUpItem('Text Messages')}
                                    checked={followUpItem == 'Text Messages' ? true : false} />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="field-icon fillcomn-color"><path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z"></path></svg>
                                    <div className="employee-field-label">Direct Mail</div>
                                  </div>
                                  <input className="choose_action" type="radio" name="radio" onClick={() => setFollowUpItem('Direct Mail')}
                                    checked={followUpItem == 'Direct Mail' ? true : false} />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="field-icon fillcomn-color"><path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z"></path></svg>
                                    <div className="employee-field-label">Schedule Meeting</div>
                                  </div>
                                  <input className="choose_action" type="radio" name="radio" onClick={() => setFollowUpItem('Schedule Meeting')}
                                    checked={followUpItem == 'Schedule Meeting' ? true : false} />
                                </div>
                              </div>
                              <label
                                className={`error ${errorMsgFollowUpItem ? null : "errorFill"
                                  } `}
                              >
                                {errorMsgFollowUpItem ? errorMsgFollowUpItem : ''}
                              </label>
                            </div>
                            <div className="form-group tasklabel--fill">
                              <div className="field-label">
                                <div
                                  style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    marginLeft: "10px",
                                  }}
                                >
                                  Calander
                                </div>
                              </div>
                              <div>
                                <Calendar
                                  onChange={setFollowUpCalander}
                                  value={followUpCalander}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <textarea
                      id="message"
                      rows="8"
                      cols="50"
                      className="input-txtarea-control input-addtaskcontrol "
                      onChange={(e) =>
                        setNotesDescription(e.target.value)
                      }
                      value={notesDescription}
                      placeholder=" Input Description"
                    ></textarea>
                    <label
                      className={`error ${errorMsgNotesDescription ? null : "errorFill"
                        } `}
                    >
                      {errorMsgNotesDescription ? errorMsgNotesDescription : ''}
                    </label> */}
                  </div>
                </div>
                {/* <div className="col-12 col-lg-6">
                  <div className="form-group tasklabel--fill">
                    <div className="field-label">
                      <div
                        style={{
                          alignSelf: "center",
                          fontWeight: "600",
                          marginLeft: "10px",
                        }}
                      >
                        Calander
                                </div>
                    </div>
                    <div>
                      <Calendar
                        onChange={onCalanderChange}
                        value={calanderValue}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 text-right pt-0">
            <button
              type="button"
              class="button--cancel"
              onClick={() => setIsAddNotesModal(false)}
            >
              Cancel
                      </button>
            <CImg
              src={blueBtn}
              fluid
              className="field-icon choose_action"
              style={{ float: "right", marginTop: "10px" }}
              onClick={handleFollowUpSubmit}
            />
          </div>
        </CForm>
      </CModal>
      <div className="bgwhite mx-0">
        <div className="row">
          <div className="col-12 col-md-5 px-2">
            <div className="cardBox mb-3">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={PropetyName} />
                  Property Name
                </h3>
              </div>
              <div className="create-employee-wrapper border px-0 py-3">
                <div className="form-group col-12 mb-0">
                  <label className="textaprt-label">{propertyName}</label>
                </div>
              </div>
            </div>
            <div className="cardBox mb-3">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={StatusWhite} />
                  Property Status
                </h3>
              </div>
              <div className="create-employee-wrapper border px-0 py-3">
                <div className="form-group col-12 mb-0">
                  <div className="row">
                    <div className="col-12 col-md-6 pr-2">
                      <div
                        className={`d-flex justify-content-between ${propertyStatus == 1 ? "border" : null
                          } repccur-box align-items-center`}
                      >
                        <div className="re-occuring">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`field-icon fillcomn-color ${propertyStatus == 1 ? "active" : null
                              }`}
                          >
                            <path d="M23.7446 14.903C23.2881 14.2321 22.3688 14.0545 21.6959 14.5068L18.633 16.5565L18.6241 10.1764L19.6882 11.1732C19.9145 11.3851 20.2095 11.5017 20.5192 11.5017C20.5198 11.5017 20.5205 11.5017 20.5211 11.5017C20.8555 11.5013 21.1784 11.3611 21.4069 11.1171C21.629 10.8801 21.7455 10.5708 21.7349 10.2461C21.7243 9.92148 21.5879 9.62041 21.3508 9.39836L19.3335 7.50864C19.1955 7.37927 18.9787 7.38634 18.8493 7.52444C18.72 7.66253 18.7271 7.87928 18.8651 8.00866L20.8824 9.89838C20.9859 9.99531 21.0454 10.1267 21.0501 10.2685C21.0547 10.4102 21.0038 10.5452 20.9069 10.6487C20.8056 10.7568 20.6683 10.8164 20.52 10.8166C20.5198 10.8166 20.5195 10.8166 20.5192 10.8166C20.3841 10.8166 20.2553 10.7657 20.1566 10.6731C20.1565 10.6731 20.1565 10.6731 20.1565 10.6731L12.1464 3.16938C12.0144 3.04577 11.809 3.04595 11.6774 3.17003L3.68808 10.6962C3.58491 10.7934 3.45 10.8443 3.30825 10.8404C3.1665 10.8362 3.03492 10.777 2.9377 10.6737C2.84048 10.5705 2.78925 10.4356 2.79352 10.2939C2.79773 10.1522 2.85694 10.0206 2.96011 9.92336L11.5465 1.8347C11.7501 1.64294 12.0694 1.64247 12.2734 1.83372L17.2969 6.53959C17.4349 6.66892 17.6517 6.66189 17.7811 6.5238C17.9104 6.3857 17.9033 6.16895 17.7653 6.03958L12.7419 1.3337C12.2744 0.895704 11.543 0.896689 11.0767 1.336L8.32805 3.92538L8.3273 3.46352C8.32711 3.31792 8.2702 3.18114 8.16712 3.07839C8.06423 2.97578 7.92764 2.9193 7.78233 2.9193C7.78205 2.9193 7.78181 2.9193 7.78153 2.9193L5.81527 2.92206C5.66967 2.92225 5.53294 2.97916 5.43014 3.08224C5.32739 3.18531 5.27086 3.32224 5.27109 3.46788L5.27653 6.80008L2.49033 9.42475C2.25389 9.64745 2.11838 9.94891 2.10867 10.2736C2.09897 10.5982 2.2163 10.9072 2.439 11.1436C2.66166 11.38 2.96311 11.5156 3.28781 11.5253C3.30023 11.5256 3.31266 11.5258 3.32508 11.5258C3.63609 11.5258 3.93061 11.4091 4.15791 11.1949L5.21958 10.1948L5.2238 13.2084C4.8803 13.1584 4.53277 13.1321 4.18364 13.1321H3.59747V12.9267C3.59747 12.2372 3.03642 11.6761 2.34684 11.6761H1.25063C0.561047 11.6761 0 12.2371 0 12.9267V18.2947C0 18.4839 0.153375 18.6373 0.342562 18.6373C0.53175 18.6373 0.685125 18.4839 0.685125 18.2947V12.9267C0.685125 12.6149 0.938812 12.3612 1.25063 12.3612H2.3468C2.65861 12.3612 2.9123 12.6149 2.9123 12.9267V13.4747V20.4963V21.0389C2.9123 21.3507 2.65861 21.6044 2.3468 21.6044H1.25063C0.938812 21.6044 0.685125 21.3507 0.685125 21.0389V20.4395C0.685125 20.2503 0.53175 20.0969 0.342562 20.0969C0.153375 20.0969 0 20.2503 0 20.4395V21.0389C0 21.7285 0.561047 22.2895 1.25063 22.2895H2.3468C3.03638 22.2895 3.59742 21.7285 3.59742 21.0389V20.9924L8.61417 22.8921C8.62345 22.8956 8.63287 22.8987 8.64244 22.9014C8.86055 22.963 9.07856 22.9939 9.29381 22.9939C9.41025 22.9939 9.52589 22.9848 9.64036 22.9667L17.0129 21.904C17.0146 21.9038 17.0163 21.9035 17.0181 21.9032C17.6449 21.8031 18.2362 21.5381 18.7281 21.137C18.7323 21.1335 18.7365 21.1299 18.7406 21.1262L23.5036 16.8424C24.0583 16.35 24.1619 15.5162 23.7446 14.903ZM7.64236 3.60466L7.64395 4.56981L5.96058 6.15559L5.95641 3.60695L7.64236 3.60466ZM11.9129 3.88938L17.9381 9.53369L17.9485 17.0146L16.9786 17.6637L15.9516 17.6061L15.9244 17.3333C15.8288 16.3725 15.1195 15.5995 14.1816 15.4151L14.1754 10.9645C14.175 10.623 13.8969 10.3455 13.5554 10.3455C13.5551 10.3455 13.5549 10.3455 13.5546 10.3455L10.2895 10.3501C10.1239 10.3503 9.9683 10.415 9.85139 10.5323C9.73444 10.6495 9.67017 10.8053 9.67041 10.9709L9.67584 14.8512C9.02911 14.7034 8.41158 14.4592 7.83422 14.1215C7.76217 14.0793 7.68942 14.0387 7.61606 13.9991C7.58747 13.9837 7.55841 13.9692 7.52958 13.9541C7.48495 13.9308 7.44042 13.9074 7.39533 13.885C7.35942 13.8672 7.32309 13.8504 7.28691 13.8332C7.24852 13.8149 7.21017 13.7965 7.1715 13.7789C7.13213 13.7611 7.09242 13.744 7.05277 13.7269C7.01653 13.7112 6.9803 13.6955 6.94383 13.6804C6.90305 13.6636 6.86203 13.6474 6.82097 13.6314C6.78455 13.6171 6.74808 13.603 6.71147 13.5893C6.67083 13.5741 6.63 13.5594 6.58908 13.545C6.55069 13.5315 6.51225 13.5182 6.47363 13.5054C6.43444 13.4923 6.39516 13.4795 6.35569 13.4671C6.31364 13.4538 6.27141 13.4411 6.22913 13.4286C6.1928 13.4179 6.15652 13.4073 6.12 13.3971C6.07233 13.3839 6.02442 13.3714 5.97647 13.3592C5.95402 13.3534 5.9317 13.3469 5.90911 13.3413L5.90381 9.55014L11.9129 3.88938ZM13.4964 15.3294L10.6312 14.9995L10.3612 14.9684L10.3557 11.0351L13.4904 11.0307L13.4964 15.3294ZM23.0472 16.3316L18.2888 20.6112C17.8923 20.9327 17.4167 21.1454 16.9125 21.2263L9.54319 22.2886C9.54164 22.2888 9.54014 22.289 9.53859 22.2893L9.53348 22.2901C9.31022 22.3254 9.07772 22.3105 8.84236 22.2459L3.59747 20.2597V13.8172H4.18364C4.68262 13.8172 5.17823 13.8748 5.66086 13.9867C5.67881 13.9909 5.69672 13.9952 5.71463 13.9995C5.77392 14.0138 5.83308 14.0285 5.89195 14.0444C5.89711 14.0458 5.90222 14.0473 5.90738 14.0487C5.96639 14.0649 6.02517 14.0819 6.08377 14.0996C6.09427 14.1028 6.10481 14.106 6.11527 14.1092C6.17761 14.1285 6.23967 14.1486 6.30141 14.1697C6.30778 14.1719 6.31411 14.1741 6.32048 14.1763C6.44906 14.2207 6.57638 14.2691 6.70209 14.3215C6.70894 14.3244 6.71578 14.3273 6.72262 14.3302C6.7853 14.3565 6.84759 14.3837 6.90947 14.4121C6.91111 14.4128 6.9128 14.4136 6.91444 14.4144C6.97425 14.4419 7.03364 14.4704 7.09266 14.4997C7.09959 14.5031 7.10658 14.5065 7.11352 14.5099C7.17117 14.5388 7.22836 14.5686 7.28522 14.5992C7.29595 14.605 7.30664 14.6109 7.31738 14.6167C7.37475 14.6479 7.4318 14.6798 7.48828 14.7129C8.30348 15.1897 9.19092 15.4986 10.126 15.6309C10.1289 15.6313 10.1318 15.6317 10.1348 15.632L13.973 16.0739C13.9942 16.077 14.0153 16.0805 14.0363 16.0844C14.6013 16.1905 15.0473 16.6081 15.1965 17.1518C15.2186 17.2323 15.2341 17.3156 15.2427 17.4011L15.2579 17.5544L8.06447 16.9241C7.87613 16.9077 7.70981 17.047 7.69331 17.2355C7.67677 17.424 7.81622 17.5901 8.00466 17.6066L15.6097 18.273C15.6116 18.2731 15.6134 18.2731 15.6151 18.2732C15.6169 18.2733 15.6187 18.2736 15.6205 18.2738L17.0547 18.3542C17.0611 18.3546 17.0675 18.3548 17.0739 18.3548C17.0807 18.3548 17.0874 18.3537 17.0941 18.3533C17.1018 18.3528 17.1094 18.3525 17.117 18.3516C17.1272 18.3503 17.1372 18.3481 17.1473 18.3459C17.1544 18.3443 17.1616 18.3431 17.1687 18.341C17.1796 18.3379 17.1902 18.3336 17.2008 18.3294C17.2065 18.3271 17.2125 18.3253 17.2181 18.3227C17.2341 18.3153 17.2496 18.3068 17.2644 18.2968L18.4819 17.4821C18.4819 17.482 18.482 17.482 18.482 17.482L22.0774 15.0758C22.4392 14.8326 22.9329 14.928 23.1781 15.2884C23.4023 15.6177 23.3467 16.0656 23.0472 16.3316Z" />
                          </svg>
                          <div className="employee-field-label">Held</div>
                        </div>
                        <input
                          className="choose_action"
                          type="radio"
                          name="radio"
                          onClick={() => setPropertyStatus(1)}
                          checked={propertyStatus == 1 ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 pl-2">
                      <div
                        className={`d-flex justify-content-between ${propertyStatus == 2 ? "border" : null
                          } repccur-box align-items-center`}
                      >
                        <div className="re-occuring">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="field-icon fillcomn-color"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`field-icon fillcomn-color ${propertyStatus == 2 ? "active" : null
                              }`}
                          >
                            <path d="M23.6188 2.35611V0.369586C23.6188 0.161694 23.4571 0 23.2492 0H0.75069C0.542797 0 0.381104 0.161694 0.381104 0.369586V23.6304C0.381104 23.8383 0.542797 24 0.75069 24H2.89891C3.1068 24 3.2685 23.8383 3.2685 23.6304V2.7257H8.05002V4.85082H7.07985C6.04039 4.85082 5.18572 5.70549 5.18572 6.74495V13.1434C5.18572 14.1829 6.04039 15.0375 7.07985 15.0375H21.7247C22.7642 15.0375 23.6188 14.1829 23.6188 13.1434V6.72185C23.6188 5.68239 22.7642 4.82772 21.7247 4.82772H20.7545V2.7026H23.2492V2.7257C23.4571 2.7257 23.6188 2.564 23.6188 2.35611ZM21.7247 5.56689C22.3715 5.56689 22.8797 6.09817 22.8797 6.72185V13.1434C22.8797 13.7902 22.3484 14.2984 21.7247 14.2984H7.05675C6.40998 14.2984 5.9018 13.7671 5.9018 13.1434V6.72185C5.9018 6.07507 6.43308 5.56689 7.05675 5.56689H21.7247ZM8.74299 4.85082V2.7257H20.0154V4.85082H8.74299ZM22.8797 1.98653H20.7545C20.7314 1.82483 20.5928 1.68624 20.4081 1.68624C20.2233 1.68624 20.0847 1.82483 20.0616 1.98653H8.74299C8.71989 1.82483 8.5813 1.68624 8.3965 1.68624C8.21171 1.68624 8.07311 1.82483 8.05002 1.98653H2.89891C2.69102 1.98653 2.52932 2.14822 2.52932 2.35611V23.2608H1.12028V0.716073H22.8797V1.98653Z" />
                            <path d="M11.1224 9.95573C11.03 9.81713 10.9145 9.72474 10.7759 9.63234C10.6373 9.56304 10.4063 9.47065 10.106 9.40135C9.80572 9.33205 9.59783 9.26276 9.52853 9.19346C9.45924 9.14726 9.43614 9.07796 9.43614 9.00867C9.43614 8.93937 9.45924 8.87007 9.52853 8.82387C9.62093 8.75457 9.78262 8.70838 9.96742 8.70838C10.1522 8.70838 10.2677 8.75457 10.3601 8.82387C10.4525 8.89317 10.4987 9.00867 10.5218 9.17036L11.1455 9.14726C11.1455 8.87007 11.03 8.63908 10.8452 8.45429C10.6373 8.29259 10.3601 8.2002 9.96742 8.2002C9.73643 8.2002 9.52853 8.24639 9.34374 8.31569C9.18205 8.38499 9.04345 8.50048 8.95106 8.63908C8.85866 8.77767 8.81246 8.91627 8.81246 9.07796C8.81246 9.33205 8.90486 9.53995 9.08965 9.70164C9.22825 9.81713 9.45924 9.93263 9.80572 10.0019C10.0598 10.0712 10.2446 10.1174 10.3139 10.1405C10.4294 10.1867 10.4987 10.2329 10.5449 10.2791C10.5911 10.3253 10.6142 10.3946 10.6142 10.4639C10.6604 10.5563 10.5911 10.6487 10.4987 10.7411C10.4063 10.8335 10.2446 10.8797 10.0367 10.8797C9.85192 10.8797 9.69023 10.8335 9.57473 10.7411C9.45924 10.6487 9.38994 10.487 9.34374 10.2791L8.74316 10.3484C8.78936 10.6949 8.90486 10.9721 9.11275 11.1338C9.32064 11.3186 9.62093 11.411 10.0136 11.411C10.2908 11.411 10.4987 11.3648 10.6835 11.2955C10.8683 11.2262 11.0069 11.1107 11.0993 10.949C11.1917 10.7873 11.2379 10.6256 11.2379 10.4408C11.2379 10.2329 11.1917 10.0712 11.1224 9.95573Z" />
                            <path d="M13.3862 8.22339H12.7163L11.5151 11.3418H12.185L12.416 10.6257H13.6634L13.9405 11.3418H14.6335L13.3862 8.22339ZM12.6239 10.1175L13.0397 8.96256L13.4786 10.1175H12.6239Z" />
                            <path d="M15.6036 10.8101V8.24609H14.9568V11.3414H17.1512V10.8101H15.6036Z" />
                            <path d="M18.237 10.8105V9.97892H19.7846V9.44764H18.237V8.75467H19.9232V8.22339H17.6133V11.3418H19.9694V10.8105H18.237Z" />
                          </svg>
                          <div className="employee-field-label">For Sale</div>
                        </div>
                        <input
                          className="choose_action"
                          type="radio"
                          name="radio"
                          onClick={() => setPropertyStatus(2)}
                          checked={propertyStatus == 2 ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div
                        className={`d-flex justify-content-between ${propertyStatus == 3 ? "border" : null
                          } repccur-box align-items-center`}
                      >
                        <div className="re-occuring">
                          <svg
                            className="field-icon fillcomn-color"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`field-icon fillcomn-color ${propertyStatus == 3 ? "active" : null
                              }`}
                          >
                            <path d="M19.2879 16.0002C19.2879 15.7784 19.2213 15.5521 19.0794 15.3702L17.9259 13.8929C17.7307 13.6489 17.4379 13.5203 17.1451 13.5203C16.9721 13.5203 16.7902 13.5646 16.635 13.6622L15.5037 14.3676C15.3839 14.443 15.1843 14.4963 14.9846 14.4918C14.8338 14.4918 14.683 14.4608 14.5898 14.412L13.4852 13.8796C13.3077 13.7953 13.1081 13.7598 12.9084 13.7598C12.6201 13.7598 12.3317 13.8308 12.0966 13.995L11.9679 14.0837C11.8659 14.0304 11.7062 13.955 11.5287 13.8663C11.3158 13.7598 11.0629 13.7199 10.81 13.7199C10.5794 13.7199 10.3531 13.7554 10.149 13.8397L9.39929 14.1591C9.27507 14.2123 9.08431 14.2478 8.88911 14.2478C8.69391 14.2478 8.50315 14.2123 8.37893 14.1591L7.62476 13.8397C7.48723 13.782 7.34083 13.7554 7.19443 13.7554C7.02585 13.7554 6.86171 13.7864 6.70644 13.853C6.55116 13.9151 6.4092 14.0083 6.29386 14.1369L4.92303 15.6719C4.77219 15.8405 4.69678 16.0534 4.69678 16.2664C4.69678 16.5148 4.80325 16.7677 5.01176 16.9451L6.28942 18.0365L5.68164 18.6664C5.51306 18.8394 5.43321 19.0657 5.43321 19.2919C5.43321 19.5315 5.52637 19.7711 5.7127 19.9485L5.83692 20.0639C5.95226 20.1748 6.08979 20.2457 6.23619 20.2812C6.1652 20.4143 6.12528 20.5607 6.12528 20.7116C6.12528 20.9511 6.21844 21.1907 6.40477 21.3681L6.52898 21.4835C6.70644 21.6476 6.93269 21.7319 7.15451 21.7319C7.27429 21.7319 7.39407 21.7097 7.50941 21.6609C7.54934 21.8206 7.62919 21.9759 7.76228 22.1001L7.8865 22.2155C8.06395 22.3796 8.29021 22.4639 8.51202 22.4639C8.68948 22.4639 8.86249 22.4107 9.01777 22.3131C9.06213 22.455 9.13755 22.5926 9.25289 22.7035L9.37711 22.8188C9.55013 22.983 9.78082 23.0673 10.0026 23.0673C10.2422 23.0673 10.4818 22.9741 10.6592 22.7878L11.196 22.2288L11.9236 22.9031C12.0966 23.0628 12.3228 23.1471 12.5402 23.1427C12.7842 23.1427 13.0282 23.0451 13.2057 22.8543L13.321 22.7301C13.423 22.6236 13.4852 22.495 13.5251 22.3619L13.809 22.6236C13.982 22.7833 14.2083 22.8632 14.4257 22.8632C14.6697 22.8632 14.9137 22.7656 15.0911 22.5748L15.2065 22.4506C15.3395 22.3086 15.415 22.1312 15.4371 21.9493C15.5126 21.967 15.588 21.9804 15.6634 21.9804C15.9074 21.9804 16.1514 21.8828 16.3288 21.692L16.4442 21.5678C16.6039 21.3948 16.6882 21.1729 16.6882 20.9511C16.6882 20.8846 16.6793 20.8136 16.6616 20.7471C16.8612 20.7204 17.0564 20.6317 17.2072 20.472L17.3226 20.3478C17.4823 20.1748 17.5666 19.9529 17.5666 19.7311C17.5666 19.4916 17.469 19.2476 17.2782 19.0701L17.0608 18.8705L19.0217 16.7011C19.208 16.5015 19.2879 16.2486 19.2879 16.0002ZM6.47575 19.811C6.37371 19.811 6.27168 19.7755 6.19182 19.7001L6.0676 19.5847C5.98331 19.5049 5.93895 19.3984 5.93895 19.2875C5.93895 19.1855 5.97444 19.0834 6.0543 19.0036L7.29647 17.7082C7.37632 17.6239 7.48723 17.5795 7.5937 17.5795C7.69574 17.5795 7.79777 17.615 7.87763 17.6904L8.00185 17.8058C8.00185 17.8058 8.1305 17.9921 8.1305 18.103C8.1305 18.1873 8.10388 18.2671 8.05508 18.3337C8.05065 18.3381 6.71531 19.7311 6.71531 19.7311C6.64433 19.7844 6.56004 19.811 6.47575 19.811ZM7.46505 21.102C7.3852 21.1862 7.27872 21.2262 7.16782 21.2262C7.06578 21.2262 6.96374 21.1907 6.88389 21.1153L6.75967 20.9999C6.67538 20.9201 6.63102 20.8136 6.63102 20.7027C6.63102 20.6007 6.66651 20.4986 6.74193 20.4188C6.74193 20.4188 8.39668 18.6975 8.40999 18.6797C8.48984 18.6043 8.59188 18.5644 8.69391 18.5644C8.79595 18.5644 8.89798 18.5999 8.97784 18.6753L9.10206 18.7906C9.18635 18.8705 9.23071 18.977 9.23071 19.0879C9.23071 19.1899 9.19522 19.2919 9.11537 19.3718L7.46505 21.102ZM8.82257 21.834C8.74271 21.9182 8.63624 21.9582 8.52533 21.9626C8.4233 21.9626 8.32126 21.9271 8.24141 21.8517L8.11719 21.7364C8.0329 21.6565 7.98854 21.55 7.98854 21.4391C7.98854 21.346 8.01959 21.2572 8.0817 21.1818L9.23515 19.9796C9.315 19.9086 9.40816 19.8731 9.5102 19.8731C9.61224 19.8731 9.71427 19.9086 9.79413 19.984L9.91834 20.0993C10.0026 20.1792 10.047 20.2857 10.047 20.3966C10.047 20.4986 10.0071 20.6007 9.93165 20.6805L8.82257 21.834ZM11.0097 21.7053L10.3132 22.4373C10.2333 22.5216 10.1269 22.5615 10.0159 22.5659C9.91391 22.5659 9.81187 22.5305 9.73202 22.455L9.6078 22.3397C9.52351 22.2598 9.47915 22.1534 9.47915 22.0425C9.47915 21.9404 9.51464 21.8384 9.59449 21.7585L10.2954 21.031C10.3753 20.9467 10.4862 20.9068 10.5927 20.9023C10.6947 20.9023 10.7967 20.9378 10.8766 21.0132L11.0008 21.1286C11.0851 21.2084 11.1295 21.3149 11.1295 21.4258C11.125 21.5278 11.0851 21.6254 11.0097 21.7053ZM17.083 19.7267C17.083 19.8287 17.0475 19.9263 16.9721 20.0062L16.8568 20.1304C16.7769 20.2147 16.666 20.2591 16.5551 20.2591C16.4531 20.2591 16.3555 20.2236 16.2756 20.1481L14.3236 18.3426L13.9865 18.7019L16.076 20.6361C16.1647 20.716 16.2046 20.8269 16.2091 20.9378C16.2091 21.0399 16.1736 21.1374 16.0982 21.2173L15.9828 21.3415C15.903 21.4258 15.792 21.4702 15.6811 21.4702C15.5791 21.4702 15.4771 21.4347 15.4017 21.3593L13.4497 19.5537L13.1125 19.913L14.8471 21.5145C14.9314 21.5944 14.9713 21.7009 14.9713 21.8118C14.9713 21.9138 14.9358 22.0114 14.8604 22.0913L14.7451 22.2155C14.6652 22.2998 14.5543 22.3441 14.4434 22.3441C14.3414 22.3441 14.2393 22.3086 14.1639 22.2332L12.4337 20.6361L12.0966 20.9999L12.101 21.0044L12.9661 21.8029C13.0415 21.8828 13.0814 21.9848 13.0814 22.0868C13.0814 22.1889 13.046 22.2865 12.9705 22.3663L12.8552 22.4905C12.7753 22.5748 12.6644 22.6192 12.5535 22.6192C12.4515 22.6192 12.3539 22.5837 12.274 22.5083L11.5199 21.8118C11.5864 21.6831 11.6219 21.5412 11.6219 21.4036C11.6219 21.1641 11.5287 20.9245 11.3424 20.7471L11.2182 20.6317C11.0452 20.4676 10.8145 20.3833 10.5927 20.3833C10.5749 20.3833 10.5572 20.3877 10.5394 20.3877C10.5394 20.3833 10.5394 20.3788 10.5394 20.3744C10.5394 20.1348 10.2599 19.7178 10.2599 19.7178L10.1357 19.6025C10.0026 19.4783 9.84292 19.4028 9.67878 19.3674C9.71427 19.2698 9.73202 19.1677 9.73202 19.0701C9.73202 18.8306 9.63885 18.591 9.45253 18.4135L9.32831 18.2982C9.15086 18.1341 8.9246 18.0498 8.70279 18.0498C8.67617 18.0498 8.64955 18.0542 8.62293 18.0586C8.61406 17.8324 8.52533 17.6017 8.34344 17.4331L8.21923 17.3178C8.04177 17.1492 7.81552 17.0693 7.5937 17.0693C7.35414 17.0693 7.11458 17.1625 6.93713 17.3488L6.64433 17.6549L5.34448 16.5636C5.25132 16.4837 5.20252 16.3728 5.20252 16.2619C5.20252 16.1688 5.23357 16.0756 5.30455 15.9957L6.67538 14.4608C6.72862 14.3987 6.80847 14.3454 6.90607 14.3055C6.99923 14.2656 7.10571 14.2478 7.20774 14.2478C7.29647 14.2478 7.37632 14.2656 7.44287 14.2922L8.19261 14.6116C8.40555 14.7003 8.64955 14.7358 8.89799 14.7403C9.14642 14.7403 9.39042 14.7048 9.60336 14.6116L10.3531 14.2922C10.4684 14.2434 10.6459 14.2123 10.8189 14.2123C11.0097 14.2123 11.2049 14.2523 11.3158 14.3099C11.3868 14.3454 11.4533 14.3809 11.5154 14.412L10.7479 14.9443C10.4995 15.1173 10.3708 15.3924 10.3708 15.6719C10.3708 15.8538 10.4285 16.0445 10.5483 16.1998L10.6503 16.3373C10.8411 16.5946 11.1428 16.7233 11.44 16.7233C11.6086 16.7233 11.7816 16.6789 11.9369 16.5902L12.3938 16.3152C12.487 16.2575 12.6289 16.222 12.7753 16.222C12.9484 16.222 13.1214 16.2708 13.2234 16.3462L14.4922 17.2557C14.7761 17.4597 15.2331 17.8324 15.4904 18.0675L16.9588 19.425C17.0387 19.5049 17.083 19.6158 17.083 19.7267ZM18.6624 16.364L16.7059 18.5244L15.8187 17.7037C15.5392 17.4464 15.0822 17.0738 14.7761 16.852L13.5073 15.9425C13.2944 15.7917 13.0282 15.7251 12.7709 15.7251C12.5491 15.7251 12.3273 15.7739 12.1321 15.8893L11.6751 16.1643C11.6041 16.2087 11.5199 16.2264 11.4356 16.2264C11.2803 16.2264 11.1295 16.1554 11.0407 16.0401L10.9387 15.9026C10.8855 15.8316 10.8588 15.7473 10.8588 15.6674C10.8588 15.5432 10.9165 15.4235 11.0274 15.3436L12.3805 14.3898C12.4959 14.3055 12.7044 14.2434 12.904 14.2478C13.0415 14.2478 13.1746 14.2744 13.2633 14.3188L14.368 14.8512C14.5543 14.9399 14.7673 14.9798 14.9802 14.9798C15.2553 14.9798 15.5303 14.9177 15.761 14.7802L16.8878 14.0792C16.9588 14.0349 17.0475 14.0127 17.1363 14.0127C17.2871 14.0127 17.4424 14.0792 17.5267 14.1946L18.6801 15.6719C18.7466 15.7562 18.7866 15.876 18.7866 16.0002C18.7954 16.1421 18.7466 16.2752 18.6624 16.364Z" />
                            <path d="M12.5231 23.2086C12.2924 23.2086 12.0573 23.1155 11.8798 22.9513L11.2011 22.3214L10.7086 22.8315C10.5223 23.0267 10.2739 23.1332 10.0033 23.1332C9.75482 23.1332 9.51083 23.0356 9.33337 22.867L9.20916 22.7517C9.11156 22.6585 9.03614 22.5432 8.9829 22.4101C8.8365 22.4899 8.67236 22.5299 8.51265 22.5299C8.26422 22.5299 8.02909 22.4367 7.84276 22.2637L7.71855 22.1483C7.6032 22.0419 7.51891 21.9043 7.46568 21.7491C7.36808 21.7801 7.26161 21.7979 7.15513 21.7979C6.9067 21.7979 6.67157 21.7047 6.48525 21.5317L6.36103 21.4163C6.16583 21.23 6.05936 20.9816 6.05936 20.711C6.05936 20.5779 6.08598 20.4492 6.14365 20.3206C6.01056 20.2762 5.89521 20.2052 5.79318 20.1076L5.66896 19.9923C5.47376 19.806 5.36729 19.5575 5.36729 19.2869C5.36729 19.0296 5.46045 18.79 5.63347 18.617L6.19245 18.0403L4.96802 16.9933C4.75508 16.8114 4.63086 16.5452 4.63086 16.2658C4.63086 16.0306 4.71515 15.8044 4.87486 15.6269L6.24568 14.092C6.36103 13.9633 6.51186 13.8613 6.68488 13.7903C6.84459 13.7237 7.01761 13.6883 7.1995 13.6883C7.3592 13.6883 7.51448 13.7193 7.65644 13.777L8.41062 14.0964C8.5304 14.1496 8.71672 14.1807 8.89418 14.1807C9.07163 14.1807 9.25795 14.1496 9.37774 14.0964L10.1275 13.777C10.3271 13.6927 10.5578 13.6528 10.8151 13.6528C11.1079 13.6528 11.3608 13.706 11.5648 13.808C11.6403 13.848 11.7157 13.8834 11.7822 13.9145C11.8532 13.95 11.9153 13.981 11.9686 14.0077L12.0662 13.9411C12.2968 13.7814 12.5896 13.6927 12.9179 13.6927C13.1442 13.6927 13.3483 13.7371 13.5213 13.8169L14.6259 14.3493C14.7102 14.3936 14.8566 14.4247 14.9897 14.4247C15.1672 14.4291 15.3579 14.3848 15.4733 14.3093L16.6045 13.604C16.7598 13.5064 16.955 13.4531 17.1502 13.4531C17.4785 13.4531 17.7802 13.5995 17.9842 13.8524L19.1377 15.3297C19.2796 15.5116 19.3595 15.7511 19.3595 15.9996C19.3595 16.2835 19.2575 16.5497 19.0756 16.7449L17.1591 18.8655L17.3276 19.0207C17.5228 19.2026 17.6382 19.4644 17.6382 19.7305C17.6382 19.9745 17.545 20.2097 17.3764 20.3916L17.2611 20.5158C17.1236 20.6622 16.9461 20.7598 16.7465 20.7997C16.7554 20.8485 16.7598 20.9017 16.7598 20.9505C16.7598 21.1945 16.6666 21.4297 16.4981 21.6115L16.3827 21.7358C16.2008 21.931 15.9391 22.0463 15.6685 22.0463C15.6152 22.0463 15.562 22.0419 15.4954 22.0286C15.4599 22.206 15.3801 22.3657 15.2603 22.4944L15.145 22.6186C14.9631 22.8138 14.7013 22.9291 14.4307 22.9291C14.1867 22.9291 13.9472 22.836 13.7697 22.6718L13.5612 22.4811C13.5168 22.5964 13.4547 22.694 13.3749 22.7783L13.2595 22.9025C13.0776 23.0977 12.8159 23.2131 12.5453 23.2131C12.5364 23.2086 12.5275 23.2086 12.5231 23.2086ZM11.1922 22.135L11.9686 22.8537C12.1238 23.0001 12.3368 23.08 12.5364 23.0755C12.7715 23.0755 12.9978 22.9779 13.1531 22.8094L13.2684 22.6851C13.3527 22.5964 13.4148 22.4855 13.4592 22.3435L13.4902 22.2415L13.854 22.5742C14.0048 22.7162 14.2133 22.796 14.4263 22.796C14.6614 22.796 14.8832 22.6984 15.0429 22.5299L15.1583 22.4056C15.2781 22.2814 15.349 22.1173 15.3712 21.9398L15.3801 21.8644L15.4511 21.8822C15.5354 21.9043 15.6019 21.9132 15.664 21.9132C15.8991 21.9132 16.121 21.8156 16.2807 21.647L16.396 21.5228C16.5424 21.3631 16.6223 21.1635 16.6223 20.9505C16.6223 20.8884 16.6134 20.8219 16.6001 20.7642L16.5823 20.6932L16.6578 20.6843C16.8574 20.6577 17.0304 20.569 17.1635 20.4315L17.2788 20.3073C17.4252 20.1476 17.5051 19.9479 17.5051 19.735C17.5051 19.5043 17.4075 19.2825 17.2389 19.1228L16.9727 18.8788L18.978 16.6606C19.182 16.4388 19.2264 16.1815 19.2264 16.004C19.2264 15.7866 19.1554 15.5737 19.0312 15.414L17.8778 13.9367C17.7047 13.7193 17.4297 13.5907 17.1502 13.5907C16.9772 13.5907 16.8086 13.6395 16.6755 13.7237L15.5442 14.4291C15.4067 14.5178 15.1938 14.5666 14.9897 14.5622C14.83 14.5622 14.6703 14.5267 14.5638 14.4735L13.4592 13.9411C13.2995 13.8657 13.1176 13.8258 12.9135 13.8258C12.6163 13.8258 12.3501 13.9012 12.1416 14.0476L11.9774 14.1585L11.9419 14.1408C11.8843 14.1097 11.8088 14.0742 11.7246 14.0343C11.658 14.0032 11.5826 13.9633 11.5027 13.9278C11.3164 13.8347 11.0857 13.7903 10.8151 13.7903C10.5755 13.7903 10.3626 13.8302 10.1807 13.9056L9.43097 14.225C9.29345 14.2827 9.09381 14.3182 8.89418 14.3182C8.69454 14.3182 8.49491 14.2827 8.35738 14.225L7.6032 13.9056C7.47898 13.8524 7.34146 13.8258 7.1995 13.8258C7.03535 13.8258 6.88008 13.8568 6.73812 13.9189C6.58285 13.981 6.45419 14.0698 6.34772 14.1851L4.97689 15.7201C4.8438 15.8709 4.76839 16.0661 4.76839 16.2702C4.76839 16.5098 4.87486 16.7404 5.06118 16.9002L6.39208 18.0359L5.73551 18.7146C5.58911 18.8655 5.50482 19.074 5.50482 19.2958C5.50482 19.5309 5.59798 19.7438 5.76212 19.9036L5.88634 20.0189C5.98838 20.1165 6.11259 20.1875 6.25456 20.2185L6.33885 20.2407L6.29892 20.3161C6.23238 20.4448 6.19688 20.5779 6.19688 20.7154C6.19688 20.9505 6.29005 21.1635 6.45419 21.3232L6.57841 21.4385C6.73812 21.5894 6.94662 21.6692 7.15957 21.6692C7.27491 21.6692 7.38582 21.647 7.48786 21.6027L7.55884 21.5716L7.57658 21.647C7.61651 21.8112 7.69637 21.9487 7.81171 22.0552L7.93593 22.1705C8.09564 22.3214 8.30414 22.4012 8.51709 22.4012C8.6768 22.4012 8.84094 22.3524 8.98734 22.2592L9.05832 22.2149L9.08494 22.2992C9.1293 22.4456 9.20472 22.5654 9.30232 22.663L9.42654 22.7783C9.58181 22.9247 9.79032 23.009 10.0077 23.009C10.2428 23.009 10.4558 22.9158 10.6155 22.7517L11.1922 22.135ZM12.5542 22.6851C12.4299 22.6851 12.319 22.6408 12.2303 22.5565L11.4406 21.8245L11.4628 21.7801C11.5249 21.6603 11.556 21.5317 11.556 21.403C11.556 21.1679 11.4628 20.955 11.2987 20.7953L11.1745 20.6799C11.0192 20.5335 10.8062 20.4492 10.5933 20.4492C10.5889 20.4492 10.58 20.4492 10.5755 20.4492C10.5622 20.4492 10.5534 20.4537 10.5401 20.4537H10.4735V20.3738C10.4735 20.1964 10.2872 19.8769 10.2073 19.7616L10.0875 19.6507C9.9722 19.5442 9.82581 19.4688 9.66166 19.4333L9.58624 19.4156L9.61286 19.3446C9.64392 19.2559 9.66166 19.1627 9.66166 19.0695C9.66166 18.8344 9.5685 18.6215 9.40435 18.4617L9.28014 18.3464C9.12043 18.1956 8.91192 18.1157 8.69898 18.1157C8.6768 18.1157 8.65461 18.1201 8.628 18.1246L8.55258 18.1379L8.54814 18.0625C8.53927 17.8362 8.44611 17.6277 8.29083 17.4813L8.16662 17.366C8.01135 17.2151 7.80284 17.1353 7.58546 17.1353C7.35033 17.1353 7.13739 17.2284 6.97768 17.3926L6.64052 17.7431L5.30075 16.6118C5.19427 16.5231 5.1366 16.3944 5.1366 16.2613C5.1366 16.146 5.17653 16.0395 5.25638 15.9508L6.62721 14.4158C6.68488 14.3493 6.77361 14.2872 6.88452 14.2428C6.97768 14.2029 7.09302 14.1807 7.21281 14.1807C7.30153 14.1807 7.39026 14.1984 7.47455 14.2295L8.22429 14.5489C8.41061 14.6243 8.63687 14.6687 8.90305 14.6731C9.16479 14.6731 9.39548 14.6332 9.58181 14.5489L10.3315 14.2295C10.4558 14.1762 10.6421 14.1452 10.824 14.1452C11.0236 14.1452 11.2277 14.1851 11.3519 14.2517C11.3874 14.2694 11.4229 14.2872 11.4584 14.3049C11.4894 14.3226 11.5205 14.336 11.5515 14.3537L11.6536 14.4025L10.7929 14.997C10.5755 15.1478 10.4425 15.4007 10.4425 15.6713C10.4425 15.8487 10.5001 16.0218 10.6066 16.1593L10.7086 16.2968C10.8772 16.5231 11.1523 16.6562 11.4451 16.6562C11.6048 16.6562 11.7645 16.6118 11.9109 16.5319L12.3678 16.2569C12.4699 16.1948 12.6251 16.1549 12.7848 16.1549C12.9712 16.1549 13.1575 16.2081 13.2728 16.2924L14.5416 17.2018C14.8211 17.4059 15.2825 17.7786 15.5442 18.0181L17.0127 19.3756C17.1058 19.4688 17.1591 19.5974 17.1591 19.7261C17.1591 19.8503 17.1147 19.9612 17.0304 20.05L16.9151 20.1742C16.8263 20.2718 16.6977 20.325 16.5646 20.325C16.4404 20.325 16.3295 20.2806 16.2407 20.1964L14.3376 18.4351L14.0936 18.6969L16.1343 20.5868C16.2274 20.671 16.2851 20.7953 16.2895 20.9328C16.2895 21.057 16.2452 21.1723 16.1609 21.2611L16.0455 21.3853C15.9568 21.4829 15.8282 21.5361 15.6951 21.5361C15.5664 21.5361 15.4511 21.4918 15.3668 21.4075L13.4547 19.6462L13.2107 19.908L14.8965 21.4651C14.9897 21.5539 15.0429 21.6781 15.0429 21.8112C15.0429 21.9354 14.9986 22.0463 14.9143 22.135L14.7989 22.2592C14.7102 22.3568 14.5816 22.4101 14.4485 22.4101C14.3198 22.4101 14.2045 22.3657 14.1202 22.2814L12.4388 20.7331L12.1904 20.9993L13.0155 21.7579C13.0998 21.8511 13.1486 21.9664 13.1486 22.0862C13.1486 22.2104 13.1043 22.3214 13.02 22.4101L12.9046 22.5343C12.8159 22.6319 12.6872 22.6851 12.5542 22.6851ZM11.6003 21.7979L12.319 22.4589C12.3856 22.521 12.4654 22.552 12.5542 22.552C12.6517 22.552 12.7405 22.5121 12.807 22.4456L12.9224 22.3214C12.9845 22.2548 13.0155 22.175 13.0155 22.0862C13.0155 21.9975 12.98 21.9177 12.9179 21.8511L12.0484 21.0481L12.004 21.0038L12.4299 20.5424L14.2089 22.1838C14.271 22.2459 14.3509 22.277 14.444 22.277C14.5416 22.277 14.6304 22.2371 14.6969 22.1705L14.8122 22.0463C14.8744 21.9798 14.9054 21.8999 14.9054 21.8112C14.9054 21.7136 14.8699 21.6249 14.8034 21.5627L13.02 19.9169L13.4503 19.4599L15.4511 21.3099C15.5132 21.372 15.593 21.403 15.6862 21.403C15.7838 21.403 15.8725 21.3631 15.9391 21.2966L16.0544 21.1723C16.1165 21.1058 16.1476 21.0259 16.1476 20.9372C16.1431 20.8662 16.121 20.7642 16.0367 20.6843L13.8984 18.7057L14.3287 18.2488L16.3295 20.0988C16.396 20.1609 16.4759 20.1919 16.5646 20.1919C16.6622 20.1919 16.7509 20.152 16.8175 20.0854L16.9328 19.9612C16.9949 19.8947 17.026 19.8148 17.026 19.7261C17.026 19.6329 16.986 19.5398 16.9195 19.4732L15.4511 18.1157C15.1893 17.8762 14.7368 17.5079 14.4573 17.3083L13.1885 16.3989C13.0954 16.3323 12.9357 16.2879 12.7804 16.2879C12.6473 16.2879 12.5187 16.319 12.4344 16.3722L11.9774 16.6473C11.8133 16.7404 11.6314 16.7892 11.4451 16.7892C11.1079 16.7892 10.7929 16.634 10.6022 16.3767L10.5001 16.2391C10.3759 16.0794 10.3094 15.8798 10.3094 15.6713C10.3094 15.3563 10.4602 15.068 10.7131 14.8905L11.3874 14.4202C11.3563 14.4025 11.3208 14.3848 11.2854 14.367C11.1789 14.3138 10.9926 14.2783 10.8195 14.2783C10.6554 14.2783 10.4868 14.3049 10.3803 14.3537L9.63061 14.6731C9.42654 14.7618 9.18254 14.8062 8.89861 14.8062C8.61469 14.8018 8.36625 14.7574 8.16662 14.6731L7.41688 14.3537C7.35477 14.3271 7.27935 14.3138 7.20837 14.3138C7.10633 14.3138 7.01317 14.3315 6.93332 14.367C6.84459 14.4025 6.77361 14.4513 6.72481 14.5045L5.35398 16.0395C5.29631 16.1016 5.26969 16.177 5.26969 16.2613C5.26969 16.3545 5.31405 16.4477 5.38947 16.5142L6.64052 17.5656L6.88895 17.3039C7.07528 17.1087 7.32371 17.0022 7.59433 17.0022C7.8472 17.0022 8.08676 17.0954 8.26422 17.2684L8.38843 17.3837C8.55701 17.539 8.65905 17.7475 8.68567 17.9826C8.6901 17.9826 8.69898 17.9826 8.70341 17.9826C8.95185 17.9826 9.18697 18.0758 9.3733 18.2488L9.49752 18.3641C9.69272 18.5505 9.79919 18.7989 9.79919 19.0695C9.79919 19.1538 9.78588 19.2381 9.7637 19.318C9.92341 19.3623 10.0654 19.4422 10.1807 19.5531L10.3138 19.6817C10.3227 19.6995 10.5667 20.0588 10.6022 20.3161C10.8462 20.3206 11.0857 20.4137 11.2632 20.5823L11.3874 20.6977C11.5826 20.884 11.6891 21.1324 11.6891 21.403C11.6891 21.5361 11.658 21.6692 11.6003 21.7979ZM10.021 22.6319C9.89235 22.6319 9.77701 22.5875 9.68828 22.5032L9.56406 22.3879C9.46646 22.2947 9.41323 22.175 9.41323 22.0419C9.41323 21.9132 9.46203 21.7979 9.54632 21.7091L10.2473 20.9816C10.3315 20.8929 10.4558 20.8396 10.5889 20.8307C10.7175 20.8307 10.8329 20.8751 10.9216 20.9594L11.0458 21.0747C11.1434 21.1679 11.1966 21.2877 11.1966 21.4208C11.1922 21.545 11.1434 21.6559 11.0591 21.7446L10.3626 22.4766C10.2739 22.5742 10.1541 22.6275 10.021 22.6319ZM10.5933 20.9683C10.4957 20.9727 10.407 21.0126 10.3449 21.0747L9.64392 21.8023C9.56406 21.8822 9.54632 21.9753 9.54632 22.0419C9.54632 22.135 9.58624 22.2238 9.65279 22.2903L9.77701 22.4056C9.83911 22.4678 9.9234 22.4988 10.0166 22.4988C10.0831 22.4944 10.1851 22.4766 10.265 22.3923L10.9615 21.6603C11.0236 21.5938 11.0591 21.5139 11.0635 21.4252C11.0635 21.3321 11.0236 21.2433 10.9571 21.1812L10.8329 21.0659C10.7663 20.9993 10.682 20.9683 10.5933 20.9683ZM8.5304 22.0286C8.40174 22.0286 8.2864 21.9842 8.19767 21.8999L8.07345 21.7846C7.97585 21.6914 7.92262 21.5716 7.92262 21.4385C7.92262 21.3276 7.95811 21.2256 8.02909 21.1369L8.03353 21.1324L9.19141 19.9257C9.28457 19.8459 9.39104 19.8015 9.51083 19.8015C9.63504 19.8015 9.75039 19.8459 9.83911 19.9302L9.96333 20.0455C10.0609 20.1387 10.1142 20.2585 10.1142 20.3916C10.1142 20.5113 10.0654 20.6311 9.98108 20.7198L8.87199 21.8733C8.78327 21.9709 8.66349 22.0241 8.5304 22.0286ZM8.13113 21.2256C8.08233 21.2877 8.05571 21.3587 8.05571 21.4385C8.05571 21.5317 8.09564 21.6204 8.16218 21.687L8.2864 21.8023C8.34851 21.8644 8.4328 21.8955 8.52596 21.8955C8.5925 21.891 8.69454 21.8733 8.77439 21.789L9.88348 20.6355C9.94559 20.569 9.98108 20.4847 9.98108 20.396C9.98108 20.3028 9.94115 20.2141 9.87461 20.1476L9.75039 20.0322C9.68828 19.9701 9.60399 19.939 9.51083 19.939C9.42654 19.939 9.34668 19.9701 9.28014 20.0278L8.13113 21.2256ZM7.16844 21.2921C7.04422 21.2921 6.92888 21.2478 6.84015 21.1635L6.71594 21.0481C6.61834 20.955 6.5651 20.8352 6.5651 20.7021C6.5651 20.5779 6.60946 20.4625 6.69375 20.3738C7.25717 19.7882 8.32632 18.6747 8.36182 18.6392L8.36625 18.6348C8.45941 18.5505 8.57476 18.5017 8.69454 18.5017C8.81876 18.5017 8.9341 18.546 9.02283 18.6303L9.14705 18.7457C9.24465 18.8388 9.29788 18.9586 9.29788 19.0917C9.29788 19.2204 9.24908 19.3357 9.16479 19.4244L7.51448 21.1546C7.42575 21.2389 7.30153 21.2921 7.16844 21.2921ZM8.45498 18.7279C8.36625 18.8255 7.51004 19.7128 6.79135 20.4625C6.73368 20.5246 6.69819 20.6089 6.69819 20.7021C6.69819 20.7953 6.73812 20.884 6.80466 20.9505L6.92888 21.0659C6.99099 21.128 7.07528 21.159 7.16844 21.159C7.26604 21.159 7.35477 21.1235 7.41688 21.057L9.06719 19.3268C9.14705 19.247 9.16479 19.1538 9.16479 19.0873C9.16479 18.9941 9.12486 18.9054 9.05832 18.8388L8.9341 18.7235C8.87199 18.6614 8.7877 18.6303 8.69454 18.6303C8.60581 18.6303 8.52152 18.6658 8.45498 18.7279ZM6.47637 19.8769C6.35216 19.8769 6.23681 19.8326 6.14809 19.7483L6.02387 19.6329C5.92627 19.5398 5.87303 19.42 5.87303 19.2869C5.87303 19.1583 5.92183 19.0429 6.00612 18.9542L7.2483 17.6588C7.33702 17.5656 7.46568 17.5079 7.59433 17.5079C7.71855 17.5079 7.83389 17.5523 7.92262 17.6366L8.05571 17.7608C8.06902 17.783 8.19767 17.9693 8.19767 18.098C8.19767 18.1956 8.16662 18.2887 8.10894 18.3686L8.10007 18.3775C8.08676 18.3952 6.77361 19.7616 6.7603 19.7749L6.75143 19.7838C6.67601 19.8459 6.57841 19.8769 6.47637 19.8769ZM7.59433 17.6455C7.50117 17.6455 7.408 17.6854 7.3459 17.7519L6.10372 19.0473C6.02387 19.1272 6.00612 19.2204 6.00612 19.2869C6.00612 19.3801 6.04605 19.4688 6.11259 19.5353L6.23681 19.6507C6.29892 19.7128 6.38321 19.7438 6.47637 19.7438C6.54736 19.7438 6.6139 19.7217 6.67157 19.6817C7.06197 19.278 7.93593 18.3641 8.00247 18.2932C8.0424 18.2399 8.06458 18.1734 8.06458 18.1068C8.06458 18.0447 7.99804 17.9205 7.95367 17.854L7.83389 17.7431C7.76735 17.6765 7.68306 17.6455 7.59433 17.6455ZM16.711 18.617L15.7749 17.7519C15.4999 17.4991 15.0474 17.1264 14.7368 16.9046L13.468 15.9951C13.2817 15.8621 13.0333 15.7911 12.7715 15.7911C12.5453 15.7911 12.3412 15.8443 12.1682 15.9463L11.7112 16.2214C11.6358 16.2702 11.5427 16.2924 11.4362 16.2924C11.2587 16.2924 11.0902 16.2125 10.9881 16.0794L10.8861 15.9419C10.8284 15.8621 10.7929 15.7645 10.7929 15.6669C10.7929 15.516 10.8639 15.3785 10.9881 15.2898L12.3412 14.336C12.4743 14.2384 12.7005 14.1762 12.9046 14.1807C13.051 14.1807 13.193 14.2073 13.2906 14.2605L14.3952 14.7929C14.5638 14.8728 14.7634 14.9171 14.9764 14.9171C15.2559 14.9171 15.5132 14.8506 15.7217 14.7264L16.8485 14.0254C16.9284 13.9766 17.0304 13.95 17.1324 13.95C17.3099 13.95 17.4829 14.0298 17.5761 14.1585L18.7295 15.6358C18.8049 15.7334 18.8493 15.8665 18.8493 16.004C18.8582 16.1549 18.8094 16.3057 18.7073 16.4122L16.711 18.617ZM12.7715 15.658C13.0643 15.658 13.3394 15.7378 13.5479 15.8887L14.8167 16.7981C15.1272 17.0244 15.5886 17.4015 15.8637 17.6543L16.7021 18.4307L18.6142 16.319C18.6896 16.2391 18.7295 16.1238 18.7207 16.004C18.7207 15.8931 18.6852 15.7866 18.6275 15.7112L17.474 14.2339C17.4031 14.1363 17.27 14.0786 17.1369 14.0786C17.057 14.0786 16.9816 14.1008 16.9239 14.1363L15.7971 14.8373C15.5664 14.9748 15.2869 15.0458 14.9808 15.0458C14.7457 15.0458 14.5239 14.997 14.342 14.9127L13.2373 14.3803C13.1575 14.3404 13.0333 14.3138 12.9091 14.3138C12.7316 14.3093 12.532 14.3626 12.4255 14.4424L11.068 15.3962C10.9793 15.4583 10.926 15.5604 10.926 15.6669C10.926 15.7334 10.9482 15.8044 10.9926 15.8621L11.0946 15.9996C11.17 16.0972 11.3031 16.1593 11.4362 16.1593C11.516 16.1593 11.587 16.1415 11.6403 16.1061L12.0972 15.831C12.2924 15.7157 12.5187 15.658 12.7715 15.658Z" />
                            <path d="M6.79489 12.3842C6.75496 12.3842 6.7106 12.3753 6.67511 12.3575C6.58195 12.3087 6.52427 12.2156 6.52871 12.1135L6.55089 11.3194H4.26618C4.11978 11.3194 4 11.1997 4 11.0533V8.83509C4 8.76411 4.02662 8.69756 4.07985 8.64433C4.12865 8.59553 4.19964 8.56447 4.27062 8.56891L6.59969 8.58665L6.60856 7.81473C6.60856 7.7127 6.67067 7.61953 6.76384 7.57517C6.857 7.53081 6.96347 7.54411 7.04333 7.61066L9.70513 9.78446C9.76723 9.8377 9.80273 9.91312 9.80273 9.99297C9.80273 10.0728 9.7628 10.1482 9.70069 10.2015L6.95903 12.3265C6.91024 12.3664 6.85256 12.3842 6.79489 12.3842ZM4.53236 10.7826H6.82594C6.89693 10.7826 6.96791 10.8137 7.01671 10.8625C7.06551 10.9113 7.09212 10.9823 7.09212 11.0577L7.07882 11.5634L9.11066 9.97966L7.13649 8.36484L7.13205 8.85283C7.13205 8.99923 7.01227 9.11458 6.86587 9.11458L4.5368 9.09683V10.7826H4.53236Z" />
                            <path d="M17.2022 12.3835C17.1445 12.3835 17.0868 12.3658 17.038 12.3258L14.2964 10.192C14.2343 10.1432 14.1943 10.0677 14.1943 9.98345C14.1943 9.90359 14.2298 9.82374 14.2919 9.77494L16.9537 7.60114C17.0336 7.53459 17.1401 7.52128 17.2332 7.56565C17.3264 7.61001 17.3841 7.70317 17.3885 7.80521L17.3974 8.57713L19.7264 8.55939C19.7974 8.55939 19.864 8.586 19.9172 8.6348C19.966 8.6836 19.9971 8.75459 19.9971 8.82557V11.0437C19.9971 11.1901 19.8773 11.3099 19.7309 11.3099H17.4462L17.4683 12.104C17.4728 12.2061 17.4151 12.3037 17.322 12.348C17.2865 12.3746 17.2421 12.3835 17.2022 12.3835ZM14.8864 9.97901L16.9182 11.5628L16.9049 11.057C16.9049 10.9861 16.9316 10.9151 16.9804 10.8618C17.0292 10.8086 17.1001 10.782 17.1711 10.782H19.4647V9.09618L17.1356 9.11393C16.9892 9.11393 16.8694 8.99858 16.8694 8.85218L16.865 8.36419L14.8864 9.97901Z" />
                            <path d="M12.7922 9.67694C12.5482 9.53942 12.2864 9.43738 12.0247 9.33091C11.8739 9.2688 11.7319 9.19782 11.6032 9.09578C11.3548 8.89615 11.4036 8.57229 11.692 8.44364C11.7763 8.40815 11.8605 8.39484 11.9493 8.39041C12.2864 8.37266 12.6103 8.43477 12.9164 8.58117C13.0672 8.65659 13.1205 8.62997 13.1693 8.4747C13.2225 8.30611 13.2669 8.13753 13.3201 7.96452C13.3556 7.84917 13.3112 7.77375 13.2048 7.72939C13.0096 7.64066 12.8055 7.57856 12.5925 7.5475C12.3175 7.50314 12.3175 7.50314 12.3131 7.22365C12.3131 6.83325 12.3131 6.83325 11.9182 6.83325C11.8605 6.83325 11.8029 6.83325 11.7496 6.83325C11.5677 6.83769 11.5367 6.86874 11.5278 7.05507C11.5234 7.13936 11.5278 7.21921 11.5278 7.3035C11.5278 7.5475 11.5234 7.54307 11.2883 7.63179C10.7204 7.8403 10.3699 8.22626 10.33 8.84735C10.2945 9.39745 10.5829 9.76567 11.0354 10.0363C11.3149 10.2049 11.621 10.3025 11.9138 10.4311C12.0291 10.4799 12.14 10.5376 12.2332 10.6219C12.5171 10.857 12.4639 11.243 12.1267 11.3938C11.9448 11.4737 11.7585 11.4914 11.5633 11.4692C11.2616 11.4337 10.9733 11.3539 10.7027 11.2119C10.543 11.1276 10.4986 11.1498 10.4409 11.3228C10.3966 11.4737 10.3522 11.6201 10.3123 11.7709C10.2546 11.9705 10.2768 12.0193 10.472 12.1169C10.716 12.2367 10.9822 12.2988 11.2483 12.3387C11.4568 12.3742 11.4657 12.3831 11.4657 12.6005C11.4657 12.6981 11.4657 12.8001 11.4701 12.8977C11.4701 13.0219 11.5323 13.0929 11.6609 13.0974C11.8073 13.1018 11.9537 13.1018 12.0957 13.0974C12.2155 13.0929 12.2776 13.0308 12.2776 12.911C12.2776 12.7779 12.282 12.6404 12.2776 12.5073C12.2731 12.3698 12.3308 12.2988 12.4639 12.2633C12.7656 12.179 13.0273 12.0193 13.2269 11.7753C13.7859 11.0921 13.573 10.1073 12.7922 9.67694Z" />
                            <path d="M19.8848 5.80899L15.1911 1.11534C15.1157 1.03993 15.0181 1 14.9116 1H5.92805C4.86777 1 4.00269 1.86509 4.00269 2.92537V6.49218H4.79235V2.92537C4.79235 2.29985 5.30253 1.7941 5.92362 1.7941H14.5124V4.56238C14.5124 5.07699 14.712 5.56055 15.0758 5.92433C15.4396 6.28811 15.9231 6.48774 16.4377 6.48774H19.206V6.49218H20.0001V6.08848C20.0001 5.982 19.9602 5.8844 19.8848 5.80899ZM16.4422 5.69364C16.1405 5.69364 15.8566 5.57386 15.6392 5.36092C15.4262 5.14797 15.3065 4.86405 15.3065 4.55794V2.35308L18.647 5.69364H16.4422Z" />
                            <path d="M11.6485 4.90039H11.471C11.2536 4.90039 11.0762 5.07784 11.0762 5.29522C11.0762 5.5126 11.2536 5.69006 11.471 5.69006H11.6485C11.8658 5.69006 12.0433 5.5126 12.0433 5.29522C12.0433 5.07784 11.8658 4.90039 11.6485 4.90039Z" />
                            <path d="M10.1879 4.90039H6.34161C6.12423 4.90039 5.94678 5.07784 5.94678 5.29522C5.94678 5.5126 6.12423 5.69006 6.34161 5.69006H10.1879C10.4053 5.69006 10.5827 5.5126 10.5827 5.29522C10.5827 5.07784 10.4053 4.90039 10.1879 4.90039Z" />
                            <path d="M12.8098 3.08936H6.34161C6.12423 3.08936 5.94678 3.26681 5.94678 3.48419C5.94678 3.70157 6.12423 3.87902 6.34161 3.87902H12.8098C13.0272 3.87902 13.2046 3.70157 13.2046 3.48419C13.2046 3.26681 13.0272 3.08936 12.8098 3.08936Z" />
                          </svg>
                          <div className="employee-field-label">Escrow</div>
                        </div>
                        <input
                          className="choose_action"
                          type="radio"
                          name="radio"
                          onClick={() => setPropertyStatus(3)}
                          checked={propertyStatus == 3 ? true : false}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <label
                                        className={`error ${errorMsgPropertyStatus ? null : "errorFill"
                                            } `}
                                    >
                                        {errorMsgPropertyStatus ? errorMsgPropertyStatus : null}
                                    </label> */}
                </div>
              </div>
            </div>
            <div className="cardBox mb-3">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={StatusWhite} />
                  Ownership
                </h3>
              </div>
              <div className="create-employee-wrapper border px-0 py-3">
                <div className="form-group col-12 mb-0">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="OwnerImg-own-ship">
                          <img src={PersonImage} />
                        </div>
                        <div className="ExtraLink-icon">
                          <img src={externalLink} />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="table--ownership">
                        <table class="table table-striped-owner">
                          <tbody>
                            <tr>
                              <td>
                                <img src={NameIcon} />
                              </td>
                              <td>Name:</td>
                              <td>{selectedContact.name}</td>
                              <td>
                                <img src={cellIcon} />
                              </td>
                              <td>Cell:</td>
                              <td>{selectedContact.phoneNumber}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src={CompanyblackIcon} />
                              </td>
                              <td>Company:</td>
                              <td>{selectedContact.name}</td>
                              <td>
                                <img src={officeIcon} />
                              </td>
                              <td>Office:</td>
                              <td>{selectedContact.office}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src={Department} />
                              </td>
                              <td>Division:</td>
                              <td>{selectedContact.department}</td>
                              <td>
                                <img src={emailIcon} />
                              </td>
                              <td>Email:</td>
                              <td>{selectedContact.email}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src={NameIcon} />
                              </td>
                              <td>Name:</td>
                              <td>{selectedContact.name}</td>
                              <td>
                                <img src={AddresIcon} />
                              </td>
                              <td>Address:</td>
                              <td>
                                {selectedContact.contactAddresses[0].address}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src={tagIcon} />
                              </td>
                              <td>Tag:</td>
                              <td>{ }</td>
                              <td>
                                <img src={CityIcon} />
                              </td>
                              <td>City:</td>
                              <td>
                                {selectedContact.contactAddresses[0].city}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src={Status} />
                              </td>
                              <td>Status:</td>
                              <td>{data.propertyStatus.name}</td>
                              <td>
                                <img src={CountryIcon} />
                              </td>
                              <td>Country:</td>
                              <td>
                                {selectedContact.contactAddresses[0].country}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src={StateIcon} />
                              </td>
                              <td>State:</td>
                              <td>
                                {selectedContact.contactAddresses[0].state}
                              </td>
                              <td>
                                <img src={ZipIcon} />
                              </td>
                              <td>ZipCode:</td>
                              <td>
                                {selectedContact.contactAddresses[0].zipCode}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 px-2">
            <div className="cardBox mb-3">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={PropetyName} />
                  Location
                </h3>
              </div>
              <div className="create-employee-wrapper border px-0 py-3 text-left flex-column">
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <div className="employee-field-label-wrapper">
                          <CImg src={AddresIcon} fluid className="field-icon" />{" "}
                          Map
                        </div>
                        <div className="map-frame mt-3">
                          <iframe
                             src={`https://www.google.com/maps?q=${city} %26 ${locationName}, &output=embed`}
                            width="100%"
                            height="450"
                            frameborder="0"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            aria-hidden="false"
                            tabindex="0"
                          ></iframe>
                        </div>
                      </div>
                      <div class="addinfo--map">
                        <ul className="ListItems--viewmap">
                          <li className="listmap--info">
                            <img src={AddresIcon} /> <b>Address </b>:{address}
                          </li>
                          <li className="listmap--info">
                            <img src={CityIcon} /> <b>City </b>: {city}
                          </li>
                          <li className="listmap--info">
                            <img src={CountryIcon} /> <b>Country </b>:{country}
                          </li>
                          <li className="listmap--info">
                            <img src={StateIcon} /> <b>State </b>: {state}
                          </li>
                          <li className="listmap--info">
                            <img src={ZipIcon} /> <b>Zip Code </b>:{zipcode}
                          </li>
                          <li className="listmap--info">
                            <img src={ZipIcon} /> <b>Longitude </b>:{longitude}
                          </li>
                          <li className="listmap--info">
                            <img src={ZipIcon} /> <b>Latitude </b>:{latitude}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 px-2">
            <div className="cardBox mb-3">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={attachment} />
                  Attachment
                </h3>
              </div>
              <div className="create-employee-wrapper border py-3 flex-column">
                <div className="form-group col-12 mb-0">
                  {attachmentList.map((attach) => {
                    let tempType = attach.fileUrl.split('.')
                    let getType = tempType[tempType.length - 1]
                    let tempName = attach.fileUrl.split('/')
                    let getName = tempName[tempType.length - 1]
                    return (
                      <div class="attachment--file">
                        <span className="attacmentImg_btn">
                          <img
                            src={`${getType == "pdf"
                              ? pdf
                              : getType == "xlsx" || getType == "xls"
                                ? xml
                                : word
                              }`}
                            className="m-0 mr-2 attacImg--step3"
                          />{" "}
                          {getName}
                        </span>
                      </div>
                    );
                  })}
                  {/* <div class="attachment--file">
                                        <span className="attacmentImg_btn properties---columnImg borderattach-0">
                                            <img src={pdf} className="m-0 mr-2 attacImg--step3" />{" "}
                                            {'calculation.pdf'}
                                            <div className="template_action">
                                                <div class="boxwigit--baredit">
                                                    <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="attachment--file">
                                        <span className="attacmentImg_btn properties---columnImg borderattach-0">
                                            <img src={word} className="m-0 mr-2 attacImg--step3" />{" "}
                                            {'calculation.word'}
                                            <div className="template_action">
                                                <div class="boxwigit--baredit">
                                                    <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="attachment--file">
                                        <span className="attacmentImg_btn properties---columnImg borderattach-0">
                                            <img src={xml} className="m-0 mr-2 attacImg--step3" />{" "}
                                            {'calculation.xml'}
                                            <div className="template_action">
                                                <div class="boxwigit--baredit">
                                                    <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                                </div>
                                            </div>
                                        </span>
                                    </div> */}
                  {/* {attachmentList.map((attach) => {
                        console.log("atttch ->", attach.name);
                        return (
                          <div class="attachment--file">
                            <span>
                              <img src={upload} className="m-0 mr-2" />{" "}
                              {attach.name}
                            </span>
                          </div>
                        );
                      })} */}
                </div>
              </div>
            </div>
            <div className="cardBox mb-3">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={StatusWhite} />
                  Images
                </h3>
              </div>
              <div className="create-employee-wrapper border py-3 flex-row flex-wrap">
                {imagesPreviewList.map((url) => {
                  return (
                    <div className="col-12 col-lg-6 px-1">
                      <div class="fileImage--main">
                        <img src={url.imageUrl} className="m-0" />
                      </div>
                    </div>
                  );
                })}
                {/* <div className="col-12 px-1">
                                    <div class="fileImage--main properties---columnImg">
                                        <img src={ImageFile1} className="m-0" />
                                        <div className="template_action">
                                            <div class="boxwigit--baredit">
                                                <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                {/* <div className="col-12 col-lg-6 px-1">
                                    <div class="fileImage--main properties---columnImg">
                                        <img src={ImageFile2} className="m-0" />
                                        <div className="template_action">
                                            <div class="boxwigit--baredit">
                                                <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fileImage--main properties---columnImg">
                                        <img src={ImageFile1} className="m-0" />
                                        <div className="template_action">
                                            <div class="boxwigit--baredit">
                                                <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 px-1">
                                    <div class="fileImage--main properties---columnImg">
                                        <img src={ImageFile1} className="m-0" />
                                        <div className="template_action">
                                            <div class="boxwigit--baredit">
                                                <span className="icon-Edit--tem mr-1" ><i class="fa fa-download" aria-hidden="true"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                {/* {imagesPreviewList.map((url) => {
                                    return (
                                        <div className="col-12 col-lg-6 px-1">
                                        <div class="fileImage--main">
                                            <img src={url} className="m-0" />
                                        </div>
                                        </div>
                                    );
                                    })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bgwhite mx-0">
        <div className="row">
          <div className="col-12 col-md-5 px-2">
            <div className="cardBox">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={StatusWhite} />
                                             Property Notes
                                        </h3>
              </div>
              <div className="create-employee-wrapper border px-0 py-3">
                <div className="form-group col-12 mb-0 text-left">
                  <div className="scrollbar-note note--property-label d-flex align-items-center justify-content-end pt-3">
                    <span class="btn border" onClick={() => setIsAddNotesModal(true)}><img className="m-0 mr-2" src={addicon} />Add Property Notes</span>
                  </div>
                  {propertyNotes.length ? propertyNotes.map((val) => {
                    return (
                      <div className="properttxt-wrp">
                        <div className="propertyNote--area">
                          <span>{moment(val.date).format("L")}</span>
                          <h3 className=""> {val.title} </h3>
                          <p>{val.description}</p>
                        </div>
                      </div>
                    );
                  }) : <div style={{ textAlign: 'center' }}> No Property Notes available</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 px-2">
            <div className="cardBox">
              <div className="create-contact-header align-items-center">
                <h3 className="titleheader--card d-flex align-items-center">
                  <img src={LoadIcon} />
                  Follow Ups
                </h3>
                <div className="Follow--fill-onoff-btn d-flex align-items-center">
                  <span className="mr-3">Auto Reminder Follow Ups</span>
                  <label className="switch mb-0">
                    <input type="checkbox" check="true" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="view_wrapper-cardbox border px-0 py-0">
                {/* {propertyNotes.map((val) => {
                                    return (
                                        <div className="properttxt-wrp">
                                            <div className="propertyNote--area">
                                                <div class="text-right">
                                                    <img src={Dotline} />
                                                </div>
                                                <span>{moment(val.date).format("L")}</span>
                                                <h3 className="">{val.title}</h3>
                                                <p>{val.description}</p>
                                            </div>
                                        </div>
                                    );
                                })} */}
                <div className="scrollbar-note note--property-label d-flex align-items-center justify-content-end pt-3" onClick={() => setIsAddFollowUpModal(true)}>
                  <span class="btn border" ><img className="m-0 mr-2" src={addicon} />Add New Follow Up</span>
                </div>
                <div className="followup-wrapper d-flex align-items-center justify-content-between px-4">
                  <div className="leftToday-dt"><b>Today</b> <span><b className="mx-1"></b> {new Date().toDateString()} </span></div>
                  <div className="rightFollow--lst">
                    Last follow Up: <b>10 March 2019 </b>{" "}
                  </div>
                </div>
                <div className="full-boxList---mak">
                  <ul className="ulList--ITemsWrap">
                    {propertyFollowUp.length ? propertyFollowUp.map((val) => {
                      return (
                        <li className="listCheck--box">
                          <div className="chec--txt--sht-disc">
                            <h4>{val.title}</h4>
                            <span> {getDate(val.date)}</span>
                          </div>

                          <div className="FollowIcon--btn">
                            {getSvg(val.followUpType)}
                            {/* <button type="button" className="btn btn-listbtn-follow"><img src={LoadIcon} className="m-0 mr-2" />Follow Ups</button> */}
                          </div>
                          <div className="btnverticle--Icon">
                            <button className="btn ">
                              <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.94737 0C8.57961 0 7.46053 1.125 7.46053 2.5C7.46053 3.875 8.57961 5 9.94737 5C11.3151 5 12.4342 3.875 12.4342 2.5C12.4342 1.125 11.3151 0 9.94737 0ZM17.4079 0C16.0401 0 14.9211 1.125 14.9211 2.5C14.9211 3.875 16.0401 5 17.4079 5C18.7757 5 19.8947 3.875 19.8947 2.5C19.8947 1.125 18.7757 0 17.4079 0ZM2.48684 0C1.11908 0 0 1.125 0 2.5C0 3.875 1.11908 5 2.48684 5C3.85461 5 4.97368 3.875 4.97368 2.5C4.97368 1.125 3.85461 0 2.48684 0Z" fill="#0046FE" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      );
                    }) : <div style={{ textAlign: 'center' }}> No Property Follow Ups available</div>}

                    {/* <li className="listCheck--box">
                      <div className="chec--txt--sht-disc">
                        <h4>Check current status of owner if he is</h4>
                        <span> 23 Jan at 12:00 am</span>
                      </div>
                      <div className="FollowIcon--btn">
                        <button type="button" className="btn btn-listbtn-follow"><img src={LoadIcon} className="m-0 mr-2" />Follow Ups</button>
                      </div>
                      <div className="btnverticle--Icon">
                        <button className="btn ">
                          <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.94737 0C8.57961 0 7.46053 1.125 7.46053 2.5C7.46053 3.875 8.57961 5 9.94737 5C11.3151 5 12.4342 3.875 12.4342 2.5C12.4342 1.125 11.3151 0 9.94737 0ZM17.4079 0C16.0401 0 14.9211 1.125 14.9211 2.5C14.9211 3.875 16.0401 5 17.4079 5C18.7757 5 19.8947 3.875 19.8947 2.5C19.8947 1.125 18.7757 0 17.4079 0ZM2.48684 0C1.11908 0 0 1.125 0 2.5C0 3.875 1.11908 5 2.48684 5C3.85461 5 4.97368 3.875 4.97368 2.5C4.97368 1.125 3.85461 0 2.48684 0Z" fill="#0046FE" />
                          </svg>
                        </button>
                      </div>
                    </li> */}
                    {/* <li className="listCheck--box">
                      <div className="chec--txt--sht-disc">
                        <h4>Check current status of owner if he is</h4>
                        <span> 23 Jan at 12:00 am</span>
                      </div>
                      <div className="FollowIcon--btn">
                        <button type="button" className="btn btn-listbtn-follow"><img src={DirectIcon} className="m-0 mr-02 with18" />Direct Mail</button>
                      </div>
                      <div className="btnverticle--Icon">
                        <span>
                          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="12" cy="12.4999" rx="12" ry="11.9567" fill="#26BF6C" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.85156 11.0931L6.35156 12.4998L10.8516 16.7198L18.3516 9.68645L16.8516 8.27979L10.8516 13.9065L7.85156 11.0931Z" fill="white" />
                          </svg>

                        </span>
                        <button className="btn ">
                          <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.94737 0C8.57961 0 7.46053 1.125 7.46053 2.5C7.46053 3.875 8.57961 5 9.94737 5C11.3151 5 12.4342 3.875 12.4342 2.5C12.4342 1.125 11.3151 0 9.94737 0ZM17.4079 0C16.0401 0 14.9211 1.125 14.9211 2.5C14.9211 3.875 16.0401 5 17.4079 5C18.7757 5 19.8947 3.875 19.8947 2.5C19.8947 1.125 18.7757 0 17.4079 0ZM2.48684 0C1.11908 0 0 1.125 0 2.5C0 3.875 1.11908 5 2.48684 5C3.85461 5 4.97368 3.875 4.97368 2.5C4.97368 1.125 3.85461 0 2.48684 0Z" fill="#0046FE" />
                          </svg>
                        </button>
                      </div>
                    </li> */}
                  </ul>
                </div>


              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 px-2">
            <div className="cardBox">
              <div class="create-contact-header align-items-center">
                <h3 class="titleheader--card d-flex align-items-center">
                  <img src={StatusWhite} />
                  Property Notes
                </h3>
              </div>
              <div className="view_wrapper-cardbox border px-0 py-0">
                <div className="properttxt-wrp notetxt--view-wrap">
                  <div className="propertyNote--area">
                    <div class="text-right">
                      <img src={Dotline} />
                    </div>
                    <span>10/24/2020</span>
                    <h3 className="">Send Direct Mail</h3>
                    <p>
                      Property is situated for a new development and there is a
                      new construciton down the block making it prime for
                      development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bgwhite mx-0">
        <div className="row">
          <div className="col-12 col-md-4 px-2">
            <div className="create-employee-header align-items-center">
              <h3 className="titleheader--card d-flex align-items-center">
                <img class="field-icon m-0 mr-2" src={realState} />
                Property Information
              </h3>
            </div>
            <div className="create-employee-wrapper border">
              <div class="create-employee-left row mx-0 flex-1">
                <div class="col-12 col-md-6 pr-1">
                  {property_labels_col_1.map((val, i) =>
                    unitInformation(val, "property_col_1")
                  )}
                </div>
                <div class="col-12 col-md-6 pr-1">
                  {property_labels_col_2.map((val, i) =>
                    unitInformation(val, "property_col_2")
                  )}
                </div>
                <div className="col-12">
                  {propertyLabels.map((val) => {
                    if (val.type == "Table") {
                      return (
                        <div class="form-group mt-1">
                          <div class="employee-field-label-wrapper">
                            <div class="property-field-label labelIcon-fill">
                              <i className={`${val.icon}`} />
                              {val.label}
                            </div>
                            {/* <span
                                  onClick={() =>
                                    removeItem("propertyLabels", val.id)
                                  }
                                  class="crossItem--link"
                                >
                                  <img className="m-0 ml-2" src={CrossItem} />
                                </span> */}
                          </div>
                          <div className="">
                            <div className="table-responsive">
                              <table className="table table--aprtment">
                                <thead>
                                  <tr>
                                    {val.object.map((head) => {
                                      return (
                                        <th>
                                          <span className="apart-th">
                                            {head.value}
                                          </span>
                                        </th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  {val.object[0].td.map((td, i) => {
                                    return (
                                      <>
                                        <tr>
                                          {val.object.map((head, index) => {
                                            // console.log(
                                            //   "hheadyy ------------->",
                                            //   val.object[i].td,
                                            //   i
                                            // );
                                            return (
                                              <td>
                                                <span className="apart-td">
                                                  {/* <input type="text"
                                                        value={head.td[i]}
                                                        className="form-control"
                                                        onChange={(e) => handleTableData(val.tempId, head, i, e.target.value, 'property')}
                                                      ></input> */}
                                                  {head.td[i] == ""
                                                    ? "-"
                                                    : head.td[i]}
                                                </span>
                                              </td>
                                            );
                                          })}
                                          {/* {i?
                                               <td onClick={(e) => removeTableRow(val.tempId, i, 'property')} className="align-middle"><span className="tabletrash--icon"><i class="fa fa-times-circle" aria-hidden="true"></i></span></td>
                                              :null} */}
                                        </tr>
                                      </>
                                    );
                                  })}

                                  {/* <div className="popup-btn">
                                        <div onClick={(e) => addTableRow(val.tempId, 'property')} className="btn-value btnadd-btn-custom-property add-table-btn px-2">
                                          <img src={addicon} className="m-0 mr-1" /> Add
                                        </div>
                                      </div> */}
                                  {/* <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 px-2">
            <div className="create-employee-header align-items-center">
              <h3 className="titleheader--card d-flex align-items-center">
                <img class="field-icon m-0 mr-2" src={FinancialNo} />
                Financial Information
              </h3>
            </div>
            <div className="create-employee-wrapper border">
              <div class="create-employee-left row mx-0 flex-1 ">
                <div class="col-12 pr-1">
                  {
                    financialLabels.map((val, i) =>
                      unitInformation(val, "financial")
                    )
                    // financialLabels.map(val => {
                    //   return (
                    //     <div class="form-group position-relative">
                    //       <div class="employee-field-label-wrapper">
                    //         <div class="property-field-label labelIcon-fill"><i className={`${val.icon}`} />{val.label}</div>
                    //       </div>
                    //       <input class="form-control input-field-control" type={val.type.value.toLowerCase()} placeholder={val.placeHolder} autocomplete="" value="" />
                    //       <span onClick={() => removeItem('financial', val.id)} class="crossItem--link"><img className="m-0 ml-2" src={CrossItem} /></span>
                    //     </div>
                    //   )
                    // })
                  }
                </div>
                <div className="col-12">
                  {financialLabels.map((val) => {
                    if (val.type == "Table") {
                      return (
                        <div class="form-group mt-5">
                          <div class="employee-field-label-wrapper">
                            <div class="property-field-label labelIcon-fill">
                              <i className={`${val.icon}`} />
                              {val.label}
                            </div>
                            {/* <span
                                  onClick={() =>
                                    removeItem("financial", val.id)
                                  }
                                  class="crossItem--link"
                                >
                                  <img className="m-0 ml-2" src={CrossItem} />
                                </span> */}
                          </div>
                          <div className="">
                            <div className="table-responsive">
                              <table className="table table--aprtment">
                                <thead>
                                  <tr>
                                    {val.object.map((head) => {
                                      return (
                                        <th>
                                          <span className="apart-th">
                                            {head.value}
                                          </span>
                                        </th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  {val.object[0].td.map((td, i) => {
                                    return (
                                      <>
                                        <tr>
                                          {val.object.map((head, index) => {
                                            // console.log(
                                            //   "hheadyy ------------->",
                                            //   val.object[i].td,
                                            //   i
                                            // );
                                            return (
                                              <td>
                                                <span className="apart-td">
                                                  {/* <input type="text"
                                                              value={head.td[i]}
                                                              onChange={(e) => handleTableData(val.tempId, head, i, e.target.value, 'unit')}
                                                            ></input> */}
                                                  {head.td[i] == ""
                                                    ? "-"
                                                    : head.td[i]}
                                                </span>
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      </>
                                    );
                                  })}

                                  {/* <div className="popup-btn">
                                              <div onClick={(e) => addTableRow(val.tempId, 'unit')} className="btn-value btnadd-btn-custom-property add-table-btn ">
                                                <img src={addicon} className="m-0" /> Add
                                            Table Row
                                        </div>
                                            </div> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                {/* <div class="col-12 px-1">
                      <div
                        className="right-wrapper text-right"
                        onClick={() => addcustomField("financial")}
                      >
                        <div className="popup-btn">
                          <div className="btn-value btnadd-btn-custom-property create-btn-btn">
                            <img src={addicon} className="m-0" /> Add Custom
                            Field
                          </div>
                        </div>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 px-2">
            <div className="create-employee-header align-items-center">
              <h3 className="titleheader--card d-flex align-items-center">
                <img class="field-icon m-0 mr-2" src={Uniform} />
                UnitInformation
              </h3>
            </div>
            <div className="create-employee-wrapper border">
              <div class="create-employee-left row flex-1 ">
                <div class="col-12 col-md-6 pr-1">
                  {unitLabels_col_1.map((val, i) =>
                    unitInformation(val, "unitLabels_col_1")
                  )}
                </div>
                <div class="col-12 col-md-6">
                  {unitLabels_col_2.map((val, i) =>
                    unitInformation(val, "unitLabels_col_2")
                  )}
                </div>

                <div className="col-12">
                  {unitLabels.map((val) => {
                    if (val.type == "Table") {
                      return (
                        <div class="form-group mt-5">
                          <div class="employee-field-label-wrapper">
                            <div class="property-field-label labelIcon-fill">
                              <i className={`${val.icon}`} />
                              {val.label}
                            </div>
                            {/* <span
                                  onClick={() =>
                                    removeItem("unitLabels", val.id)
                                  }
                                  class="crossItem--link"
                                >
                                  <img className="m-0 ml-2" src={CrossItem} />
                                </span> */}
                          </div>
                          <div className="">
                            <div className="table-responsive">
                              <table className="table table--aprtment">
                                <thead>
                                  <tr>
                                    {val.object.map((head) => {
                                      return (
                                        <th>
                                          <span className="apart-th">
                                            {head.value}
                                          </span>
                                        </th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  {val.object[0].td.map((td, i) => {
                                    return (
                                      <>
                                        <tr>
                                          {val.object.map((head, index) => {
                                            // console.log(val.object[i].td, i);
                                            return (
                                              <td>
                                                <span className="apart-td">
                                                  {/* <input type="text"
                                                        className="form-control"
                                                        value={head.td[i]}
                                                        onChange={(e) => handleTableData(val.tempId, head, i, e.target.value, 'unit')}
                                                      ></input> */}
                                                  {head.td[i] == ""
                                                    ? "-"
                                                    : head.td[i]}
                                                </span>
                                              </td>
                                            );
                                          })}
                                          {/* {i?
                                               <td onClick={(e) => removeTableRow(val.tempId, i, 'unit')} className="align-middle"><span className="tabletrash--icon"><i class="fa fa-times-circle" aria-hidden="true"></i></span></td>
                                              :null} */}
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                {/* <div class="col-12">
                      <div
                        className="right-wrapper text-right"
                        onClick={() => addcustomField("unit")}
                      >
                        <div className="popup-btn">
                          <div className="btn-value btnadd-btn-custom-property create-btn-btn">
                            <img src={addicon} className="m-0" /> Add Custom
                            Field
                          </div>
                        </div>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProperty;
