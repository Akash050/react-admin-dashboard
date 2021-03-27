import React, { useEffect, useState, createRef } from "react";
import { CImg, CModal, CForm, CInput, CButton } from "@coreui/react"
import Loading from "react-fullscreen-loading";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  created,
  deleteEmployee,
} from "../../../redux/actions/employeeActions";
import {
  deleteProperty,
  getAllProperties
} from "../../../redux/actions/propertyAction";
import profile from "../../../assets/profile.png";
import farm1 from "../../../assets/icons/farm1.svg"
import farm2 from "../../../assets/icons/farm2.svg"
import farm3 from "../../../assets/icons/farm3.svg"
import farm4 from "../../../assets/icons/farm4.svg"
import farm5 from "../../../assets/icons/farm5.svg"
import farm6 from "../../../assets/icons/farm6.svg"
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import search from "../../../assets/icons/search-icon.svg";
import addicon from "../../../assets/icons/addicon.svg";
import namecdicon from "../../../assets/icons/namecd-icon.svg";
import messageicon from "../../../assets/icons/message-icon.svg";
import paymenticon from "../../../assets/icons/payment-icon.svg";
import prevpage from "../../../assets/icons/prev-arrow.svg";
import nextpage from "../../../assets/icons/next-arrow.svg";
import property from "../../../assets/icons/property.svg";
import ownership from "../../../assets/icons/ownership.png";
import property_type from "../../../assets/images/property_type.png";
import external_link from "../../../assets/icons/external-link.svg";
import editIcon from "../../../assets/edit.svg";
import editHeaderIcon from "../../../assets/edit-icon.svg";
import deleteIcon from "../../../assets/icons/trash.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Properties = (props) => {
  let history = useHistory();
  const [propertyList, setPropertyList] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [activePageNo, setActivePageNo] = useState(1);
  const [rowsPerPage, seRowPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [roleId, setRoleId] = useState(4);
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
  const [isAddNewProperty, setIsAddNewProperty] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoding, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false)
  // let [employeeCount, setEmployeeCount] = useState(0);

  const dispatch = useDispatch();
  const { allProperties } = useSelector((state) => ({
    allProperties: state.property,
  }));
  const { totalPages } = useSelector((state) => ({
    totalPages: state.general.totalPages,
  }));
  const { create } = useSelector((state) => ({
    create: state.general.create,
  }));


  // const employeeCount = Object.keys(allEmployees).length;


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
    console.log("searchKey -->", searchKey)
    async function getProperty() {
      await dispatch(getAllProperties(page, size, searchKey));
      //dispatch(getemployeecount(page, size, roleId, searchKey))
      setIsLoading(false);
    }
    console.log('use efeect run')
    getProperty();

    // if (employeeUpdated === true) {
    //   openToast("User Updated Succesfully");
    //   dispatch(updated(false));
    // }
    if (create) {
      setIsEdit(true);
    }
    //dispatch(getAllEmployees());
  }, [page, isEdit]);

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
    if (allProperties) {
      const unique = [
        ...new Map(allProperties.map((item) => [item["id"], item])).values(),
      ];
      setPropertyList(unique);
    } else {
      setPropertyList([]);
    }
  }, [allProperties]);

  let propertyTemplateChange = (val) => {
    if (val == 'new') {
      props.history.push("/user/propertytemp/create");
    } else if (val == 'existing') {
      props.history.push("/user/property/create");
    } else if (val == 'edit') {
      props.history.push("/user/propertytemp/edit");
    }
  };


  let onSearch = async (e) => {
    setIsLoading(true);
    setKeyWord(e.target.value)
    let data = await dispatch(getAllProperties(page, size, e.target.value));
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

      // console.log('isss', isSecondaryAdd)
      // props.history.push({
      //   pathname: `/user/contact/edit/${val.id}`,
      //   state: { userData: val, isSecondaryAdd: result },
      // });
      props.history.push({
        pathname: `/user/property/edit/${val.id}`,
        state: { userData: val, },
      });
    }
    else if (type === "view") {
      props.history.push({
        pathname: `/user/property/view/${val.id}`,
        state: { userData: val, },
      });
    }
    else if (type === "delete") {
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
              history.push("/user/properties");
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
    if (property.length <= activePageNo * rowsPerPage) {
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
      property.length <= val * rowsPerPage &&
      property.length >= val * rowsPerPage - rowsPerPage
    ) {
      setActivePageNo(val);
    } else if (
      property.length >= val * rowsPerPage &&
      property.length >= val * rowsPerPage - rowsPerPage
    ) {
      setActivePageNo(val);
    }
  };
  console.log("property --------->>>>>", allProperties)

  return (
    <>
      {isLoding ? <Loading loading loaderColor="#3498db" /> : null}
      <div className="employee-header-top">
        <div className="row">
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
              <div className="popup-btn" onClick={() => setIsAddNewProperty(true)}>
                <div className="btn-value btnadd-btn">
                  <img src={addicon} className="m-0" /> Add New Property
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
                    <img src={property} />
                    Property
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb">
                    <img src={property_type} />
                    Type
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb">
                    <img src={ownership} /> OwnerShip
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb">
                    <img src={paymenticon} /> Status:
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb">
                    <img src={editHeaderIcon} /> Action
                  </span>
                </th>
              </tr>
            </thead>
            {allProperties &&
              allProperties.map((val) => {
                console.log("val.propertyImages.length ->", val.propertyImages)
                return (
                  <tbody key={val.id}>
                    <tr>
                      <td>
                        <div className="employeeprf--warp">
                          <div className="card-profile">
                          <CImg src={`${profile}`} fluid className="imgPrf--empl" />
                            {/* <CImg src={`${val.propertyImages? val.propertyImages[0].imageUrl: profile}`} fluid className="imgPrf--empl" /> */}
                          </div>
                          <div className="empcard--name">
                            <div className="name-employe">{val.propertyName}</div>
                            <div className="employee-designat">City: {val.city}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="number-txt">Apartment</div>
                      </td>
                      <td>
                        <div className="number-txt">{val.contact.name}</div>
                      </td>
                      <td>
                        <div className="number-txt">{val.propertyStatus.name}</div>
                      </td>
                      <td>
                        <span className="titlefill-tb choose_action">
                          <img
                            src={editIcon}
                            onClick={() => handleClick("edit", val)}
                          /><img
                            src={deleteIcon}
                            onClick={() => handleClick("delete", val)}
                          />
                          <img
                            src={external_link}
                            style={{ width: '20px', color: "" }}
                            onClick={() => handleClick("view", val)}
                          />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
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
      <CModal
        show={isAddNewProperty}
        onClose={() => setIsAddNewProperty(false)}
        centered={true}
        className="propertytemp--modal"
      >
        <CForm className="login-form">
          <div className="modal-body">
            <div className="px-3">
              <CButton className="btn btn-temp-btn"
                onClick={() => propertyTemplateChange('new')}
              >Add Custom Template</CButton>
              <CButton className="btn btn-temp-btn"
                onClick={() => propertyTemplateChange('existing')}
              >Choose From Template</CButton>
              <CButton className="btn btn-temp-btn mb-0"
                onClick={() => propertyTemplateChange('edit')}
              >Edit Exisiting Template</CButton>
            </div>
          </div>
        </CForm>
      </CModal>
    </>
  );
};

export default Properties;
