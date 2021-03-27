import * as goodsApis from "../../services/goods";
import * as goodsActionTypes from "../actionsType/goodsActionType";

export const goodList = () => async (dispatch) => {
  const response = await goodsApis.goodsList();
  dispatch({
    type: goodsActionTypes.GET_GOODS,
    payload: response?.data?.data,
  });
};

export const addGood = (params) => async (dispatch) => {
  const resp = await goodsApis.addGoods(params);
  dispatch({
    type: goodsActionTypes.ADD_GOODS,
    payload: resp.data,
  });
  return resp.data;
};
