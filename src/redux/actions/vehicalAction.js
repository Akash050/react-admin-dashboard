import * as vehicalsApis from "../../services/vehical";
import * as vehicalsActionTypes from "../actionsType/vehicalActionType";

export const vehicalList = () => async (dispatch) => {
  const response = await vehicalsApis.vehicallist();
  dispatch({
    type: vehicalsActionTypes.GET_VEHICALS,
    payload: response?.data?.data,
  });
};

export const addVehical = (params) => async (dispatch) => {
  const resp = await vehicalsApis.newVehical(params);
  dispatch({
    type: vehicalsActionTypes.ADD_VEHICALS,
    payload: resp.data,
  });
  return resp.data;
};
