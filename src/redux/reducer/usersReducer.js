import * as usersActionType from "../actionsType/usersActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case usersActionType.GET_USERS:
      return {
        ...state,
        userslist: action.payload,
      };
    default:
      return state;
  }
};
