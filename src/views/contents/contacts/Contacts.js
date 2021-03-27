import React, { useEffect, useState, createRef } from "react";
// import classNames from "classnames";
// import { rgbToHex } from "../employees/node_modules/@coreui/utils";
// import DocsLink from "../../../reusable/DocsLink";
import Modal from "../../../components/common/Modal";
import {
  CRow,
  CCol,
  CLabel,
  CInput,
  CFormGroup,
  CFormText,
  CButton,
  CImg,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { offerList, addOffer } from "../../../redux/actions/offerAction";
import profile from "../../../assets/profile.svg";
import cellIcon from "../../../assets/cell.svg";
import officeIcon from "../../../assets/office.svg";
import emailIcon from "../../../assets/table-email.svg";
import search from "../../../assets/icons/search-icon.svg";
import addicon from "../../../assets/icons/addicon.svg"
import namecdicon from "../../../assets/icons/namecd-icon.svg"
import messageicon from "../../../assets/icons/message-icon.svg"
import paymenticon from "../../../assets/icons/payment-icon.svg";
import prevpage from "../../../assets/icons/prev-arrow.svg";
import nextpage from "../../../assets/icons/next-arrow.svg";
const Contacts = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [offer_name, setOffer_name] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [valid_to, setValid_to] = useState("");
  const [Valid_from, setValid_from] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [activePageNo, setActivePageNo] = useState(1);
  const [rowsPerPage, seRowPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [searchKey, setSearchKey] = useState("");
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
  const [contactList, setContactList] = useState([]);
  const { totalPages } = useSelector((state) => ({
    totalPages: state.general.totalPages,
  }));
  const { employeeCount } = useSelector((state) => ({
    employeeCount: state.employeeCount,
  }));
  const { userContacts } = useSelector((state) => ({
    userContacts: state.userContacts,
  }));
  const dispatch = useDispatch();
  const { offerslist } = useSelector((state) => state.offers);
  useEffect(() => {
    async function getOffers() {
      // dispatch(offerList());
    }
    getOffers();
  }, []);

  useEffect(() => {
    if (userContacts) {
      const unique = [
        ...new Map(userContacts.map((item) => [item["id"], item])).values(),
      ];
      setContactList(unique);
    } else {
      setContactList([]);
    }
  }, [userContacts]);
  let createContact = () => {
    props.history.push('/admin/contact/create')
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
    if (contactList.length <= activePageNo * rowsPerPage) {
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
      contactList.length <= val * rowsPerPage &&
      contactList.length >= val * rowsPerPage - rowsPerPage
    ) {
      setActivePageNo(val);
    } else if (
      contactList.length >= val * rowsPerPage &&
      contactList.length >= val * rowsPerPage - rowsPerPage
    ) {
      setActivePageNo(val);
    }
  };
  return (
    <>
      <div className="employee-header-top">
        <div className="row">
          <div className="col-12 col-md-9">
            <div className="row">
              <div className="search-bar col-12 col-md-4 pr-4">
                <form className="form-inline-srch-top">
                  <div className="input-group-src-frm">
                    <span className="src--icontop-list mr-2"><img src={search} /></span>
                    <input
                      type="text"
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
                <div className="btn-value btnadd-btn"><img src={addicon} className="m-0" /> Add New User</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="employee-table-wrapper">
        <div className="mt-4">
          <table class="table tableemployee">
            <thead>
              <tr>
                <th><span className="titlefill-tb"><img src={namecdicon} />Name</span></th>
                <th><span className="titlefill-tb"><img src={messageicon} />Contact Info</span></th>
                <th><span className="titlefill-tb"><img src={namecdicon} /> # of Users</span></th>
                <th><span className="titlefill-tb"><img src={namecdicon} />Niche</span></th>
                <th><span className="titlefill-tb"><img src={namecdicon} />Monthly Payments</span></th>
                <th><span className="titlefill-tb"><img src={paymenticon} /> Open Tickets</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="employeeprf--warp">
                    <div className="card-profile">
                      <CImg src={profile} fluid className="imgPrf--empl" />
                    </div>
                    <div className="empcard--name">
                      <div className="name-employe">Kyle Kelley</div>
                      <div className="employee-designat">CEO/Founder</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="card-contact-wrapper">
                    <div className="card-cell">
                      <div className="number-txt">444-656-8008</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="number-txt">45</div>
                </td>
                <td>
                  <div className="number-txt">Industrial</div>
                </td>
                <td>
                  <div className="number-txt">$56779</div>
                </td>
                <td>
                  <div className="number-txt">No</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="employeeprf--warp">
                    <div className="card-profile">
                      <CImg src={profile} fluid className="imgPrf--empl" />
                    </div>
                    <div className="empcard--name">
                      <div className="name-employe">Kyle Kelley</div>
                      <div className="employee-designat">CEO/Founder</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="card-contact-wrapper">
                    <div className="card-cell">
                      <div className="number-txt">444-656-8008</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="number-txt">45</div>
                </td>
                <td>
                  <div className="number-txt">Industrial</div>
                </td>
                <td>
                  <div className="number-txt">$56779</div>
                </td>
                <td>
                  <div className="number-txt">No</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="employeeprf--warp">
                    <div className="card-profile">
                      <CImg src={profile} fluid className="imgPrf--empl" />
                    </div>
                    <div className="empcard--name">
                      <div className="name-employe">Kyle Kelley</div>
                      <div className="employee-designat">CEO/Founder</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="card-contact-wrapper">
                    <div className="card-cell">
                      <div className="number-txt">444-656-8008</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="number-txt">45</div>
                </td>
                <td>
                  <div className="number-txt">Industrial</div>
                </td>
                <td>
                  <div className="number-txt">$56779</div>
                </td>
                <td>
                  <div className="number-txt">No</div>
                </td>
              </tr>
            </tbody>
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
      </div>
    </>
  );
};

export default Contacts;
