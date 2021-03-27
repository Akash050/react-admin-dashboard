import * as propertyApis from "../../services/propertyTemplate";
import * as propertyActionType from "../actionsType/propertyTemplateActionType";
export const createProperty = (params) => async (dispatch) => {
    const resp = await propertyApis.newPropertyTemplate(params);
    if (resp) {
        dispatch({
            type: propertyActionType.CREATE_PROPERTY_TEMPLATE,
            payload: resp.data.body,
        });
        return resp.data;
    }
};
export const uploadImage = (id, formData) => async (dispatch) => {
    const resp = await propertyApis.uploadImage(id, formData);
    return resp;
};
export const updateProperty = (params) => async (dispatch) => {
    const resp = await propertyApis.updateProperty(params);
    dispatch({
        type: propertyActionType.UPDATE_PROPERTY_TEMPLATE,
        payload: resp.data.body,
    });
    return resp.data;
};
export const deleteProperty = (params) => async (dispatch) => {
    const resp = await propertyApis.deleteProperty(params);
    dispatch({
        type: propertyActionType.DELETE_PROPERTY_TEMPLATE,
        payload: params,
    });
    return resp.data;
};
export const getPropertyTemplates = (page, size, search) => async (dispatch) => {
    const resp = await propertyApis.getPropertyTemplates(page, size, search);
    if (resp) {
        dispatch({
            type: propertyActionType.ALL_PROPERTIES_TEMPLATE,
            payload: resp.data.body.content,
        });
        dispatch({
            type: propertyActionType.PAGING_DATA,
            payload: resp.data.body.totalPages,
        });
        dispatch({
            type: propertyActionType.TOTAL_PROPERTY_TEMPLATE,
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