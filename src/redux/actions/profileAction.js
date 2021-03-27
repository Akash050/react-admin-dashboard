import * as profileApis from "../../services/profile";
import * as profileActionTypes from "../actionsType/profileActionType";

export const getAllProfile = (page, size, search) => async (dispatch) => {
  const resp = await profileApis.getProfile(page, size, search);
  if (resp) {
    dispatch({
      type: profileActionTypes.ALL_PROFILE,
      payload: resp.data.body,
    });
    // dispatch({
    //   type: profileActionTypes.PROFILE_PAGING_DATA,
    //   payload: resp.data.body.totalPages,
    // });
    // dispatch({
    //   type: profileActionTypes.TOTAL_PROFILE,
    //   payload: resp.data.body.numberOfElements,
    // });
  }
};

export const updateProfile = (params) => async (dispatch) => {
  const resp = await profileApis.updateProfile(params);
  console.log("update resp ->>", resp);
  dispatch({
    type: profileActionTypes.UPDATE_PROFILE,
    payload: resp.data.body,
  });
  return resp.data;
};
