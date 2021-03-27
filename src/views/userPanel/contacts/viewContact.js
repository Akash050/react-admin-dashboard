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
    CModal
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import GoogleMapReact from 'google-map-react';
import Loading from "react-fullscreen-loading";
import { v4 as uuidv4 } from 'uuid';
import farm1 from "../../../assets/icons/farm1.svg"
import farm2 from "../../../assets/icons/farm2.svg"
import farm3 from "../../../assets/icons/farm3.svg"
import farm4 from "../../../assets/icons/farm4.svg"
import farm5 from "../../../assets/icons/farm5.svg"
import farm6 from "../../../assets/icons/farm6.svg"
import profile from "../../../assets/profile.png";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import phoneIcon from "../../../assets/icons/phone.svg";
import directMailIcon from "../../../assets/icons/direct-mail.svg";
import followUpIcon from "../../../assets/icons/follow-up.svg";
import textMsgIcon from "../../../assets/icons/text-msg.svg";
import emailMsgIcon from "../../../assets/icons/email-div.svg";
import scheduleMeeting from "../../../assets/icons/schedule-meeting.svg";
import divisionIcon from "../../../assets/icons/division.svg";
import phoneListBtn from "../../../assets/icons/phone-list-btn.svg";
import followUpBtn from "../../../assets/icons/add-follow-up-btn.svg";
import editIcon from "../../../assets/icons/edit-icon.svg";
import bellIcon from "../../../assets/icons/bell-icon.svg"
import associatedPropIcon from "../../../assets/icons/associated-property.svg"
import notesIcon from "../../../assets/icons/property-notes.svg"
import addicon from "../../../assets/icons/addicon.svg";
import phoneLightIcon from "../../../assets/icons/phone-call-light.svg";
import emailLightIcon from "../../../assets/icons/email-light.svg";
import directMailLightIcon from "../../../assets/icons/direct-mail-light.svg";
import arrowLeft from "../../../assets/icons/arrow-left.svg";
import arrowRight from "../../../assets/icons/arrow-right.svg";
import BackIcon from "../../../assets/icons/back-icon.svg";
import tagIcon from "../../../assets/tags.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import NameIcon from "../../../assets/icons/name-icon.svg";
import StatusIcon from "../../../assets/icons/status.svg";
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
import AddresIcon from "../../../assets/icons/address-icon.svg";
import CityIcon from "../../../assets/icons/city-icon.svg";
import CountryIcon from "../../../assets/icons/country-icon.svg";
import StateIcon from "../../../assets/icons/state-icon.svg";
import ZipIcon from "../../../assets/icons/zip-icon.svg";
import CompanyblackIcon from "../../../assets/icons/company-black-icon.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";
import LinkIcon from "../../../assets/icons/linkedin.svg";
import TwitterIcon from "../../../assets/icons/twitter.svg";
import * as Validator from "validatorjs";
import CheckActive from "../../../assets/icons/check-active-icon.png";
import CheckInactive from "../../../assets/icons/check-inactive-icon.svg";
import {
    createProperty, uploadImage, uploadAttachment, getAllProperties
} from "../../../redux/actions/propertyAction";
import { getAllContacts, deleteContact } from "../../../redux/actions/userContactAction";
import { Checkbox, InputLabel } from "@material-ui/core";

const ViewContact = (props) => {
    let history = useHistory();
    const data = props.location.state.userData
    console.log(data)
    const [selectedCompany, setSelectedCompany] = useState(data.contactCompany ? data.contactCompany.name : "");
    const [isAddNotesModal, setIsAddNotesModal] = useState(false);
    const [placeHolder, setPlaceHolder] = useState('')
    const [calanderValue, onCalanderChange] = useState(new Date());
    const [isLoding, setIsLoading] = useState(false)
    const [employeeList, setEmployeeList] = useState([]);
    const [keyWord, setKeyWord] = useState("");
    const [activePageNo, setActivePageNo] = useState(1);
    const [rowsPerPage, seRowPerPage] = useState(4);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [searchKey, setSearchKey] = useState('');
    const [dataLength, setDataLength] = useState();
    const [paginationcollection, setPaginationcollection] = useState([
        1,
        2,
        3,
        4,
        5,
    ]);
    const [paginationLowerBound, setPaginationLowerBound] = useState(1);
    const [paginationUpperBound, setPaginationUpperBound] = useState(5);
    const [isUpdated, setisUpdated] = useState(false);
    const tagsoptions = [
        "Buyer", "Seller", "Both", "N/A"
    ]
    const statusoptions = [
        "None", "No Connection Made", "Connection Made", "Building Relationship", "Listing Opportunity", "Listing", "Cold", "Hot", "Medium"
    ]
    const [isTagDropdown, setIsTagDropdown] = useState(true);
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [msg, setMsg] = useState("")

    const dispatch = useDispatch();
    const { userContacts } = useSelector((state) => ({
        userContacts: state.userContacts,
    }));
    const { employeeUpdated } = useSelector((state) => ({
        employeeUpdated: state.general.employeeUpdated,
    }));
    const { employeeCreated } = useSelector((state) => ({
        employeeCreated: state.general.employeeCreated,
    }));
    const { totalPages } = useSelector((state) => ({
        totalPages: state.general.totalPages,
    }));

    useEffect(() => {
        setIsLoading(true)
        setTimeout(function(){ setIsLoading(false)  }, 500);
      }, []);

    let handleSubmit = () => {

    }
    return (
        <>
        {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
            <div >
                <div className="create-employee-back-btn align-items-center mb-3">
                    <CButton className="save-btn-white btn" style={{ width: '200px' }} onClick={() => history.push('/user/contacts')}>
                        <img src={BackIcon} className="m-0 mr-2" /> Back To Contacts
                     </CButton>
                </div>
                <div className="row">
                    <div className="cardBox col-12 col-md-12">
                        <div className="create-employee-wrapper border px-0 py-3">
                            <div className="form-group col-12 mb-0">
                                <div className="row mx-0" style={{ display: 'flex' }}>
                                    <div className="fullconatct-left">
                                        <img src={data.profileImage ? data.profileImage : profile} />
                                    </div>
                                    <div className="fullconatct-right">
                                        <div className="table--ownership">
                                            <table class="table table-striped-owner">
                                                <tbody>
                                                    <tr>
                                                        <td><img src={NameIcon} /></td>
                                                        <td className="card-cell-title">Name:</td>
                                                        <td>{data.name}</td>
                                                        <td><img src={cellIcon} /></td>
                                                        <td className="card-cell-title">Cell:</td>
                                                        <td>{data.phoneNumber}</td>
                                                        <td><img src={AddresIcon} /></td>
                                                        <td className="card-cell-title">Address:</td>
                                                        <td>{data.contactAddresses[0].address}</td>
                                                        <td><img src={phoneListBtn} /></td>
                                                        <td><img src={editIcon} /></td>

                                                    </tr>
                                                    <tr>
                                                        <td><img src={CompanyblackIcon} /></td>
                                                        <td className="card-cell-title">Company:</td>
                                                        <td>{selectedCompany}</td>
                                                        <td><img src={officeIcon} /></td>
                                                        <td className="card-cell-title">Office:</td>
                                                        <td>{data.office}</td>
                                                        <td><img src={CityIcon} /></td>
                                                        <td className="card-cell-title">City:</td>
                                                        <td>{data.contactAddresses[0].city}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><img src={divisionIcon} /></td>
                                                        <td className="card-cell-title">Division:</td>
                                                        <td>{data.department}</td>
                                                        <td><img src={emailIcon} /></td>
                                                        <td className="card-cell-title">Email:</td>
                                                        <td>{data.email}</td>
                                                        <td><img src={CountryIcon} /></td>
                                                        <td className="card-cell-title">Country:</td>
                                                        <td>{data.contactAddresses[0].country}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><img src={ZipIcon} /></td>
                                                        <td className="card-cell-title">Name:</td>
                                                        <td>{data.name}</td>
                                                        <td></td>
                                                        <td className="card-cell-title"></td>
                                                        <td></td>
                                                        <td><img src={StateIcon} /></td>
                                                        <td className="card-cell-title">State:</td>
                                                        <td>{data.contactAddresses[0].state}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><img src={tagIcon} /></td>
                                                        <td className="card-cell-title">Tags:</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td className="card-cell-title"></td>
                                                        <td></td>
                                                        <td><img src={ZipIcon} /></td>
                                                        <td className="card-cell-title">Zip Code:</td>
                                                        <td>{data.contactAddresses[0].zipCode}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><img src={StatusIcon} /></td>
                                                        <td className="card-cell-title">Status:</td>
                                                        <td>{data.connectionStatus.connectionStatus}</td>
                                                        <td></td>
                                                        <td className="card-cell-title"></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td className="card-cell-title"></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardBox col-12 col-md-12">
                        <div className="view-contact-wrapper border px-0 py-3">
                            <div className="form-group col-12 mb-0">
                                <div className="row" >
                                    <div className="col-12">
                                        <div className="table--ownership" style={{ display: 'flex' }}>
                                            <div >
                                                <img src={phoneIcon} />
                                            </div>
                                            <div >
                                                <img src={directMailIcon} />
                                            </div>
                                            <div >
                                                <img src={followUpIcon} />
                                            </div>
                                            <div >
                                                <img src={textMsgIcon} />
                                            </div>
                                            <div >
                                                <img src={emailMsgIcon} />
                                            </div>
                                            <div >
                                                <img src={scheduleMeeting} />
                                            </div>
                                            <div >
                                                <img src={followUpBtn} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cardBox col-12 col-md-12">

                        <div className="form-group col-12 mb-0">
                            <div className="row" >
                                <div className="col-4 associate-prop">
                                    <div class="create-contact-header align-items-center">
                                        <h3 class="titleheader--card d-flex align-items-center"><img src={bellIcon} />Recent Activity</h3>
                                    </div>
                                    <div className="phone-call-wrapper border px-0 py-0">
                                        <div className="scrollbar-note note--property-label d-flex align-items-center">
                                            <img src={addicon} />
                                            <b>Add Recent Acitivity</b>
                                        </div>
                                        <div className="scrollbar-note note--property d-flex align-items-center">
                                            <img src={phoneLightIcon} />
                                            <div className="phone-call-rightwrapper">
                                                <b className="recent-acivity-label">Phone Call</b>
                                                <div>Description..... (max # of words)</div>
                                            </div>
                                        </div>
                                        <div className="scrollbar-note note--property d-flex align-items-center">
                                            <img src={emailLightIcon} />
                                            <div className="phone-call-rightwrapper">
                                                <b className="recent-acivity-label">Email</b>
                                                <div>Description..... (max # of words)</div>
                                            </div>
                                        </div>
                                        <div className="scrollbar-note note--property d-flex align-items-center">
                                            <img src={directMailLightIcon} />
                                            <div className="phone-call-rightwrapper">
                                                <b className="recent-acivity-label">Direct Mail</b>
                                                <div>Description..... (max # of words)</div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-4 associate-prop" >
                                    <div class="create-contact-header align-items-center">
                                        <h3 class="titleheader--card d-flex align-items-center"><img src={associatedPropIcon} />Associated Properties</h3>
                                    </div>
                                    <div className="phone-call-wrapper border px-0 py-0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="farm--warp">
                                                        <div className="farm-image">
                                                            <CImg
                                                                src={farm1}
                                                                fluid
                                                                className="img--farm"
                                                            />
                                                        </div>
                                                        <div className="farm--name">
                                                            <div className="name-farm-house">New Farm House</div>
                                                            <div className="farmhouse">
                                                                City Gipzukoa | No. of Units 6 | Building Size: 5268
                                                                </div>
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="farm--warp">
                                                        <div className="farm-image">
                                                            <CImg
                                                                src={farm2}
                                                                fluid
                                                                className="img--farm"
                                                            />
                                                        </div>
                                                        <div className="farm--name">
                                                            <div className="name-farm-house">New Farm House</div>
                                                            <div className="farmhouse">
                                                                City Gipzukoa | No. of Units 6 | Building Size: 5268
                                                                </div>
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="farm--warp">
                                                        <div className="farm-image">
                                                            <CImg
                                                                src={farm3}
                                                                fluid
                                                                className="img--farm"
                                                            />
                                                        </div>
                                                        <div className="farm--name">
                                                            <div className="name-farm-house">New Farm House</div>
                                                            <div className="farmhouse">
                                                                City Gipzukoa | No. of Units 6 | Building Size: 5268
                                                                </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="farm--warp">
                                                        <div className="farm-image">
                                                            <CImg
                                                                src={farm4}
                                                                fluid
                                                                className="img--farm"
                                                            />
                                                        </div>
                                                        <div className="farm--name">
                                                            <div className="name-farm-house">New Farm House</div>
                                                            <div className="farmhouse">
                                                                City Gipzukoa | No. of Units 6 | Building Size: 5268 | Land Size: 28
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>


                                        </tbody>
                                    </div>
                                </div>
                                <div className="col-4 associate-prop" >
                                    <div class="create-contact-header align-items-center">
                                        <h3 class="titleheader--card d-flex align-items-center"><img src={notesIcon} /> Notes</h3>
                                    </div>
                                    <div className="phone-call-wrapper border px-0 py-0">
                                        <div className="scrollbar-note note--property-label d-flex align-items-center" onClick={() => setIsAddNotesModal(true)}>
                                            <img src={addicon} />
                                            <b>Add New Note</b>
                                        </div>
                                        <div className="properttxt-wrp notetxt--view-wrap">
                                            <div className="propertyNote--area">
                                                <div class="text-right"><img src={Dotline} /></div>
                                                <span>10/24/2020</span>
                                                <h3 className="">Send Direct Mail</h3>
                                                <p>Property is situated for a new development and there is a new construciton down the block making it prime for development</p>
                                            </div>
                                        </div>
                                        <div className="properttxt-wrp notetxt--view-wrap">
                                            <div className="propertyNote--area">
                                                <div class="text-right"><img src={Dotline} /></div>
                                                <span>10/24/2020</span>
                                                <h3 className="">Send Direct Mail</h3>
                                                <p>Property is situated for a new development and there is a new construciton down the block making it prime for development</p>
                                            </div>
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
                                                {" "}
                                                    Add Note
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
                                                                    Title
                                                                    </div>
                                                            </div>
                                                            <CInput
                                                                type="text"
                                                                name="username"
                                                                className="input-addtaskcontrol"
                                                                onChange={(e) => setPlaceHolder(e.target.value)}
                                                                value={placeHolder}
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
                                                                    Description
                                                                    </div>
                                                            </div>
                                                            <CInput
                                                                type="text"
                                                                name="username"
                                                                className="input-addtaskcontrol"
                                                                onChange={(e) => setPlaceHolder(e.target.value)}
                                                                value={placeHolder}
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
                                        <div className="form-group">
                                            <CButton
                                                color="primary"
                                                className="login-btn px-5"
                                            // onClick={handleSubmit}
                                            >
                                                Submit
                                                </CButton>
                                        </div>
                                    </CForm>
                                </CModal>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewContact;
