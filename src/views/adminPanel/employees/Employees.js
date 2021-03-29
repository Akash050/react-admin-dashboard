import React, { useEffect, useState, createRef } from "react";
import { CImg } from "@coreui/react";
import swal from 'sweetalert';
import Loading from "react-fullscreen-loading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  created,
  deleteEmployee,
} from "../../../redux/actions/employeeActions";
import {
  getSalary,
  getAllEmployees,
  updated,
  getemployeecount,
  getAllCompanyIdEmployees
} from "../../../redux/actions/employeeActions";
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
import "react-toastify/dist/ReactToastify.css";
const Employees = (props) => {
  let history = useHistory();
  const [employeeList, setEmployeeList] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [activePageNo, setActivePageNo] = useState(1);
  const [rowsPerPage, seRowPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [roleId, setRoleId] = useState(4);
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
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoding, setIsLoading] = useState(true);
  const companyId = localStorage.getItem("companyId");
  // let [employeeCount, setEmployeeCount] = useState(0);

  const dispatch = useDispatch();
  const { allEmployees } = useSelector((state) => ({
    allEmployees: state.allEmployees,
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
  const { employeeCount } = useSelector((state) => ({
    employeeCount: state.employeeCount,
  }));
  const { salary } = useSelector((state) => ({
    salary: state.salary,
  }));
  const { numberOfElements } = useSelector((state) => ({
    numberOfElements: state.general.numberOfElements,
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
  useEffect(async () => {
    setIsLoading(true);
    const companyId = localStorage.getItem("companyId");
    async function getEmployees() {
      const role = localStorage.getItem("role")
      console.log('role', role)
      if (role == "SUPER_ADMIN_AS_COMPANY_ADMIN") {
        await dispatch(getAllCompanyIdEmployees(page, size, searchKey, companyId));
        await dispatch(getSalary(companyId));
        setIsLoading(false);
      }
      else {
        await dispatch(getAllEmployees(page, size, searchKey));
        await dispatch(getSalary());
        setIsLoading(false);
      }
      // dispatch(getemployeecount(page, size, roleId, searchKey,companyId));
    }
    getEmployees();
    if (employeeUpdated === true) {
      swal("Employee Updated Succesfully!", {
        icon: "success",
      })
      //openToast("Employee Updated Succesfully");
      dispatch(updated(false));
    }
    if (employeeCreated === true) {
      swal("Employee Created Succesfully!", {
        icon: "success",
      })
      // openToast("Employee Created Succesfully");
      dispatch(created(false));
    }

  }, []);

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
    if (allEmployees) {
      const unique = [
        ...new Map(allEmployees.map((item) => [item["id"], item])).values(),
      ];
      setEmployeeList(unique);
    } else {
      setEmployeeList([]);
    }
  }, [allEmployees]);

  let createEmployee = () => {
    props.history.push("/admin/employee/create");
  };

  let onSearch = async (e) => {
    setIsLoading(true);
    setKeyWord(e.target.value);
    let data = await dispatch(
      getAllEmployees(page, size, roleId, e.target.value, companyId)
    );
    setIsLoading(false);
  };

  const handleClick = async (type, val) => {
    if (type === "edit") {
      props.history.push({
        pathname: `/admin/employee/edit/${val.id}`,
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
            const data = await dispatch(deleteEmployee(val.id));
            if (data.success === true) {
              setIsLoading(false)
              dispatch(getemployeecount(page, size, searchKey, companyId));
              swal("User Deleted Successfully!", {
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

      // const data = await dispatch(deleteEmployee(val.id));
      // if (data.success === true) {
      //   history.push("/admin/employees");
      //   dispatch(getemployeecount(page, size, roleId, searchKey, companyId));
      //   openToast("Employee Deleted Succesfully");
      // } else {
      //   console.log("err");
      // }
    }
  };

  let getEmployeeList = () => {
    const items = employeeList.filter((data) => {
      if (keyWord === null) return data;
      else if (
        data.name.toLowerCase().includes(keyWord.toLowerCase()) ||
        data.email.toLowerCase().includes(keyWord.toLowerCase()) ||
        data.phoneNumber.toLowerCase().includes(keyWord.toLowerCase()) ||
        data.designation.toLowerCase().includes(keyWord.toLowerCase()) ||
        data.monthlyPayment
          .toString()
          .toLowerCase()
          .includes(keyWord.toLowerCase())
      ) {
        return data;
      }
    });
    return items;
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
  let goToOrignal = () => {
    localStorage.setItem("role", "ROLE_SUPER_ADMIN");
    history.push("/superadmin/companies");
  };
  // console.log("local stppppgett emp", localStorage.getItem('role'))
  return (
    <>
      {localStorage.getItem("role") == "SUPER_ADMIN_AS_COMPANY_ADMIN" ? (
        <div onClick={goToOrignal} className="snackbar">
          Go Back To Super Admin Panel
        </div>
      ) : null}
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
                  <div className="input-title">#of Employees</div>
                  {/* <CInput
                    type="number"
                    id="no-of-employees"
                    name="nf-email"
                    placeholder=""
                    autoComplete="no-of-employees"
                  /> */}
                  {
                    localStorage.getItem('role') == 'SUPER_ADMIN_AS_COMPANY_ADMIN' ?
                      <div className="input-value_txt">
                        <span className="input-value">{
                          employeeCount.payload ? parseInt(employeeCount.payload) - 1 : ''
                        }</span>
                      </div> :
                      <div className="input-value_txt">
                        <span className="input-value">{
                          employeeCount.payload ? employeeCount.payload : ''
                        }</span>
                      </div>
                  }

                </div>
              </div>
              <div className="payment">
                <div className="d-flex align-items-center">
                  <div className="input-title">
                    {" "}
                    Total Salary Monthly Payment
                  </div>
                  <div className="input-value_txt">
                    <span className="input-value">
                      ${salary.payload ? salary.payload : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            {localStorage.getItem("role") ==
              "SUPER_ADMIN_AS_COMPANY_ADMIN" ? null : (
                <div className="right-wrapper text-right">
                  <div className="popup-btn" onClick={() => createEmployee()}>
                    <div className="btn-value btnadd-btn">
                      <img src={addicon} className="m-0 mr-1" /> Add New Employee
                  </div>
                  </div>
                </div>
              )}
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
                <th>
                  <span className="titlefill-tb superth-tbl">
                    <img src={paymenticon} /> Monthly Payment:
                  </span>
                </th>
                {localStorage.getItem("role") ==
                  "SUPER_ADMIN_AS_COMPANY_ADMIN" ? null : (
                    <th>
                      <span className="titlefill-tb superth-tbl">
                        <img src={editHeaderIcon} /> Action
                    </span>
                    </th>
                  )}
              </tr>
            </thead>

            {employeeList &&
              employeeList.map((val) => {
                return (
                  <tbody key={val.id}>
                    <tr>
                      <td>
                        <div className="employeeprf--warp">
                          <div className="card-profile">
                            <CImg
                              src={
                                val.profileImage ? val.profileImage : profile
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
                          {val.phoneNumber ? <div className="card-cell">
                            <CImg
                              src={cellIcon}
                              fluid
                              className="company-title"
                            />
                            <div className="card-cell-title">Cell:</div>
                            <div className="number-txt">{val.phoneNumber}</div>
                          </div> : ""}
                          {val.office ? <div className="card-cell">
                            <CImg
                              src={officeIcon}
                              fluid
                              className="company-title"
                            />
                            <div className="card-cell-title">Office:</div>
                            <div className="number-txt">{val.office}</div>
                          </div> : ""}
                          {val.email ? <div className="card-cell">
                            <CImg
                              src={emailIcon}
                              fluid
                              className="company-title"
                            />
                            <div className="card-cell-title">Email:</div>
                            <div className="number-txt">{val.email}</div>
                          </div> : ""}
                        </div>
                      </td>
                      <td>
                        {val.monthlyPayment ? (
                          <div className="monthly-salary" style={{ float: 'left' }}>
                            ${val.monthlyPayment}{" "}
                          </div>
                        ) : (
                            <div className="monthly-salary none-color">None</div>
                          )}
                      </td>
                      {localStorage.getItem("role") ==
                        "SUPER_ADMIN_AS_COMPANY_ADMIN" ? null : (
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
                            </span>
                            {/* <span className="titlefill-tb superth-tbl">
                              <img
                                src={editIcon}
                                onClick={() => handleClick("edit", val)}
                              />
                              <img
                                src={deleteIcon}
                                onClick={() => handleClick("delete", val)}
                              />
                            </span> */}
                          </td>
                        )}
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

export default Employees;
