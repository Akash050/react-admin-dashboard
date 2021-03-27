import * as driversActionType from "../actionsType//driversActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case driversActionType.GET_DRIVERS:
      return {
        ...state,
        driverslist: action.payload,
      };
    default:
      return state;
  }
};
