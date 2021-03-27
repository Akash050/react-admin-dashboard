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
import PropertImagesList from "../../../assets/images/propertyList-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { iconData } from "./iconData";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loading from "react-fullscreen-loading";
import Calendar from "react-calendar";
import swal from 'sweetalert';
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

import StatusWhite from "../../../assets/icons/status-icon-white.svg";
import HouseBlue from "../../../assets/icons/house-blue-icon.svg";
import SaleBlue from "../../../assets/icons/sale-blue-icon.svg";
import EscrowBlue from "../../../assets/icons/escrow-blue-icon.svg";
import PersonImage from "../../../assets/images/person-Image.png";
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
import CompanyblackIcon from "../../../assets/icons/company-black-icon.svg";

import FacebookIcon from "../../../assets/icons/facebook.svg";
import LinkIcon from "../../../assets/icons/linkedin.svg";
import TwitterIcon from "../../../assets/icons/twitter.svg";
import * as Validator from "validatorjs";
import CheckActive from "../../../assets/icons/check-active-icon.png";
import CheckInactive from "../../../assets/icons/check-inactive-icon.svg";
import {
  createProperty,
  updateProperty,
  uploadImage,
  getPropertyTemplates,
  deleteProperty
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
import { getAllProperties } from "../../../redux/actions/propertyAction";

const CreateProperty = () => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const profileImage = createRef();
  let history = useHistory();
  const [editData, setEditData] = useState(false);
  const [errorMsgInput, setErrorMsgInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isAddCustom, setIsAddCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNotesModal, setIsAddNotesModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [calanderValue, onCalanderChange] = useState(new Date());
  const [notesTitle, setNotesTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const [errorMsgPropertyStatus, setErrorMsgPropertyStatus] = useState("");
  const [errorMsgContact, setErrorMsgContact] = useState("");
  const [errorMsgAddress, setErrorMsgAddress] = useState("");
  const [errorMsgCity, setErrorMsgCity] = useState("");
  const [errorMsgCountry, setErrorMsgCountry] = useState("");
  const [errorMsgState, setErrorMsgState] = useState("");
  const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
  const [errorMsgLongitude, setErrorMsgLongitude] = useState("");
  const [errorMsgLatitude, setErrorMsgLatitude] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customTemplateName, setCustomTemplateName] = useState("");
  const [customTemplateUrl, setCustomTemplateUrl] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [cell, setCell] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyNotes, setPropertyNotes] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [attachmentList, setAttachmentList] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [imagesPreviewList, setImagesPreviewList] = useState([]);
  const [errorMsgIcon, setErrorMsgIcon] = useState("");
  const [errorMsgSelectIcon, setErrorMsgSelectIcon] = useState("");
  const [errorMsgLabelType, setErrorMsgLabelType] = useState("");
  const [errorMsgLabelName, setErrorMsgLabelName] = useState("");
  const [errorMsgListItem, setErrorMsgListItem] = useState("");
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
  const [propertyLabels, setPropertyLabels] = useState([]);
  const [property_labels_col_1, setPropertyLabels_col_1] = useState([]);
  const [property_labels_col_2, setPropertyLabels_col_2] = useState([]);
  const [financialLabels, setFinancialLabels] = useState([]);
  const [unitLabels, setUnitLabels] = useState([]);
  const [unitLabels_col_1, setUnitLabels_col_1] = useState([]);
  const [unitLabels_col_2, setUnitLabels_col_2] = useState([]);
  const [iconOptions, setIconOptions] = useState(iconData);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [iconToSave, setIconToSave] = useState("");
  const [selectedIconOptions, setSelectedIconOptions] = useState([]);
  const [selectedLabelType, setSelectedLabelType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [contactoptions, setContactoptions] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [customeTemplateName, setCustomeTemplateName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [templateUrl, setTemplateUrl] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [templateDiv, setTemplateDiv] = useState(false);

  const [radioItems, setRadioItems] = useState([
    { id: 1, name: "item #1", value: "" },
    { id: 2, name: "item #2", value: "" },
  ]);
  const [listItems, setListItems] = useState([
    { id: 1, name: "item #1", value: "", selected: false, val: '' },
    { id: 2, name: "item #2", value: "", selected: false, val: '' },
  ]);
  const [checkBoxItems, setCheckBoxItems] = useState([
    { id: 1, name: "item #1", value: "" },
    { id: 2, name: "item #2", value: "" },
  ]);
  const [tableHeading, setTableHeading] = useState([
    { id: 1, name: "heading #1", value: "Description", td: [""] },
    { id: 2, name: "heading #2", value: "No. Units", td: [""] },
    { id: 3, name: "heading #3", value: "Avg Rent/Month", td: [""] },
    { id: 4, name: "heading #4", value: "Sq. Foot", td: [""] },
  ]);

  const lablelTypeOptions = [
    "Text",
    "Number",
    "Date",
    "Radio",
    "Checkbox",
    "List",
    "Table"
  ];
  const [customTemplate, setCustomTemplate] = useState({
    name: "",
    propertyInformation: [],
    financialInformation: [],
    unitInformation: [],
  });

  const dispatch = useDispatch();
  const { propertyTemplate } = useSelector((state) => ({
    propertyTemplate: state.propertyTemplate,
  }));
  useEffect(() => {
    async function getTemplatePrperties() {
      dispatch(getPropertyTemplates(0, 1000, ""));
      setStates();
    }
    console.log('inside useefect')
    getTemplatePrperties();

  }, [isSave]);
  const handleOnClick = (val) => {
    setCustomTemplateName(val.name)
    setEditData(val);
    setTemplateId(val.id)
    setPropertyLabels(JSON.parse(val.propertyInformationJson))
    setFinancialLabels(JSON.parse(val.financialInformationJson))
    setUnitLabels(JSON.parse(val.unitInformationJson))
    setSelectedStep(1)
  }
  const setStates = () => {
    let propertyInfo = propertyTemplate.propertyInformationJson
    console.log('property', JSON.parse(propertyInfo))
    // setPropertyLabels(JSON.parse(propertyInfo))
  }
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
    setContactoptions(propertyTemplate);
  }, [propertyTemplate]);


  useEffect(() => {
    setIsLoading(true)
    setTimeout(function () {
      setIsLoading(false)
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
    setErrorMsgTemplateName("")
    setErrorMsgTemplateImage("")
    setErrorMsgSelectIcon("")
    setErrorMsgListItem("")
    setIconToSave("")
  }, [isAddModal, isAddCustom]);

  // useEffect(() => {
  //   console.log("props ->", history.location.pathname.split('/')[4])
  // }, []);

  const onNext = () => {
    setErrorMsgAddress("")
    setErrorMsgCity("")
    setErrorMsgState("")
    setErrorMsgZipcode("")
    setErrorMsgCountry("")
    setErrorMsgName("")
    setErrorMsgContact("")
    setErrorMsgPropertyStatus("")
    setErrorMsgLatitude("")
    setErrorMsgLongitude("")
    if (selectedStep == 1) {
      const params = {
        propertyName: propertyName,
        propertyStatus: {
          id: propertyStatus
        },
        contact: {
          id: selectedContact.id
        },
        address: address,
        state: state,
        city: city,
        country: country,
        zipCode: zipcode,
        longtitude: longitude,
        latitude: latitude,
        propertyNotes: propertyNotes,
        propertyInformation: [
          ...property_labels_col_1.map((val) => {
            return {
              tempId: val.tempId,
              label: val.label,
              type: val.type,
              value: val.value,
              placeHolder: val.placeHolder,
              icon: val.icon,
              object: val.object,
            };
          }),
          ...property_labels_col_2.map((val) => {
            return {
              tempId: val.tempId,
              label: val.label,
              type: val.type,
              icon: val.icon,
              value: val.value,
              placeHolder: val.placeHolder,
              object: val.object,
            };
          }),
        ],
        financialInformation: financialLabels.map((val) => {
          return {
            tempId: val.tempId,
            label: val.label,
            type: val.type,
            icon: val.icon,
            value: val.value,
            placeHolder: val.placeHolder,
            object: val.object,
          };
        }),
        unitInformation: [
          ...unitLabels_col_1.map((val) => {
            return {
              tempId: val.tempId,
              label: val.label,
              type: val.type,
              icon: val.icon,
              value: val.value,
              placeHolder: val.placeHolder,
              object: val.object,
            };
          }),
          ...unitLabels_col_2.map((val) => {
            return {
              tempId: val.tempId,
              label: val.label,
              type: val.type,
              icon: val.icon,
              value: val.value,
              placeHolder: val.placeHolder,
              object: val.object,
            };
          }),
        ],
      };
      const rules = {
        propertyName: "required",
        propertyStatus: {
          id: "required"
        },
        contact: {
          id: "required"
        },
        address: "required",
        state: "required",
        city: "required",
        country: "required",
        zipCode: "required",
        longtitude: "required",
        latitude: "required",
      };
      let propertyNameValidation = new Validator(params, rules, {
        required: "Property name is required",
      });
      let propertyStatusValidation = new Validator(params, rules, {
        required: "Property status is required",
      });
      let contactValidation = new Validator(params, rules, {
        required: "Contact is required",
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
      let longitudeValidation = new Validator(params, rules, {
        required: "Longitude is required",
      });
      let latitudeValidation = new Validator(params, rules, {
        required: "Latitude is required",
      });
      console.log("params", params);
      //return;
      if (propertyNameValidation.fails()) {
        if (propertyNameValidation.errors.first("propertyName")) {
          console.log("name", propertyNameValidation.errors.first("propertyName"));
          setErrorMsgName(propertyNameValidation.errors.first("propertyName"));
        }
      }
      if (propertyStatusValidation.fails()) {
        if (propertyStatusValidation.errors.first("propertyStatus.id")) {
          console.log("name", propertyStatusValidation.errors.first("propertyStatus.id"));
          setErrorMsgPropertyStatus(propertyStatusValidation.errors.first("propertyStatus.id"));
        }
      }
      if (contactValidation.fails()) {
        if (contactValidation.errors.first("contact.id")) {
          console.log("name", contactValidation.errors.first("contact.id"));
          setErrorMsgContact(contactValidation.errors.first("contact.id"));
        }
      }
      if (addressValidation.fails()) {
        console.log("addressValidation", addressValidation);
        setIsLoading(false);
        console.log(addressValidation);
        if (addressValidation.errors.first("address")) {
          setErrorMsgAddress(
            addressValidation.errors.first("address")
          );
        }
      }
      if (cityValidation.fails()) {
        setIsLoading(false);
        if (cityValidation.errors.first("city")) {
          setErrorMsgCity(
            cityValidation.errors.first("city")
          );
        }
      }
      if (countryValidation.fails()) {
        setIsLoading(false);
        if (countryValidation.errors.first("country")) {
          setErrorMsgCountry(
            countryValidation.errors.first("country")
          );
        }
      }
      if (stateValidation.fails()) {
        setIsLoading(false);
        if (stateValidation.errors.first("state")) {
          setErrorMsgState(
            stateValidation.errors.first("state")
          );
        }
      }
      if (zipcodeValidation.fails()) {
        setIsLoading(false);
        if (zipcodeValidation.errors.first("zipCode")) {
          setErrorMsgZipcode(
            zipcodeValidation.errors.first("zipCode")
          );
        }
      }
      if (longitudeValidation.fails()) {
        setIsLoading(false);
        if (longitudeValidation.errors.first("longtitude")) {
          setErrorMsgLongitude(
            longitudeValidation.errors.first("longtitude")
          );
        }
      }
      if (latitudeValidation.fails()) {
        setIsLoading(false);
        if (latitudeValidation.errors.first("latitude")) {
          setErrorMsgLatitude(
            latitudeValidation.errors.first("latitude")
          );
        }
      }

      // if (!addressValidation.fails()) {
      //   setSelectedStep(selectedStep + 1);
      // }
      setSelectedStep(selectedStep + 1);
    }

    if (selectedStep != 1) {
      setErrorMsgInput("required")
      setIsTouched(true)
      setSelectedStep(selectedStep + 1);
    }

    // return
    if (selectedStep >= 3) {
      return;
    }

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
    if (customeTemplateName == '') {
      setErrorMsgTemplateName('Template Name Required')
      return
    }
    if (previewUrl == '') {
      setErrorMsgTemplateImage('Template Image Required')
      return
    }
    setSelectedStep(1)
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
  const onSubmit = async () => {
    console.log("cistoo ->", customeTemplateName)
    console.log("cistoo -tt>", customTemplateName)
    setIsLoading(true)
    setIsSave(true)
    const params = {
      id: templateId,
      name: customeTemplateName,
      propertyInformation: propertyLabels,
      financialInformation: financialLabels.map((val) => {
        return {
          value: val.value,
          placeHolder: val.placeHolder,
          tempId: val.tempId,
          label: val.label,
          type: val.type,
          icon: val.icon,
          object: val.object,
        };
      }),
      unitInformation: [
        ...unitLabels_col_1.map((val) => {
          return {
            value: val.value,
            placeHolder: val.placeHolder,
            tempId: val.tempId,
            label: val.label,
            type: val.type,
            icon: val.icon,
            object: val.object,
          };
        }),
        ...unitLabels_col_2.map((val) => {
          return {
            value: val.value,
            placeHolder: val.placeHolder,
            tempId: val.tempId,
            label: val.label,
            type: val.type,
            icon: val.icon,
            object: val.object,
          };
        }),
      ],
    };
    console.log("parmass -->", params);

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
      setSelectedStep(0)
      setIsLoading(false)
      swal('Template Updated Successfully', {
        icon: "success",
      });
      if (templateUrl != "") {
        let formData = new FormData();
        formData.append("image", templateUrl);
        if (data.body != null) {
          const uploadData = await dispatch(
            uploadImage(data.body.id, formData)
          );
          setIsSave(false)
        }
      }
      //dispatch(created(true));
      // history.push("user/properties");
    } else {
      setIsLoading(false)
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
    if ((listType == "checkbox") && (type == 'property_col_1' || type == 'property_col_2')) {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[listIndex].selected;
      setPropertyLabels(temp)
    }
    else if ((listType == "checkbox") && (type == 'financial')) {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[listIndex].selected;
      setFinancialLabels(temp)
    }
    else if ((listType == "checkbox") && (type == 'unitLabels_col_1' || type == 'unitLabels_col_2')) {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.id == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[listIndex].selected;
      setUnitLabels(temp)
    }
    else if ((listType == "radio") && (type == 'property_col_1' || type == 'property_col_2')) {
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
      setPropertyLabels(temp)
    }
    else if ((listType == "radio") && (type == 'financial')) {
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
      setFinancialLabels(temp)
    }
    else if ((listType == "radio") && (type == 'unitLabels_col_1' || type == 'unitLabels_col_2')) {
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
      setUnitLabels(temp)
    }

  };
  console.log(" lllabbba  -->", propertyLabels)
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
          {selectedStep != 3 ?
            <span
              onClick={() => removeItem(type, val.tempId)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
            : null

          }
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
          {selectedStep != 3 ?
            <span
              onClick={() => removeItem(type, val.tempId)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
            : null

          }
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
          {selectedStep != 3 ?
            <span
              onClick={() => removeItem(type, val.tempId)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
            : null

          }
          {/* <span
            onClick={() => removeItem(type, val.tempId)}
            class="crossItem--link"
          >
            <img className="m-0 ml-2" src={CrossItem} />
          </span> */}
          <div className="ul-Listmore">
            <ul className="mb-0 checkList--bulletpoint">
              {val.object.map((item) => {
                return (
                  <li className="multilist--items">
                    {item.value}
                  </li>
                );
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
          {selectedStep != 3 ?
            <span
              onClick={() => removeItem(type, val.tempId)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
            : null

          }

        </div>
      );
    }
  };

  let handleNotesSubmit = () => {
    let obj = {
      title: notesTitle,
      description: notesDescription,
      date: calanderValue,
    };
    setPropertyNotes([...propertyNotes, obj]);
    setNotesTitle("");
    setNotesDescription("");
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
    }
    else if (
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
      value: '',
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
      { id: 1, name: "item #1", value: "", selected: false, val: '' },
      { id: 2, name: "item #2", value: "", selected: false, val: '' },
    ]);
    setTableHeading([
      { id: 1, name: "heading #1", value: "Description", td: [""] },
      { id: 2, name: "heading #3", value: "No. Units", td: [""] },
      { id: 3, name: "heading #4", value: "Avg Rent/Month", td: [""] },
      { id: 4, name: "heading #5", value: "Sq. Foot", td: [""] },
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
      selected: false,
      val: ''
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
    if (name == "Table") {
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
      td: [""]
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

  let MouseOver = (event) => {
    event.target.style.opacity = '0.3'
  }
  let MouseOut = (event) => {
    event.target.style.opacity = '1';
  }

  let MouseMainOver = (event) => {

    event.target.parentNode.parentNode.parentNode.style.opacity = '0.3'
    event.target.parentNode.parentNode.style.opacity = '1'
    event.target.parentNode.style.color = 'black'
  }
  let MouseMainOut = (event) => {
    // event.target.parentNode.parentNode.parentNode.style.opacity = '1'
    event.target.parentNode.parentNode.style.opacity = '0'
    // event.target.parentNode.style.color = 'black'
  }

  let openEditTemplate = (val) => {
    console.log("vval -->", val)
    setCustomeTemplateName(val.name)
    setPreviewUrl(val.image)
    setEditData(val);
    setTemplateId(val.id)
    setPropertyLabels(JSON.parse(val.propertyInformationJson))
    setFinancialLabels(JSON.parse(val.financialInformationJson))
    setUnitLabels(JSON.parse(val.unitInformationJson))
    setIsAddCustom(true)
  }

  let onDeleteTemplate = (val) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        setIsLoading(true)
        if (willDelete) {
          const data = await dispatch(deleteProperty(val.id));
          if (data.success === true) {
            setIsLoading(false)
            setSelectedStep(0)
            swal("Contact Deleted Successfully!", {
              icon: "success",
            });
          } else {
            setIsLoading(false)
            swal(data.message, {
              icon: "error",
            });
          }
        } else {
          setIsLoading(false)
          // swal("Your imaginary file is safe!");
        }
      });
  }
  console.log('selectedstep', selectedStep)
  return (
    <>
      {isLoading ? <Loading loading loaderColor="#3498db" /> : null}
      {selectedStep == 0 ? null :
        <>
          <div className="property_steps">
            <div
              onClick={onPrevious}
              className="btn-value btnadd-btn-custom-property step-btn-btn"
            >
              <img src={arrowLeft} className="m-0 mr-2" />
              Previous Step
            </div>
            <div className="steps_progress">
              <span
                className={`steps_unit ${selectedStep == 1 || selectedStep == 2 || selectedStep == 3 ? "active_step" : null
                  } `}
              >
                1
              </span>
              <span
                className={`steps_unit ${selectedStep > 1 ? "active_step" : null
                  } `}
              >
                2
              </span>
              <span
                className={`steps_unit ${selectedStep > 2 ? "active_step" : null
                  } `}
              >
                3
              </span>
            </div>
            {selectedStep == "3" ? (
              <div
                onClick={onSubmit}
                className="btn-value btnadd-btn-custom-property step-btn-btn "
              >
                <img src={SaveIcon} className="m-0 mr-2" />
                Save
              </div>
            ) : (
                <div
                  onClick={onNext}
                  className="btn-value btnadd-btn-custom-property step-btn-btn "
                >
                  Next Step
                  <img src={arrowRight} className="m-0 ml-2" />
                </div>
              )}
          </div>
        </>
      }
      {selectedStep == "0" ? (
        <>
          <div className="property-card border-0 card-heightbody">
            <div className="card-body">
              <div className="row rowList-mx">

                {
                  propertyTemplate.map(val => {
                    return (
                      <>
                        <div
                          // onMouseOver={(e) => MouseOver(e)} onMouseOut={(e) => MouseOut(e)}
                          className="col-12 col-lg-4 pxLIst--img choose_action"
                        ///onClick={() => handleOnClick(val)}
                        >
                          <div className="properties---columnImg ">
                            <img

                              className="Img--view-property"
                              src={val ? val.image : PropertImagesList}
                            />
                            <h4 className="headTitle--propert">{val.name}</h4>
                            <div
                              // onMouseOver={(e) => MouseMainOver(e)} onMouseOut={(e) => MouseMainOut(e)}
                              className="template_action">
                              {/* <span  className="trashIcon--img"><i class="fa fa-trash-o ml-2" aria-hidden="true"></i></span> */}
                              <div class="boxwigit--baredit">
                                <span className="icon-Edit--tem mr-2" onClick={() => openEditTemplate(val)}><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></span>
                                <span className="icon-delt--tem" onClick={() => onDeleteTemplate(val)} ><i class="fa fa-trash fa-2x" aria-hidden="true"></i></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <CModal
            show={isAddCustom}
            centered={true}
            onClose={() => setIsAddCustom(false)}
            className="modalContact--body"
          >
            <div className="modal-header">
              <span class="arrowPLus--icon"><svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5446 5.47348H6.18497V8.60273C6.18497 8.76871 6.11418 8.9279 5.98817 9.04527C5.86216 9.16264 5.69125 9.22858 5.51305 9.22858C5.33484 9.22858 5.16393 9.16264 5.03792 9.04527C4.91191 8.9279 4.84112 8.76871 4.84112 8.60273V5.47348H1.4815C1.30329 5.47348 1.13238 5.40754 1.00637 5.29017C0.880362 5.1728 0.80957 5.01361 0.80957 4.84763C0.80957 4.68164 0.880362 4.52245 1.00637 4.40508C1.13238 4.28771 1.30329 4.22178 1.4815 4.22178H4.84112V1.09253C4.84112 0.926539 4.91191 0.767352 5.03792 0.649982C5.16393 0.532612 5.33484 0.466675 5.51305 0.466675C5.69125 0.466675 5.86216 0.532612 5.98817 0.649982C6.11418 0.767352 6.18497 0.926539 6.18497 1.09253V4.22178H9.5446C9.7228 4.22178 9.89371 4.28771 10.0197 4.40508C10.1457 4.52245 10.2165 4.68164 10.2165 4.84763C10.2165 5.01361 10.1457 5.1728 10.0197 5.29017C9.89371 5.40754 9.7228 5.47348 9.5446 5.47348Z" fill="#3062FF"></path> </svg></span>
              <div
                style={{
                  alignSelf: "center",
                  fontWeight: "600",
                  marginLeft: "10px",
                }}
              >
                {" "}
                Add Template
              </div>
            </div>
            <div className="userCreat--card">
              <div className="social-media-modal m-0">
                <div className="form-group">
                  <div className="employee-field-label titleUser-head">
                    <div className="create-contact-label">Template Name</div>
                    <CInput
                      type="text"
                      value={customeTemplateName}
                      placeholder=""
                      className="input-field-control"
                      onChange={(e) => setCustomeTemplateName(e.target.value)}
                    />
                  </div>
                  <label
                    className={`error ${errorMsgTemplateName ? null : "errorFill"
                      } `}
                  >
                    {errorMsgTemplateName}
                  </label>
                </div>
                <div className="form-group">
                  <div className="employee-field-label titleUser-head">
                    <div className="create-contact-label">Template Image</div>
                    <div
                      className="form-file"
                      style={{ height: "0px !important" }}
                    >
                      <input
                        type="file"
                        multiple
                        class="form-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={onTemplateImageChange}
                      />
                      <span class="uploadprofile">
                        <img src={upload} className="m-0 mr-2" />
                        Upload
                      </span>
                    </div>
                  </div>
                  <label
                    className={`error ${errorMsgTemplateImage ? null : "errorFill"
                      } `}
                  >
                    {errorMsgTemplateImage}
                  </label>
                </div>
                {previewUrl ?
                  <div>
                    <CImg src={previewUrl} fluid className="" />
                  </div>
                  : null}
                <div className="form-group text-right mb-0 mt-5">
                  <button type='button' class="button--cancel" style={{ marginTop: '5px' }} onClick={() => setIsAddCustom(false)}>Cancel</button>
                  <CButton
                    color="primary"
                    className="login-btn px-4 ml-2"
                    onClick={handleTemplateSubmit}
                  >
                    Next
                  </CButton>
                </div>
              </div>
            </div>
          </CModal>
        </>
      ) : selectedStep == "1" ? (
        <>
          <div className="bgwhite mx-0">
            <div className="row">
              <div className="col-12 col-md-3 px-2">
                <div className="cardBox mb-3">
                  <div class="create-contact-header align-items-center">
                    <h3 class="titleheader--card d-flex align-items-center">
                      <img src={PropetyName} />
                      Property Name
                    </h3>
                  </div>
                  <div className="create-employee-wrapper border px-0 py-3">
                    <div className="form-group col-12 mb-0">
                      <CInput
                        disabled={true}
                        type="text"
                        placeholder="Input Title"
                        className="input-field-control"
                        onChange={(e) => setPropertyName(e.target.value)}
                      />
                      {/* <label
                        className={`error ${errorMsgName ? null : "errorFill"
                          } `}
                      >
                        {errorMsgName ? errorMsgName : null}
                      </label> */}
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
                          <div className="d-flex justify-content-between border repccur-box align-items-center">
                            <div className="re-occuring">
                              <CImg
                                src={HouseBlue}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label">Held</div>
                            </div>
                            <input
                              disabled={true}
                              type="radio"
                              name="radio"
                              onClick={() => setPropertyStatus(1)}
                              checked={propertyStatus == 1 ? true : false}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 pl-2">
                          <div className="d-flex justify-content-between repccur-box align-items-center">
                            <div className="re-occuring">
                              <CImg
                                src={SaleBlue}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label">
                                For Sale
                              </div>
                            </div>
                            <input
                              disabled={true}
                              type="radio"
                              name="radio"
                              onClick={() => setPropertyStatus(2)}
                              checked={propertyStatus == 2 ? true : false}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="d-flex justify-content-between repccur-box mb-0 align-items-center">
                            <div className="re-occuring">
                              <CImg
                                src={EscrowBlue}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label">Escrow</div>
                            </div>
                            <input
                              disabled={true}
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
                      Ownership{" "}
                    </h3>
                  </div>
                  <div className="create-employee-wrapper border px-0 py-3">
                    <div className="form-group col-12 mb-0">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <Autocomplete
                              disabled={true}
                              options={contactoptions}
                              onChange={(e, v) => handleContactChange(e, v)}
                              getOptionLabel={(option) => option.name}
                              //value={contactoptions.find(v => v.name == `${selectedContact ? selectedContact.name : ''}`) || {}}

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
                                    placeholder="Search Contact"
                                    {...params.inputProps}
                                  />
                                  {/* <label
                                    className={`error ${errorMsgContact ? null : "errorFill"
                                      } `}
                                  >
                                    {errorMsgContact ? errorMsgContact : null}
                                  </label> */}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-12 text-right">
                          <div
                            className="btn-value btnadd-btn-custom-property create-btn-btn create-btn-btn"
                          >
                            <img src={addicon} className="m-0" /> Add Contact
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex align-items-center">
                            {selectedContact == "" ? null : (
                              <>
                                <div className="OwnerImg">
                                  <img
                                    src={`${selectedContact.profileImage
                                      ? selectedContact.profileImage
                                      : PersonImage
                                      }`}
                                  />
                                </div>
                                <div className="OwnerTXt">
                                  <h3>{selectedContact.name}</h3>
                                  <span>Agriculture Firm</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cardBox">
                  <div class="create-contact-header align-items-center">
                    <h3 class="titleheader--card d-flex align-items-center">
                      <img src={StatusWhite} />
                      Property Notes
                    </h3>
                  </div>
                  <div className="create-employee-wrapper border px-0 py-3">
                    <div className="form-group col-12 mb-0 text-left">
                      <div
                        // onClick={() => setIsAddNotesModal(true)}
                        className="btn-value btnadd-btn-custom-property create-btn-btn create-btn-btn"
                      >
                        <img src={addicon} className="m-0" /> Add Note
                      </div>
                      <div className="properttxt-wrp">
                        <div className="propertyNote--area">
                          <div class="text-right">
                            <img src={Dotline} />
                          </div>
                          <span>{'10/24/2021'}</span>
                          <h3 className="">{'Send Direct Mail'}</h3>
                          <p>
                            {`Property is Situated for a new development and there is a new
                              construction down the block making it prime for development`}
                          </p>
                        </div>
                      </div>
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
                    </div>
                  </div>
                </div>
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
                                  <img
                                    src={CompanyblackIcon}
                                    className="m-0 mr-2"
                                  />{" "}
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
                                    src={CompanyblackIcon}
                                    className="m-0 mr-2"
                                  />{" "}
                                  Description
                                </div>
                              </div>
                              <CInput
                                type="text"
                                name="username"
                                className="input-addtaskcontrol"
                                onChange={(e) =>
                                  setNotesDescription(e.target.value)
                                }
                                value={notesDescription}
                                placeholder=" Input Description  "
                              />
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
                      <CButton
                        color="primary"
                        className="login-btn px-4"
                        onClick={handleNotesSubmit}
                      >
                        <img src={SaveIcon} className="m-0 mr-2" /> Save
                      </CButton>
                    </div>
                  </CForm>
                </CModal>
              </div>
              <div className="col-12 col-md-6 px-2">
                <div className="cardBox mb-3">
                  <div class="create-contact-header align-items-center">
                    <h3 class="titleheader--card d-flex align-items-center">
                      <img src={PropetyName} />
                      Location
                    </h3>
                  </div>
                  <div className="create-employee-wrapper border px-0 py-3 text-left flex-column">
                    <div className="form-group col-12">
                      <div className="employee-field-label-wrapper">
                        <div className="employee-field-label">
                          Search Location
                        </div>
                      </div>
                      <CInput
                        disabled={true}
                        type="text"
                        placeholder="Enter Name"
                        className="input-field-control"
                        onChange={(e) => setLocationName(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={AddresIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Address
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgAddress ? null : "errorFill"
                                } `}
                            >
                              {errorMsgAddress ? errorMsgAddress : null}
                            </label> */}
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={CityIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                City
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setCity(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgCity ? null : "errorFill"
                                } `}
                            >
                              {errorMsgCity ? errorMsgCity : null}
                            </label> */}
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={CountryIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Country
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setCountry(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgCountry ? null : "errorFill"
                                } `}
                            >
                              {errorMsgCountry ? errorMsgCountry : null}
                            </label> */}
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={StateIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                State
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setState(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgState ? null : "errorFill"
                                } `}
                            >
                              {errorMsgState ? errorMsgState : null}
                            </label> */}
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={ZipIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Zip Code
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setZipCode(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgZipcode ? null : "errorFill"
                                } `}
                            >
                              {errorMsgZipcode ? errorMsgZipcode : null}
                            </label> */}
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={ZipIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Longitude
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setLongitude(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgLongitude ? null : "errorFill"
                                } `}
                            >
                              {errorMsgLongitude ? errorMsgLongitude : null}
                            </label> */}
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={ZipIcon}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Latitude
                              </div>
                            </div>
                            <CInput
                              disabled={true}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setLatitude(e.target.value)}
                            />
                            {/* <label
                              className={`error ${errorMsgLatitude ? null : "errorFill"
                                } `}
                            >
                              {errorMsgLongitude ? errorMsgLongitude : null}
                            </label> */}
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="map-Section">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7360.098188652584!2d75.87940952740583!3d22.72641654041531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd4773f75357%3A0xd4c16ad55b02adbe!2sNew%20Palasia%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1616328002332!5m2!1sen!2sin" width="100%" height="350" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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
                  <div className="create-employee-wrapper border py-3 attachment-container">
                    {/* <div className="form-group col-12 mb-0">
                        <div class="upload-fileatach">
                          <span>
                            <img src={upload} className="m-0 mr-2" />
                              Upload
                          </span>
                        </div>
                      </div> */}
                    <div class="form-file border-0">
                      <input
                        disabled={true}
                        type="file"
                        multiple
                        class="form-file-input"
                        id="customFile"
                        accept="application/pdf,  application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint"
                      // onChange={onAttachmentChange}
                      />
                      <span class="uploadprofile">
                        <img src={upload} className="m-0 mr-2" />
                        Upload
                      </span>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <div class="row attachments">
                        <div className="form-group col-4 mb-0">
                          <img
                            src={pdf}
                            className=""
                          />
                        </div>
                        <div className="form-group col-4 mb-0">
                          <img
                            src={word}
                            className=""
                          />
                        </div>
                        <div className="form-group col-4 mb-0">
                          <img
                            src={xml}
                            className=""
                          />
                        </div>
                        {/* {attachmentList.map((val) => {
                          return (
                            <div className="form-group col-4 mb-0">
                              <img
                                src={`${val.type == "application/msword"
                                  ? word
                                  : val.type == "application/pdf"
                                    ? pdf
                                    : xml
                                  }`}
                                className=""
                              />
                            </div>
                          );
                        })} */}

                        {/* <div className="form-group col-4 mb-0" >
                            <img src={pdf} className="" />
                          </div>
                          <div className="form-group col-4 mb-0" >
                            <img src={word} className="" />
                          </div>
                          <div className="form-group col-4 mb-0" >
                            <img src={xml} className="" />
                          </div> */}
                      </div>
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
                  <div className="create-employee-wrapper border py-3 attachment-container">
                    <div className="form-group col-12 mb-0">
                      {/* <div class="upload-fileatach">
                          <span>
                            <img src={upload} className="m-0 mr-2" />
                              Upload
                          </span>
                        </div> */}
                      <div class="form-file border-0">
                        <input
                          disabled={true}
                          type="file"
                          multiple
                          class="form-file-input"
                          id="customFile"
                          accept="image/*"
                        // onChange={onImageChange}
                        />
                        <span class="uploadprofile">
                          <img src={upload} className="m-0 mr-2" />
                          Upload
                        </span>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <div class="row attachments mx-0">
                        <div className="px-1 col-md-6 col-12">
                          <img src={ImageFile1} className="image_attachment" />
                        </div>
                        <div className="px-1 col-md-6 col-12">
                          <img src={ImageFile2} className="image_attachment" />
                        </div>
                        <div className="px-1 col-md-4 col-12">
                          <img src={ImageFile1} className="image_attachment" />
                        </div>
                        <div className="px-1 col-md-4 col-12">
                          <img src={ImageFile2} className="image_attachment" />
                        </div>
                        <div className="px-1 col-md-4 col-12">
                          <img src={ImageFile2} className="image_attachment" />
                        </div>
                        {/* {imagesPreviewList.map((url) => {
                          return (
                            <div className="form-group col-6 mb-0">
                              <img src={url} className="image_attachment" />
                            </div>
                          );
                        })} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : selectedStep == "2" ? (
        <>
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
                    <div class="col-12 col-md-6 px-1 columgroup--step-2">
                      {
                        property_labels_col_1.map((val, i) =>
                          unitInformation(val, "property_col_1")
                        )
                      }
                    </div>
                    <div class="col-12 col-md-6 px-1 columgroup--step-2">
                      {
                        property_labels_col_2.map((val, i) =>
                          unitInformation(val, "property_col_2")
                        )
                      }
                    </div>
                    <div className="col-12 px-1 columgroup--step-2">
                      {propertyLabels.map((val) => {
                        if (val.type == "Table") {
                          return (
                            <div class="form-group position-relative">
                              <div class="employee-field-label-wrapper">
                                <div class="property-field-label labelIcon-fill">
                                  <i className={`${val.icon}`} />
                                  {val.label}
                                </div>
                                <span
                                  onClick={() =>
                                    removeItem("propertyLabels", val.tempId)
                                  }
                                  class="crossItem--link"
                                >
                                  <img className="m-0 ml-2" src={CrossItem} />
                                </span>
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
                                                {head}
                                              </span>
                                            </th>
                                          );
                                        })}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                      <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div class="col-12 px-1">
                      <div
                        className="right-wrapper text-right"
                        onClick={() => addcustomField("property")}
                      >
                        <div className="popup-btn">
                          <div className="btn-value btnadd-btn-custom-property create-btn-btn">
                            <img src={addicon} className="m-0" /> Add Custom Field
                          </div>
                        </div>
                      </div>
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
                    <div class="col-12 px-1 columgroup--step-2">
                      {financialLabels.map((val, i) =>
                        unitInformation(val, "financial")
                      )}
                    </div>
                    <div className="col-12 px-1 columgroup--step-2">
                      {financialLabels.map((val) => {
                        if (val.type == "Table") {
                          return (
                            <div class="form-group position-relative">
                              <div class="employee-field-label-wrapper">
                                <div class="property-field-label labelIcon-fill">
                                  <i className={`${val.icon}`} />
                                  {val.label}
                                </div>
                                <span
                                  onClick={() =>
                                    removeItem("financial", val.tempId)
                                  }
                                  class="crossItem--link"
                                >
                                  <img className="m-0 ml-2" src={CrossItem} />
                                </span>
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
                                      <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                      <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div class="col-12 px-1">
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
                    </div>
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
                  <div class="create-employee-left mx-0 row flex-1 ">
                    <div class="col-12 col-md-6 px-1 columgroup--step-2">
                      {unitLabels_col_1.map((val, i) =>
                        unitInformation(val, "unitLabels_col_1")
                      )}
                    </div>
                    <div class="col-12 col-md-6 px-1 columgroup--step-2">
                      {unitLabels_col_2.map((val, i) =>
                        unitInformation(val, "unitLabels_col_2")
                      )}
                    </div>

                    <div className="col-12 px-1 columgroup--step-2">
                      {unitLabels.map((val) => {
                        if (val.type == "Table") {
                          return (
                            <div class="form-group position-realtive">
                              <div class="employee-field-label-wrapper">
                                <div class="property-field-label labelIcon-fill">
                                  <i className={`${val.icon}`} />
                                  {val.label}
                                </div>
                                <span
                                  onClick={() =>
                                    removeItem("unitLabels", val.tempId)
                                  }
                                  class="crossItem--link"
                                >
                                  <img className="m-0 ml-2" src={CrossItem} />
                                </span>
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
                                      <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                      <tr>
                                        {val.object.map((head) => {
                                          return (
                                            <td>
                                              <span className="apart-td">
                                                -
                                              </span>
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div class="col-12">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CModal
            show={isAddModal}
            centered={true}
            onClose={() => setIsAddModal(false)}
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
                  {" "}
                  <span class="arrowPLus--icon">
                    <svg
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5446 5.47348H6.18497V8.60273C6.18497 8.76871 6.11418 8.9279 5.98817 9.04527C5.86216 9.16264 5.69125 9.22858 5.51305 9.22858C5.33484 9.22858 5.16393 9.16264 5.03792 9.04527C4.91191 8.9279 4.84112 8.76871 4.84112 8.60273V5.47348H1.4815C1.30329 5.47348 1.13238 5.40754 1.00637 5.29017C0.880362 5.1728 0.80957 5.01361 0.80957 4.84763C0.80957 4.68164 0.880362 4.52245 1.00637 4.40508C1.13238 4.28771 1.30329 4.22178 1.4815 4.22178H4.84112V1.09253C4.84112 0.926539 4.91191 0.767352 5.03792 0.649982C5.16393 0.532612 5.33484 0.466675 5.51305 0.466675C5.69125 0.466675 5.86216 0.532612 5.98817 0.649982C6.11418 0.767352 6.18497 0.926539 6.18497 1.09253V4.22178H9.5446C9.7228 4.22178 9.89371 4.28771 10.0197 4.40508C10.1457 4.52245 10.2165 4.68164 10.2165 4.84763C10.2165 5.01361 10.1457 5.1728 10.0197 5.29017C9.89371 5.40754 9.7228 5.47348 9.5446 5.47348Z"
                        fill="#3062FF"
                      />{" "}
                    </svg>
                  </span>{" "}
                  Add Custom Field
                </div>
              </div>

              <div className="modal-body bodymodal--pading">
                <div className="col-12 px-0">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group tasklabel--fill">
                        <div className="field-label">
                          <div
                            style={{
                              alignSelf: "center",
                              marginLeft: "10px",
                            }}
                          >
                            Search Icon Database
                          </div>
                        </div>
                        <Autocomplete
                          options={iconOptions}
                          onChange={(e, v) => handleIconChange(e, v)}
                          getIconLabel={(option) => option}
                          value={
                            iconOptions.find((v) => v == selectedIcon) || {}
                          }
                          renderInput={(params) => (
                            <div
                              ref={params.InputProps.ref}
                              className="inputcustom--fill"
                            >
                              <input
                                {...params}
                                label=""
                                variant="outlined"
                                type="text"
                                {...params.inputProps}
                                className="form-control input-field-control propertyTxt--inputcall"
                              />
                            </div>
                          )}
                        />
                        <label
                          className={`error ${errorMsgIcon ? null : "errorFill"
                            } `}
                        >
                          {errorMsgIcon}
                        </label>
                      </div>
                      <div className="form-group tasklabel--fill">
                        <div className="field-label">
                          <div
                            style={{
                              alignSelf: "center",
                              marginLeft: "10px",
                            }}
                          >
                            Label Value Type
                          </div>
                        </div>
                        <Autocomplete
                          options={lablelTypeOptions}
                          onChange={(e, v) => handleLabelTypeChange(e, v)}
                          getOptionLabel={(option) => option}
                          value={
                            lablelTypeOptions.find(
                              (v) =>
                                v ==
                                `${selectedLabelType
                                  ? selectedLabelType
                                  : ""
                                }`
                            ) || ""
                          }
                          renderInput={(params) => (
                            <div
                              ref={params.InputProps.ref}
                              className="inputcustom--fill"
                            >
                              <input
                                {...params}
                                label=""
                                variant="outlined"
                                type="text"
                                {...params.inputProps}
                                className="form-control input-field-control propertyTxt--inputcall"
                              />
                            </div>
                          )}
                        />
                        <label
                          className={`error ${errorMsgLabelType ? null : "errorFill"
                            } `}
                        >
                          {errorMsgLabelType}
                        </label>
                      </div>
                      <div className="form-group tasklabel--fill">
                        <div className="field-label">
                          <div
                            style={{
                              alignSelf: "center",
                              marginLeft: "10px",
                            }}
                          >
                            Input Label
                          </div>
                        </div>
                        <CInput
                          type="text"
                          name="username"
                          className="input-addtaskcontrol"
                          onChange={handleLabelChange}
                          value={labelInput}
                          placeholder="Add Label"
                          className="form-control input-field-control propertyTxt--inputcall"
                        />
                        <label
                          className={`error ${errorMsgLabelName ? null : "errorFill"
                            } `}
                        >
                          {errorMsgLabelName}
                        </label>
                      </div>
                      {selectedLabelType != null ? (
                        (selectedLabelType != null &&
                          selectedLabelType == "Radio") ||
                          selectedLabelType == "List" ||
                          selectedLabelType == "Date" ||
                          selectedLabelType == "Checkbox" ||
                          selectedLabelType == "Table" ? null : (
                            <>
                              <div className="form-group tasklabel--fill">
                                <div className="field-label">
                                  <div
                                    style={{
                                      alignSelf: "center",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    Place Holder
                            </div>
                                </div>
                                <CInput
                                  type="text"
                                  name="username"
                                  className="input-addtaskcontrol"
                                  onChange={(e) => setPlaceHolder(e.target.value)}
                                  value={placeHolder}
                                  placeholder="Add Place Holder"
                                />
                              </div>
                            </>
                          )
                      ) : null}
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="form-group tasklabel--fill">
                        <div class="formIcon--view cutom--margin-top">
                          {selectedIconOptions
                            ? selectedIconOptions.map((icon) => {
                              return (
                                <>
                                  <span class="iconList--gridcustom">
                                    <i
                                      onClick={() => handleSelectedIcon(icon)}
                                      className={`${icon} fa-2x`}
                                    ></i>
                                    {iconToSave == icon ? (
                                      <i class="ml-2 far checkIcon--viewCustom fa-check-circle text-success"></i>
                                    ) : null}
                                  </span>
                                </>
                              );
                            })
                            :
                            null}
                        </div>
                        <label
                          className={`error ${errorMsgSelectIcon ? null : "errorFill"
                            } `}
                        >
                          {errorMsgSelectIcon}
                        </label>
                      </div>
                      {selectedLabelType != null ? (
                        (selectedLabelType != null &&
                          selectedLabelType == "Radio") ||
                          selectedLabelType == "List" ||
                          selectedLabelType == "Checkbox" ? (
                            <>
                              {listItems.map((val, i) => {
                                return (
                                  <div className="form-group tasklabel--fill">
                                    <div className="field-label">
                                      <div
                                        style={{
                                          alignSelf: "center",
                                          fontWeight: "600",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {val.name}
                                        <span
                                          onClick={() =>
                                            removeListItem(val.id, "radio")
                                          }
                                        >
                                          <img
                                            className="m-0 ml-2"
                                            src={CrossItem}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <CInput
                                      type="text"
                                      name="username"
                                      className="input-addtaskcontrol"
                                      onChange={(e) =>
                                        onListValueChange(
                                          e.target.value,
                                          val.id,
                                          "radio"
                                        )
                                      }
                                      value={val.value}
                                      placeholder="Add Labe"
                                      className="form-control input-field-control propertyTxt--inputcall"
                                    />
                                  </div>
                                );
                              })}
                              <label
                                className={`error ${errorMsgListItem ? null : "errorFill"
                                  } `}
                              >
                                {errorMsgListItem}
                              </label>
                              <div
                                className="right-wrapper text-right"
                                onClick={() => addListItem("radio")}
                              >
                                <div className="popup-btn">
                                  <div className="btn-value btnadd-btn-custom-property add-list-item ">
                                    <img src={addicon} className="m-0" /> Add List
                                  Item
                                </div>
                                </div>
                              </div>
                            </>
                          ) : selectedLabelType == "Table" ? (
                            <>
                              {tableHeading.map((val, i) => {
                                return (
                                  <div className="form-group tasklabel--fill">
                                    <div className="field-label">
                                      <div
                                        style={{
                                          alignSelf: "center",
                                          fontWeight: "600",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {val.name}
                                        <span
                                          onClick={() => removeTableItem(val.id)}
                                        >
                                          <img
                                            className="m-0 ml-2"
                                            src={CrossItem}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <CInput
                                      type="text"
                                      name="username"
                                      className="input-addtaskcontrol"
                                      onChange={(e) =>
                                        onListValueChange(
                                          e.target.value,
                                          val.id,
                                          "table"
                                        )
                                      }
                                      value={val.value}
                                      placeholder="Add Label"
                                    />
                                  </div>
                                );
                              })}
                              <div
                                className="right-wrapper text-right"
                                onClick={addTableHeading}
                              >
                                <div className="popup-btn">
                                  <div className="btn-value btnadd-btn-custom-property add-table-btn ">
                                    <img src={addicon} className="m-0" /> Add
                                  Table Heading
                                </div>
                                </div>
                              </div>
                            </>
                          ) : null
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="text-right">
                        <CButton
                          onClick={() => setIsAddModal(false)}
                          className="login-btn button--cancel mt-0 mr-2"
                        >
                          Cancel
                        </CButton>
                        <CButton
                          color="primary"
                          className="login-btn px-4"
                          onClick={handleSubmit}
                        >
                          <img class="m-0 mr-2" src={SaveIcon} />
                          Save
                        </CButton>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </CForm>
          </CModal>
        </>
      ) : (
              <>
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
                                <div className="d-flex justify-content-between border repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <CImg
                                      src={HouseBlue}
                                      fluid
                                      className="field-icon"
                                    />
                                    <div className="employee-field-label">Held</div>
                                  </div>
                                  <input
                                    type="radio"
                                    name="radio"
                                    disabled={true}
                                  // onClick={() => setPropertyStatus(1)}
                                  // checked={propertyStatus == 1 ? true : false}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6 pl-2">
                                <div className="d-flex justify-content-between repccur-box align-items-center">
                                  <div className="re-occuring">
                                    <CImg
                                      src={SaleBlue}
                                      fluid
                                      className="field-icon"
                                    />
                                    <div className="employee-field-label">
                                      For Sale
                                  </div>
                                  </div>
                                  <input
                                    type="radio"
                                    name="radio"
                                  // onClick={() => setPropertyStatus(2)}
                                  // checked={propertyStatus == 2 ? true : false}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-between repccur-box mb-0 align-items-center">
                                  <div className="re-occuring">
                                    <CImg
                                      src={EscrowBlue}
                                      fluid
                                      className="field-icon"
                                    />
                                    <div className="employee-field-label">Escrow</div>
                                  </div>
                                  <input
                                    type="radio"
                                    name="radio"
                                  // onClick={() => setPropertyStatus(3)}
                                  // checked={propertyStatus == 3 ? true : false}
                                  />
                                </div>
                              </div>
                            </div>
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
                                        <td>Kyle Kelley</td>
                                        <td>
                                          <img src={cellIcon} />
                                        </td>
                                        <td>Cell:</td>
                                        <td>Kyle Kelley</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={CompanyblackIcon} />
                                        </td>
                                        <td>Company:</td>
                                        <td>Kyle Kelley</td>
                                        <td>
                                          <img src={officeIcon} />
                                        </td>
                                        <td>Office:</td>
                                        <td>Kyle Kelley</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={Department} />
                                        </td>
                                        <td>Division:</td>
                                        <td>Kyle Kelley</td>
                                        <td>
                                          <img src={emailIcon} />
                                        </td>
                                        <td>Email:</td>
                                        <td>Kyle Kelley</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={NameIcon} />
                                        </td>
                                        <td>Name:</td>
                                        <td>Kyle Kelley</td>
                                        <td>
                                          <img src={AddresIcon} />
                                        </td>
                                        <td>Address:</td>
                                        <td>
                                          Kyle Kelley
                                  </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={tagIcon} />
                                        </td>
                                        <td>Tag:</td>
                                        <td>Kyle Kelley</td>
                                        <td>
                                          <img src={CityIcon} />
                                        </td>
                                        <td>City:</td>
                                        <td>
                                          Kyle Kelley
                                  </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={Status} />
                                        </td>
                                        <td>Status:</td>
                                        <td>
                                          Kyle Kelley
                                  </td>
                                        <td>
                                          <img src={CountryIcon} />
                                        </td>
                                        <td>Country:</td>
                                        <td>
                                          Kyle Kelley
                                  </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={StateIcon} />
                                        </td>
                                        <td>State:</td>
                                        <td>
                                          Kyle Kelley
                                  </td>
                                        <td>
                                          <img src={ZipIcon} />
                                        </td>
                                        <td>ZipCode:</td>
                                        <td>
                                          Kyle Kelley
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
                      <div className="cardBox">
                        <div class="create-contact-header align-items-center">
                          <h3 class="titleheader--card d-flex align-items-center">
                            <img src={StatusWhite} />
                      Property Notes
                    </h3>
                        </div>
                        <div className="properttxt-wrp">
                          <div className="propertyNote--area">
                            <div class="text-right">
                              <img src={Dotline} />
                            </div>
                            <span>10/24/2021</span>
                            <h3 className="">{'Send Direct Mail'}</h3>
                            <p>
                              {`Property is Situated for a new development and there is a new
                              construction down the block making it prime for development`}
                            </p>
                          </div>
                        </div>
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
                                    <CImg
                                      src={AddresIcon}
                                      fluid
                                      className="field-icon"
                                    />{" "}
                              Map
                            </div>
                                  <div className="map-frame mt-3">
                                    <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14692.157769046667!2d76.05078355!3d22.98557705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1615654169403!5m2!1sen!2sin"
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
                                      <img src={AddresIcon} /> <b>Address </b>:{" "}
                                      {'Limoges France'}
                                    </li>
                                    <li className="listmap--info">
                                      <img src={CityIcon} /> <b>City </b>: {'France'}
                                    </li>
                                    <li className="listmap--info">
                                      <img src={CountryIcon} /> <b>Country </b>:{"Franced"}
                                      {country}
                                    </li>
                                    <li className="listmap--info">
                                      <img src={StateIcon} /> <b>State </b>: {"Nouvelle"}
                                    </li>
                                    <li className="listmap--info">
                                      <img src={ZipIcon} /> <b>Zip Code </b>:{"9501"}
                                      {zipcode}
                                    </li>
                                    <li className="listmap--info">
                                      <img src={ZipIcon} /> <b>Longitude </b>:{"45.44455"}
                                      {longitude}
                                    </li>
                                    <li className="listmap--info">
                                      <img src={ZipIcon} /> <b>Latitude </b>:{"34.45345"}
                                      {latitude}
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
                            <div class="attachment--file">
                              <span className="attacmentImg_btn">
                                <img src={pdf} className="m-0 mr-2 attacImg--step3" />{" "}
                                {'calculation.pdf'}
                              </span>
                            </div>
                            <div class="attachment--file">
                              <span className="attacmentImg_btn">
                                <img src={word} className="m-0 mr-2 attacImg--step3" />{" "}
                                {'calculation.word'}
                              </span>
                            </div>
                            <div class="attachment--file">
                              <span className="attacmentImg_btn">
                                <img src={xml} className="m-0 mr-2 attacImg--step3" />{" "}
                                {'calculation.xml'}
                              </span>
                            </div>
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
                          <div className="col-12 px-1">
                            <div class="fileImage--main">
                              <img src={ImageFile1} className="m-0" />
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 px-1">
                            <div class="fileImage--main">
                              <img src={ImageFile2} className="m-0" />
                            </div>
                            <div class="fileImage--main">
                              <img src={ImageFile1} className="m-0" />
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 px-1">
                            <div class="fileImage--main">
                              <img src={ImageFile1} className="m-0" />
                            </div>
                          </div>
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
                            {
                              property_labels_col_1.map((val, i) =>
                                unitInformation(val, "property_col_1")
                              )
                            }
                          </div>
                          <div class="col-12 col-md-6 pr-1">
                            {
                              property_labels_col_2.map((val, i) =>
                                unitInformation(val, "property_col_2")
                              )
                            }
                          </div>
                          <div className="col-12">
                            {propertyLabels.map((val) => {
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
                                            <tr>
                                              {val.object.map((head) => {
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      -
                                              </span>
                                                  </td>
                                                );
                                              })}
                                            </tr>
                                            <tr>
                                              {val.object.map((head) => {
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      -
                                              </span>
                                                  </td>
                                                );
                                              })}
                                            </tr>
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
                                            <tr>
                                              {val.object.map((head) => {
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      -
                                              </span>
                                                  </td>
                                                );
                                              })}
                                            </tr>
                                            <tr>
                                              {val.object.map((head) => {
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      -
                                              </span>
                                                  </td>
                                                );
                                              })}
                                            </tr>
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
                                            <tr>
                                              {val.object.map((head) => {
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      -
                                              </span>
                                                  </td>
                                                );
                                              })}
                                            </tr>
                                            <tr>
                                              {val.object.map((head) => {
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      -
                                              </span>
                                                  </td>
                                                );
                                              })}
                                            </tr>
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
            )}
    </>
  );
};

export default CreateProperty;
