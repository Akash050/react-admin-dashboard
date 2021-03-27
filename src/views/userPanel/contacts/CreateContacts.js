import React, { useState, useEffect } from "react";
import { CInput, CForm, CButton, CImg, CModal } from "@coreui/react";
import { v4 as uuidv4 } from "uuid";
import { iconData } from "../properties/iconData";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios'
import swal from "sweetalert";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loading from "react-fullscreen-loading";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import addicon from "../../../assets/icons/addicon.svg";
import search from "../../../assets/icons/search-icon.svg";
import blueBtn from "../../../assets/icons/save-full-blue.svg";
import SaveBlue from "../../../assets/icons/save-blue-icon.svg";
import SaveWhite from "../../../assets/icons/save-white-icon.svg";
import upload from "../../../assets/icons/upload.svg";
import NameIcon from "../../../assets/icons/name-icon.svg";
import CrossItem from "../../../assets/icons/cross-Item.svg";
import profile from "../../../assets/profile.png";
import Status from "../../../assets/icons/status.svg";
import SellerIcon from "../../../assets/icons/seller.svg";
import PlainSellerIcon from "../../../assets/icons/plain-seller.svg";
import BuyerIcon from "../../../assets/icons/buyer.svg";
import BlueBuyerIcon from "../../../assets/icons/blue-buyer.svg";
import socialIcon from "../../../assets/icons/socialIcon.svg";
import addnoteIcon from "../../../assets/icons/add-note-icon.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";
import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import Department from "../../../assets/icons/department.svg";
import Jobtitle from "../../../assets/icons/jobtitle.svg";
import iconInd from "../../../assets/icons/ico-ind.svg";
import CompanyblackIcon from "../../../assets/icons/company-black-icon.svg";
import * as Validator from "validatorjs";
import { created } from "../../../redux/actions/companyAction";
import {
  createContact,
  uploadProfile,
} from "../../../redux/actions/userContactAction";
import {
  getAllContactCompanies,
  deleteCompany,
} from "../../../redux/actions/contactCompanyAction";
import AddNewCompany from "./AddNewCompany";
import EditNewCompany from "./EditNewCompany";
import { DELETE_COMPANY } from "../../../redux/actionsType/companyActionType";
const CreateContacts = () => {
  Geocode.setApiKey("AIzaSyAfqpVg9bvou1GZte3HrAqK2Oo0lY4AAII");
  Geocode.setLocationType("ROOFTOP");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoding, setIsLoading] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [iconOptions, setIconOptions] = useState(iconData);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedSocialIcon, setSelectedSocialIcon] = useState("");
  const [iconToSave, setIconToSave] = useState("");
  const [locationName, setLocationName] = useState("");
  const [socialiconToSave, setSocialIconToSave] = useState("");
  const [selectedIconOptions, setSelectedIconOptions] = useState([]);
  const [selectedSocialIconOptions, setSelectedSocialIconOptions] = useState(
    []
  );
  const [selectedLabelType, setSelectedLabelType] = useState("");
  const [errorMsgIcon, setErrorMsgIcon] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [propertyLabels, setPropertyLabels] = useState([]);
  const [unitLabels, setUnitLabels] = useState([]);
  const [unitLabels_col_1, setUnitLabels_col_1] = useState([]);
  const [unitLabels_col_2, setUnitLabels_col_2] = useState([]);
  const [property_labels_col_1, setPropertyLabels_col_1] = useState([]);
  const [property_labels_col_2, setPropertyLabels_col_2] = useState([]);
  const [customFields, setCustomFields] = useState([
    {
      id: "",
      type: "",
      lable: "",
      value: "",
      placeHolder: "",
      icon: "",
      options: [],
    },
  ]);
  const [financialLabels, setFinancialLabels] = useState([]);
  const [errorMsgSelectIcon, setErrorMsgSelectIcon] = useState("");
  const [errorMsgSelectSocialIcon, setErrorMsgSelectSocialIcon] = useState("");
  const [errorMsgLabelType, setErrorMsgLabelType] = useState("");
  const [errorMsgLabelName, setErrorMsgLabelName] = useState("");
  const [errorMsgListItem, setErrorMsgListItem] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salutationField, setSalutation] = useState("");
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [cell, setCell] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedConnection, setSelectedConnection] = useState("2");
  const [selectedConnectionStatus, setSelectedConnectionStatus] = useState("6");
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgOffice, setErrorMsgOffice] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgCompany, setErrorMsgCompany] = useState("");
  const [errorMsgCell, setErrorMsgCell] = useState("");
  const [errorMsgDepartment, setErrorMsgDepartment] = useState("");
  const [errorMsgSalutation, setErrorMsgSalutation] = useState("");
  const [errorMsgJobTitle, setErrorMsgJobTitle] = useState("");
  const [errorMsgAddress, setErrorMsgAddress] = useState("");
  const [errorMsgCity, setErrorMsgCity] = useState("");
  const [errorMsgCountry, setErrorMsgCountry] = useState("");
  const [errorMsgState, setErrorMsgState] = useState("");
  const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
  const [errorMsgAddress2, setErrorMsgAddress2] = useState("");
  const [errorMsgCity2, setErrorMsgCity2] = useState("");
  const [errorMsgCountry2, setErrorMsgCountry2] = useState("");
  const [errorMsgState2, setErrorMsgState2] = useState("");
  const [errorMsgZipcode2, setErrorMsgZipcode2] = useState("");
  const [errorMsgFacebook, setErrorMsgFacebook] = useState("");
  const [errorMsgLinekdin, setErrorMsgLinkedin] = useState("");
  const [errorMsgTwitter, setErrorMsgTwitter] = useState("");
  const [isSecondaryAddress, setIsSecondaryAddress] = useState(false);
  const [isSocialMedia, setIsSocialMedia] = useState(false);
  const [isAddCompany, setIsAddCompany] = useState(false);
  const [isEditCompany, setIsEditCompany] = useState(false);
  const [errorMsgSocialMedModal, setErrorMsgSocialMedModal] = useState("");
  const [errorMsgLinkType, setErrorMsgLinkType] = useState("");
  const [errorMsgIconType, setErrorMsgIconType] = useState("");
  const [addresses, setAddresses] = useState([
    {
      key: 1,
      address: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
    },
  ]);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState({});
  const [socialMedia, setSocialMedia] = useState([
    {
      tempId: "1",
      icon: "fa fa-facebook-f",
      linkType: "Facebook",
      link: "",
    },
    {
      icon: "fa fa-linkedin",
      tempId: "2",
      linkType: "Linkedin",
      link: "",
    },
    {
      icon: "fa fa-twitter",
      tempId: "3",
      linkType: "Twitter",
      link: "",
    },
  ]);
  const [newSocialMediaName, setNewSocialMediaName] = useState("");
  const [newSocialMediaValue, setNewSocialMediaValue] = useState("");
  const [selectedSaluation, setSelectedSaluation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const salutationOptions = ["Mr", "Mrs"];
  const [contactcompanyoption, setcontactcompanyoption] = useState([]);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [customLabelList, setCustomLabelList] = useState([]);
  const lablelTypeOptions = [
    { title: "Text", value: "String" },
    { title: "Number", value: "int" },
    { title: "Date", value: "Date" },
    { title: "Radio Buttons", value: "radio" },
    { title: "Check Box", value: "checkbox" },
    { title: "List", value: "list" },
    // { title: 'Table', value: 'Table' },
  ];
  const [tableHeading, setTableHeading] = useState([
    { id: 1, name: "heading #1", value: "Description" },
    { id: 2, name: "heading #2", value: "No. Units" },
    { id: 3, name: "heading #2", value: "Avg Rent/Month" },
    { id: 4, name: "heading #2", value: "Sq. Foot" },
  ]);
  const [listItems, setListItems] = useState([
    { id: 1, name: "item #1", value: "", selected: false },
    { id: 2, name: "item #2", value: "", selected: false },
  ]);
  const { contactCompany } = useSelector((state) => ({
    contactCompany: state.contactCompany,
  }));
  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
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
    async function getCompanyContact() {
      dispatch(getAllContactCompanies(0, 100, ""));
    }
    getCompanyContact();
    setcontactcompanyoption(contactCompany);
  }, [isEditCompany, isAddCompany]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(function () {
      setIsLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    setcontactcompanyoption(contactCompany);
  }, [contactCompany.length, isEditCompany, isAddCompany]);

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
    let value = addresses.filter((add, i) =>
      add.key == key ? add[val] : null
    );
  };

  const onPrimaryAddressChange = (e, key) => {
    let { name, value } = e.target;
    // console.log("name val =>", name , value)
    // return
    let temp = [...addresses];
    let objIndex = addresses.findIndex((obj) => obj.key == key);
    console.log("vall ->", value);
    temp[objIndex][name] = value;
    console.log("temp --?", temp);
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
    let obj = {
      key: 0,
      address: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
    };
    let temp = [...addresses, obj];
    setAddresses(temp);
    setIsSecondaryAddress(true);
  };
  const onRemoveAddress = () => {
    let add = addresses.filter((item) => item.key == 1);
    setAddresses(add);
    setIsSecondaryAddress(false);
    setErrorMsgState2("");
    setErrorMsgZipcode2("");
    setErrorMsgAddress2("");
    setErrorMsgCity2("");
    setErrorMsgCountry2("");
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
    setErrorMsgAddress2("");
    setErrorMsgCity2("");
    setErrorMsgCountry2("");
    setErrorMsgState2("");
    setErrorMsgZipcode2("");
    setErrorMsgFacebook("");
    setErrorMsgCompany("");
  };

  const onSubmit = async () => {
    setIsLoading(true);
    resetFields();
    const params = {
      name: firstName + " " + lastName,
      jobTitle: jobTitle,
      salutation: selectedSaluation,
      profileImage: "",
      email: email,
      phoneNumber: cell,
      office: office,
      department: department,
      // tags: "ab",
      note: notes,
      connectionStatus: {
        id: selectedConnectionStatus,
      },
      contactType: {
        id: selectedConnection,
      },
      contactCompany: {
        id: selectedCompanyDetails.id,
      },
      contactAddresses: addresses,
      customFields:
        // customLabelList.map(val => {
        //   return {
        //     id: val.id,
        //     icons: val.icon,
        //     label: val.label,
        //     value: val.value
        //   }
        // })
        customLabelList,
      socialLinksContact: socialMedia,
      // socialMedia.map(val => {
      //   if (val.link != "") {
      //     return ({
      //       linkType: val.linkType,
      //       link: val.link
      //     })
      //   }
      // })
    };
    console.log("paraammmm  --->", params);
    console.log("customLabelList  --->", socialMedia);
    // return
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

    // const facebookRule = {
    //   'socialLinksContact.0.link': 'url',
    // }
    // const linkedinRule = {
    //   'socialLinksContact.1.link': 'url',
    // }
    // const twitterRule = {
    //   'socialLinksContact.2.link': 'url',
    // }
    let facebookValidation = new Validator(params, socialMediaRule, {
      url: {
        string: "Link is Invalid",
      },
    });
    // let linkedinValidation = new Validator(params, linkedinRule, {
    //   url: {
    //     string: 'Link is Invalid'
    //   }
    // });
    // let twitterValidation = new Validator(params, twitterRule, {
    //   url: {
    //     string: 'Link is Invalid'
    //   }
    // });

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
    console.log(facebookValidation.errors);
    if (isSecondaryAddress) {
      console.log("hey");
      const addressRule2 = {
        "contactAddresses.1.address": "required",
        "contactAddresses.1.state": "required",
        "contactAddresses.1.city": "required",
        "contactAddresses.1.country": "required",
        "contactAddresses.1.zipCode": "required",
      };

      let addressValidation = new Validator(params, addressRule2, {
        required: "Address is required",
      });
      let cityValidation = new Validator(params, addressRule2, {
        required: "City is required",
      });
      let countryValidation = new Validator(params, addressRule2, {
        required: "Country is required",
      });
      let stateValidation = new Validator(params, addressRule2, {
        required: "State is required",
      });
      let zipcodeValidation = new Validator(params, addressRule2, {
        required: "Zipcode is required",
      });
      if (addressValidation.fails()) {
        console.log("addressValidation", addressValidation);
        setIsLoading(false);
        console.log(addressValidation);
        if (addressValidation.errors.first("contactAddresses.1.address")) {
          setErrorMsgAddress2(
            addressValidation.errors.first("contactAddresses.1.address")
          );
        }
      }
      if (cityValidation.fails()) {
        setIsLoading(false);
        if (cityValidation.errors.first("contactAddresses.1.city")) {
          setErrorMsgCity2(
            cityValidation.errors.first("contactAddresses.1.city")
          );
        }
      }
      if (countryValidation.fails()) {
        setIsLoading(false);
        if (countryValidation.errors.first("contactAddresses.1.country")) {
          setErrorMsgCountry2(
            countryValidation.errors.first("contactAddresses.1.country")
          );
        }
      }
      if (stateValidation.fails()) {
        setIsLoading(false);
        if (stateValidation.errors.first("contactAddresses.1.state")) {
          setErrorMsgState2(
            stateValidation.errors.first("contactAddresses.1.state")
          );
        }
      }
      if (zipcodeValidation.fails()) {
        setIsLoading(false);
        if (zipcodeValidation.errors.first("contactAddresses.1.zipCode")) {
          setErrorMsgZipcode2(
            zipcodeValidation.errors.first("contactAddresses.1.zipCode")
          );
        }
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
    let companyValidation = new Validator(params, rules, {
      required: "Company is required",
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
      console.log(phoneValidation.errors);
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
    console.log('cfreare', params)
    if (!validation.fails() && !addressValidation.fails() && !facebookValidation.fails()) {
      const data = await dispatch(createContact(params));
      if (data.success === true) {
        setIsLoading(false);
        if (profileUrl != "") {
          let formData = new FormData();
          formData.append("profile", profileUrl);
          if (data.body != null) {
            const uploadData = await dispatch(
              uploadProfile(data.body.id, formData)
            );
          }
        }
        dispatch(created(true));
        history.push("/user/contacts");
      } else {
        setIsLoading(false);
        swal(data.message, {
          icon: "error",
        });
      }
    }
  };

  let handleSubmit = () => {
    setErrorMsgIcon("");
    setErrorMsgLabelName("");
    setErrorMsgLabelType("");
    setErrorMsgSelectIcon("");

    setErrorMsgListItem("");
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
      selectedLabelType.value == "list" ||
      selectedLabelType.value == "checkbox" ||
      selectedLabelType.value == "radio"
    ) {
      var foundIndex = listItems.findIndex((x) => x.value == "");
      if (foundIndex != -1) {
        setErrorMsgListItem("Item values required");
        return;
      }
    }
    let obj = {
      object: {
        id: uuidv4(),
        label: labelInput,
        placeHolder: placeHolder,
        type: selectedLabelType,
        value: "",
        icon: iconToSave,
        options:
          selectedLabelType.title == "Number" ||
            selectedLabelType.title == "Text" ||
            selectedLabelType.title == "Date"
            ? []
            : listItems,
      },
    };
    console.log("obj  00-->", obj);
    setCustomLabelList([...customLabelList, obj]);
    setIsAddModal(false);
    setLabelInput("");
    setIconToSave("");
    setPlaceHolder("");
    setSelectedLabelType("");
    setSelectedIcon("");
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

  const updateSocialField = (index) => (e) => {
    let newArr = [...socialMedia];
    newArr[index].link = e.target.value;
    setSocialMedia(newArr);
  };
  const addNewFields = () => {
    setErrorMsgSocialMedModal("");
    setErrorMsgLinkType("");
    setErrorMsgIconType("");
    setErrorMsgSelectSocialIcon("");
    const temp = {
      tempId: socialMedia.length + 1,
      icon: socialiconToSave,
      link: newSocialMediaValue,
      linkType: newSocialMediaName,
    };
    const rules = {
      linkType: "required",
      link: "required|url",
      // icon: "required",

    };
    let socialMediaValidation = new Validator(temp, rules, {
      required: "Link Type is required",
      url: "Link is Invalid",
    });
    let socialMediaLinkValidation = new Validator(temp, rules, {
      required: "Link is required",
      url: "Link is Invalid",
    });
    let socialMediaIconValidation = new Validator(temp, rules, {
      required: "Icon is required",

    });
    console.log(socialMediaValidation);
    if (socialMediaValidation.fails()) {
      setIsLoading(false);
      if (socialMediaValidation.errors.first("link")) {
        setErrorMsgSocialMedModal(socialMediaValidation.errors.first("link"));
      }
      if (socialMediaValidation.errors.first("linkType")) {
        setErrorMsgLinkType(socialMediaValidation.errors.first("linkType"));
      }
    }
    if (socialMediaLinkValidation.fails()) {
      setIsLoading(false);
      if (socialMediaLinkValidation.errors.first("link")) {
        setErrorMsgSocialMedModal(
          socialMediaLinkValidation.errors.first("link")
        );
      }
    }
    // if (socialMediaIconValidation.fails()) {
    //   setIsLoading(false);
    //   if (socialMediaIconValidation.errors.first("icon")) {
    //     setErrorMsgIconType(
    //       socialMediaIconValidation.errors.first("icon")
    //     );
    //   }
    // }
    if (selectedSocialIcon == "") {
      setErrorMsgIconType("Icon is required")
      return;
    }
    if (socialiconToSave == "") {
      setErrorMsgSelectSocialIcon("Select icon to save");
      return;
    }
    if (!socialMediaValidation.fails() && !socialMediaLinkValidation.fails() && !socialMediaIconValidation.fails()) {
      let newArr = [...socialMedia, temp];
      setSocialMedia(newArr);
      setNewSocialMediaName("");
      setNewSocialMediaValue("");
      setSelectedSocialIcon("")
      setSocialIconToSave("");
      setSelectedSocialIconOptions("");
      setIsSocialMedia(false);
    }
    console.log("social", socialMedia);
  };

  let removeTableItem = (id) => {
    let temp = tableHeading.filter((ele) => {
      return ele.id != id;
    });
    setTableHeading(temp);
  };
  let addTableHeading = () => {
    let temp = [...tableHeading];
    let obj = {
      id: temp.length + 1,
      name: `heading #${temp.length + 1}`,
      value: "",
    };
    temp.push(obj);
    setTableHeading(temp);
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
      id: temp.length + 1,
      name: `item #${temp.length + 1}`,
      value: "",
      selected: false,
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

  let removeItem = (val, id) => {
    let temp = customLabelList.filter((ele) => {
      return ele.object.id != id;
    });
    setCustomLabelList(temp);
    console.log("list ->", listItems, id);
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
  const handleClick = async (type, val) => {
    if (type === "delete") {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        setIsLoading(true);
        if (willDelete) {
          const data = await dispatch(deleteCompany(val.id));
          if (data.success === true) {
            swal("Company Deleted Successfully!", {
              icon: "success",
            });
            setIsCompanySelected(false);
            setSelectedCompany("");
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
          // swal("Your imaginary file is safe!");
        }
      });
    }
  };
  let addcustomField = (name) => {
    setSelectedColumn(name);
    setIsAddModal(true);
  };
  let handleLabelChange = (e) => {
    setLabelInput(e.target.value);
  };

  let handleSelectedIcon = (icon) => {
    setIconToSave(icon);
  };
  let handleSelectedSocialIcon = (icon) => {
    setSocialIconToSave(icon);
  };

  let handleLabelTypeChange = (e, v) => {
    setSelectedLabelType(v);
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
  let handleSocialIconChange = (e, v) => {
    if (v != null) {
      let temp = [];
      iconData.map((val) => {
        if (val.includes(v.split(" ")[1])) {
          temp.push(val);
        }
      });
      setSelectedSocialIconOptions(temp);
      setSelectedSocialIcon(v);
    }
    setSelectedSocialIcon(v);
  };
  let onCustomListValueChange = (value, id, type) => {
    console.log("val ->", value, id);
    if (type == "text") {
      let temp = [...customLabelList];
      let objIndex = temp.findIndex((obj) => obj.object.id == id);
      console.log("objIndex", objIndex, temp);
      temp[objIndex].object.value = value;
      setCustomLabelList(temp);
      //setTableHeading(temp)
    }
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
    console.log("val ->", val);
    if (val.type.value == "radio") {
      return (
        <div class="form-group position-relative">
          <div class="employee-field-label-wrapper flex-column">
            <div class="property-field-label labelIcon-fill">
              <i className={`${val.icon}`} />
              {val.label}
            </div>
            <span
              onClick={() => removeItem(type, val.id)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
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
            <span
              onClick={() => removeItem(type, val.id)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
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
            <span
              onClick={() => removeItem(type, val.id)}
              class="crossItem--link"
            >
              <img className="m-0 ml-2" src={CrossItem} />
            </span>
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
        <div class="form-group position-relative columgroup--step-2">
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
          <span
            onClick={() => removeItem(type, val.id)}
            class="crossItem--link"
          >
            <img className="m-0 ml-2" src={CrossItem} />
          </span>
        </div>
      );
    }
  };
  let handlelocationChange = (address, type) => {
    console.log("adress  -->", address)
    setLocationName(address)
    let temp = [...addresses];
    let objIndex = addresses.findIndex((obj) => obj.key == type);
    temp[objIndex].address = address;
    console.log("temp --?", temp);
    setAddresses(temp);
    //setAddresses(address)
   // setZipCode('')
  };

  let handlelocationSelect = (address,type) => {
    geocodeByAddress(address)
      // .then(results => console.log(results))
      // .catch(error => console.error('Error', error));
      .then(async results => {
        console.log("resultt ---------->>", results)
        const latLng = await getLatLng(results[0]);
        const place_id = results[0].place_id
        const [place] = await geocodeByPlaceId(place_id);
        const { long_name: postalCode = '' } =
        place.address_components.find(c => c.types.includes('postal_code')) || {};
        console.log("lat", latLng.lat)
        console.log("long ->", latLng.lng )
       // setLongitude(latLng.lng)
        Geocode.fromLatLng(latLng.lat, latLng.lng).then(
          (response) => {
            console.log("resultt  response---------->>", response)
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
                 // setZipCode(zip.long_name)
                  console.log("zipp =>", zip.long_name)
                }
              })
            })
          //  setCity(city)
           // setState(state)
           // setCountry(country)
            console.log("filter city",city, state, country);
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
      {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
      <div className="create-contact-header align-items-center new-head">
        <div className="titleheader--card"><img className="m-0 mr-2" src={iconInd}/> Create Individual</div>
      </div>
      <CForm className="login-form mb-5 new-styles">
        <div className="create-employee-wrapper p-3">
          <div className="row justify-content-end">
            <div className="col-12 col-md-3">
              <ul className="list-btns">
                <li className="list-btns__li">
                  <div className="btn-value btnadd-btn-custom-property create-btn-btn choose_action">
                    <img src={addicon} className="m-0"/> Add Custom Field
                  </div>
                </li>
                <li className="list-btns__li">
                  <CButton className="save-btn-white btn" onClick={onSubmit}>
                    <img className="m-0 mr-2" src={SaveWhite}/>
                    Save
                  </CButton>
                </li>
              </ul>
            </div>
          </div>
          <div className="create-employee-left row flex-1">
            <div className="create-employee-body1 col-12 col-md-3">
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <div className="employee-field-label">
                    Profile Image{" "}
                    {profileUrl != "" ? (
                      <CImg
                        src={profilePreviewUrl}
                        fluid
                        className="imgPrf--empl"
                      />
                    ) : null}
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
                      className="input-field-control-role"
                    >
                      <input
                        style={{
                          width: "100%",
                          height: 45,
                          border: "1px solid #ECEEF3",
                          borderRadius: ".25rem",
                          paddingLeft: "10px",
                        }}
                        {...params}
                        label=""
                        variant="outlined"
                        type="text"
                        placeholder="Choose Saluation"
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
                  className="input-field-control mt-2"
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
                  options={contactCompany}
                  onChange={(e, v) => handleCompanyChange(e, v)}
                  getOptionLabel={(option) => option.name}
                  value={
                    contactCompany.find(
                      (v) =>
                        v.name ==
                        `${selectedCompany ? selectedCompany.name : ""}`
                    ) || {}
                  }
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      className="input-field-control-role position-relative"
                    >
                      <span className="searcIcon_extra"><img src={search} className="m-0" /></span>
                      <input
                        style={{
                          width: "100%",
                          height: 45,
                          border: "1px solid #ECEEF3",
                          borderRadius: ".25rem",
                          paddingLeft: "40px",
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
                {isCompanySelected && selectedCompany ? (
                  <div className="mt-4 col-12 text-left px-0 company-details-container">
                    <div className="company-details">
                      <CImg
                        src={
                          selectedCompanyDetails.avatar
                            ? selectedCompanyDetails.avatar
                            : profile
                        }
                        fluid
                        alt="No preview"
                        className="imgPrf--empl"
                      />
                      <div className="company-details-wrapper">
                        <div className="company-details-name">
                          {selectedCompanyDetails.name}
                        </div>
                        <div className="company-details-website">
                          {selectedCompanyDetails.email}
                        </div>
                        <span className="titlefill-tb superth-tbl">
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
                            onClick={() =>
                              handleClick("delete", selectedCompanyDetails)
                            }
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </span>
                      </div>
                      <CModal
                        show={isEditCompany}
                        centered={true}
                        onClose={() => setIsEditCompany(false)}
                        className="modalCreateCompany--body"
                      >
                        <EditNewCompany
                          data={selectedCompanyDetails}
                          close={() => setIsEditCompany(false)}
                          onChange={() => setSelectedCompany()}
                        />
                      </CModal>
                    </div>
                  </div>
                ) : (
                    ""
                  )}
                <div className="mt-4 col-12 text-left px-0">
                  <div
                    className="btn-value choose_action btnadd-btn-custom-property create-btn-btn create-btn-btn"
                    onClick={() => setIsAddCompany(true)}
                  >
                    <img src={addicon} className="m-0" /> Add Company
                  </div>
                </div>
              </div>
              <CModal
                show={isAddCompany}
                centered={true}
                onClose={() => setIsAddCompany(false)}
                className="modalCreateCompany--body"
              >
                <AddNewCompany close={() => setIsAddCompany()} />
              </CModal>
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
                  onChange={(e) =>
                    setOffice((prevState) =>
                      normalizeInput(e.target.value, prevState)
                    )
                  }
                />
                <label
                  className={`error ${errorMsgOffice ? null : "errorFill"} `}
                >
                  {errorMsgOffice ? errorMsgOffice : null}
                </label>
              </div>
              <div className="form-group">
                <div className="employee-field-label-wrapper">
                  <CImg src={emailIcon} fluid className="field-icon icon-email-with" />
                  <div className="employee-field-label">Email</div>
                </div>
                <CInput
                  type="text"
                  value={email}
                  placeholder="Enter Email"
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
                <div className="position-relative">
                  <span className="txtIcon-extra"><img src={addnoteIcon} className="m-0" /></span>
                  <textarea
                    id="message"
                    rows="8"
                    cols="50"
                    value={notes}
                    className="input-txtarea-control extaText--cont-pad"
                    placeholder=" Add Notes"
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
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
                    <ul className="list-radio">
                      <li>
                          <div className="d-flex justify-content-between border repccur-box choose_action">
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
                            <label className="custom-radio">
                              <input
                                type="radio"
                                onClick={() => changeConnectionType("seller", 2)}
                                name="seller"
                                checked={selectedConnection == "2" ? true : false}
                              />
                              <span></span>
                            </label>
                          </div>
                      </li>
                      <li>
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
                            <label className="custom-radio">
                              <input
                                type="radio"
                                onClick={() => changeConnectionType("buyer", 1)}
                                name="buyer"
                                checked={selectedConnection == "1" ? true : false}
                              />
                              <span></span>
                            </label>
                          </div>
                      </li>
                      <li>
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
                            <label className="custom-radio">
                              <input
                                type="radio"
                                onClick={() => changeConnectionType("both", 3)}
                                name="both"
                                checked={selectedConnection == "3" ? true : false}
                              />
                              <span></span>
                            </label>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex justify-content-between border repccur-box">
                            <div className="re-occuring">
                              <div className="employee-field-label">N/A</div>
                            </div>
                            <label className="custom-radio">
                              <input
                                type="radio"
                                onClick={() => changeConnectionType("n/a", 4)}
                                name="n/a"
                                checked={selectedConnection == "4" ? true : false}
                              />
                              <span></span>
                            </label>
                          </div>
                      </li>
                    </ul>
                    {selectedConnection == "2" ? <><div className="col-12 col-lg-6 col-xl-12 mt-4">
                      <div className="d-flex justify-content-between border repccur-box">
                        <div className="re-occuring">
                          <div className="employee-field-label">
                            No Connection Made
                          </div>
                        </div>
                        <label className="custom-radio">
                          <input
                            type="radio"
                            onClick={() => changeConnectionStatus(6)}
                            checked={
                              selectedConnectionStatus == "6" ? true : false
                            }
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                      <div className="col-12 col-lg-6 col-xl-12">
                        <div className="d-flex justify-content-between border repccur-box">
                          <div className="re-occuring">
                            <div className="employee-field-label">
                              Building Relationship
                          </div>
                          </div>
                          <label className="custom-radio">
                            <input
                              type="radio"
                              onClick={() => changeConnectionStatus(8)}
                              checked={
                                selectedConnectionStatus == "8" ? true : false
                              }
                            />
                            <span></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-xl-12">
                        <div className="d-flex justify-content-between border repccur-box">
                          <div className="re-occuring">
                            <div className="employee-field-label">
                              Connection Made
                          </div>
                          </div>
                          <label className="custom-radio">
                            <input
                              type="radio"
                              onClick={() => changeConnectionStatus(7)}
                              checked={
                                selectedConnectionStatus == "7" ? true : false
                              }
                            />
                            <span></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-xl-12">
                        <div className="d-flex justify-content-between border repccur-box">
                          <div className="re-occuring">
                            <div className="employee-field-label">
                              Listing Oportunity
                          </div>
                          </div>
                          <label className="custom-radio">
                            <input
                              type="radio"
                              onClick={() => changeConnectionStatus(9)}
                              checked={
                                selectedConnectionStatus == "9" ? true : false
                              }
                            />
                            <span></span>
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-xl-12">
                        <div className="d-flex justify-content-between border repccur-box">
                          <div className="re-occuring">
                            <div className="employee-field-label">Listing</div>
                          </div>
                          <label className="custom-radio">
                            <input
                              type="radio"
                              onClick={() => changeConnectionStatus(10)}
                              checked={
                                selectedConnectionStatus == "10" ? true : false
                              }
                            />
                            <span></span>
                          </label>
                        </div>
                      </div></> : selectedConnection == "1" ?
                        <>
                          <div className="col-12 col-lg-6 col-xl-12">
                            <div className="d-flex justify-content-between repccur-box">
                              <div className="re-occuring">
                                <div className="employee-field-label">
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-xl-12">
                            <div className="d-flex justify-content-between border repccur-box">
                              <div className="re-occuring">
                                <div className="employee-field-label">
                                  Cold
                              </div>
                              </div>
                              <label className="custom-radio">
                                <input
                                  type="radio"
                                  onClick={() => changeConnectionStatus(9)}
                                  checked={
                                    selectedConnectionStatus == "9" ? true : false
                                  }
                                />
                                <span></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-xl-12">
                            <div className="d-flex justify-content-between border repccur-box">
                              <div className="re-occuring">
                                <div className="employee-field-label">
                                  Medium
                          </div>
                              </div>
                              <label className="custom-radio">
                                <input
                                  type="radio"
                                  onClick={() => changeConnectionStatus(9)}
                                  checked={
                                    selectedConnectionStatus == "9" ? true : false
                                  }
                                />
                                <span></span>
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-xl-12">
                            <div className="d-flex justify-content-between border repccur-box">
                              <div className="re-occuring">
                                <div className="employee-field-label">
                                  Hot
                          </div>
                              </div>
                              <label className="custom-radio">
                                <input
                                  type="radio"
                                  onClick={() => changeConnectionStatus(9)}
                                  checked={
                                    selectedConnectionStatus == "9" ? true : false
                                  }
                                />
                                <span></span>
                              </label>
                            </div>
                          </div>
                        </>
                        : null}


                  </div>
                </div>
              </div>

              <div className="border userCreat--card mb-4">
                <div class="form-group">
                  <h4 class="titleUser-head text-left ">
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
                            style={{ width: "20px", fontSize: '22px', marginTop: '5px' }}
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
                <label
                  className={`error ${errorMsgFacebook ? null : "errorFill"} `}
                >
                  {errorMsgFacebook ? errorMsgFacebook : null}
                </label>
              </div>

              <CModal
                show={isSocialMedia}
                centered={true}
                onClose={() => setIsSocialMedia(false)}
                className="modalContact--body test"
              >
                <div className="modal-header">
                  {/* <CImg src={addicon} fluid className="task-logo" /> */}
                  <div
                    style={{
                      width: "auto",
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
                      <label
                        className={`error ${errorMsgLinkType ? null : "errorFill"
                          } `}
                      >
                        {errorMsgLinkType ? errorMsgLinkType : null}
                      </label>
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
                      <label
                        className={`error ${errorMsgSocialMedModal ? null : "errorFill"
                          } `}
                      >
                        {errorMsgSocialMedModal ? errorMsgSocialMedModal : null}
                      </label>
                      <div className="form-group tasklabel--fill">
                        <div className="create-contact-label">Icon</div>
                        <Autocomplete
                          options={iconOptions}
                          onChange={(e, v) => handleSocialIconChange(e, v)}
                          getIconLabel={(option) => option}
                          value={
                            iconOptions.find((v) => v == selectedSocialIcon) ||
                            {}
                          }
                          renderInput={(params) => (
                            <div
                              ref={params.InputProps.ref}
                              className="inputcustom--fill"
                            >
                              <input
                                style={{
                                  width: "100%",
                                  height: 45,
                                  border: "1px solid #ECEEF3",
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
                        <label
                          className={`error ${errorMsgIconType ? null : "errorFill"
                            } `}
                        >
                          {errorMsgIconType ? errorMsgIconType : null}
                        </label>
                      </div>
                      <div className="form-group tasklabel--fill">
                        <div class="formIcon--view">
                          {selectedSocialIconOptions
                            ? selectedSocialIconOptions.map((icon) => {
                              return (
                                <>
                                  <span class="iconList--gridcustom">
                                    <i
                                      onClick={() =>
                                        handleSelectedSocialIcon(icon)
                                      }
                                      className={`${icon} fa-2x`}
                                    ></i>
                                    {socialiconToSave == icon ? (
                                      <i class="ml-2 far checkIcon--viewCustom fa-check-circle text-success"></i>
                                    ) : null}
                                  </span>
                                </>
                              );
                            })
                            : null}
                        </div>
                        <label
                          className={`error ${errorMsgSelectSocialIcon ? null : "errorFill"
                            } `}
                        >
                          {errorMsgSelectSocialIcon}
                        </label>
                      </div>
                    </div>
                    <div className="bottom-button--wrapper">

                      <button type='button' class="button--cancel" onClick={() => setIsSocialMedia(false)}>Cancel</button>
                      <CImg
                        src={blueBtn}
                        fluid
                        className="field-icon"
                        style={{ float: "right", marginTop: "10px" }}
                        onClick={addNewFields}
                      />
                    </div>

                  </div>
                </div>
              </CModal>

              {isSocialMedia ? (
                ""
              ) : (
                  <div
                    className="popup-btn"
                    onClick={() => setIsSocialMedia(true)}
                  >
                    <div className="btn-value btnadd-btn-custom-property btn-custom-social choose_action">
                      <img src={addicon} className="m-0" /> Social Media
                  </div>
                  </div>
                )}
            </div>
            <div className="create-employee-body3 col-12 col-md-3">
              <div
                onClick={() => setIsAddModal(true)}
                className="form-group text-left note-text"
              >
                Auto Fill this section once user starts to type
              </div>
              <div className="form-group">
                {customLabelList.map((val) =>
                  getcustomItems(val.object, "list")
                )}
                <div className="border userCreat--card mb-4">
                  <div className="form-group">
                    <div className="employee-field-label-wrapper">
                      <CImg src={AddresIcon} fluid className="field-icon" />
                      <div className="employee-field-label titleUser-head">
                        Address
                      </div>
                    </div>
                    <PlacesAutocomplete
                       value = {locationName}
                       // value={getAddressValue("address", 1)}
                        onChange={(e) =>handlelocationChange(e,1)}
                        onSelect={(e) =>handlelocationSelect(e,1)}
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
                      type="text"
                      value={getAddressValue("address", 1)}
                      name="address"
                      placeholder="Enter Address"
                      className="input-field-control"
                      onChange={(e) => onPrimaryAddressChange(e, 1)}
                    /> */}
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
                      placeholder="Enter City"
                      className="input-field-control"
                      onChange={(e) => onPrimaryAddressChange(e, 1)}
                    />
                    <label
                      className={`error ${errorMsgCity ? null : "errorFill"} `}
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
                      placeholder="Enter Country"
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
                      placeholder="Enter State"
                      className="input-field-control"
                      onChange={(e) => onPrimaryAddressChange(e, 1)}
                    />
                    <label
                      className={`error ${errorMsgState ? null : "errorFill"} `}
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
                      placeholder="Enter Zipcode"
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
                {isSecondaryAddress ? (
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
                        placeholder="Enter Address"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      <label
                        className={`error ${errorMsgAddress2 ? null : "errorFill"
                          } `}
                      >
                        {errorMsgAddress2 ? errorMsgAddress2 : null}
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
                        value={getAddressValue("city", 0)}
                        name="city"
                        placeholder="Enter City"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      <label
                        className={`error ${errorMsgCity2 ? null : "errorFill"
                          } `}
                      >
                        {errorMsgCity2 ? errorMsgCity2 : null}
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
                        value={getAddressValue("country", 0)}
                        name="country"
                        placeholder="Enter Country"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      <label
                        className={`error ${errorMsgCountry2 ? null : "errorFill"
                          } `}
                      >
                        {errorMsgCountry2 ? errorMsgCountry2 : null}
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
                        value={getAddressValue("state", 0)}
                        name="state"
                        placeHolder="Enter State"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      <label
                        className={`error ${errorMsgState2 ? null : "errorFill"
                          } `}
                      >
                        {errorMsgState2 ? errorMsgState2 : null}
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
                        value={getAddressValue("zipCode", 0)}
                        name="zipCode"
                        placeHolder="Enter Zipcode"
                        className="input-field-control"
                        onChange={(e) => onSecondaryChange(e, 0)}
                      />
                      <label
                        className={`error ${errorMsgZipcode2 ? null : "errorFill"
                          } `}
                      >
                        {errorMsgZipcode2 ? errorMsgZipcode2 : null}
                      </label>
                    </div>
                  </div>
                ) : null}
                <div>
                  {isSecondaryAddress ? (
                    <div className="popup-btn" onClick={onRemoveAddress}>
                      <div className="btn-value btnadd-btn-custom-property create-btn-btn choose_action">
                        <img src={addicon} className="m-0" /> Remove Secondary
                        Address
                      </div>
                    </div>
                  ) : (
                      <div className="popup-btn text-left" onClick={onAddAddress}>
                        <div className="btn-value btnadd-btn-custom-property create-btn-btn choose_action">
                          <img src={addicon} className="m-0" /> Add Secondary
                        Address
                      </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CForm>
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
                      value={iconOptions.find((v) => v == selectedIcon) || {}}
                      renderInput={(params) => (
                        <div
                          ref={params.InputProps.ref}
                          className="inputcustom--fill"
                        >
                          <input
                            style={{
                              width: "100%",
                              height: 45,
                              border: "1px solid #ECEEF3",
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
                    <label
                      className={`error ${errorMsgIcon ? null : "errorFill"} `}
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
                      getOptionLabel={(option) => option.title}
                      value={
                        lablelTypeOptions.find(
                          (v) =>
                            v.value ==
                            `${selectedLabelType ? selectedLabelType.value : ""
                            }`
                        ) || {}
                      }
                      renderInput={(params) => (
                        <div
                          ref={params.InputProps.ref}
                          className="inputcustom--fill"
                        >
                          <input
                            style={{
                              width: "100%",
                              height: 45,
                              border: "1px solid #ECEEF3",
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
                      selectedLabelType.value == "radio") ||
                      selectedLabelType.value == "list" ||
                      selectedLabelType.value == "Date" ||
                      selectedLabelType.value == "checkbox" ? null : (
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
                <div className="col-12 col-lg-6 choose_action">
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
                        : null}
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
                      selectedLabelType.value == "radio") ||
                      selectedLabelType.value == "list" ||
                      selectedLabelType.value == "checkbox" ? (
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
                                      <img className="m-0 ml-2" src={CrossItem} />
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
                                  placeholder="Add Label"
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
                              <div className="btn-value btnadd-btn-custom-property ">
                                <img src={addicon} className="m-0" /> Add List
                              Item
                            </div>
                            </div>
                          </div>
                        </>
                      ) : selectedLabelType.value == "Table" ? (
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
                                    <span onClick={() => removeTableItem(val.id)}>
                                      <img className="m-0 ml-2" src={CrossItem} />
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
                              <div className="btn-value btnadd-btn-custom-property ">
                                <img src={addicon} className="m-0" /> Add Table
                                 Heading
                            </div>
                            </div>
                          </div>
                        </>
                      ) : null
                  ) : null}
                </div>
                <div className="col-12">
                  <div className="form-group text-right chosse_action">
                    <button type='button' class="button--cancel" style={{ marginTop: '5px' }} onClick={() => setIsAddModal(false)}>Cancel</button>
                    <CImg
                      src={blueBtn}
                      fluid
                      className="field-icon"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CForm>
      </CModal>
    </>
  );
};

export default CreateContacts;
