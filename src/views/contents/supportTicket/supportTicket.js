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
const SupportTicket = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [offer_name, setOffer_name] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [valid_to, setValid_to] = useState("");
  const [Valid_from, setValid_from] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);


  const dispatch = useDispatch();
  const { offerslist } = useSelector((state) => state.offers);
  useEffect(() => {
    async function getOffers() {
      // dispatch(offerList());
    }
    getOffers();
  }, []);
  let createNewTicket = () => {
    props.history.push('/admin/ticket/create')
  }
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
                      placeholder="Search Ticket $"
                      aria-label="Username"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="right-wrapper text-right">
              {/* <div className="popup-btn" onClick={() => createNewTicket()}>
                <div className="btn-value btnadd-btn"><img src={addicon} className="m-0" /> Add New Ticket</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="employee-table-wrapper">
        <div className="mt-4">
          <table class="table tableemployee">
            <thead>
              <tr>
                <th><span className="titlefill-tb superth-tbl"><img src={namecdicon} />Number</span></th>
                <th><span className="titlefill-tb superth-tbl"><img src={paymenticon} />Date</span></th>
                <th><span className="titlefill-tb superth-tbl"><img src={messageicon} /> Email</span></th>
                <th><span className="titlefill-tb superth-tbl"><img src={messageicon} />Content</span></th>
                <th><span className="titlefill-tb superth-tbl"><img src={paymenticon} />User</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="number-txt">#001</div>
                </td>
                <td>
                  <div className="number-txt">02/04/2021</div>
                </td>
                <td>
                  <div className="number-txt">test@gmail.com</div>
                </td>
                <td>
                  <div className="number-txt">Bug Issue</div>
                </td>
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
              </tr>
              <tr>
                <td>
                  <div className="number-txt">#001</div>
                </td>
                <td>
                  <div className="number-txt">02/04/2021</div>
                </td>
                <td>
                  <div className="number-txt">test@gmail.com</div>
                </td>
                <td>
                  <div className="number-txt">Bug Issue</div>
                </td>
               
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
              </tr>
              <tr>
                <td>
                  <div className="number-txt">#001</div>
                </td>
                <td>
                  <div className="number-txt">02/04/2021</div>
                </td>
                <td>
                  <div className="number-txt">test@gmail.com</div>
                </td>
                <td>
                  <div className="number-txt">Bug Issue</div>
                </td>
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
              </tr>
            </tbody>
          </table>
          <div className="pagination--bar py-2">
            <ul className="pagination">
              <li className="page-item-link">
                <a className="linkpage page-prev" href="">
                  <img src={prevpage} className="m-0" />
                </a>
              </li>
              <li className="page-item-link">
                <a className="linkpage active" href="#">
                  1
                </a>
              </li>
              <li className="page-item-link">
                <a className="linkpage" href="#">
                  2
                </a>
              </li>
              <li className="page-item-link">
                <a className="linkpage" href="#">
                  3
                </a>
              </li>
              <li className="page-item-link">
                <a className="linkpage" href="#">
                  4
                </a>
              </li>
              <li className="page-item-link">
                <a className="linkpage" href="#">
                  5
                </a>
              </li>
              <li className="page-item-link">
                <a className="linkpage next-prev" href="#">
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

export default SupportTicket;
