import React, { useState, createRef, useEffect } from "react";
import {
    CInput,
    CForm,
    CButton,
    CImg,
} from "@coreui/react";
import swal from 'sweetalert';
import Loading from "react-fullscreen-loading";
import * as Validator from "validatorjs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import websiteIcon from "../../../assets/icons/website-icon.svg";
import emailIcon from "../../../assets/table-email.svg";
import SaveBlue from "../../../assets/icons/save-full-blue.svg";
import upload from "../../../assets/icons/upload.svg";
import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";
import CompanyblackIcon from "../../../assets/icons/company-black-icon.svg";
import { updated, uploadProfile } from "../../../redux/actions/companyAction";
import { updateCompany } from "../../../redux/actions/contactCompanyAction";
import { createCompany, uploadcompanyImage } from "../../../redux/actions/contactCompanyAction";

const EditNewCompany = (props) => {
    let data = props.data
    console.log('dattttttttaaa', data)
    const profileImage = createRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [profileUrl, setProfileUrl] = useState(`${data.avatar ? data.avatar : ''}`);
    const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
    const [id, setId] = useState(data.id);
    const [companyName, setCompanyName] = useState(data.name);
    const [website, setWebsite] = useState(data.website);
    const [cell, setCell] = useState(data.phoneNo);
    const [office, setOffice] = useState(data.office);
    const [email, setEmail] = useState(data.email);
    const [notes, setNotes] = useState(data.note);
    const [facebook, setFacebook] = useState(data.facebook);
    const [linkedin, setLinkedin] = useState(data.linkedin);
    const [twitter, setTwitter] = useState(data.twitter);
    const [errorMsgName, setErrorMsgName] = useState("");
    const [errorMsgOffice, setErrorMsgOffice] = useState("");
    const [errorMsgEmail, setErrorMsgEmail] = useState("");
    const [errorMsgWebsite, setErrorMsgWebsite] = useState("");
    const [errorMsgCell, setErrorMsgCell] = useState("");
    const [errorMsgAddress, setErrorMsgAddress] = useState("");
    const [errorMsgCity, setErrorMsgCity] = useState("");
    const [errorMsgCountry, setErrorMsgCountry] = useState("");
    const [errorMsgState, setErrorMsgState] = useState("");
    const [errorMsgZipcode, setErrorMsgZipcode] = useState("");
    const [errorMsgFacebook, setErrorMsgFacebook] = useState("");
    const [errorMsgLinekdin, setErrorMsgLinkedin] = useState("");
    const [errorMsgTwitter, setErrorMsgTwitter] = useState("");
    const [addresses, setAddresses] = useState({
        primaryAddress: {
            address: data.address,
            city: data.city,
            country: data.country,
            state: data.state,
            zipCode: data.zipcode
        }
    });
    const [socialMedia, setSocialMedia] = useState([
        {
            linkType: "Facebook",
            link: data.facebook
        },
        {
            linkType: "Linkedin",
            link: data.linkdin
        }, {
            linkType: "Twitter",
            link: data.twitter
        },
    ]);
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
    useEffect(() => {

        setCell("")
        setOffice("")
        setCell((prevState) => normalizeInput(data.phoneNo, prevState));
        setOffice((prevState) => normalizeInput(data.office, prevState));

    }, [props.close]);
    const onImageChange = (event) => {
        setProfileUrl(event.target.files[0])
        var url = URL.createObjectURL(event.target.files[0])
        setProfilePreviewUrl(url)
    }
    const onPrimaryAddressChange = (e) => {
        let { name, value } = e.target
        setAddresses({
            ...addresses,
            primaryAddress: {
                ...addresses.primaryAddress,
                [name]: value
            }
        })
    }
    const updateSocialField = index => e => {
        let newArr = [...socialMedia];
        newArr[index].link = e.target.value;
        setSocialMedia(newArr);
    }
    const resetErrorFields = () => {
        setErrorMsgCell("");
        setErrorMsgName("");
        setErrorMsgEmail("");
        setErrorMsgWebsite("");
        setErrorMsgOffice("");
        setWebsite("");
        setErrorMsgFacebook("")
        setErrorMsgLinkedin("")
        setErrorMsgTwitter("")
    };
    const resetFields = () => {
        setProfileUrl('')
        setProfilePreviewUrl('')
        setCompanyName('')
        setWebsite('')
        setCell('')
        setEmail('')
        setNotes('')
        setFacebook('')
        setTwitter('')
        setLinkedin()
        addresses.primaryAddress.address = ''
        addresses.primaryAddress.city = ''
        addresses.primaryAddress.zipCode = ''
        addresses.primaryAddress.country = ''
        setOffice('')
    }
    const onSubmit = async () => {
        setIsLoading(true)
        resetErrorFields();

        const params = {
            id: id,
            name: companyName,
            email: email,
            phoneNo: cell,
            office: office,
            website: website,
            note: notes,
            avatar: null,
            address: addresses.primaryAddress.address,
            state: addresses.primaryAddress.state,
            city: addresses.primaryAddress.city,
            zipcode: addresses.primaryAddress.zipCode,
            country: addresses.primaryAddress.country,
            facebook: facebook,
            linkedin: linkedin,
            twitter: twitter
        }
        const rules = {
            name: "required",
            phoneNo: "required|min:14|max:14",
            email: "required|email",
            website: "required|url",
            office: "required|min:14|max:14",
            address: "required",
            state: "required",
            city: "required",
            zipcode: "required",
            country: "required",
        };
        const socialMediaRule = {
            facebook: 'url',
            linkedin: 'url',
            twitter: 'url',
        }
        let socialMediaValidation = new Validator(params, socialMediaRule, {
            url: {
                string: 'Link is Invalid'
            }
        });
        let validation = new Validator(params, rules, {
            required: ":attribute required",
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
        let nameValidation = new Validator(params, rules, {
            required: "Name is required",
        });
        let emailValidation = new Validator(params, rules, {
            required: "Email is required",
        });
        let websiteValidation = new Validator(params, rules, {
            required: "Website is required",
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
        if (socialMediaValidation.fails()) {
            setIsLoading(false)
            if (socialMediaValidation.errors.first("facebook")) {
                setErrorMsgFacebook(socialMediaValidation.errors.first("facebook"));
            }
            if (socialMediaValidation.errors.first("linkedin")) {
                setErrorMsgLinkedin(socialMediaValidation.errors.first("linkedin"));
            }
            if (socialMediaValidation.errors.first("twitter")) {
                setErrorMsgTwitter(socialMediaValidation.errors.first("twitter"));
            }
        }
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
                console.log(websiteValidation.errors.first("website"));
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
        if (addressValidation.fails()) {
            console.log('addressValidation', addressValidation)
            setIsLoading(false)
            console.log(addressValidation)
            if (addressValidation.errors.first("address")) {
                setErrorMsgAddress(addressValidation.errors.first("address"));
            }
        }
        if (cityValidation.fails()) {
            setIsLoading(false)
            if (cityValidation.errors.first("city")) {
                setErrorMsgCity(cityValidation.errors.first("city"));
            }
        }
        if (countryValidation.fails()) {
            setIsLoading(false)
            if (countryValidation.errors.first("country")) {
                setErrorMsgCountry(countryValidation.errors.first("country"));
            }
        }
        if (stateValidation.fails()) {
            setIsLoading(false)
            if (stateValidation.errors.first("state")) {
                setErrorMsgState(stateValidation.errors.first("state"));
            }
        }
        if (zipcodeValidation.fails()) {
            setIsLoading(false)
            if (zipcodeValidation.errors.first("zipcode")) {
                setErrorMsgZipcode(zipcodeValidation.errors.first("zipcode"));
            }
        }
        console.log('params', params)
        if (!validation.fails() && !socialMediaValidation.fails()) {
            const data = await dispatch(updateCompany(params));
            if (data.success === true) {
                swal("Company Updated Successfully!", {
                    icon: "success",
                });
                setIsLoading(false)
                props.onChange(data.body)
                if (profileUrl != "" & profilePreviewUrl != '') {
                    let formData = new FormData();
                    formData.append("avatar", profileUrl);
                    if (data.body != null) {
                        const uploadData = await dispatch(
                            uploadcompanyImage(data.body.id, formData)
                        )
                    }
                }
                dispatch(updated(true));
                props.close(false)
                resetFields()
            } else {
                setIsLoading(false)
                swal(data.message, {
                    icon: "error",
                });
            }
        }
    };

    console.log(data, 'props of close')
    return (
        <>
            {isLoading ? <Loading loading loaderColor="#3498db" /> : null}
            <CForm className="login-form">
                <div className="contact-company-header align-items-center">
                    <h3 className="titleheader--card">Edit Contact - Company</h3>

                </div>
                <CForm className="login-form mb-5">
                    <div className="create-employee-wrapper">
                        <div className="create-employee-left row flex-1">
                            <div className="create-employee-body1 col-12 col-md-4">
                                <div className="form-group">
                                    <div className="employee-field-label-wrapper">
                                        <div className="employee-field-label">Company Image
                                    {profileUrl == undefined || profileUrl == '' ? (
                                                null
                                            ) :
                                                <CImg
                                                    src={
                                                        profilePreviewUrl != '' ? profilePreviewUrl : profileUrl
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
                                        <CImg src={CompanyblackIcon} fluid className="field-icon" />
                                        <div className="employee-field-label">Company</div>
                                    </div>
                                    <CInput
                                        type="text"
                                        value={companyName}
                                        // placeholder="Search Company"
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
                                        <CImg src={cellIcon} fluid className="field-icon" />
                                        <div className="employee-field-label"> Cell</div>
                                    </div>
                                    <CInput
                                        type="text"
                                        value={cell}
                                        placeholder="(xxx) xxx-xxxx"
                                        className="input-field-control"
                                        autoComplete="current-password"
                                        onChange={(e) => setCell((prevState) => normalizeInput(e.target.value, prevState))}
                                    />
                                    <label className={`error ${errorMsgCell ? null : 'errorFill'} `}>
                                        {errorMsgCell ? errorMsgCell : null}
                                    </label>
                                </div>

                                <div className="form-group">
                                    <div className="employee-field-label-wrapper">
                                        <CImg src={websiteIcon} fluid className="field-icon" />
                                        <div className="employee-field-label">Website</div>
                                    </div>
                                    <CInput
                                        type="text"
                                        value={website}
                                        placeholder=""
                                        className="input-field-control"
                                        autoComplete="current-password"
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                    <label className={`error ${errorMsgWebsite ? null : 'errorFill'} `}>
                                        {errorMsgWebsite ? errorMsgWebsite : null}
                                    </label>
                                </div>

                            </div>
                            <div className="create-employee-body2 col-12 col-md-4">
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
                                    <label className={`error ${errorMsgEmail ? null : 'errorFill'} `}>
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
                                <div className="form-group">
                                    <div className="employee-field-label-wrapper">
                                        <div className="employee-field-label">
                                            Facebook
                                        </div>
                                    </div>
                                    <CInput
                                        type="text"
                                        value={facebook}
                                        placeholder=""
                                        className="input-field-control"
                                        onChange={(e) => setFacebook(e.target.value)}
                                    />
                                    <label className={`error ${errorMsgFacebook ? null : 'errorFill'} `}>
                                        {errorMsgFacebook ? errorMsgFacebook : null}
                                    </label>
                                </div>
                                <div className="form-group">
                                    <div className="employee-field-label-wrapper">
                                        <div className="employee-field-label">
                                            Linkedin
                                        </div>
                                    </div>
                                    <CInput
                                        type="text"
                                        value={linkedin}
                                        placeholder=""
                                        className="input-field-control"
                                        onChange={(e) => setLinkedin(e.target.value)}
                                    />
                                    <label className={`error ${errorMsgLinekdin ? null : 'errorFill'} `}>
                                        {errorMsgLinekdin ? errorMsgLinekdin : null}
                                    </label>
                                </div>
                                <div className="form-group">
                                    <div className="employee-field-label-wrapper">
                                        <div className="employee-field-label">
                                            Twitter
                                        </div>
                                    </div>
                                    <CInput
                                        type="text"
                                        value={twitter}
                                        placeholder=""
                                        className="input-field-control"
                                        onChange={(e) => setTwitter(e.target.value)}
                                    />
                                    <label className={`error ${errorMsgTwitter ? null : 'errorFill'} `}>
                                        {errorMsgTwitter ? errorMsgTwitter : null}
                                    </label>
                                </div>
                            </div>

                            <div className="create-employee-body3 col-12 col-md-4">
                                <div className="form-group">
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
                                                value={addresses.primaryAddress.address}
                                                name='address'
                                                placeholder=""
                                                className="input-field-control"

                                                onChange={(e) => onPrimaryAddressChange(e)}
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
                                                value={addresses.primaryAddress.city}
                                                name='city'
                                                placeholder=""
                                                className="input-field-control"

                                                onChange={(e) => onPrimaryAddressChange(e)}
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
                                                value={addresses.primaryAddress.country}
                                                name='country'
                                                placeholder=""
                                                className="input-field-control"

                                                onChange={(e) => onPrimaryAddressChange(e)}
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
                                                value={addresses.primaryAddress.state}
                                                name='state'
                                                placeholder=""
                                                className="input-field-control"

                                                onChange={(e) => onPrimaryAddressChange(e)}
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
                                                value={addresses.primaryAddress.zipCode}
                                                placeholder=""
                                                name='zipCode'
                                                className="input-field-control"

                                                onChange={(e) => onPrimaryAddressChange(e)}
                                            />
                                            <label className={`error ${errorMsgZipcode ? null : 'errorFill'} `}>
                                                {errorMsgZipcode ? errorMsgZipcode : null}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-button--wrapper choose_action"  >
                                    <button type='button' class="button--cancel" style={{ marginTop: '5px' }} onClick={() => props.close(false)}>Cancel</button>
                                    <CImg className="choose_action" src={SaveBlue} fluid className="field-icon" onClick={onSubmit} />
                                </div>
                            </div>
                        </div>

                        {/* <div className="create-employee-body3 col-12 col-md-2">
                            <CImg src={SaveBlue} fluid className="field-icon" onClick={onSubmit} />
                        </div> */}
                    </div>
                </CForm>
            </CForm>
        </>
    );
};

export default EditNewCompany;
