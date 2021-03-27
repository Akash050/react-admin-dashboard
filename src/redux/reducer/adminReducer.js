import * as adminActionType from "../actionsType/adminActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case adminActionType.CREATE_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case adminActionType.LOGIN_ADMIN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
