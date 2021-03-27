import * as offersApis from "../../services/offer";
import * as offerActionTypes from "../actionsType/offerActionType";

export const offerList = () => async (dispatch) => {
  const response = await offersApis.offerlist();
  dispatch({
    type: offerActionTypes.GET_OFFERS,
    payload: response?.data?.data,
  });
};

export const addOffer = (params) => async (dispatch) => {
  const resp = await offersApis.newOffer(params);
  dispatch({
    type: offerActionTypes.ADD_OFFERS,
    payload: resp.data,
  });
  return resp.data;
};
