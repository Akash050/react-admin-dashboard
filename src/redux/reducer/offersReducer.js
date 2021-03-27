import * as offerActionType from "../actionsType/offerActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case offerActionType.GET_OFFERS:
      return {
        ...state,
        offerslist: action.payload,
      };
    case offerActionType.ADD_OFFERS:
      return {
        ...state,
        offer: action.payload,
      };
    default:
      return state;
  }
};
