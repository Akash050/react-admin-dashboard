import React, { useEffect, useState } from "react";
import {
  CImg,
} from "@coreui/react";
import Loading from "react-fullscreen-loading";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  created,
  newCompany,
  getAllCompany,
  deleteCompany,
  updated,
} from "../../../redux/actions/companyAction";
import profile from "../../../assets/profile.png";
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
import editIcon from "../../../assets/edit.svg";
import editHeaderIcon from "../../../assets/edit-icon.svg";
import deleteIcon from "../../../assets/delete.svg";
import { ToastContainer, toast } from "react-toastify";
import * as employeeActionTypes from "../../../redux/actionsType/employeeActionType";
import "react-toastify/dist/ReactToastify.css";
const Company = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [companyList, setCompanyList] = useState([]);
  const [dataLength, setDataLength] = useState();
  const [keyWord, setKeyWord] = useState("");
  const [activePageNo, setActivePageNo] = useState(1);
  const [rowsPerPage, seRowPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [searchKey, setSearchKey] = useState("");
  const [paginationLowerBound, setPaginationLowerBound] = useState(1);
  const [paginationUpperBound, setPaginationUpperBound] = useState(5);
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoding, setIsLoading] = useState(false);

  // let [employeeCount, setEmployeeCount] = useState(0);


  const { company } = useSelector((state) => ({
    company: state.company,
  }));
  const { companyGeneral } = useSelector((state) => ({
    companyGeneral: state.companyGeneral,
  }));
  const { companyUpdated } = useSelector((state) => ({
    companyUpdated: state.general.employeeUpdated,
  }));
  const { companyCreated } = useSelector((state) => ({
    companyCreated: state.general.employeeCreated,
  }));
  const { totalPages } = useSelector((state) => ({
    totalPages: state.companyGeneral.totalPages,
  }));
  const { numberOfElements } = useSelector((state) => ({
    numberOfElements: state.general.numberOfElements,
  }));

  // const employeeCount = Object.keys(allCompany).length;
  // const totalMonthlyPayment = Object.values(allCompany).reduce(
  //   (t, { monthlyPayment }) => t + (monthlyPayment ? monthlyPayment : 0),
  //   0
  // );
  let openToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const normalizeInput = (value, previousValue) => {
    console.log(value, previousValue)
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  useEffect(() => {
    async function getCompany() {
      dispatch(getAllCompany(page, size, searchKey));
      setIsLoading(false);
    }
    getCompany();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    async function getCompany() {
      dispatch({
        type: employeeActionTypes.RESET_STATE,
      });
      localStorage.removeItem('companyId')
      let data = await dispatch(getAllCompany(page, size, searchKey));
      if (data == undefined) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    getCompany();
    if (companyUpdated === true) {
      swal("Company Updated Succesfully!", {
        icon: "success",
      })
     // openToast("Company Updated Succesfully");
      dispatch(updated(false));
    }
    if (companyCreated === true) {
      swal("Company Created Succesfully!", {
        icon: "success",
      })
     // openToast("Company Created Succesfully");
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
    // if (allCompany) {
    //   const unique = [
    //     ...new Map(allCompany.map((item) => [item["id"], item])).values(),
    //   ];
    //   setCompanyList(unique);
    // } else {
    //   setCompanyList([]);
    // }
    setCompanyList(company);
  }, [company]);

  let CreateCompany = () => {
    props.history.push("/admin/company/create");
  };
  const handleClick = async (type, val) => {
    if (type === "edit") {
      props.history.push({
        pathname: `/superadmin/editcompany/${val.id}`,
        state: { userData: val },
      });
    } else if (type === "delete") {
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
            const data = await dispatch(deleteCompany(val.id));
            if (data.success === true) {
              setIsLoading(false)
              dispatch(getAllCompany(page, size, searchKey));
              swal("Contact Deleted Successfully!", {
                icon: "success",
              })
            } else {
              setIsLoading(false)
              console.log("err");
            }
          } else {
            setIsLoading(false);
          }
        });
    }
  };

  let handleAddCompany = () => {
    history.push("/superadmin/company/create");
  };

  let onSearch = async (e) => {
    setIsLoading(true);
    setKeyWord(e.target.value);
    let data = await dispatch(getAllCompany(page, size, e.target.value));
    setIsLoading(false);
  };

  let handlePrevClick = (e) => {
    e.preventDefault();
    if (page > 0) {
      setPage(page - 1);
    }
  };
  let handleNextClick = (e) => {
    e.preventDefault();
    if (page + 1 < dataLength.length) {
      setPage(page + 1);
    }
  };
  let handlePageClick = (e, val) => {
    e.preventDefault();
    setPage(val - 1);
  };
  let visitCompany = (val) => {
    localStorage.setItem("role", "SUPER_ADMIN_AS_COMPANY_ADMIN");
    localStorage.setItem("companyId", val.id);
    history.push("/admin/dashboard");
  };
  //console.log("comp ->", companyList);
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
              <div className="no-of-employees pr-4">
                <div className="d-flex align-items-center">
                  <div className="input-title">#of Companies</div>
                  <div className="input-value_txt">
                    <span className="input-value">
                      {companyGeneral.totalCompany}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="payment">
                <div className="d-flex align-items-center">
                  <div className="input-title">
                    {" "}
                  Total Salary Monthly Payment
                </div>
                  <div className="input-value_txt">
                    <span className="input-value">{''}</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="right-wrapper text-right">
              <div onClick={handleAddCompany} className="popup-btn">
                <div className="btn-value btnadd-btn">
                  <img src={addicon} className="m-0 mr-2" /> Add New Company
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
                  <span className="titlefill-tb superth-tbl">
                    <img src={namecdicon} />
                    Name
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb superth-tbl">
                    <img src={messageicon} />
                    Contact Info
                  </span>
                </th>
                {/* <th>
                  <span className="titlefill-tb superth-tbl">
                    <img src={paymenticon} /> No of Users:
                  </span>
                </th> */}
                <th>
                  <span className="titlefill-tb superth-tbl">
                    <img src={paymenticon} /> Monthly Payment:
                  </span>
                </th>
                <th>
                  <span className="titlefill-tb superth-tbl">
                    <img src={editHeaderIcon} /> Action
                  </span>
                </th>
              </tr>
            </thead>

            {companyList &&
              companyList.map((val) => {
                return (
                  <tbody key={val.id}>
                    <tr>
                      <td>
                        <div className="employeeprf--warp">
                          <div className="card-profile">
                            <CImg
                              src={
                                val != null && val.avatar ? val.avatar : profile
                              }
                              fluid
                              className="imgPrf--empl"
                            />
                          </div>
                          <div className="empcard--name">
                            <div className="name-employe">{val.name}</div>
                            <div className="employee-designat">
                              {val.designation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="card-contact-wrapper">
                          <div className="card-cell">
                            <CImg
                              src={cellIcon}
                              fluid
                              className="company-title"
                            />
                            <div className="card-cell-title">Cell:</div>
                            <div className="number-txt">{val.phoneNo}</div>
                          </div>
                          <div className="card-cell">
                            <CImg
                              src={officeIcon}
                              fluid
                              className="company-title"
                            />
                            <div className="card-cell-title">Office:</div>
                            <div className="number-txt">{val.office}</div>
                          </div>
                          <div className="card-cell">
                            <CImg
                              src={emailIcon}
                              fluid
                              className="company-title"
                            />
                            <div className="card-cell-title">Email:</div>
                            <div className="number-txt">{val.email}</div>
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <div className="number-tx">{val.noOfUsers}</div>
                      </td> */}
                      <td>
                        {val.monthlyAmountSubscription ? (
                          <div className="monthly-salary" >
                            {val.monthlyAmountSubscription}{" "}
                          </div>
                        ) : (
                            <div className="monthly-salary none-color">None</div>
                          )}
                      </td>
                      <td>
                        <span className="titlefill-tb superth-tbl">
                          <button
                            type="button"
                            class="btn btn-act--comp"
                            onClick={() => handleClick("edit", val)}
                          >
                            <i class="far fa-edit"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-act--comp"
                            onClick={() => handleClick("delete", val)}
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-act--comp"
                            style={{ backgroundColor: '#0046fe', color: 'white' }}
                            onClick={() => visitCompany(val)}
                          >
                            <i class="far fa-eye mr-2"></i>Visit Company
                          </button>
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
    </>
  );
};

export default Company;
