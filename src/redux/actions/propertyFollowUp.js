import * as propertyFollowUpApis from "../../services/propertyFollowUp";
import * as propertyFollowActionType from "../actionsType/propertyFollowActionType";

export const createPropertyFollowUp = (params) => async (dispatch) => {
    const resp = await propertyFollowUpApis.newfollowUp(params);
    if (resp) {
        dispatch({
            type: propertyFollowActionType.CREATE_PROPERTY_FOLLOW_UP,
            payload: resp.data.body,
        });
        return resp.data;
    }
};

// export const uploadImage = (id, formData) => async (dispatch) => {
//     const resp = await propertyFollowUpApis.uploadImage(id, formData);
//     return resp;
// };
// export const uploadAttachment = (id, formData) => async (dispatch) => {
//     const resp = await propertyFollowUpApis.uploadAttachment(id, formData);
//     return resp;
// };

// export const removeAttachment = (id, type) => async (dispatch) => {
//     const resp = await propertyFollowUpApis.removeAttachment(id, type);
//     return resp;
// };

export const updatefollowUp = (params) => async (dispatch) => {
    const resp = await propertyFollowUpApis.updatefollowUp(params);
    dispatch({
        type: propertyFollowActionType.UPDATE_FOLLOW_UP,
        payload: resp.data.body,
    });
    return resp.data;
};

export const deletefollowUp = (params) => async (dispatch) => {
    const resp = await propertyFollowUpApis.deletefollowUp(params);
    dispatch({
        type: propertyFollowActionType.DELETE_FOLLOW_UP,
        payload: params,
    });
    return resp.data;
};

export const getFollowUpsOfUsers = (page, size, search) => async (dispatch) => {
    console.log("lkjjsearch", search)
    const resp = await propertyFollowUpApis.getFollowUpsOfUsers(page, size, search);
    console.log("ress ->", resp)
    if (resp) {
        dispatch({
            type: propertyFollowActionType.ALL_FOLLOW_UPS,
            payload: resp.data.body.content,
        });
        dispatch({
            type: propertyFollowActionType.PAGING_DATA,
            payload: resp.data.body.totalPages,
        });
        dispatch({
            type: propertyFollowActionType.TOTAL_PROPERTY,
            payload: resp.data.body.totalElements,
        });
    }
};
export const getFollowUpByProperty = (param) => async (dispatch) => {
    console.log("lkjjparam", param)
    const resp = await propertyFollowUpApis.getFollowUpByProperty(param);
    console.log("ress getfolloeupbyproprty ->", resp)
    if (resp) {
        dispatch({
            type: propertyFollowActionType.FOLLOW_UP_BY_PROPERTY,
            payload: resp.data.body.content,
        });
        dispatch({
            type: propertyFollowActionType.PAGING_DATA,
            payload: resp.data.body.totalPages,
        });
        dispatch({
            type: propertyFollowActionType.TOTAL_PROPERTY,
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
        type: propertyFollowActionType.UPDATED,
        payload: params,
    });
    return;
};

export const created = (params) => async (dispatch) => {
    dispatch({
        type: propertyFollowActionType.CREATED,
        payload: params,
    });
    return;
};
