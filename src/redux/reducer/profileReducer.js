import * as profileActionType from "../actionsType/profileActionType";

export default (state = [], action) => {
  switch (action.type) {
    case profileActionType.ALL_PROFILE:
      return [action.payload];
    case profileActionType.UPDATE_PROFILE:
      return state;
    default:
      return state;
  }
};
