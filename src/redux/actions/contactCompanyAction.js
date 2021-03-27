import * as contactCompanyApis from "../../services/contactCompany";
import * as contactCompanyActionType from "../actionsType/contactCompanyActionType";

export const createCompany = (params) => async (dispatch) => {
  const resp = await contactCompanyApis.newCompany(params);
  if (resp) {
    dispatch({
      type: contactCompanyActionType.CREATE_CONTACT_COMPANY,
      payload: resp.data.body,
    });
    return resp.data;
  }
};

export const uploadcompanyImage = (id, formData) => async (dispatch) => {
  const resp = await contactCompanyApis.uploadImage(id, formData);
  return resp;
};


export const updateCompany = (params) => async (dispatch) => {
  const resp = await contactCompanyApis.updateCompany(params);
  dispatch({
    type: contactCompanyActionType.UPDATE_CONTACT_COMPANY,
    payload: resp.data.body,
  });
  return resp.data;
};

export const deleteCompany = (params) => async (dispatch) => {
  const resp = await contactCompanyApis.deleteCompany(params);
  dispatch({
    type: contactCompanyActionType.DELETE_CONTACT_COMPANY,
    payload: params,
  });
  return resp.data;
};

export const getAllContactCompanies = (page, size, search) => async (dispatch) => {
  const resp = await contactCompanyApis.getCompany(page, size, search);
  console.log('get all compnay resp', resp)
  if (resp) {
    dispatch({
      type: contactCompanyActionType.ALL_CONTACT_COMPANIES,
      payload: resp.data.body.content.reverse(),
    });
    dispatch({
      type: contactCompanyActionType.PAGING_DATA,
      payload: resp.data.body.totalPages,
    });
    dispatch({
      type: contactCompanyActionType.TOTAL_DATA,
      payload: resp.data.body.totalElements,
    });
  }
};


// export const getemployeecount = (page, size, roleId, search) => async (
//   dispatch
// ) => {
//   const resp = await employeeApis.getEmployees(page, size, roleId, search);
//   if (resp) {
//     dispatch({
//       type: employeeActionTypes.TOTAL_EMPLOYEE,
//       payload: resp.data.body.totalElements,
//     });
//   }
// };

export const updated = (params) => async (dispatch) => {
  dispatch({
    type: contactCompanyActionType.UPDATED,
    payload: params,
  });
  return;
};

export const created = (params) => async (dispatch) => {
  dispatch({
    type: contactCompanyActionType.CREATED,
    payload: params,
  });
  return;
};
