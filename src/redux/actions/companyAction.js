import * as companyApis from "../../services/company";
import * as companyActionTypes from "../actionsType/companyActionType";

export const createCompany = (params) => async (dispatch) => {
  console.log("in action param", params);

  const resp = await companyApis.newCompany(params);
  console.log("in cpompany response", resp);
  if (resp) {
    dispatch({
      type: companyActionTypes.CREATE_COMPANY,
      payload: resp.data.body,
    });
    return resp.data;
  }
};

export const uploadProfile = (id, formData) => async (dispatch) => {
  const resp = await companyApis.uploadProfile(id, formData);
  // if (resp) {
  //   dispatch({
  //     type: employeeActionTypes.EMPLOYEE_PROFILE,
  //     payload: resp.data.body,
  //   });
    //return resp.data;
  //}
  console.log("profile response ->", resp)
  return resp;
};

export const updateCompany = (params) => async (dispatch) => {
  const resp = await companyApis.updateCompany(params);
  console.log("update resp ->>", resp);
  dispatch({
    type: companyActionTypes.UPDATE_COMPANY,
    payload: resp.data.body,
  });
  return resp.data;
};

export const deleteCompany = (params) => async (dispatch) => {
  console.log("params", params);
  const resp = await companyApis.deleteCompany(params);
  console.log("data", resp.data);
  dispatch({
    type: companyActionTypes.DELETE_COMPANY,
    payload: params,
  });
  return resp.data;
};
export const getAllCompany = (page, size, search) => async (dispatch) => {
  const resp = await companyApis.getCompany(page, size, search);
  if (resp) {
    dispatch({
      type: companyActionTypes.ALL_COMPANY,
      payload: resp.data,
    });
    dispatch({
      type: companyActionTypes.COMPANY_PAGING_DATA,
      payload: resp.data.body.totalPages,
    });
    dispatch({
      type: companyActionTypes.TOTAL_COMPANY,
      payload: resp.data.body.totalElements,
    });
  }
};
export const getCompanyById = (id) => async (dispatch) => {
  const resp = await companyApis.getCompanyById(id);
  if (resp) {
    dispatch({
      type: companyActionTypes.COMPANY_BY_ID,
      payload: resp.data.body,
    });
  }
};
export const updated = (params) => async (dispatch) => {
  dispatch({
    type: companyActionTypes.UPDATED,
    payload: params,
  });
  return;
};

export const created = (params) => async (dispatch) => {
  dispatch({
    type: companyActionTypes.CREATED,
    payload: params,
  });
  return;
};
