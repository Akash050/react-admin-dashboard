import * as contactApis from "../../services/userContact";
import * as contactActionTypes from "../actionsType/userConatctActionType";

export const createContact = (params) => async (dispatch) => {
    const resp = await contactApis.newContact(params);
    console.log('created conatct', resp)
    if (resp) {
        if (resp.data.body != null) {
            dispatch({
                type: contactActionTypes.CREATE_CONTACT,
                payload: resp.data.body,
            });
        }
        return resp.data;
    }
};

export const uploadProfile = (id, formData) => async (dispatch) => {
    const resp = await contactApis.uploadProfile(id, formData);
    // if (resp) {
    //   dispatch({
    //     type: contactActionTypes.EMPLOYEE_PROFILE,
    //     payload: resp.data.body,
    //   });
    //return resp.data;
    //}
    console.log("profile response ->", resp);
    return resp;
};

export const updateContact = (params) => async (dispatch) => {
    const resp = await contactApis.updateContact(params);
    console.log('userconatct', resp.data.body)
    dispatch({
        type: contactActionTypes.UPDATE_CONTACT,
        payload: resp.data.body,
    });
    return resp.data;
};

export const deleteContact = (params) => async (dispatch) => {
    const resp = await contactApis.deleteContact(params);
    dispatch({
        type: contactActionTypes.DELETE_CONTACT,
        payload: params,
    });
    return resp.data;
};

export const getAllContacts = (page, size, search) => async (
    dispatch
) => {
    const resp = await contactApis.getContacts(page, size, search);
    console.log("get all contacts", resp);
    if (resp) {
        console.log("inside if");
        // var filteredArray = resp.data.body.content.filter(
        //   (val) => val.authority.name !== "ROLE_COMPANY_ADMIN"
        // );
        dispatch({
            type: contactActionTypes.ALL_CONTACTS,
            payload: resp.data.body.content,
        });
        dispatch({
            type: contactActionTypes.PAGING_DATA,
            payload: resp.data.body.totalPages,
        });
        dispatch({
            type: contactActionTypes.TOTAL_CONTACT,
            payload: resp.data.body.totalElements,
        });
    }
};

// export const getSalary = () => async (dispatch) => {
//   const resp = await contactApis.getSalary();
//   //console.log("resp get salar   esp get salaresp get salaresp get salar-->", resp.data.body);
//   if (resp) {
//     dispatch({
//       type: contactActionTypes.EMPLOYEE_SALARY,
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
//       type: contactActionTypes.TOTAL_EMPLOYEE,
//       payload: resp.data.body.totalElements,
//     });
//   }
// };

// export const updated = (params) => async (dispatch) => {
//   dispatch({
//     type: contactActionTypes.UPDATED,
//     payload: params,
//   });
//   return;
// };

// export const created = (params) => async (dispatch) => {
//   dispatch({
//     type: contactActionTypes.CREATED,
//     payload: params,
//   });
//   return;
// };
