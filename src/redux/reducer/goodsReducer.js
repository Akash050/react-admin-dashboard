import * as goodsActionType from "../actionsType/goodsActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case goodsActionType.GET_GOODS:
      return {
        ...state,
        goodsList: action.payload,
      };
    case goodsActionType.ADD_GOODS:
      return {
        ...state,
        good: action.payload,
      };
    default:
      return state;
  }
};
