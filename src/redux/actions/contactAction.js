import * as contactApis from "../../services/contact";
import * as contactActionType from "../actionsType/contactActionType";

export const createContact = (params) => async (dispatch) => {
  const resp = await contactApis.newCotact(params);
  if (resp) {
    dispatch({
      type: employeeActionTypes.CREATE_EMPLOYEE,
      payload: resp.data.body,
    });
    return resp.data;
  }
};

export const uploadProfile = (id, formData) => async (dispatch) => {
  const resp = await contactApis.uploadProfile(id, formData);
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

// export const updateContact = (params) => async (dispatch) => {
//   const resp = await contactApis.updateEmployee(params);
//   dispatch({
//     type: employeeActionTypes.UPDATE_EMPLOYEE,
//     payload: resp.data.body,
//   });
//   return resp.data;
// };

// export const deleteContact = (params) => async (dispatch) => {
//   const resp = await contactApis.deleteEmployee(params);
//   dispatch({
//     type: employeeActionTypes.DELETE_EMPLOYEE,
//     payload: params,
//   });
//   return resp.data;
// };

// export const getAllContact = (page, size, roleId, search) => async (
//   dispatch
// ) => {
//   const resp = await contactApis.getContacts(page, size, roleId, search);
//   console.log("in emollottttt action", resp);
//   console.log("resp", resp);
//   if (resp) {
//     console.log("inside if");
//     var filteredArray = resp.data.body.content.filter(
//       (val) => val.authority.name !== "ROLE_COMPANY_ADMIN"
//     );
//     dispatch({
//       type: employeeActionTypes.ALL_EMPLOYEES,
//       payload: filteredArray.reverse(),
//     });
//     dispatch({
//       type: employeeActionTypes.PAGING_DATA,
//       payload: resp.data.body.totalPages,
//     });
//     dispatch({
//       type: employeeActionTypes.TOTAL_EMPLOYEE,
//       payload: resp.data.body.totalElements,
//     });
//   }
// };

// export const getSalary = () => async (dispatch) => {
//   const resp = await contactApis.getSalary();
//   //console.log("resp get salar   esp get salaresp get salaresp get salar-->", resp.data.body);
//   if (resp) {
//     dispatch({
//       type: employeeActionTypes.EMPLOYEE_SALARY,
//       payload: resp.data.body,
//     });
//   }
// };

// export const getemployeecount = (page, size, roleId, search) => async (
//   dispatch
// ) => {
//   const resp = await contactApis.getEmployees(page, size, roleId, search);
//   if (resp) {
//     dispatch({
//       type: employeeActionTypes.TOTAL_EMPLOYEE,
//       payload: resp.data.body.totalElements,
//     });
//   }
// };

// export const updated = (params) => async (dispatch) => {
//   dispatch({
//     type: employeeActionTypes.UPDATED,
//     payload: params,
//   });
//   return;
// };

// export const created = (params) => async (dispatch) => {
//   dispatch({
//     type: employeeActionTypes.CREATED,
//     payload: params,
//   });
//   return;
// };
