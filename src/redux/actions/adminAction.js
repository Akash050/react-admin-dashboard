import * as adminsApis from "../../services/admin";
import * as adminActionType from "../actionsType/adminActionType";

export const adminsList = () => async (dispatch) => {
  const response = await adminsApis.getadmins();
  dispatch({
    type: adminActionType.GET_ADMINS,
    payload: response?.data?.data,
  });
};

export const createAdmin = (params) => async (dispatch) => {
  const response = await adminsApis.createadmin(params);
  dispatch({
    type: adminActionType.CREATE_ADMIN,
    payload: response?.data?.data,
  });
  return response.data;
};

export const loginAdmin = (params) => async (dispatch) => {
  const response = await adminsApis.loginadmin(params);
  if (response.data.success) {
    localStorage.clear();
    localStorage.setItem("token", response.data.body.access_token);
    localStorage.setItem("isLoggedIn", true);

    dispatch({
      type: adminActionType.LOGIN_ADMIN,
      payload: response.data,
    });
  }
  return response.data;
};

export const deleteAdmin = (params) => async (dispatch) => {
  const response = await adminsApis.deleteadmin(params);
  dispatch({
    type: adminActionType.DELETE_ADMIN,
    payload: response?.data?.data,
  });
};
