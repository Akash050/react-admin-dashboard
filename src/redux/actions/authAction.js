import * as authApis from "../../services/auth";
import * as authActionTypes from "../actionsType/authActionType";

export const sendforgetPass = (payload) => async (dispatch) => {
  const resp = await authApis.forgetPassword(payload);
  if (resp) {
    dispatch({
      type: authActionTypes.FORGET_PASS,
      payload: resp.data,
    });
    return resp.data;
  }
};


export const getresetPass = (auth) => async (dispatch) => {
  const resp = await authApis.resetPassword(auth);
//   console.log("authApis rewset resp ->>", resp);
  dispatch({
    type: authActionTypes.RESET_PASS,
    payload: resp.data,
  });
  return resp.data;
};




