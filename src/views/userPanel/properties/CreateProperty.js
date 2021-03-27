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
import axios from 'axios'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
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
import attachment from "../../../assets/images/attachment.png";
import lat from "../../../assets/images/lat.png";
import lng from "../../../assets/images/lng.png";
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
import notes_title from "../../../assets/icons/notes_title.svg";
import notes_description from "../../../assets/icons/notes_description.svg";
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
import blueBtn from "../../../assets/icons/save-full-blue.svg";
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
import { getPropertyTemplates } from "../../../redux/actions/propertyTemplateAction";

import {
  uploadImage,
  uploadAttachment,
  createProperty,
} from "../../../redux/actions/propertyAction";
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
import { objectOf } from "prop-types";

const CreateProperty = () => {
  Geocode.setApiKey("AIzaSyAfqpVg9bvou1GZte3HrAqK2Oo0lY4AAII");
  Geocode.setLocationType("ROOFTOP");
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const profileImage = createRef();
  let history = useHistory();
  const [errorMsgInput, setErrorMsgInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [createData, setCreateData] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isAddCustom, setIsAddCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNotesModal, setIsAddNotesModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [calanderValue, onCalanderChange] = useState(new Date());
  const [notesTitle, setNotesTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customTemplateName, setCustomTemplateName] = useState("");
  const [customTemplateUrl, setCustomTemplateUrl] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [cell, setCell] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("1");
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
  const [errorMsgNotesTitle, setErrorMsgNotesTitle] = useState("");
  const [errorMsgNotesDescription, setErrorMsgNotesDescription] = useState("");
  const [errorMsgPropertyStatus, setErrorMsgPropertyStatus] = useState("");
  const [errorMsgContact, setErrorMsgContact] = useState("");
  const [errorMsgAddress, setErrorMsgAddress] = useState("");
  const [errorMsgCity, setErrorMsgCity] = useState("");
  const [errorMsgCountry, setErrorMsgCountry] = useState("");
  const [errorMsgState, setErrorMsgState] = useState("");
  const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
  const [errorMsgLongitude, setErrorMsgLongitude] = useState("");
  const [errorMsgLatitude, setErrorMsgLatitude] = useState("");
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
  const [showTemplateModal, setShowTemplateModal] = useState(false);
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
  const { propertyTemplate } = useSelector((state) => ({
    propertyTemplate: state.propertyTemplate,
  }));
  const { userContacts } = useSelector((state) => ({
    userContacts: state.userContacts,
  }));
  useEffect(() => {
    async function getTemplatePrperties() {
      dispatch(getPropertyTemplates(0, 1000, ""));
    }
    console.log("inside useefect");
    getTemplatePrperties();
  }, []);

  const onTemplateImageChange = (event) => {
    setTemplateUrl(event.target.files[0]);
    var url = URL.createObjectURL(event.target.files[0]);
    setPreviewUrl(url);
  };
  const handleOnClick = (val) => {
    setCreateData(val);
    setPropertyLabels(JSON.parse(val.propertyInformationJson));
    setFinancialLabels(JSON.parse(val.financialInformationJson));
    setUnitLabels(JSON.parse(val.unitInformationJson));
    setSelectedStep(1);
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
    setErrorMsgNotesTitle("");
    setErrorMsgNotesDescription("");
  }, [isAddModal, isAddCustom, isAddNotesModal]);

  // useEffect(() => {
  //   console.log("props ->", history.location.pathname.split('/')[4])
  // }, []);

  const onNext = () => {
    setErrorMsgAddress("");
    setErrorMsgCity("");
    setErrorMsgState("");
    setErrorMsgZipcode("");
    setErrorMsgCountry("");
    setErrorMsgName("");
    setErrorMsgContact("");
    setErrorMsgPropertyStatus("");
    setErrorMsgLatitude("");
    setErrorMsgLongitude("");
    if (selectedStep == 1) {
      const params = {
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
          id: "required",
        },
        contact: {
          id: "required",
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
          console.log(
            "name",
            propertyNameValidation.errors.first("propertyName")
          );
          setErrorMsgName(propertyNameValidation.errors.first("propertyName"));
        }
      }
      if (propertyStatusValidation.fails()) {
        if (propertyStatusValidation.errors.first("propertyStatus.id")) {
          console.log(
            "name",
            propertyStatusValidation.errors.first("propertyStatus.id")
          );
          setErrorMsgPropertyStatus(
            propertyStatusValidation.errors.first("propertyStatus.id")
          );
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
          setErrorMsgAddress(addressValidation.errors.first("address"));
        }
      }
      if (cityValidation.fails()) {
        setIsLoading(false);
        if (cityValidation.errors.first("city")) {
          setErrorMsgCity(cityValidation.errors.first("city"));
        }
      }
      if (countryValidation.fails()) {
        setIsLoading(false);
        if (countryValidation.errors.first("country")) {
          setErrorMsgCountry(countryValidation.errors.first("country"));
        }
      }
      if (stateValidation.fails()) {
        setIsLoading(false);
        if (stateValidation.errors.first("state")) {
          setErrorMsgState(stateValidation.errors.first("state"));
        }
      }
      if (zipcodeValidation.fails()) {
        setIsLoading(false);
        if (zipcodeValidation.errors.first("zipCode")) {
          setErrorMsgZipcode(zipcodeValidation.errors.first("zipCode"));
        }
      }
      if (longitudeValidation.fails()) {
        setIsLoading(false);
        if (longitudeValidation.errors.first("longtitude")) {
          setErrorMsgLongitude(longitudeValidation.errors.first("longtitude"));
        }
      }
      if (latitudeValidation.fails()) {
        setIsLoading(false);
        if (latitudeValidation.errors.first("latitude")) {
          setErrorMsgLatitude(latitudeValidation.errors.first("latitude"));
        }
      }

      if (!addressValidation.fails()) {
        setSelectedStep(selectedStep + 1);
      }
    }

    if (selectedStep != 1) {
      setErrorMsgInput("required");
      setIsTouched(true);
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

  // console.log("attachement list", attachmentList)

  const handleDeleteFile = () => {
    console.log('delete selected file')
  }

  const handleTemplateSubmit = () => {
    console.log("temp name ->", customeTemplateName);
    console.log("url -->", previewUrl);
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
          type: val.type,
          icon: val.icon,
          object: val.object,
        };
      });
    }
    if (property_labels_col_2.length) {
      property_labels_col_2.map((val) => {
        return {
          label: val.label,
          type: val.type,
          icon: val.icon,
          object: val.object,
        };
      });
    }
    // console.log(property_labels_col_2)
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const params = {
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
      propertyNotes: propertyNotes,
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
    console.log("Image list -->", imagesList);
    console.log("ATTACH list -->", attachmentList);

    // return
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
    const data = await dispatch(createProperty(params));
    // console.log("created property", data);
    if (data.success === true) {
      if (imagesList.length) {
        let formData = new FormData();
         await  imagesList.map(async(val, i) => {
          await formData.append("files", val);
        });
        if (data.body != null) {
          let imagedata = await dispatch(uploadImage(data.body.id, formData));
        }
        //setImagesList([])
      }

      if (attachmentList.length) {
        let formData = new FormData();
        await attachmentList.map(async(val) => {
         await  formData.append("files", val);
        });
        if (data.body != null) {
          await dispatch(uploadAttachment(data.body.id, formData));
        }
      //  setAttachmentList([])
        //setSelectedStep(0);
      }
      history.push("/user/properties");
      setIsLoading(false);
      swal("Created Successfully", {
        icon: "success",
      });
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

  let onCustomItemClick = (id, inputType, type, value) => {
    if (type == "property_col_1" || type == "property_col_2") {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].value = value;
      console.log("objj ->", objIndex, temp[objIndex]);
      setPropertyLabels(temp);
    } else if (type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].value = value;
      console.log("objj ->", objIndex, temp[objIndex]);
      setFinancialLabels(temp);
    } else if (type == "unitLabels_col_1" || type == "unitLabels_col_2") {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].value = value;
      console.log("objj ->", objIndex, temp[objIndex]);
      setUnitLabels(temp);
    }
  };

  let onCustomListClick = (id, item_id, listType, type) => {
    if (
      listType == "Checkbox" &&
      (type == "property_col_1" || type == "property_col_2")
    ) {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      let listIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == item_id
      );
      temp[objIndex].object[listIndex].selected = !temp[objIndex].object[
        listIndex
      ].selected;
      setPropertyLabels(temp);
    } else if (listType == "Checkbox" && type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
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
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
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
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
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
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
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
      console.log("listType -33>", unitLabels, id);
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
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
  let handleListValueChange = (e, v, val, type) =>{
    if(v == null){
     return
    }
    if(type == "property_col_1" || type == "property_col_2"){
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == val.tempId);
      temp[objIndex].value = v.value
      setPropertyLabels(temp);
 
    }else if(type == "unitLabels_col_1" || type == "unitLabels_col_2"){
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == val.tempId);
      temp[objIndex].value = v.value
      setUnitLabels(temp);

    }else if(type = 'financial'){
      console.log("vv -->>", v)
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == val.tempId);
      temp[objIndex].value = v.value
      console.log("tempn-->, ", temp)
      setFinancialLabels(temp);
    }

  }

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
                          onCustomListClick(val.tempId, item.id, "Radio", type)
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
                          onCustomListClick(
                            val.tempId,
                            item.id,
                            "Checkbox",
                            type
                          )
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
      console.log("val.object  list-->", val)
      console.log("val.object object  list-->", val.object)
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
          </div>
          <Autocomplete
            options={val.object}
            onChange={(e, v) => handleListValueChange(e, v, val, type)}
            getOptionLabel={(option) => option.value}
            //value = {val.object.value}
            value={val.object.find(v => v.value == val.value) || {}}

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
                  placeholder={val.placeHolder}
                  {...params.inputProps}
                />
              </div>
            )}
          />
        </div>
      );
    } else if (
      val.type == "Text" ||
      val.type == "Number" ||
      val.type == "Date"
    ) {
      // console.log("item -->", item.value)
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
          </div>
          <input
            value={val.value}
            onChange={(e) =>
              onCustomItemClick(val.tempId, val.type, type, e.target.value)
            }
            class="form-control input-field-control propertyTxt--inputcall"
            type={`${val.type == "Date"
              ? "date"
              : val.type == "Number"
                ? "number"
                : "text"
              }`}
            placeholder={val.placeHolder}
            autocomplete=""
          />
        </div>
      );
    }
  };
  let handleNotesSubmit = () => {
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
    setPropertyNotes([...propertyNotes, obj]);
    setNotesTitle("");
    setNotesDescription("");
    setErrorMsgNotesTitle("");
    setErrorMsgNotesDescription("");
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
      value: "",
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

  let handleTableData = (id, table, index, value, type) => {
    if (type == "unit") {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      let tableIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == table.id
      );
      unitLabels[objIndex].object[tableIndex].td[index] = value;
      setUnitLabels(temp);
    } else if (type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      let tableIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == table.id
      );
      financialLabels[objIndex].object[tableIndex].td[index] = value;
      setFinancialLabels(temp);
    } else if (type == "property") {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      let tableIndex = temp[objIndex].object.findIndex(
        (obj) => obj.id == table.id
      );
      propertyLabels[objIndex].object[tableIndex].td[index] = value;
      setPropertyLabels(temp);
    }
  };

  let addTableRow = (id, type) => {
    if (type == "unit") {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].object.map((val) => {
        val.td.push("");
      });
      setUnitLabels(temp);
    } else if (type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].object.map((val) => {
        val.td.push("");
      });
      setFinancialLabels(temp);
    } else if (type == "property") {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].object.map((val) => {
        val.td.push("");
      });
      setPropertyLabels(temp);
    }
  };

  let removeTableRow = (id, index, type) => {
    if (index == 0) {
      return;
    }
    if (type == "unit") {
      let temp = [...unitLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].object.map((val) => {
        val.td.splice(index, 1);
      });
      setUnitLabels(temp);
    } else if (type == "financial") {
      let temp = [...financialLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      console.log("tyemp =>", temp[objIndex].object);
      temp[objIndex].object.map((val) => {
        val.td.splice(index, 1);
      });
      setFinancialLabels(temp);
    } else if (type == "property") {
      let temp = [...propertyLabels];
      let objIndex = temp.findIndex((obj) => obj.tempId == id);
      temp[objIndex].object.map((val) => {
        val.td.splice(index, 1);
      });
      setPropertyLabels(temp);
    }
  };

  const deleteAttachment = async (id, type) => {
    if (type == 'image') {
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this !",
          icon: "warning",
          cancelBtnBsStyle : "red",
          confirmButtonColor: "#DD6B55",
          buttons: true,
          dangerMode: true,
        })
          .then(async (willDelete) => {
            setIsLoading(true)
            if (willDelete) {
                let temp = await imagesPreviewList.filter((ele) => ele != id )
                setImagesPreviewList(temp)
                setIsLoading(false)
                swal("Deleted Successfully!", {
                  icon: "success",
                });
            } else {
              setIsLoading(false)
              // swal("Your imaginary file is safe!");
            }
          });
    }
    else if (type == 'attachment') {
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this !",
          icon: "warning",
          cancelBtnBsStyle : "red",
          confirmButtonColor: "#DD6B55",
          buttons: true,
          dangerMode: true,
        })
          .then(async (willDelete) => {
            setIsLoading(true)
            if (willDelete) {
                let temp = await attachmentList.filter((ele) => ele != id )
                console.log("temp -0---?", temp)
                setAttachmentList(temp)
                setIsLoading(false)
                swal("Deleted Successfully!", {
                  icon: "success",
                });
            } else {
              setIsLoading(false)
              // swal("Your imaginary file is safe!");
            }
          });
    }
  }

  let onBack = () => {
    onSubmit();
    // history.push("/admin/employees");
  };

  let handlelocationChange = address => {
    console.log("adress  -->", address)
    setLocationName(address)
    // setZipCode('')
  };

  let handlelocationSelect = address => {
    geocodeByAddress(address)
      // .then(results => console.log(results))
      // .catch(error => console.error('Error', error));
      .then(async results => {
        const latLng = await getLatLng(results[0]);
        const place_id = results[0].place_id
        const [place] = await geocodeByPlaceId(place_id);
        const { long_name: postalCode = '' } =
          place.address_components.find(c => c.types.includes('postal_code')) || {};
        console.log("place", place);
        console.log(" -?", latLng)
        setLatitude(latLng.lat)
        setLongitude(latLng.lng)
        Geocode.fromLatLng(latLng.lat, latLng.lng).then(
          (response) => {
            const address = response.results[0].formatted_address;
            let city, state, country;
            for (let i = 0; i < response.results[0].address_components.length; i++) {
              for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_1":
                    state = response.results[0].address_components[i].long_name;
                    break;
                  case "country":
                    country = response.results[0].address_components[i].long_name;
                    break;
                }
              }
            }
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=%27+${city}+%27&sensor=false&key=AIzaSyAfqpVg9bvou1GZte3HrAqK2Oo0lY4AAII`)
            .then(res =>{
              console.log("ress ->", res.data.results[0].address_components)
              res.data.results[0].address_components.map(zip =>{
                if(zip.types.includes('postal_code')){
                  setZipCode(zip.long_name)
                  console.log("zipp =>", zip.long_name)
                }
              })
            })
            setCity(city)
            setState(state)
            setCountry(country)
            console.log("filter",city, state, country);
          //  console.log(address);
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <>
      {isLoading ? <Loading loading loaderColor="#3498db" /> : null}
      {selectedStep == 0 ? null : (
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
                className={`steps_unit ${selectedStep == 1 || selectedStep == 2 || selectedStep == 3
                  ? "active_step"
                  : null
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
      )}
      {selectedStep == "0" ? (
        <div className="property-card border-0 card-heightbody">
          <div className="card-body">
            <div className="row rowList-mx">
              {propertyTemplate.map((val) => {
                return (
                  <div
                    className="col-12 col-lg-4 pxLIst--img choose_action"
                    onClick={() => handleOnClick(val)}
                  >
                    <div className="properties---columnImg">
                      <img
                        className="Img--view-property"
                        src={val ? val.image : PropertImagesList}
                      />
                      <h4 className="headTitle--propert">{val.name}</h4>
                      {/* <span className="trashIcon--img"><i class="fa fa-trash-o" aria-hidden="true"></i></span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
                        value={propertyName}
                        type="text"
                        placeholder="Input Title"
                        className="input-field-control"
                        onChange={(e) => setPropertyName(e.target.value)}
                      />
                      <label
                        className={`error ${errorMsgName ? null : "errorFill"
                          } `}
                      >
                        {errorMsgName ? errorMsgName : null}
                      </label>
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
                              <div className="employee-field-label">
                                For Sale
                              </div>
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
                      <label
                        className={`error ${errorMsgPropertyStatus ? null : "errorFill"
                          } `}
                      >
                        {errorMsgPropertyStatus ? errorMsgPropertyStatus : null}
                      </label>
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
                              options={contactoptions}
                              onChange={(e, v) => handleContactChange(e, v)}
                              getOptionLabel={(option) => option.name}
                              value={
                                contactoptions.find(
                                  (v) =>
                                    v.name ==
                                    `${selectedContact
                                      ? selectedContact.name
                                      : ""
                                    }`
                                ) || {}
                              }
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
                                  <label
                                    className={`error ${errorMsgContact ? null : "errorFill"
                                      } `}
                                  >
                                    {errorMsgContact ? errorMsgContact : null}
                                  </label>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-12 text-right">
                          <div
                            className="btn-value btnadd-btn-custom-property create-btn-btn create-btn-btn"
                            onClick={() => history.push("/user/contact/create")}
                          >
                            <img src={addicon} className="m-0" /> Add Contact
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex align-items-center">
                            {selectedContact == "" ||
                              selectedContact == null ? null : (
                              <>
                                <div className="OwnerImg">
                                  <img
                                    src={`${selectedContact
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
                        onClick={() => setIsAddNotesModal(true)}
                        className="btn-value btnadd-btn-custom-property   create-btn-btn create-btn-btn"
                      >
                        <img src={addicon} className="m-0" /> Add Note
                      </div>
                      {/* <div className="properttxt-wrp">
                        <div className="propertyNote--area">
                          <div class="text-right">
                            <img src={Dotline} />
                          </div>
                          <span>{"10/24/2021"}</span>
                          <h3 className="">{"Send Direct Mail"}</h3>
                          <p>
                            {`Property is Situated for a new development and there is a new
                              construction down the block making it prime for development`}
                          </p>
                        </div>
                      </div> */}
                      {propertyNotes.map((val) => {
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
                      })}
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
                      <PlacesAutocomplete
                        value={locationName}
                        onChange={handlelocationChange}
                        onSelect={handlelocationSelect}
                      //searchOptions={{ types: ['address'] }}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                              className = "search_location"
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      {/* <CInput
                        value={locationName}
                        type="text"
                        placeholder="Enter Name"
                        className="input-field-control"
                        onChange={(e) => setLocationName(e.target.value)}
                      /> */}
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
                              value={address}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgAddress ? null : "errorFill"
                                } `}
                            >
                              {errorMsgAddress ? errorMsgAddress : null}
                            </label>
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
                              disabled = {true}
                              value={city}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setCity(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgCity ? null : "errorFill"
                                } `}
                            >
                              {errorMsgCity ? errorMsgCity : null}
                            </label>
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
                              value={country}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setCountry(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgCountry ? null : "errorFill"
                                } `}
                            >
                              {errorMsgCountry ? errorMsgCountry : null}
                            </label>
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
                              disabled = {true}
                              value={state}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setState(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgState ? null : "errorFill"
                                } `}
                            >
                              {errorMsgState ? errorMsgState : null}
                            </label>
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
                              // disabled = {true}
                              value={zipcode}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setZipCode(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgZipcode ? null : "errorFill"
                                } `}
                            >
                              {errorMsgZipcode ? errorMsgZipcode : null}
                            </label>
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={lng}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Longitude
                              </div>
                            </div>
                            <CInput
                              disabled = {true}
                              value={longitude}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setLongitude(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgLongitude ? null : "errorFill"
                                } `}
                            >
                              {errorMsgLongitude ? errorMsgLongitude : null}
                            </label>
                          </div>
                          <div className="form-group">
                            <div className="employee-field-label-wrapper d-flex align-items-center">
                              <CImg
                                src={lat}
                                fluid
                                className="field-icon"
                              />
                              <div className="employee-field-label titleUser-head">
                                Latitude
                              </div>
                            </div>
                            <CInput
                              disabled = {true}
                              value={latitude}
                              type="text"
                              placeholder=""
                              className="input-field-control"
                              onChange={(e) => setLatitude(e.target.value)}
                            />
                            <label
                              className={`error ${errorMsgLatitude ? null : "errorFill"
                                } `}
                            >
                              {errorMsgLongitude ? errorMsgLongitude : null}
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="map-Section">
                            <iframe
                              src={`https://www.google.com/maps?q=${city} %26 ${locationName}, &output=embed`}
                              width="100%"
                              height="350"
                              frameborder="0"
                              style={{ border: 0 }}
                              allowfullscreen=""
                              aria-hidden="false"
                              tabindex="0"
                            ></iframe>
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
                        type="file"
                        multiple
                        class="form-file-input"
                        id="customFile"
                        accept="application/pdf,  application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint"
                        onChange={onAttachmentChange}
                      />
                      <span class="uploadprofile">
                        <img src={upload} className="m-0 mr-2" />
                        Upload
                      </span>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <div class="row attachments">
                        {/* <div className="form-group col-4 mb-0">
                          <img src={pdf} className="" />
                        </div>
                        <div className="form-group col-4 mb-0">
                          <img src={word} className="" />
                        </div>
                        <div className="form-group col-4 mb-0">
                          <img src={xml} className="" />
                        </div> */}
                        {attachmentList.map((val) => {
                          
                          return (
                            <div className="form-group col-4 mb-0">
                              <div className="properties---columnImg borderattach-0">
                                <img
                                  src={`${val.type == "application/msword"
                                    ? word
                                    : val.type == "application/pdf"
                                      ? pdf
                                      : xml
                                    }`}
                                  className="m-0"
                                />
                                <div className="template_action">
                                  <div class="boxwigit--baredit">
                                    {/* <span className="icon-Edit--tem mr-1">
                                    <i
                                      class="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                  </span> */}
                                    <span onClick={() => deleteAttachment(val, 'attachment')} className="icon-delt--tem">
                                      <i
                                        class="fa fa-trash fa-2x"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

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
                          type="file"
                          multiple
                          class="form-file-input"
                          id="customFile"
                          accept="image/*"
                          onChange={onImageChange}
                        />
                        <span class="uploadprofile">
                          <img src={upload} className="m-0 mr-2" />
                          Upload
                        </span>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <div class="row attachments mx-0">
                        {/* <div className="px-1 col-md-6 col-12">
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
                        </div> */}
                        {imagesPreviewList.map((url) => {
                          return (
                            <div className="form-group col-6 mb-0 px-1">
                              <div className="properties---columnImg borderattach-0">
                                <img
                                  src={url}
                                  className="image_attachment m-0"
                                />
                                <div className="template_action">
                                  <div class="boxwigit--baredit">
                                    {/* <span className="icon-Edit--tem mr-1">
                                      <i
                                        class="fa fa-download"
                                        aria-hidden="true"
                                      ></i>
                                    </span> */}
                                    <span
                                      onClick={() => deleteAttachment(url, 'image')}
                                      className="icon-delt--tem">
                                      <i
                                        class="fa fa-trash fa-2x"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
                      {property_labels_col_1.map((val, i) =>
                        unitInformation(val, "property_col_1")
                      )}
                    </div>
                    <div class="col-12 col-md-6 px-1 columgroup--step-2">
                      {property_labels_col_2.map((val, i) =>
                        unitInformation(val, "property_col_2")
                      )}
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
                                {/* <span
                                  onClick={() =>
                                    removeItem("propertyLabels", val.tempId)
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
                                                console.log(
                                                  "hheadyy ------------->",
                                                  val.object[i].td,
                                                  i
                                                );
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      <input
                                                        type="text"
                                                        value={head.td[i]}
                                                        className="form-control"
                                                        onChange={(e) =>
                                                          handleTableData(
                                                            val.tempId,
                                                            head,
                                                            i,
                                                            e.target.value,
                                                            "property"
                                                          )
                                                        }
                                                      ></input>
                                                      {/* { head.td[0] == ""? '-': head.td[0] } */}
                                                    </span>
                                                  </td>
                                                );
                                              })}
                                              {i ? (
                                                <td
                                                  onClick={(e) =>
                                                    removeTableRow(
                                                      val.tempId,
                                                      i,
                                                      "property"
                                                    )
                                                  }
                                                  className="align-middle"
                                                >
                                                  <span className="tabletrash--icon">
                                                    <i
                                                      class="fa fa-times-circle"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </span>
                                                </td>
                                              ) : null}
                                            </tr>
                                          </>
                                        );
                                      })}

                                      <div className="popup-btn">
                                        <div
                                          onClick={(e) =>
                                            addTableRow(val.tempId, "property")
                                          }
                                          className="btn-value btnadd-btn-custom-property add-table-btn px-2"
                                        >
                                          <img
                                            src={addicon}
                                            className="m-0 mr-1"
                                          />{" "}
                                          Add
                                        </div>
                                      </div>
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
                    {/* <div class="col-12 px-1">
                      <div
                        className="right-wrapper text-right"
                        onClick={() => addcustomField("property")}
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
                                {/* <span
                                  onClick={() =>
                                    removeItem("financial", val.tempId)
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
                                                console.log(
                                                  "hheadyy ------------->",
                                                  val.object[i].td,
                                                  i
                                                );
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        value={head.td[i]}
                                                        onChange={(e) =>
                                                          handleTableData(
                                                            val.tempId,
                                                            head,
                                                            i,
                                                            e.target.value,
                                                            "financial"
                                                          )
                                                        }
                                                      ></input>
                                                      {/* { head.td[0] == ""? '-': head.td[0] } */}
                                                    </span>
                                                  </td>
                                                );
                                              })}
                                              {i ? (
                                                <td
                                                  onClick={(e) =>
                                                    removeTableRow(
                                                      val.tempId,
                                                      i,
                                                      "financial"
                                                    )
                                                  }
                                                  className="align-middle"
                                                >
                                                  <span className="tabletrash--icon">
                                                    <i
                                                      class="fa fa-times-circle"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </span>
                                                </td>
                                              ) : null}
                                            </tr>
                                          </>
                                        );
                                      })}

                                      <div className="popup-btn">
                                        <div
                                          onClick={(e) =>
                                            addTableRow(val.tempId, "financial")
                                          }
                                          className="btn-value btnadd-btn-custom-property add-table-btn px-2"
                                        >
                                          <img
                                            src={addicon}
                                            className="m-0 mr-1"
                                          />{" "}
                                          Add
                                        </div>
                                      </div>
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
                                {/* <span
                                  onClick={() =>
                                    removeItem("unitLabels", val.tempId)
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
                                                console.log(
                                                  "hheadyy ------------->",
                                                  val.object[i].td,
                                                  i
                                                );
                                                return (
                                                  <td>
                                                    <span className="apart-td">
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        value={head.td[i]}
                                                        onChange={(e) =>
                                                          handleTableData(
                                                            val.tempId,
                                                            head,
                                                            i,
                                                            e.target.value,
                                                            "unit"
                                                          )
                                                        }
                                                      ></input>
                                                      {/* { head.td[0] == ""? '-': head.td[0] } */}
                                                    </span>
                                                  </td>
                                                );
                                              })}
                                              {i ? (
                                                <td
                                                  onClick={(e) =>
                                                    removeTableRow(
                                                      val.tempId,
                                                      i,
                                                      "unit"
                                                    )
                                                  }
                                                  className="align-middle"
                                                >
                                                  <span className="tabletrash--icon">
                                                    <i
                                                      class="fa fa-times-circle"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </span>
                                                </td>
                                              ) : null}
                                            </tr>
                                          </>
                                        );
                                      })}

                                      <div className="popup-btn">
                                        <div
                                          onClick={(e) =>
                                            addTableRow(val.tempId, "unit")
                                          }
                                          className="btn-value btnadd-btn-custom-property add-table-btn px-2"
                                        >
                                          <img
                                            src={addicon}
                                            className="m-0 mr-1"
                                          />{" "}
                                          Add
                                        </div>
                                      </div>
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
                                `${selectedLabelType ? selectedLabelType : ""}`
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
                      <div className="form-group text-right save--txt--top">
                        <CButton
                          color="primary"
                          className="login-btn px-4"
                          onClick={handleSubmit}
                        >
                          <img class="m-0 mr-2" src={SaveIcon} />
                          Save
                        </CButton>
                      </div>
                      <div className="form-group tasklabel--fill">
                        <div class="formIcon--view">
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
                            : // <>
                            //   <i className={`${selectedIcon} mr-2 fa-2x`}></i> <i className={`${selectedIcon} mr-2 fa-2x`}></i>
                            //   <i className={`${selectedIcon} mr-2 fa-2x`}></i> <i className={`${selectedIcon} mr-2 fa-2x`}></i>
                            //   <i className={`${selectedIcon} mr-2 fa-2x`}></i> <i className={`${selectedIcon} mr-2 fa-2x`}></i>
                            //   <i className={`${selectedIcon} mr-2 fa-2x`}></i> <i className={`${selectedIcon} mr-2 fa-2x`}></i>

                            // </>
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
                            {/* <div
                              className="right-wrapper text-right"
                              onClick={() => addListItem("radio")}
                            >
                              <div className="popup-btn">
                                <div className="btn-value btnadd-btn-custom-property ">
                                  <img src={addicon} className="m-0" /> Add List
                                  Item
                                </div>
                              </div>
                            </div> */}
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
                            {/* <div
                              className="right-wrapper text-right"
                              onClick={addTableHeading}
                            >
                              <div className="popup-btn">
                                <div className="btn-value btnadd-btn-custom-property ">
                                  <img src={addicon} className="m-0" /> Add
                                  Table Heading
                                </div>
                              </div>
                            </div> */}
                          </>
                        ) : null
                      ) : null}
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
                              <div className="employee-field-label">
                                For Sale
                              </div>
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
                                  <td>{selectedContact.contactCompany.name}</td>
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
                                    {
                                      selectedContact.contactAddresses[0]
                                        .address
                                    }
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
                                  <td>Kyle Kelley</td>
                                  <td>
                                    <img src={CountryIcon} />
                                  </td>
                                  <td>Country:</td>
                                  <td>
                                    {
                                      selectedContact.contactAddresses[0]
                                        .country
                                    }
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
                                    {
                                      selectedContact.contactAddresses[0]
                                        .zipCode
                                    }
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
                      {propertyNotes.map((val) => {
                        return (
                          <>
                            <div class="text-right">
                              <img src={Dotline} />
                            </div>
                            <span>{moment(val.date).format("L")}</span>
                            <h3 className="">{val.title}</h3>
                            <p>{val.description}</p>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* {propertyNotes.map((val) => {
                    return (
                       <>
                          <div class="text-right">
                            <img src={Dotline} />
                          </div>
                          <span>{moment(val.date).format("L")}</span>
                          <h3 className="">{val.title}</h3>
                          <p>{val.description}</p>
                        </>
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
                                <img src={AddresIcon} /> <b>Address </b>:{" "}
                                {address}
                              </li>
                              <li className="listmap--info">
                                <img src={CityIcon} /> <b>City </b>:{city}
                              </li>
                              <li className="listmap--info">
                                <img src={CountryIcon} /> <b>Country </b>:
                                {/* {"Franced"} */}
                                {country}
                              </li>
                              <li className="listmap--info">
                                <img src={StateIcon} /> <b>State </b>:{" "}
                                {/* {"Nouvelle"} */}
                                {state}
                              </li>
                              <li className="listmap--info">
                                <img src={ZipIcon} /> <b>Zip Code </b>:
                                {/* {"9501"} */}
                                {zipcode}
                              </li>
                              <li className="listmap--info">
                                <img src={lng} /> <b>Longitude </b>:
                                {/* {"45.44455"} */}
                                {longitude}
                              </li>
                              <li className="listmap--info">
                                <img src={lat} /> <b>Latitude </b>:
                                {/* {"34.45345"} */}
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
                      {/* <div class="attachment--file">
                        <span className="attacmentImg_btn">
                          <img src={pdf} className="m-0 mr-2 attacImg--step3" />{" "}
                          {"calculation.pdf"}
                        </span>
                      </div>
                      <div class="attachment--file">
                        <span className="attacmentImg_btn">
                          <img
                            src={word}
                            className="m-0 mr-2 attacImg--step3"
                          />{" "}
                          {"calculation.word"}
                        </span>
                      </div>
                      <div class="attachment--file">
                        <span className="attacmentImg_btn">
                          <img src={xml} className="m-0 mr-2 attacImg--step3" />{" "}
                          {"calculation.xml"}
                        </span>
                      </div> */}
                      {attachmentList.map((attach) => {
                        return (
                          <div class="attachment--file">
                            <span className="attacmentImg_btn">
                              <img
                                src={`${attach.type == "application/pdf"
                                  ? pdf
                                  : attach.type == "application/vnd.ms-excel"
                                    ? xml
                                    : word
                                  }`}
                                className="m-0 mr-2 attacImg--step3"
                              />{" "}
                              {attach.name}
                            </span>
                          </div>
                        );
                      })}
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
                    {/* <div className="col-12 px-1">
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
                    </div> */}
                    {imagesPreviewList.map((url) => {
                      return (
                        <div className="col-12 col-lg-6 px-1">
                          <div class="fileImage--main">
                            <img src={url} className="m-0" />
                          </div>
                        </div>
                      );
                    })}
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
                                      {val.object[0].td.map((td, i) => {
                                        return (
                                          <>
                                            <tr>
                                              {val.object.map((head, index) => {
                                                console.log(
                                                  "hheadyy ------------->",
                                                  val.object[i].td,
                                                  i
                                                );
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
                        //       <input class="form-control input-field-control" type={val.type.toLowerCase()} placeholder={val.placeHolder} autocomplete="" value="" />
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
                                                console.log(
                                                  "hheadyy ------------->",
                                                  val.object[i].td,
                                                  i
                                                );
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
                                                console.log(
                                                  val.object[i].td,
                                                  i
                                                );
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
