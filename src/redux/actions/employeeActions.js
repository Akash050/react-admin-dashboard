import * as employeeApis from "../../services/employee";
import * as employeeActionTypes from "../actionsType/employeeActionType";

export const createEmployee = (params) => async (dispatch) => {
  const resp = await employeeApis.newEmployee(params);
  if (resp) {
    dispatch({
      type: employeeActionTypes.CREATE_EMPLOYEE,
      payload: resp.data.body,
    });
    return resp.data;
  }
};

export const uploadProfile = (id, formData) => async (dispatch) => {
  const resp = await employeeApis.uploadProfile(id, formData);
  // if (resp) {
  //   dispatch({
  //     type: employeeActionTypes.EMPLOYEE_PROFILE,
  //     payload: resp.data.body,
  //   });
  //return resp.data;
  //}
  console.log("profile response ->", resp);
  return resp;
};

export const updateEmployee = (params) => async (dispatch) => {
  const resp = await employeeApis.updateEmployee(params);
  dispatch({
    type: employeeActionTypes.UPDATE_EMPLOYEE,
    payload: resp.data.body,
  });
  return resp.data;
};

export const deleteEmployee = (params) => async (dispatch) => {
  const resp = await employeeApis.deleteEmployee(params);
  dispatch({
    type: employeeActionTypes.DELETE_EMPLOYEE,
    payload: params,
  });
  return resp.data;
};

export const getAllEmployees = (page, size, search) => async (dispatch) => {

  const resp = await employeeApis.getEmployees(page, size, search);
  console.log("resp", resp);
  if (resp) {
    console.log("inside if");
    var filteredArray = resp.data.body.content.filter(
      (val) => val.authority.name !== "ROLE_COMPANY_ADMIN"
    );
    dispatch({
      type: employeeActionTypes.ALL_EMPLOYEES,
      payload: filteredArray,
    });
    dispatch({
      type: employeeActionTypes.PAGING_DATA,
      payload: resp.data.body.totalPages,
    });
    dispatch({
      type: employeeActionTypes.TOTAL_EMPLOYEE,
      payload: resp.data.body.totalElements,
    });
  }
};
export const getAllCompanyIdEmployees = (page, size, search, companyId) => async (dispatch) => {
  console.log("in all cmpany action", companyId);
  const resp = await employeeApis.getCompanyIdEmployees(page, size, search, companyId);
  console.log("resp", resp);
  if (resp) {
    var filteredArray = resp.data.body.content.filter(
      (val) => val.authority.name !== "ROLE_COMPANY_ADMIN"
    );
    dispatch({
      type: employeeActionTypes.ALL_EMPLOYEES,
      payload: filteredArray,
    });
    dispatch({
      type: employeeActionTypes.PAGING_DATA,
      payload: resp.data.body.totalPages,
    });
    dispatch({
      type: employeeActionTypes.TOTAL_EMPLOYEE,
      payload: resp.data.body.totalElements,
    });
  }
};

export const getSalary = () => async (dispatch) => {
  const resp = await employeeApis.getSalary();
  // console.log("resp get salar   esp get salaresp get salaresp get salar-->", resp.data);
  if (resp) {
    dispatch({
      type: employeeActionTypes.EMPLOYEE_SALARY,
      payload: resp.data.body,
    });
  }
};

export const getemployeecount = (page, size, roleId, search) => async (
  dispatch
) => {
  const resp = await employeeApis.getEmployees(page, size, roleId, search);
  console.log('emplyee count ran')
  if (resp) {
    dispatch({
      type: employeeActionTypes.TOTAL_EMPLOYEE,
      payload: resp.data.body.totalElements,
    });
  }
};

export const updated = (params) => async (dispatch) => {
  dispatch({
    type: employeeActionTypes.UPDATED,
    payload: params,
  });
  return;
};

export const created = (params) => async (dispatch) => {
  dispatch({
    type: employeeActionTypes.CREATED,
    payload: params,
  });
  return;
};
