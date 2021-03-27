import * as propertyApis from "../../services/property";
import * as propertyActionType from "../actionsType/propertyActionType";

export const createProperty = (params) => async (dispatch) => {
  const resp = await propertyApis.newProperty(params);
  if (resp) {
    dispatch({
      type: propertyActionType.CREATE_PROPERTY,
      payload: resp.data.body,
    });
    return resp.data;
  }
};

export const uploadImage = (id, formData) => async (dispatch) => {
  const resp = await propertyApis.uploadImage(id, formData);
  return resp;
};
export const uploadAttachment = (id, formData) => async (dispatch) => {
  const resp = await propertyApis.uploadAttachment(id, formData);
  return resp;
};

export const removeAttachment = (id, type) => async (dispatch) => {
  const resp = await propertyApis.removeAttachment(id, type);
  return resp;
};

export const updateProperty = (params) => async (dispatch) => {
  const resp = await propertyApis.updateProperty(params);
  dispatch({
    type: propertyActionType.UPDATE_PROPERTY,
    payload: resp.data.body,
  });
  return resp.data;
};

export const deleteProperty = (params) => async (dispatch) => {
  const resp = await propertyApis.deleteProperty(params);
  dispatch({
    type: propertyActionType.DELETE_PROPERTY,
    payload: params,
  });
  return resp.data;
};

export const getAllProperties = (page, size, search) => async (dispatch) => {
  console.log("lkjjsearch", search)
  const resp = await propertyApis.getProperties(page, size, search);
  console.log("ress ->", resp)
  if (resp) {
    dispatch({
      type: propertyActionType.ALL_PROPERTIES,
      payload: resp.data.body.content,
    });
    dispatch({
      type: propertyActionType.PAGING_DATA,
      payload: resp.data.body.totalPages,
    });
    dispatch({
      type: propertyActionType.TOTAL_PROPERTY,
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
    type: propertyActionType.UPDATED,
    payload: params,
  });
  return;
};

export const created = (params) => async (dispatch) => {
  dispatch({
    type: propertyActionType.CREATED,
    payload: params,
  });
  return;
};
