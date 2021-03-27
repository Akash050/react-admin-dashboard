import * as vehicalActionType from "../actionsType/vehicalActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case vehicalActionType.GET_VEHICALS:
      return {
        ...state,
        vehicalslist: action.payload,
      };
    case vehicalActionType.ADD_VEHICALS:
      return {
        ...state,
        vehical: action.payload,
      };
    default:
      return state;
  }
};
