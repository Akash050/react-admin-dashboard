import React, { useEffect, useState, createRef } from "react";
import { CImg } from "@coreui/react";
import Loading from "react-fullscreen-loading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  created,
} from "../../../redux/actions/employeeActions";
import {
  updated,
} from "../../../redux/actions/employeeActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import swal from 'sweetalert';
import profile from "../../../assets/profile.png";
import cellIcon from "../../../assets/cell.svg";
import tagIcon from "../../../assets/tags.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import search from "../../../assets/icons/search-icon.svg";
import PhoneIcon from "../../../assets/icons/phone-Icon.svg";
import addicon from "../../../assets/icons/addicon.svg";
import namecdicon from "../../../assets/icons/namecd-icon.svg";
import messageicon from "../../../assets/icons/message-icon.svg";
import paymenticon from "../../../assets/icons/payment-icon.svg";
import prevpage from "../../../assets/icons/prev-arrow.svg";
import nextpage from "../../../assets/icons/next-arrow.svg";
import tagsicon from "../../../assets/icons/tags-icon.svg";
import editHeaderIcon from "../../../assets/edit-icon.svg";
import editIcon from "../../../assets/edit.svg";
import external_link from "../../../assets/icons/external-link.svg";
import deleteIcon from "../../../assets/icons/trash.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateContact } from "../../../redux/actions/userContactAction";
import { getAllContacts, deleteContact } from "../../../redux/actions/userContactAction";
import { setMessages } from "validatorjs";
const Contacts = (props) => {
  let history = useHistory();
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
  const [isLoding, setIsLoading] = useState(true);
  const [isSecondaryAdd, setIsSecondaryAdd] = useState(false)
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

  let openToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    setIsLoading(true);
    async function getContacts() {
      await dispatch(getAllContacts(page, size, searchKey));
      // dispatch(getSalary())
      // dispatch(getemployeecount(page, size, roleId, searchKey))
      setIsLoading(false);
    }
    getContacts();
    if (employeeUpdated === true) {
      swal("Contact Updated Successfully!", {
        icon: "success",
      });
      //openToast("User Updated Succesfully");
      dispatch(updated(false));
    }
    if (employeeCreated === true) {
      swal("Contact Created Successfully!", {
        icon: "success",
      });
      //openToast("User Created Succesfully");
      dispatch(created(false));
    }
  }, [page]);

  useEffect(() => {
    if (totalPages != undefined) {
      let temp = [];
      for (let i = 1; i <= totalPages; i++) {
        temp.push(i);
      }
      setDataLength(temp);
    }
  }, [totalPages]);

  useEffect(() => {
    if (userContacts) {
      const unique = [
        ...new Map(userContacts.map((item) => [item["id"], item])).values(),
      ];
      setEmployeeList(unique);
    } else {
      setEmployeeList([]);
    }
  }, [userContacts]);

  let createContact = () => {
    props.history.push("/user/contact/create");
  };

  let onSearch = async (e) => {
    setIsLoading(true);
    setKeyWord(e.target.value)
    console.log(e.target.value)
    let data = await dispatch(getAllContacts(page, size, e.target.value));
    console.log('data', data)
    setIsLoading(false);
  };

  const handleClick = async (type, val) => {
    let result;
    if (type == "edit") {
      // if ((val.contactAddresses[1].address !== "") || (val.contactAddresses[1].city !== "") || (val.contactAddresses[1].country !== "") || (val.contactAddresses[1].state !== "") || (val.contactAddresses[1].zipCode !== "")) {
      //   result = true;
      // }
      // else {
      //   result = false;
      // }

      console.log('isss', isSecondaryAdd)
      props.history.push({
        pathname: `/user/contact/edit/${val.id}`,
        state: { userData: val },
      });
    }
    else if (type === "view") {
      props.history.push({
        pathname: `/user/contact/view/${val.id}`,
        state: { userData: val, },
      });
    }
    else if (type === "delete") {
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
            const data = await dispatch(deleteContact(val.id));
            if (data.success === true) {
              setIsLoading(false)
              history.push("/user/contacts");
              swal("Contact Deleted Successfully!", {
                icon: "success",
              });
            } else {
              setIsLoading(false)
              console.log("err");
            }
          } else {
            setIsLoading(false)
            // swal("Your imaginary file is safe!");
          }
        });
    }
  };

  let handlePrevClick = (e) => {
    e.preventDefault();
    if (page > 0) {
      setPage(page - 1);
    }
    return;
    if (activePageNo == paginationLowerBound && activePageNo > 1) {
      let arr = paginationcollection.slice(0, paginationcollection.length - 1);
      let newArr = [arr[0] - 1, ...arr];
      setPaginationcollection(newArr);
      setPaginationUpperBound(newArr[newArr.length - 1]);
      setPaginationLowerBound(newArr[0]);
      setActivePageNo(newArr[0]);
    } else if (activePageNo != paginationLowerBound && activePageNo > 1) {
      setActivePageNo(activePageNo - 1);
    }
  };
  let handleNextClick = (e) => {
    e.preventDefault();
    if (page + 1 < dataLength.length) {
      setPage(page + 1);
    }
    return;
    if (employeeList.length <= activePageNo * rowsPerPage) {
      return;
    }
    if (activePageNo >= paginationUpperBound) {
      let arr = paginationcollection.slice(1, paginationcollection.length);
      let newArr = [...arr, arr[arr.length - 1] + 1];
      setPaginationUpperBound(newArr[newArr.length - 1]);
      setPaginationLowerBound(newArr[0]);
      setPaginationcollection(newArr);
      setActivePageNo(arr[arr.length - 1] + 1);
    } else if (activePageNo < paginationUpperBound) {
      setActivePageNo(activePageNo + 1);
    }
  };
  let handlePageClick = (e, val) => {
    e.preventDefault();
    setPage(val - 1);
    return;

    if (
      employeeList.length <= val * rowsPerPage &&
      employeeList.length >= val * rowsPerPage - rowsPerPage
    ) {
      setActivePageNo(val);
    } else if (
      employeeList.length >= val * rowsPerPage &&
      employeeList.length >= val * rowsPerPage - rowsPerPage
    ) {
      setActivePageNo(val);
    }
  };
  const getClassName = (val) => {
    console.log('val', val)
    if (val === "No Connection Made") {
      return `monthly-salary2 red-color`
    }
    if (val === "None") {
      return `monthly-salary2 none-color`
    }
    if (val === "Connection Made") {
      return `monthly-salary2 green-color`
    }
    if (val === "Building Relationship") {
      return `monthly-salary2 blue-color`
    }
    if (val === "Listing Opportunity") {
      return `monthly-salary2 voilet-color`
    }
    if (val === "Listing") {
      return `monthly-salary2 yellow-color`
    }
    if (val === "Cold") {
      return `monthly-salary2 blue-color`
    }
    if (val === "Hot") {
      return `monthly-salary2 orange-color`
    }
    if (val === "Medium") {
      return `monthly-salary2 light-green-color`
    }
  }
  const handleTagChange = async (e, v, val) => {
    setSelectedTag(v)
    let selectedConnection;
    if (v === 'Buyer') {
      selectedConnection = 1;
    }
    if (v === 'Seller') {
      selectedConnection = 2;
    }
    if (v === 'Both') {
      selectedConnection = 3;
    }
    if (v === 'N/A') {
      selectedConnection = 4;
    }
    

    const params = {
      id: val.id,
      name: val.name,
      jobTitle: val.jobTitle,
      salutation: val.salutation,
      profileImage: val.profileImage,
      email: val.email,
      phoneNumber: val.phoneNumber,
      office: val.office,
      department: val.department,
     // tags: "ab",
      note: val.note,
      connectionStatus: {
        id: val.connectionStatus.id
      },
      contactType: {
        id: selectedConnection
      },
      companyDivision: {
        id: val.companyDivision
      },
      contactCompany: {
        id: val.contactCompany.id
      },
      contactAddresses: val.contactAddresses,
      customFields: JSON.parse(val.customFieldsJsonValue),
      socialLinksContact: val.socialLinksContact
    }
    // const params = {
    //   id: val.id,
    //   name: val.name,
    //   jobTitle: val.jobTitle,
    //   salutation: val.salutation,
    //   profileImage: val.profileImage,
    //   email: val.email,
    //   phoneNumber: val.phoneNumber,
    //   office: val.office,
    //   department: val.department,
    //   // tags: "ab",
    //   note: val.note,
    //   connectionStatus: {
    //     id: val.connectionStatus.id
    //   },
    //   contactType: {
    //     id: selectedConnection
    //   },
    //   contactAddresses: val.contactAddresses,
    //   customFields: [
    //     {
    //       label: "test Label",
    //       value: "testing lable values"
    //     }
    //   ],
    //   socialLinksContact:
    //     val.socialLinksContact
    // }
    console.log('update', params)
    const data = await dispatch(updateContact(params));
    if (data.success === true) {
      // if (profileUrl != "") {
      //     let formData = new FormData();
      //     formData.append("profile", profileUrl);
      //     if (data.body != null) {
      //         const uploadData = await dispatch(
      //             uploadProfile(data.body.id, formData)
      //         )
      //     }
      // }
      dispatch(updated(true));
      // history.push("/user/contacts");
    } else {
      console.log("err");
    }
  }
  const handleStatusChange = async (e, v, val) => {
    setSelectedStatus(v)
    let selectedConnstatus;
    if (v == 'None') {
      selectedConnstatus = 5
    }
    if (v == 'No Connection Made') {
      selectedConnstatus = 6
    }
    if (v == 'Connection Made') {
      selectedConnstatus = 7
    }
    if (v == 'Building Relationship') {
      selectedConnstatus = 8
    }
    if (v == 'Listing Opportunity') {
      selectedConnstatus = 9
    }
    if (v == 'Listing') {
      selectedConnstatus = 10
    }
    if (v == 'Cold') {
      selectedConnstatus = 11

    }
    if (v == 'Hot') {
      selectedConnstatus = 12
    }
    if (v == 'Medium') {
      selectedConnstatus = 13
    }
    const params = {
      id: val.id,
      name: val.name,
      jobTitle: val.jobTitle,
      salutation: val.salutation,
      profileImage: val.profileImage,
      email: val.email,
      phoneNumber: val.phoneNumber,
      office: val.office,
      department: val.department,
      tags: "ab",
      note: val.note,
      connectionStatus: {
        id: selectedConnstatus
      },
      contactType: {
        id: val.contactType.id
      },
      companyDivision: {
        id: val.companyDivision
      },
      contactCompany: {
        id: val.contactCompany.id
      },
      // companyDivision: {
      //     id: selectedCompanyDetails.id
      //     // id: '51fc51c5-4657-4f6f-a7d9-7b4b7aa4d7a9'
      // },
      contactAddresses: val.contactAddresses,
      customFields: JSON.parse(val.customFieldsJsonValue),
      socialLinksContact: val.socialLinksContact
    }
    //   const params = {
    //     id: val.id,
    //     name: val.name,
    //     jobTitle: val.jobTitle,
    //     salutation: val.salutation,
    //     profileImage: val.profileImage,
    //     email: val.email,
    //     phoneNumber: val.phoneNumber,
    //     office: val.office,
    //     department: val.department,
    //     // tags: "ab",
    //     note: val.note,
    //     connectionStatus: {
    //       id: selectedConnstatus
    //     },
    //     contactType: {
    //       id: val.contactType.id
    //     },
    //     contactAddresses: val.contactAddresses.length && val.contactAddresses.length > 1 ?
    //       [
    //         {
    //           id: val.contactAddresses[0].id,
    //           address: val.contactAddresses[0].address,
    //           state: val.contactAddresses[0].state,
    //           city: val.contactAddresses[0].city,
    //           zipCode: val.contactAddresses[0].zipCode,
    //           country: val.contactAddresses[0].country
    //         },
    //         {
    //           id: val.contactAddresses[1].id,
    //           address: val.contactAddresses[1].address,
    //           state: val.contactAddresses[1].state,
    //           city: val.contactAddresses[1].city,
    //           zipCode: val.contactAddresses[1].zipCode,
    //           country: val.contactAddresses[1].country
    //         }
    //       ]
    //       :
    //       [
    //         {
    //           id: val.contactAddresses[0].id,
    //           address: val.contactAddresses[0].address,
    //           state: val.contactAddresses[0].state,
    //           city: val.contactAddresses[0].city,
    //           zipCode: val.contactAddresses[0].zipCode,
    //           country: val.contactAddresses[0].country
    //         }
    //       ],

    //   contactAddresses: [
    //     {
    //       id: val.contactAddresses[0].id,
    //       address: val.contactAddresses[0].address,
    //       state: val.contactAddresses[0].state,
    //       city: val.contactAddresses[0].city,
    //       zipCode: val.contactAddresses[0].zipCode,
    //       country: val.contactAddresses[0].country
    //     },
    //     {
    //       id: val.contactAddresses[1].id,
    //       address: val.contactAddresses[1].address,
    //       state: val.contactAddresses[1].state,
    //       city: val.contactAddresses[1].city,
    //       zipCode: val.contactAddresses[1].zipCode,
    //       country: val.contactAddresses[1].country
    //     }
    //   ],
    //   customFields: [
    //     {
    //       label: "test Label",
    //       value: "testing lable values"
    //     }
    //   ],
    //     socialLinksContact:
    //   val.socialLinksContact
    // }
    const data = await dispatch(updateContact(params));
    if (data.success === true) {
      // if (profileUrl != "") {
      //     let formData = new FormData();
      //     formData.append("profile", profileUrl);
      //     if (data.body != null) {
      //         const uploadData = await dispatch(
      //             uploadProfile(data.body.id, formData)
      //         )
      //     }
      // }
      // dispatch(updated(true));
      // history.push("/user/contacts");
    } else {
      console.log("err");
    }
  }
  return (
    <>
      {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
      <div className="employee-header-top">
        <div className="row align-items-end">
          <div className="col-12 col-md-9">
            <div className="row">
              <div className="search-bar col-12 col-md-4 pr-4">
                <form className="form-inline-srch-top">
                  <div className="input-group-src-frm">
                    <span className="src--icontop-list mr-2">
                      <img src={search} />
                    </span>
                    <input
                      type="text"
                      value={keyWord}
                      onChange={onSearch}
                      className="form-control srccontrol-top"
                      placeholder="Search Contact or Company"
                      aria-label="Username"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="right-wrapper text-right">
              <div className="popup-btn" onClick={() => createContact()}>
                <div className="btn-value btnadd-btn">
                  <img src={addicon} className="m-0 mr-2" /> Add New Contact
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="employee-table-wrapper">
        <div className="mt-4">
          <table className="table tableemployee">
            <thead>
              <tr>
                <th>
                  <span className="titlefill-tb">
                    <img src={namecdicon} />
                    Contact Information
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb">
                    <img src={messageicon} />
                    Property Information
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb">
                    <img src={tagIcon} /> Follow Up Item
                  </span>
                </th>
                <th></th>
              </tr>
            </thead>

            {employeeList &&
              employeeList.map((val) => {
                return (
                  <tbody key={val.id}>
                    <tr>
                      <td>
                        <div className="follow--wrap-tb employeeprf--warp">
                          <div className="card-profile mr-4">
                            <CImg
                              src={val.profileImage ? val.profileImage : profile}
                              fluid
                              className="imgPrf--empl"
                            />
                          </div>
                          <div className="card-contact-wrapper mr-4">
                            <ul className="nameList--follow">
                              <li className="follow--list">
                                <div className="card-cell">
                                  <CImg src={cellIcon} fluid className="company-title" />
                                  <div className="card-cell-title cardFollow--Title">Name:</div>
                                  <div className="number-txt">Kyle Kelley</div>
                                </div>
                                <div className="card-cell">
                                  <CImg
                                    src={cellIcon}
                                    fluid
                                    className="company-title"
                                  />
                                  <div className="card-cell-title cardFollow--Title">Tags:</div>
                                  <div className="number-txt">Kyle Kelley</div>
                                </div>
                              </li>
                              <li className="follow--list">
                                <div className="card-cell">
                                  <CImg
                                    src={officeIcon}
                                    fluid
                                    className="company-title"
                                  />
                                  <div className="card-cell-title cardFollow--Title">Company:</div>
                                  <div className="number-txt">Kyle Kelley</div>
                                </div>
                                <div className="card-cell">
                                  <CImg
                                    src={officeIcon}
                                    fluid
                                    className="company-title"
                                  />
                                  <div className="card-cell-title cardFollow--Title">Status:</div>
                                  <div className="number-txt">Kyle Kelley</div>
                                </div>
                              </li>
                              <li className="follow--list">
                                <div className="card-cell">
                                  <CImg src={emailIcon} fluid className="company-title" />
                                  <div className="card-cell-title cardFollow--Title">Division:</div>
                                  <div className="number-txt">Kyle Kelley</div>
                                </div>
                              </li>
                              <li className="follow--list">
                                <div className="card-cell">
                                  <CImg
                                    src={emailIcon}
                                    fluid
                                    className="company-title"
                                  />
                                  <div className="card-cell-title cardFollow--Title">Title:</div>
                                  <div className="number-txt">Kyle Kelley</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="card-contact-wrapper">
                            
                            
                          </div>   
                        </div>
                      </td>
                      <td>
                        Property Information
                      </td>
                      <td>
                        <button className="btn followboth-btn" type="button"><img className="m-0 mr-2" src={PhoneIcon} />Phone  call</button>
                      </td>
                      <td>
                        Call To Meet
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          {msg ? <div>
            {msg}
          </div> : ""}
          <div className="pagination--bar py-2">
            <ul className="pagination">
              <li onClick={handlePrevClick} className="page-item-link">
                <a className="linkpage page-prev" href="">
                  <img src={prevpage} className="m-0" />
                </a>
              </li>
              { }
              {dataLength &&
                dataLength.map((val, index) => {
                  return (
                    <li
                      key={val}
                      onClick={(e) => handlePageClick(e, val)}
                      className="page-item-link"
                    >
                      <a
                        className={`linkpage ${val == page + 1 ? "active" : null
                          }`}
                        href=""
                      >
                        {val}
                      </a>
                    </li>
                  );
                })}
              <li onClick={handleNextClick} className="page-item-link">
                <a className="linkpage next-prev" href="">
                  <img src={nextpage} className="m-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Contacts;
